# Deterministic filtering

`filterProfiles(profiles, filters)` applies objective filters from the LLM interpretation against the local profiles dataset. Rules:

- **experience**: inclusive min/max bounds on `years_experience`
- **locations**: case-insensitive exact match on `location`
- **skills**: case-insensitive exact match; candidate must have ALL requested skills
- **companyTypes**: matches `current_company_type` OR any `past_companies[].company_type`

No LLM is used for filtering. All logic is pure and synchronous.
