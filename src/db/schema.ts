import {
  pgTable,
  serial,
  text,
  varchar,
  integer,
  boolean,
  timestamp,
  jsonb,
} from "drizzle-orm/pg-core";

export const b2bInquiries = pgTable("b2b_inquiries", {
  id: serial("id").primaryKey(),
  referenceCode: varchar("reference_code", { length: 32 }).notNull().unique(),
  partnershipType: varchar("partnership_type", { length: 64 }).notNull(),
  productCategories: jsonb("product_categories").$type<string[]>().notNull(),
  requestSample: boolean("request_sample").default(false).notNull(),
  companyName: varchar("company_name", { length: 160 }).notNull(),
  contactName: varchar("contact_name", { length: 120 }).notNull(),
  workEmail: varchar("work_email", { length: 160 }).notNull(),
  countryRegion: varchar("country_region", { length: 100 }).notNull(),
  estimatedVolume: varchar("estimated_volume", { length: 80 }).notNull(),
  projectNotes: text("project_notes"),
  status: varchar("status", { length: 32 }).default("pending_review").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const brandsTable = pgTable("brands", {
  id: varchar("id", { length: 64 }).primaryKey(),
  name: varchar("name", { length: 120 }).notNull(),
  category: varchar("category", { length: 64 }).notNull(),
  tagline: varchar("tagline", { length: 200 }).notNull(),
  description: text("description").notNull(),
  accentOklch: varchar("accent_oklch", { length: 64 }).notNull(),
  moqSpec: varchar("moq_spec", { length: 64 }).notNull(),
  originRegion: varchar("origin_region", { length: 120 }).notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const certificationsTable = pgTable("certifications", {
  id: varchar("id", { length: 64 }).primaryKey(),
  code: varchar("code", { length: 64 }).notNull(),
  title: varchar("title", { length: 140 }).notNull(),
  registrationNo: varchar("registration_no", { length: 80 }).notNull(),
  issuingBody: varchar("issuing_body", { length: 140 }).notNull(),
  validUntil: varchar("valid_until", { length: 32 }).notNull(),
});

export type B2BInquiryInsert = typeof b2bInquiries.$inferInsert;
export type B2BInquirySelect = typeof b2bInquiries.$inferSelect;
