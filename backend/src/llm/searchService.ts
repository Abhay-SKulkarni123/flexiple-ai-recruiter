import { callLLM } from "./client.js";
import { searchInterpretationSchema } from "../schemas/search.js";
import { SEARCH_INTERPRETATION_PROMPT } from "../prompts/searchInterpretation.js";

export async function interpretSearch(query: string) {
  if (!query || typeof query !== "string" || query.trim().length === 0) {
    throw new Error("Query must be a non-empty string");
  }

  const fullPrompt = `${SEARCH_INTERPRETATION_PROMPT}\n\nRecruiter query: ${query}`;
  const result = await callLLM(fullPrompt);

  if (result.error || !result.text) {
    throw new Error(result.error ?? "LLM returned no text response");
  }

  let parsed;
  try {
    parsed = JSON.parse(result.text);
  } catch {
    throw new Error("LLM response was not valid JSON");
  }

  return searchInterpretationSchema.parse(parsed);
}