import { callLLM } from "./client.js";
import {
  objectiveFiltersSchema,
  fitRubricSchema,
  refinementChangeSchema,
} from "../schemas/search.js";
import { REFINEMENT_PROMPT } from "../prompts/refinement.js";

export type RefinementLLMResult = {
  filters: ReturnType<typeof objectiveFiltersSchema.parse>;
  rubric: ReturnType<typeof fitRubricSchema.parse>;
  changes: ReturnType<typeof refinementChangeSchema.parse>[];
};

export async function refineSearch(
  filters: ReturnType<typeof objectiveFiltersSchema.parse>,
  rubric: ReturnType<typeof fitRubricSchema.parse>,
  feedback: string
): Promise<RefinementLLMResult> {
  if (!feedback || typeof feedback !== "string" || feedback.trim().length === 0) {
    throw new Error("Feedback must be a non-empty string");
  }

  const payload = JSON.stringify({ filters, rubric, feedback });
  const fullPrompt = `${REFINEMENT_PROMPT}\n\nCurrent state:\n${payload}`;

  const result = await callLLM(fullPrompt);

  if (result.error || !result.text) {
    throw new Error(result.error ?? "LLM returned no text response");
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(result.text);
  } catch {
    throw new Error("Refinement response was not valid JSON");
  }

  if (typeof parsed !== "object" || parsed === null) {
    throw new Error("Refinement response was not a JSON object");
  }

  const obj = parsed as { filters?: unknown; rubric?: unknown; changes?: unknown };

  return {
    filters: objectiveFiltersSchema.parse(obj.filters),
    rubric: fitRubricSchema.parse(obj.rubric),
    changes: Array.isArray(obj.changes)
      ? obj.changes.map((c) => refinementChangeSchema.parse(c))
      : [],
  };
}