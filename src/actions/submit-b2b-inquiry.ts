"use server";

import { z } from "zod";
import { db } from "@/db";

const b2bInquirySchema = z.object({
  partnershipType: z.string().min(2, "Please select a partnership track."),
  productCategories: z
    .array(z.string())
    .min(1, "Select at least one product or facility category."),
  requestSample: z.boolean().default(false),
  companyName: z.string().min(2, "Company name is required."),
  contactName: z.string().min(2, "Full name is required."),
  workEmail: z.string().email("Please enter a valid corporate email address."),
  countryRegion: z.string().min(2, "Destination country or region is required."),
  estimatedVolume: z.string().min(1, "Please specify your estimated volume or MOQ tier."),
  projectNotes: z.string().optional(),
});

export type B2BInquiryInput = z.infer<typeof b2bInquirySchema>;

export interface B2BInquiryActionResult {
  success: boolean;
  referenceCode?: string;
  submittedAt?: string;
  assignedDesk?: string;
  error?: string;
  fieldErrors?: Partial<Record<keyof B2BInquiryInput, string[]>>;
}

export async function submitB2BInquiry(
  rawInput: B2BInquiryInput
): Promise<B2BInquiryActionResult> {
  const parsed = b2bInquirySchema.safeParse(rawInput);

  if (!parsed.success) {
    return {
      success: false,
      error: "Please verify all required B2B inquiry fields.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const data = parsed.data;
  const randomDigits = Math.floor(100000 + Math.random() * 900000);
  const prefix = data.requestSample ? "NRI-SMP" : "NRI-B2B";
  const referenceCode = `${prefix}-${new Date().getFullYear()}-${randomDigits}`;

  await db.insertInquiry({
    referenceCode,
    partnershipType: data.partnershipType,
    productCategories: data.productCategories,
    requestSample: data.requestSample,
    companyName: data.companyName,
    contactName: data.contactName,
    workEmail: data.workEmail,
    countryRegion: data.countryRegion,
    estimatedVolume: data.estimatedVolume,
    projectNotes: data.projectNotes ?? "",
    status: "pending_review",
  });

  const regionLower = data.countryRegion.toLowerCase();
  let assignedDesk = "Singapore & Jakarta Global Trade Desk (APAC)";
  if (
    regionLower.includes("uk") ||
    regionLower.includes("germany") ||
    regionLower.includes("netherlands") ||
    regionLower.includes("france") ||
    regionLower.includes("europe") ||
    regionLower.includes("swiss")
  ) {
    assignedDesk = "Rotterdam & Zurich European Trade Desk (EMEA)";
  } else if (
    regionLower.includes("us") ||
    regionLower.includes("america") ||
    regionLower.includes("canada")
  ) {
    assignedDesk = "Los Angeles North America Trade Desk (AMER)";
  } else if (
    regionLower.includes("uae") ||
    regionLower.includes("dubai") ||
    regionLower.includes("saudi") ||
    regionLower.includes("qatar")
  ) {
    assignedDesk = "Dubai Jebel Ali MENA Halal Desk";
  }

  return {
    success: true,
    referenceCode,
    submittedAt: new Date().toISOString(),
    assignedDesk,
  };
}
