import { callLLM } from "./client.js";
import { candidateScoreSchema } from "../schemas/search.js";
import { SCORING_PROMPT } from "../prompts/scoring.js";
import type { CandidateProfile } from "../schemas/profile.js";
import type { FitRubric } from "../schemas/search.js";
import type { CandidateScore } from "../schemas/search.js";

export async function scoreAndRankCandidates(
  profiles: CandidateProfile[],
  rubric: FitRubric
): Promise<CandidateScore[]> {
  const rubricJson = JSON.stringify(rubric);
  const profilesJson = JSON.stringify(profiles);
  const fullPrompt = `${SCORING_PROMPT}\n\nRubric:\n${rubricJson}\n\nProfiles:\n${profilesJson}`;

  const result = await callLLM(fullPrompt);

  if (result.error || !result.text) {
    throw new Error(result.error ?? "LLM returned no text response");
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(result.text);
  } catch {
    throw new Error("Scoring response was not valid JSON");
  }

  if (
    typeof parsed !== "object" ||
    parsed === null ||
    !("rankedCandidates" in parsed)
  ) {
    throw new Error("Scoring response missing 'rankedCandidates' key");
  }

  const ranked = parsed as { rankedCandidates: unknown[] };

  if (!Array.isArray(ranked.rankedCandidates)) {
    throw new Error("Scoring response 'rankedCandidates' is not an array");
  }

  const scores: CandidateScore[] = [];

  for (const item of ranked.rankedCandidates) {
    scores.push(candidateScoreSchema.parse(item));
  }

  return scores.sort((a, b) => b.score - a.score);
}