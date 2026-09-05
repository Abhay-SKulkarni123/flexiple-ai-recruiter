export type ObjectiveFilters = {
  skills: string[];
  experience: { min: number | null; max: number | null } | null;
  locations: string[];
  companyTypes: string[];
};

export type FitCriterion = {
  name: string;
  description: string;
  weight: number;
};

export type FitRubric = {
  summary: string;
  criteria: FitCriterion[];
};

export type CandidateProfile = {
  id: string;
  name: string;
  current_title: string;
  years_experience: number;
  location: string;
  current_company: string;
  current_company_type: string;
  skills: string[];
  past_companies: { company: string; company_type: string; title: string; years: number }[];
  education: string;
  summary: string;
};

export type CandidateScore = {
  profile: CandidateProfile;
  score: number;
  explanation: string;
};

export type RefinementChange = {
  field: string;
  before: unknown;
  after: unknown;
  reason: string;
};

export type SearchResponse = {
  filters: ObjectiveFilters;
  rubric: FitRubric;
  matches: CandidateProfile[];
  rankedCandidates: CandidateScore[];
};

export type RefinementResponse = {
  filters: ObjectiveFilters;
  rubric: FitRubric;
  changes: RefinementChange[];
  matches: CandidateProfile[];
  rankedCandidates: CandidateScore[];
};

export type Feedback = "yes" | "no";

export type AppState =
  | { phase: "idle" }
  | { phase: "loading"; query: string }
  | { phase: "results"; data: SearchResponse }
  | { phase: "refining"; data: SearchResponse; feedbackText: string }
  | { phase: "error"; message: string; query: string }
  | { phase: "frozen"; data: SearchResponse };