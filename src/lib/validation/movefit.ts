import { z } from "zod";

export const moveFitRequestSchema = z.object({
  city: z.string().trim().min(1).max(120),
  lifestyle: z.string().trim().min(10).max(2000),
  avoid: z.string().trim().max(1000).optional(),
  constraints: z
    .object({
      commute: z.string().trim().max(500).optional(),
      budget: z.string().trim().max(500).optional(),
      priorities: z.array(z.string().trim().min(1).max(100)).max(10).optional(),
    })
    .optional(),
});

export type ValidatedMoveFitRequest = z.infer<
  typeof moveFitRequestSchema
>;