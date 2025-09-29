import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ sessionID: string }> }
) {
  const resolvedParams = await params;
  try {
    const client = await clientPromise;
    const db = client.db("mydb");
    const sessionIdNum = parseInt(resolvedParams.sessionID, 10);

    // 1️⃣ Get all logs for this session
    const logs = await db
      .collection("logs")
      .find({ sessionID: sessionIdNum })
      .toArray();

    if (!logs.length) {
      return NextResponse.json(
        { error: "No logs found for this session" },
        { status: 404 }
      );
    }

    // 2️⃣ Extract questionIDs
    const questionIds = logs.map((log) => log.questionID);

    // Convert to ObjectIds if needed
    const objectIds = questionIds.map((id) =>
      typeof id === "string" ? new ObjectId(id) : id
    );

    // 3️⃣ Query the questions collection
    const questions = await db
      .collection("questions")
      .find({ _id: { $in: objectIds } })
      .toArray();

    // 4️⃣ Merge logs + questions
    const merged = logs.map((log) => {
      const question = questions.find((q) =>
        q._id.equals(log.questionID)
      );
      return {
        ...log,
        questionText: question?.text,
        options: question?.options,
        correctAnswer: question?.correctAnswer,
      };
    });

    return NextResponse.json(merged);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// Version 2: Lookup
//const results = await db.collection('logs').aggregate([
//{ $match: { sessionID: sessionIdNum } },
//{
//$lookup: {
//from: 'questions',
//localField: 'questionID',
//foreignField: '_id',
//as: 'questionData'
//}
//},
//{ $unwind: '$questionData' }, // flatten array
//{ $sort: { 'questionData.itemID': 1 } }
//]).toArray();