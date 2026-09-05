import type { FitRubric } from "../types";

type RubricPanelProps = {
  rubric: FitRubric;
  disabled: boolean;
};

export function RubricPanel({ rubric, disabled }: RubricPanelProps) {
  return (
    <div className={`relative overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-900/50 p-6 backdrop-blur-sm ${disabled ? "opacity-60" : ""}`}>
      <div className="mb-5 flex items-start justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-violet-400">
            Soft signals
          </p>
          <h3 className="mt-1 text-xl font-bold text-slate-50">
            Subjective Fit Rubric
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

      <p className="mb-6 rounded-xl border border-slate-800/60 bg-slate-800/30 p-4 text-sm leading-relaxed text-slate-300">
        {rubric.summary || (
          <span className="italic text-slate-600">No summary provided.</span>
        )}
      </p>

      {rubric.criteria.length === 0 ? (
        <p className="text-sm italic text-slate-600">No criteria defined.</p>
      ) : (
        <ul className="space-y-3">
          {rubric.criteria.map((c, i) => (
            <li
              key={i}
              className="rounded-xl border border-slate-800/60 bg-slate-800/20 p-4 transition-colors hover:border-slate-700/80 hover:bg-slate-800/40"
            >
              <div className="mb-2 flex items-baseline justify-between gap-3">
                <p className="font-semibold text-slate-100">{c.name}</p>
                <span className="shrink-0 rounded-md bg-violet-500/15 px-2 py-0.5 text-xs font-bold tabular-nums text-violet-300 ring-1 ring-violet-500/30">
                  {c.weight.toFixed(0)}%
                </span>
              </div>
              <p className="mb-3 text-xs leading-relaxed text-slate-400">
                {c.description}
              </p>
              <div className="h-1.5 overflow-hidden rounded-full bg-slate-800">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-violet-600 via-violet-500 to-violet-400 transition-all"
                  style={{ width: `${Math.min(100, c.weight)}%` }}
                />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
