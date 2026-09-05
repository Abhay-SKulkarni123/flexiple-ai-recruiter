import { z } from "zod";
import { profileSchema } from "./profile.js";

export const objectiveFiltersSchema = z.object({
  skills: z.array(z.string()).default([]),
  experience: z
    .object({
      min: z.number().nullable().default(null),
      max: z.number().nullable().default(null),
    })
    .nullable()
    .default(null),
  locations: z.array(z.string()).default([]),
  companyTypes: z.array(z.string()).default([]),
});

export type ObjectiveFilters = z.infer<typeof objectiveFiltersSchema>;

export const fitCriterionSchema = z.object({
  name: z.string(),
  description: z.string(),
  weight: z.number().min(0).max(100),
});

export const fitRubricSchema = z.object({
  summary: z.string(),
  criteria: z.array(fitCriterionSchema).default([]),
});

export type FitRubric = z.infer<typeof fitRubricSchema>;

export const searchInterpretationSchema = z.object({
  filters: objectiveFiltersSchema,
  rubric: fitRubricSchema,
});

export type SearchInterpretation = z.infer<typeof searchInterpretationSchema>;

export const searchResponseSchema = searchInterpretationSchema.extend({
  matches: z.array(profileSchema),
});

export type SearchResponse = z.infer<typeof searchResponseSchema>;