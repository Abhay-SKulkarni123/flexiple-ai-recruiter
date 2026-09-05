# Flexiple Sourcing Refinement Loop

Minimal full-stack TypeScript foundation for the engineering challenge.

## Run locally

```bash
npm install
npm run dev
```

The frontend runs at `http://localhost:5173` and proxies `/api` requests to the Express server at `http://localhost:3001`.

## Structure

- `frontend/`: React, Vite, and Tailwind UI
- `backend/src/api/`: Express route handlers
- `backend/src/schemas/`: Zod request and response schemas
- `backend/src/llm/`: reserved for the future server-side LLM integration
- `backend/src/filtering/`: reserved for deterministic local filtering
- `backend/src/prompts/`: reserved for prompt templates
- `backend/data/`: supplied candidate dataset location

The sourcing workflow is intentionally not implemented in this foundation stage. No LLM calls, filtering, scoring, refinement, freeze, authentication, database, or persistence are included.

## Verify

```bash
npm run check
npm run build
```

`backend/data/profiles.json` is currently an empty placeholder because no supplied dataset was present in the starting directory.
