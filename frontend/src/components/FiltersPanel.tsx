import type { ObjectiveFilters } from "../types";

type FiltersPanelProps = {
  filters: ObjectiveFilters;
  disabled: boolean;
};

const formatExp = (
  exp: ObjectiveFilters["experience"]
): { label: string } => {
  if (!exp) return { label: "Any experience" };
  const { min, max } = exp;
  if (min === null && max === null) return { label: "Any experience" };
  if (min !== null && max !== null) return { label: `${min} – ${max} years` };
  if (min !== null) return { label: `${min}+ years` };
  return { label: `Up to ${max} years` };
};

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.15em] text-slate-500">
    {children}
  </p>
);

export function FiltersPanel({ filters, disabled }: FiltersPanelProps) {
  const exp = formatExp(filters.experience);

  return (
    <div className={`relative overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-900/50 p-6 backdrop-blur-sm ${disabled ? "opacity-60" : ""}`}>
      <div className="mb-5 flex items-start justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-indigo-400">
            Hard requirements
          </p>
          <h3 className="mt-1 text-xl font-bold text-slate-50">
            Objective Filters
          </h3>
        </div>
        {disabled && (
          <span className="inline-flex items-center gap-1 rounded-full bg-amber-400/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-amber-400 ring-1 ring-amber-400/30">
            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            Locked
          </span>
        )}
      </div>

      <div className="space-y-5">
        {/* Skills */}
        <div>
          <SectionLabel>Required Skills</SectionLabel>
          {filters.skills.length === 0 ? (
            <p className="text-sm italic text-slate-600">No skill filters applied</p>
          ) : (
            <ul className="flex flex-wrap gap-1.5">
              {filters.skills.map((s, i) => (
                <li
                  key={i}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-indigo-500/30 bg-indigo-500/10 px-3 py-1.5 text-xs font-medium text-indigo-200"
                >
                  <svg className="h-3 w-3 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  {s}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Experience */}
        <div>
          <SectionLabel>Years of Experience</SectionLabel>
          <div className="inline-flex items-center gap-2 rounded-lg border border-slate-700/60 bg-slate-800/50 px-3 py-1.5 text-sm font-semibold text-slate-200">
            <svg className="h-4 w-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {exp.label}
          </div>
        </div>

        {/* Locations */}
        <div>
          <SectionLabel>Locations</SectionLabel>
          {filters.locations.length === 0 ? (
            <p className="text-sm italic text-slate-600">Any location accepted</p>
          ) : (
            <ul className="flex flex-wrap gap-1.5">
              {filters.locations.map((l, i) => (
                <li
                  key={i}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700/60 bg-slate-800/50 px-3 py-1.5 text-xs font-medium text-slate-300"
                >
                  <svg className="h-3 w-3 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  </svg>
                  {l}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Company Types */}
        <div>
          <SectionLabel>Company Types</SectionLabel>
          {filters.companyTypes.length === 0 ? (
            <p className="text-sm italic text-slate-600">Any company type accepted</p>
          ) : (
            <ul className="flex flex-wrap gap-1.5">
              {filters.companyTypes.map((t, i) => (
                <li
                  key={i}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700/60 bg-slate-800/50 px-3 py-1.5 text-xs font-medium text-slate-300"
                >
                  <svg className="h-3 w-3 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  {t}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Score Threshold */}
        {filters.minScore !== null && (
          <div>
            <SectionLabel>Score Threshold</SectionLabel>
            <div className="inline-flex items-center gap-2 rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-1.5 text-sm font-semibold text-amber-300">
              <svg className="h-4 w-4 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 4h18M5 4l1 16h12l1-16M9 9h6m-6 4h6" />
              </svg>
              Score ≥ {filters.minScore}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
