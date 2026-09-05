import { z } from "zod";

export const pastCompanySchema = z.object({
  company: z.string(),
  company_type: z.string(),
  title: z.string(),
  years: z.number(),
});

export type PastCompany = z.infer<typeof pastCompanySchema>;

export const profileSchema = z.object({
  id: z.string(),
  name: z.string(),
  current_title: z.string(),
  years_experience: z.number(),
  location: z.string(),
  current_company: z.string(),
  current_company_type: z.string(),
  skills: z.array(z.string()),
  past_companies: z.array(pastCompanySchema),
  education: z.string(),
  summary: z.string(),
});

export type CandidateProfile = z.infer<typeof profileSchema>;