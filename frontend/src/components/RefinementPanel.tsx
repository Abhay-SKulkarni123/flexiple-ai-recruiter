import { useState } from "react";
import type { RefinementChange } from "../types";

type RefinementPanelProps = {
  onRefine: (feedback: string) => void;
  changes?: RefinementChange[];
  isRefining: boolean;
  disabled: boolean;
};

export function RefinementPanel({
  onRefine,
  changes,
  isRefining,
  disabled,
}: RefinementPanelProps) {
  const [feedback, setFeedback] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedback.trim() || disabled || isRefining) return;
    onRefine(feedback);
    setFeedback("");
  };

  return (
    <section className="space-y-4">
      {/* Refine form */}
      <form
        onSubmit={handleSubmit}
        className={`relative overflow-hidden rounded-2xl border border-slate-800/80 bg-gradient-to-br from-slate-900/60 to-slate-900/30 p-6 backdrop-blur-sm ${disabled ? "opacity-60" : ""}`}
      >
        <div className="mb-5 flex items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-700 shadow-md shadow-indigo-900/50">
            <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-indigo-400">
              Refine loop
            </p>
            <h3 className="mt-0.5 text-xl font-bold text-slate-50">
              Tell the AI what to change
            </h3>
          </div>
        </div>

        <p className="mb-4 text-sm text-slate-400">
          Describe any adjustments in plain language. The AI will update filters, re-weight the rubric, and re-rank candidates.
        </p>

        <div className="mb-4">
          <label htmlFor="refine-feedback" className="sr-only">
            Refinement feedback
          </label>
          <textarea
            id="refine-feedback"
            className="min-h-[110px] w-full resize-none rounded-xl border border-slate-700/80 bg-slate-800/60 p-4 text-sm text-slate-100 placeholder-slate-500 shadow-inner shadow-black/20 outline-none transition-all focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 disabled:cursor-not-allowed disabled:opacity-50"
            placeholder='e.g. "Prioritize AWS and Python skills", "Show me candidates with more seniority", "Open to other locations"'
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            disabled={disabled || isRefining}
          />
        </div>

        <div className="flex flex-col-reverse items-stretch justify-between gap-3 sm:flex-row sm:items-center">
          <p className="text-xs text-slate-500">
            Adjust skills, experience, locations, company types, or rubric weights
          </p>
          <button
            className="shrink-0 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-700 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-900/40 transition-all hover:shadow-xl hover:shadow-indigo-800/50 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
            type="submit"
            disabled={disabled || isRefining || !feedback.trim()}
          >
            {isRefining ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth={4} />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Refining...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                Refine Search
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            )}
          </button>
        </div>
      </form>

      {/* What changed */}
      {changes !== undefined && changes.length > 0 && (
        <div className="rounded-2xl border border-indigo-500/20 bg-indigo-500/5 p-6">
          <div className="mb-4 flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-500/20">
              <svg
                className="h-4 w-4 text-indigo-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
            <h4 className="text-sm font-bold text-indigo-200">
              What changed and why
            </h4>
            <span className="ml-auto rounded-full bg-indigo-500/20 px-2 py-0.5 text-[10px] font-bold text-indigo-300">
              {changes.length} {changes.length === 1 ? "change" : "changes"}
            </span>
          </div>
          <ul className="space-y-3">
            {changes.map((c, i) => (
              <li
                key={i}
                className="rounded-xl border border-indigo-500/15 bg-slate-900/40 p-4"
              >
                <div className="mb-2.5 flex items-center gap-2">
                  <code className="rounded-md bg-slate-800/80 px-2 py-0.5 text-[11px] font-mono font-semibold text-indigo-300">
                    {c.field}
                  </code>
                </div>
                <div className="mb-2.5 flex flex-wrap items-center gap-2 text-xs">
                  <span className="max-w-[200px] truncate rounded-md bg-rose-500/10 px-2 py-1 font-mono text-rose-300 ring-1 ring-rose-500/20">
                    {JSON.stringify(c.before) ?? "null"}
                  </span>
                  <svg className="h-3 w-3 shrink-0 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                  <span className="max-w-[200px] truncate rounded-md bg-emerald-500/10 px-2 py-1 font-mono text-emerald-300 ring-1 ring-emerald-500/20">
                    {JSON.stringify(c.after) ?? "null"}
                  </span>
                </div>
                <p className="text-sm leading-relaxed text-slate-300">{c.reason}</p>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* No changes */}
      {changes !== undefined && changes.length === 0 && (
        <div className="rounded-xl border border-slate-800/60 bg-slate-900/40 p-5">
          <div className="flex items-center gap-2.5">
            <svg className="h-4 w-4 shrink-0 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-sm text-slate-400">
              No changes were made — the current filters and rubric already match your feedback.
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
