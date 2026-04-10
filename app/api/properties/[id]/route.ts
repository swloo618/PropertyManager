import { db } from "@/db";
import { properties } from "@/db/schema";
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
    const result = await db.select().from(properties).where(eq(properties.id, numId));

    if (!result.length) {
      return NextResponse.json({ error: "Property not found" }, { status: 404 });
    }

    return NextResponse.json(result[0]);
  } catch (error) {
    console.error("Error fetching property:", error);
    return NextResponse.json({ error: "Failed to fetch property" }, { status: 500 });
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
      .where(eq(properties.id, numId))
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

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<Params> }
) {
  try {
    const { id } = await params;
    const numId = parseInt(id);
    await db.delete(properties).where(eq(properties.id, numId));
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting property:", error);
    return NextResponse.json({ error: "Failed to delete property" }, { status: 500 });
  }
}
