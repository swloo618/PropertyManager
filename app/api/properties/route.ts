import { db } from "@/db";
import { properties, NewProperty } from "@/db/schema";
import { eq, like, and } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

// GET all properties with optional filters
// ... imports stay the same

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const type = searchParams.get("type");
    const purpose = searchParams.get("purpose");
    const search = searchParams.get("search");

    const conditions = [];

    if (type) {
      conditions.push(eq(properties.propertyType, type));
    }
    if (purpose) {
      conditions.push(eq(properties.purpose, purpose));
    }
    if (search) {
      conditions.push(like(properties.address, `%${search}%`));
    }

    // FIX: Execute the query directly based on conditions
    const results = conditions.length > 0 
      ? await db.select().from(properties).where(and(...conditions))
      : await db.select().from(properties);

    return NextResponse.json(results);
  } catch (error) {
    console.error("Error fetching properties:", error);
    return NextResponse.json({ error: "Failed to fetch properties" }, { status: 500 });
  }
}

// POST new property
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const newProperty: NewProperty = {
      address: body.address,
      propertyType: body.propertyType,
      size: body.size,
      landTitle: body.landTitle,
      bedrooms: body.bedrooms || 0,
      bathrooms: body.bathrooms || 0,
      purpose: body.purpose,
      price: body.price,
      description: body.description,
      ownerName: body.ownerName,
      ownerPhone: body.ownerPhone,
      ownerEmail: body.ownerEmail,
      ownerIdType: body.ownerIdType,
      ownerIdNumber: body.ownerIdNumber,
      ownerAddress: body.ownerAddress,
    };

    const result = await db.insert(properties).values(newProperty).returning();
    return NextResponse.json(result[0], { status: 201 });
  } catch (error) {
    console.error("Error creating property:", error);
    return NextResponse.json({ error: "Failed to create property" }, { status: 500 });
  }
}
