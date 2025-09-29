import { ObjectId } from "mongodb";


export interface DbStandaloneItem {
  _id: string | ObjectId | any; // eslint-disable-next-line @typescript-eslint/no-explicit-any
  question_string: string;
  question_options: string[];
  verified_answer: number[];
  simplified_explanation: string;
  contrastive_rationale: string;
}


// Adapter to Convert the MongoDB nclex items record shape into the shape our frontend expects.
export function adaptItemsToSchema(doc: DbStandaloneItem): {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number[];
  explanation: string;
} {
  return {
    id: doc._id,
    question: doc.question_string,
    options: doc.question_options,
    correctAnswer: doc.verified_answer.map(idx => idx - 1),
    explanation: doc.contrastive_rationale || doc.simplified_explanation || '',
  };
}

/* ---------- usage example ---------- */
// const raw = await db.collection('questions').find().toArray();
// const nclexQuestions = raw.map(adaptItemsToSchema);