//app/quiz-builder/page.tsx 
import NCLEXQuizBuilder  from "@/components/QuizBuilder/quiz-builder"; 
//import { syncUserWithDatabase } from "@/lib/auth";

export default async function QuizBuilderPage(){
    //const syncResult = await syncUserWithDatabase() //bug
    return (

    <>
        <NCLEXQuizBuilder />
    </>
    )
}