/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

// 파라미터 검증 함수
function validateId(id: string) {
  if (!ObjectId.isValid(id)) {
    return null;
  }
  return new ObjectId(id);
}

// 특정 카드 조회
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = validateId(params.id);
    if (!id) {
      return NextResponse.json(
        { success: false, error: "Invalid ID" },
        { status: 400 }
      );
    }

    const { db } = await connectToDatabase();
    const card = await db.collection("cards").findOne({ _id: id });

    if (!card) {
      return NextResponse.json(
        { success: false, error: "Card not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: card });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}

// 카드 업데이트
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = validateId(params.id);
    if (!id) {
      return NextResponse.json(
        { success: false, error: "Invalid ID" },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { title, description } = body;

    // 업데이트할 필드 구성
    const updateData: Record<string, any> = {};
    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;

    // 업데이트할 내용이 없는 경우
    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { success: false, error: "No fields to update" },
        { status: 400 }
      );
    }

    const { db } = await connectToDatabase();
    const result = await db
      .collection("cards")
      .updateOne({ _id: id }, { $set: updateData });

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { success: false, error: "Card not found" },
        { status: 404 }
      );
    }

    const updatedCard = await db.collection("cards").findOne({ _id: id });
    return NextResponse.json({ success: true, data: updatedCard });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}

// 카드 삭제
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = validateId(params.id);
    if (!id) {
      return NextResponse.json(
        { success: false, error: "Invalid ID" },
        { status: 400 }
      );
    }

    const { db } = await connectToDatabase();
    const result = await db.collection("cards").deleteOne({ _id: id });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { success: false, error: "Card not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: {} });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}
