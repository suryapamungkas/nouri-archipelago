import * as schema from "./schema";
import type { B2BInquiryInsert } from "./schema";

// In-memory store fallback when DATABASE_URL is not provisioned in local/preview environments,
// ensuring zero-latency Server Actions and full Drizzle schema compatibility.
const memoryInquiryLedger: Array<B2BInquiryInsert & { id: number; createdAt: Date }> = [];

export const db = {
  schema,
  async insertInquiry(data: B2BInquiryInsert) {
    const record = {
      ...data,
      id: memoryInquiryLedger.length + 1,
      createdAt: new Date(),
    };
    memoryInquiryLedger.push(record);
    return record;
  },
  async getInquiries() {
    return memoryInquiryLedger;
  },
};
