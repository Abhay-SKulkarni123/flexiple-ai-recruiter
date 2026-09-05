import { Router } from "express";
import { refinementRequestSchema } from "../schemas/search.js";
import { refineSearch } from "../llm/refinementService.js";
import { scoreAndRankCandidates } from "../llm/scoringService.js";
import { candidates } from "../data/profiles.js";
import { filterProfiles } from "../filtering/filterProfiles.js";

export const refineRouter = Router();

const TOP_N = 5;

refineRouter.post("/", async (request, response) => {
  const parsedRequest = refinementRequestSchema.safeParse(request.body);

  if (!parsedRequest.success) {
    response.status(400).json({ error: "filters, rubric, and feedback are required" });
    return;
  }

  try {
    const refined = await refineSearch(
      parsedRequest.data.filters,
      parsedRequest.data.rubric,
      parsedRequest.data.feedback
    );
    const matches = filterProfiles(candidates, refined.filters);
    const ranked = await scoreAndRankCandidates(matches, refined.rubric);
    const minScore = refined.filters.minScore ?? null;
    const thresholded =
      minScore !== null ? ranked.filter((c) => c.score >= minScore) : ranked;
    const rankedCandidates = thresholded.slice(0, TOP_N);
    response.json({
      filters: refined.filters,
      rubric: refined.rubric,
      changes: refined.changes,
      matches,
      rankedCandidates,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Refinement failed";
    response.status(502).json({ error: message });
  }
});
