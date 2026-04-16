import { sql } from "drizzle-orm";
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const properties = sqliteTable("properties", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  address: text("address").notNull(),
  propertyType: text("property_type").notNull(), // Best practice: use snake_case for DB columns
  size: integer("size").notNull(),
  landTitle: text("land_title").notNull(),
  bedrooms: integer("bedrooms").default(0),
  bathrooms: integer("bathrooms").default(0),
  purpose: text("purpose").notNull(),
  price: text("price").notNull(),
  description: text("description"),
  ownerName: text("owner_name").notNull(),
  ownerPhone: text("owner_phone").notNull(),
  ownerEmail: text("owner_email"),
  ownerIdType: text("owner_id_type"),
  ownerIdNumber: text("owner_id_number"),
  ownerAddress: text("owner_address"),
  createdAt: integer("created_at").default(sql`(cast(unixepoch() as int))`),
  updatedAt: integer("updated_at").default(sql`(cast(unixepoch() as int))`),
});

export const prospects = sqliteTable("prospects", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  phone: text("phone").notNull(),
  email: text("email"),
  type: text("type").notNull(),
  budget: text("budget").notNull(),
  preferredPropertyType: text("preferred_property_type"),
  remarks: text("remarks"),
  createdAt: integer("created_at").default(sql`(cast(unixepoch() as int))`),
  updatedAt: integer("updated_at").default(sql`(cast(unixepoch() as int))`),
});

export type Property = typeof properties.$inferSelect;
export type NewProperty = typeof properties.$inferInsert;
export type Prospect = typeof prospects.$inferSelect;
export type NewProspect = typeof prospects.$inferInsert;