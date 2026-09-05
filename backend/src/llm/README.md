# LLM integration

Server-side Gemini client using the official `@google/genai` SDK.

- `client.ts` — exports `callLLM(prompt: string): Promise<LLMResponse>`
- Reads `GEMINI_API_KEY` from the environment
- Uses model `gemini-2.5-flash-lite`
- Missing key throws at startup; API failures return an error object instead of crashing Express
