import { db } from "@/db";
import { prospects, NewProspect } from "@/db/schema";
import { eq, like, and } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

// GET all prospects with optional filters
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const type = searchParams.get("type");
    const search = searchParams.get("search");

    let query = db.select().from(prospects);
    const conditions = [];

    if (type && type !== "all") {
      conditions.push(eq(prospects.type, type));
    }
    if (search) {
      conditions.push(like(prospects.name, `%${search}%`));
    }

    if (conditions.length > 0) {
      query = db.select().from(prospects).where(and(...conditions));
    }

    const results = await query;
    return NextResponse.json(results);
  } catch (error) {
    console.error("Error fetching prospects:", error);
    return NextResponse.json({ error: "Failed to fetch prospects" }, { status: 500 });
  }
}

// POST new prospect
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const newProspect: NewProspect = {
      name: body.name,
      phone: body.phone,
      email: body.email,
      type: body.type,
      budget: body.budget,
      preferredPropertyType: body.preferredPropertyType,
      remarks: body.remarks,
    };

    const result = await db.insert(prospects).values(newProspect).returning();
    return NextResponse.json(result[0], { status: 201 });
  } catch (error) {
    console.error("Error creating prospect:", error);
    return NextResponse.json({ error: "Failed to create prospect" }, { status: 500 });
  }
}
