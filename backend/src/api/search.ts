import { Router } from "express";
import { z } from "zod";
import { interpretSearch } from "../llm/searchService.js";
import { candidates } from "../data/profiles.js";
import { filterProfiles } from "../filtering/filterProfiles.js";

export const searchRouter = Router();

const searchRequestSchema = z.object({
  query: z.string().min(1),
});

searchRouter.post("/", async (request, response) => {
  const parsedRequest = searchRequestSchema.safeParse(request.body);

  if (!parsedRequest.success) {
    response.status(400).json({ error: "Query is required" });
    return;
  }

  try {
    const interpretation = await interpretSearch(parsedRequest.data.query);
    const matches = filterProfiles(candidates, interpretation.filters);
    response.json({ ...interpretation, matches });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Search interpretation failed";
    response.status(502).json({ error: message });
  }
});