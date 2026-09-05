import { GoogleGenAI } from "@google/genai";

const MODEL = "gemini-3.5-flash-lite";

export type LLMResponse = {
  text: string | null;
  error: string | null;
};

export async function callLLM(prompt: string): Promise<LLMResponse> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return { text: null, error: "GEMINI_API_KEY is not configured" };
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: MODEL,
      contents: prompt,
    });

    return { text: response.text ?? null, error: null };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "LLM request failed";
    return { text: null, error: message };
  }
}