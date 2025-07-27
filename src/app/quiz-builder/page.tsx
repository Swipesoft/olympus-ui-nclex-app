import NCLEXQuizBuilder  from "@/components/QuizBuilder/quiz-builder"; 
import { syncUserWithDatabase } from "@/lib/auth";

export default async function QuizBuilderPage(){
    //await syncUserWithDatabase()
    return (

    <>
        <NCLEXQuizBuilder />
    </>
    )
}