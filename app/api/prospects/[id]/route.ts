import { db } from "@/db";
import { prospects } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

// GET all prospects with optional filters
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const type = searchParams.get("type");
    const search = searchParams.get("search");

    const conditions = [];

    if (type && type !== "all") {
      conditions.push(eq(prospects.type, type));
    }
    if (search) {
      conditions.push(like(prospects.name, `%${search}%`));
    }

    let results;
    if (conditions.length > 0) {
      results = await db.select().from(prospects).where(and(...conditions));
    } else {
      results = await db.select().from(prospects);
    }

    return NextResponse.json(results);
  } catch (error) {
    console.error("Error fetching prospects:", error);
    return NextResponse.json({ error: "Failed to fetch prospects" }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: any) {
  try {
    const id = parseInt(params.id);
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
      .where(eq(prospects.id, id))
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

export async function DELETE(_request: Request, { params }: any) {
  try {
    const id = parseInt(params.id);
    await db.delete(prospects).where(eq(prospects.id, id));
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting prospect:", error);
    return NextResponse.json({ error: "Failed to delete prospect" }, { status: 500 });
  }
}