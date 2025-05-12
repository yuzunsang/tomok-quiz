/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";

// GET 핸들러 - 모든 카드 조회
export async function GET() {
  try {
    const { db } = await connectToDatabase();
    const cards = await db.collection("cards").find({}).toArray();

    return NextResponse.json({ success: true, data: cards });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}

// POST 핸들러 - 새 카드 생성
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, description } = body;

    // 데이터 유효성 검사
    if (!title || !description) {
      return NextResponse.json(
        { success: false, error: "Title and description are required" },
        { status: 400 }
      );
    }

    const { db } = await connectToDatabase();
    const cardData = {
      title,
      description,
      createdAt: new Date(),
    };

    const result = await db.collection("cards").insertOne(cardData);

    return NextResponse.json(
      { success: true, data: { ...cardData, _id: result.insertedId } },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}
