import { db } from "@/db";
import { properties } from "@/db/schema";
import { eq, and, like } from "drizzle-orm";
import { NextResponse, NextRequest } from "next/server";

// GET all properties with optional filters
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

    let results;
    if (conditions.length > 0) {
      results = await db.select().from(properties).where(and(...conditions));
    } else {
      results = await db.select().from(properties);
    }

    return NextResponse.json(results);
  } catch (error) {
    console.error("Error fetching properties:", error);
    return NextResponse.json({ error: "Failed to fetch properties" }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: any) {
  try {
    const id = parseInt(params.id);
    const body = await request.json();

    const result = await db
      .update(properties)
      .set({
        address: body.address,
        propertyType: body.propertyType,
        size: body.size,
        landTitle: body.landTitle,
        bedrooms: body.bedrooms,
        bathrooms: body.bathrooms,
        purpose: body.purpose,
        price: body.price,
        description: body.description,
        ownerName: body.ownerName,
        ownerPhone: body.ownerPhone,
        ownerEmail: body.ownerEmail,
        ownerIdType: body.ownerIdType,
        ownerIdNumber: body.ownerIdNumber,
        ownerAddress: body.ownerAddress,
        updatedAt: Math.floor(Date.now() / 1000),
      })
      .where(eq(properties.id, id))
      .returning();

    if (!result.length) {
      return NextResponse.json({ error: "Property not found" }, { status: 404 });
    }

    return NextResponse.json(result[0]);
  } catch (error) {
    console.error("Error updating property:", error);
    return NextResponse.json({ error: "Failed to update property" }, { status: 500 });
  }
}

export async function DELETE(_request: Request, { params }: any) {
  try {
    const id = parseInt(params.id);
    await db.delete(properties).where(eq(properties.id, id));
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting property:", error);
    return NextResponse.json({ error: "Failed to delete property" }, { status: 500 });
  }
}