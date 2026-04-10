import { db } from "@/db";
import { prospects } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

type Params = {
  id: string;
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<Params> }
) {
  try {
    const { id } = await params;
    const numId = parseInt(id);
    const result = await db.select().from(prospects).where(eq(prospects.id, numId));

    if (!result.length) {
      return NextResponse.json({ error: "Prospect not found" }, { status: 404 });
    }

    return NextResponse.json(result[0]);
  } catch (error) {
    console.error("Error fetching prospect:", error);
    return NextResponse.json({ error: "Failed to fetch prospect" }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<Params> }
) {
  try {
    const { id } = await params;
    const numId = parseInt(id);
    const body = await request.json();

    const result = await db
      .update(prospects)
      .set({
        name: body.name,
        phone: body.phone,
        email: body.email,
        type: body.type,
        budget: body.budget,
        preferredPropertyType: body.preferredPropertyType,
        remarks: body.remarks,
        updatedAt: Math.floor(Date.now() / 1000),
      })
      .where(eq(prospects.id, numId))
      .returning();

    if (!result.length) {
      return NextResponse.json({ error: "Prospect not found" }, { status: 404 });
    }

    return NextResponse.json(result[0]);
  } catch (error) {
    console.error("Error updating prospect:", error);
    return NextResponse.json({ error: "Failed to update prospect" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<Params> }
) {
  try {
    const { id } = await params;
    const numId = parseInt(id);
    await db.delete(prospects).where(eq(prospects.id, numId));
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting prospect:", error);
    return NextResponse.json({ error: "Failed to delete prospect" }, { status: 500 });
  }
}
