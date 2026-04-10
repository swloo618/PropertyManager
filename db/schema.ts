import { sql } from "drizzle-orm";
import { sqliteTable, text, integer, real, primaryKey } from "drizzle-orm/sqlite-core";

export const properties = sqliteTable("properties", {
  id: integer().primaryKey({ autoIncrement: true }),
  address: text().notNull(),
  propertyType: text().notNull(), // condo, apartment, shoplot, warehouse, terrace, bungalow, semid
  size: integer().notNull(), // sqft
  landTitle: text().notNull(), // freehold, leasehold99, leasehold30, leasehold60
  bedrooms: integer().default(0),
  bathrooms: integer().default(0),
  purpose: text().notNull(), // rent or sale
  price: text().notNull(), // stored as string to handle both formats
  description: text(),
  ownerName: text().notNull(),
  ownerPhone: text().notNull(),
  ownerEmail: text(),
  ownerIdType: text(),
  ownerIdNumber: text(),
  ownerAddress: text(),
  createdAt: integer().default(sql`(cast(unixepoch() as int))`),
  updatedAt: integer().default(sql`(cast(unixepoch() as int))`),
});

export const prospects = sqliteTable("prospects", {
  id: integer().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  phone: text().notNull(),
  email: text(),
  type: text().notNull(), // buyer, tenant, both
  budget: text().notNull(),
  preferredPropertyType: text(), // condo, apartment, terrace, bungalow, semid, shoplot, warehouse, any
  remarks: text(), // detailed notes about requirements
  createdAt: integer().default(sql`(cast(unixepoch() as int))`),
  updatedAt: integer().default(sql`(cast(unixepoch() as int))`),
});

export type Property = typeof properties.$inferSelect;
export type NewProperty = typeof properties.$inferInsert;
export type Prospect = typeof prospects.$inferSelect;
export type NewProspect = typeof prospects.$inferInsert;
