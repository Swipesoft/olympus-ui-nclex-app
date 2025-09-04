import {z} from "zod"; 
import { ObjectId } from "mongodb";

// 1. (A) userstatic database model: types, interface, schema validations 
export type UserMode = "free" | "premium"| "research"; 

export interface UserStatic {
    clerk_id: string; 
    first_name: string; 
    last_name: string;
    profile_image_url: string;
    contact_number?: string;
    address?: string;
    email: string;
    gender?: string | null;
    created_at?: Date;
    mode: UserMode;
    premium_expires_at?: Date | null;
}

export const UserStaticSchema = z.object({ 
    clerk_id: z.string(), 
    first_name: z.string(), 
    last_name: z.string(),
    profile_image_url: z.url(), 
    contact_number: z.string().optional(), 
    address: z.string().optional(), 
    email: z.email(),
    gender: z.string().nullable().optional(),
    created_at: z.coerce.date().default(() => new Date()),
    mode: z.enum(["free", "premium", "research"]),
    premium_expires_at: z.coerce.date().nullable().default(null),
})

//1. (B) userdynamic database model: types, interface, schema validations 

export interface UserDynamic {
    _id: string | ObjectId; //references the userstatic clerk_id or mongoDB _id 
    accuracy: number; 
    proficiency: number;
    sessions: string[]; //array of session IDs
    question_count?: number;
    question_history?: string[]; //array of question IDs attempted
}

export const UserDynamicSchema = z.object({
    _id: z.union([z.string(), z.instanceof(ObjectId)]),  
    accuracy: z.number().min(0).max(1), 
    proficiency: z.number().min(0).max(1).default(0.5), //default value is 0.5 
    sessions: z.array(z.string()).default([]),          //default is empty array
    question_count: z.number().min(0).default(0),
    question_history: z.array(z.string()).default([]), //default is empty array
})


//2. (A) itemStatic database model: types, interface, schema validations 

//NB: Agentic Olympus Workflow generates the dynamic questions, and writes to the DB from the pydantic validated schema.
// we design this interface here just for clarity purposes. In reality, we don't use this in the codebase.
type HTMLString = string & { __htmlBrand?: never };

export interface ItemStatic{
    question_string: string; 
    options: string[]; 
    topic_id: string;
    verified_answer: number[] | null; //null if not verified yet
    simplified_explanation: HTMLString; 
    contrasting_explanation: HTMLString;
    entropy?: number; //optional entropy value for the question
    created_at?: Date;
    generation_reward?: number; //optional reward score from generation model
    expert_verified?: boolean; //if expert has verified the question 

}

export const ItemStaticSchema = z.object({
    question_string: z.string(), 
    options: z.array(z.string()).min(4), // at least 4 options 
    topic_id: z.string(),
    verified_answer: z.array(z.number().int().nonnegative()).nullable(), //null if not verified yet
    simplified_explanation: z.string().min(10).transform((str) => str as HTMLString), 
    contrasting_explanation: z.string().min(10).transform((str) => str as HTMLString),
    entropy: z.number().min(0).optional(),
    created_at: z.coerce.date().default(() => new Date()),
    generation_reward: z.number().min(0).optional(),
    expert_verified: z.boolean().optional(),
})


//2. (B) itemDynamic database model: types, interface, schema validations 
export interface ItemDynamic { 
    _id: string | ObjectId; //references the itemStatic _id from MongoDB 
    live_difficulty: number; //0 to 1 scale 
    attempt_counts: number; //number of times question has been attempted
    successful_attempt_counts: number; //number of times question answered correctly 
}

export const ItemDynamicSchema = z.object({
    _id: z.string().or(z.instanceof(ObjectId)), //references the itemStatic _id from MongoDB
    live_difficulty: z.number().min(0).max(1).default(0), //default is 0
    attempt_counts: z.number().min(0).default(0), //default is 0
    successful_attempt_counts: z.number().min(0).default(0), //default is 0
})


//3. (A) userSessions logs database model: types, interface, schema validations
type SingleLog = {
  question_id: string;
  candidate_answer: number[];
};

type SessionSummary = {
    accuracy: number;
    proficiency: number;
}


export interface UserSessionLog {
    _id?: string | ObjectId; //MongoDB generated ID for the session log 
    mode: "tutor" | "exam"; 
    candidate_id: string; //references userStatic clerk_id or mongoDB _id 
    question_answer_logs: SingleLog[]; //array of questionID and candidate answer pairs
    created_at?: Date;
    session_summary?: SessionSummary; //optional summary of the session
}

export const UserSessionLogSchema = z.object({
    _id: z.string().or(z.instanceof(ObjectId)).optional(), //MongoDB generated ID for the session log 
    mode: z.enum(["tutor", "exam"]), 
    candidate_id: z.string(), //references userStatic clerk_id or mongoDB _id 
    question_answer_logs: z.array(z.object({
        question_id: z.string(),
        candidate_answer: z.array(z.number().int().nonnegative()).default([]), //default is empty array
    })).default([]), //default is empty array
    created_at: z.coerce.date().default(() => new Date()),
    session_summary: z.object({
        accuracy: z.number().min(0).max(1),
        proficiency: z.number().min(0).max(1),
    }).optional(), //optional summary of the session
})


