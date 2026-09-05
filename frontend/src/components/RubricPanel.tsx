import type { FitRubric } from "../types";

type RubricPanelProps = {
  rubric: FitRubric;
  disabled: boolean;
};

export function RubricPanel({ rubric, disabled }: RubricPanelProps) {
  return (
    <section
      className={`rounded-2xl border border-slate-800 bg-slate-900 p-6 ${
        disabled ? "opacity-70" : ""
      }`}
    >
      <header className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300">
          Subjective Fit Rubric
        </h3>
        {disabled && (
          <span className="rounded-full bg-amber-400/15 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-amber-300">
            Locked
          </span>
        )}
      </header>
      <p className="mb-5 text-sm leading-relaxed text-slate-300">
        {rubric.summary || "No summary provided."}
      </p>
      {rubric.criteria.length === 0 ? (
        <p className="text-sm text-slate-500">No criteria defined.</p>
      ) : (
        <ul className="space-y-3">
          {rubric.criteria.map((c, i) => (
            <li key={i} className="rounded-lg border border-slate-800 bg-slate-950/50 p-3">
              <div className="mb-1 flex items-baseline justify-between gap-3">
                <p className="font-semibold text-slate-100">{c.name}</p>
                <span className="text-xs font-mono text-cyan-300">
                  {c.weight.toFixed(0)}%
                </span>
              </div>
              <p className="text-sm leading-relaxed text-slate-400">
                {c.description}
              </p>
              <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-slate-800">
                <div
                  className="h-full bg-gradient-to-r from-cyan-500 to-cyan-400"
                  style={{ width: `${Math.min(100, c.weight)}%` }}
                />
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
