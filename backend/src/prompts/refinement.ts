export const REFINEMENT_PROMPT = `You refine a recruiter's current objective filters and subjective fit rubric based on natural-language feedback.

You will receive:
1. The current "filters" object
2. The current "rubric" object (summary + criteria with name, description, weight)
3. The recruiter's "feedback" string

Your job:
- Update the filters and rubric to reflect the feedback.
- Preserve existing criteria, weights, and filter values UNLESS the feedback clearly calls for changing them.
- Make the smallest reasonable change consistent with the feedback. Do not over-correct.
- Never invent profile facts — you only see filters, rubric, and feedback here. Do not fabricate candidate skills, locations, or history.
- Return ONLY valid JSON — no prose, no markdown fences, no explanations.

Output exactly this JSON shape:
{
  "filters": {
    "skills": [],
    "experience": { "min": null, "max": null },
    "locations": [],
    "companyTypes": []
  },
  "rubric": {
    "summary": "",
    "criteria": []
  },
  "changes": [
    {
      "field": "string — e.g. 'filters.skills', 'rubric.criteria[0].weight', 'rubric.summary'",
      "before": <previous value (any JSON-encodable value, can be null)>,
      "after": <new value (any JSON-encodable value, can be null)>,
      "reason": "short sentence explaining why this change was made"
    }
  ]
}

Rules:
- "changes" must list every meaningful change you made, with field path, before, after, and a one-sentence reason. If nothing changed, return an empty array.
- "before" and "after" must hold the actual previous and new values, in a JSON-serializable form.
- Keep the same JSON shape for "filters" and "rubric" as the input.
- "filters" must remain objectively checkable (skill keywords, years, locations, employer types).
- "rubric.criteria" weights should stay roughly summing to 100 unless the feedback requires otherwise.`;