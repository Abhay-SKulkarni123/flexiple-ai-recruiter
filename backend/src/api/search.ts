import { Router } from "express";
import { z } from "zod";
import { interpretSearch } from "../llm/searchService.js";
import { scoreAndRankCandidates } from "../llm/scoringService.js";
import { candidates } from "../data/profiles.js";
import { filterProfiles } from "../filtering/filterProfiles.js";

export const searchRouter = Router();

const searchRequestSchema = z.object({
  query: z.string().min(1),
});

const TOP_N = 5;

searchRouter.post("/", async (request, response) => {
  const parsedRequest = searchRequestSchema.safeParse(request.body);

  if (!parsedRequest.success) {
    response.status(400).json({ error: "Query is required" });
    return;
  }

  try {
    const interpretation = await interpretSearch(parsedRequest.data.query);
    const matches = filterProfiles(candidates, interpretation.filters);
    const ranked = await scoreAndRankCandidates(matches, interpretation.rubric);
    const rankedCandidates = ranked.slice(0, TOP_N);
    response.json({ ...interpretation, matches, rankedCandidates });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Search failed";
    response.status(502).json({ error: message });
  }
});
