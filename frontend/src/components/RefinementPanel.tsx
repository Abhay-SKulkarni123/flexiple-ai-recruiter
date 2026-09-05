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
      <form
        onSubmit={handleSubmit}
        className={`rounded-2xl border border-slate-800 bg-slate-900 p-6 ${
          disabled ? "opacity-70" : ""
        }`}
      >
        <h3 className="mb-1 text-sm font-bold uppercase tracking-wider text-slate-300">
          Refine Search
        </h3>
        <p className="mb-4 text-sm text-slate-400">
          Tell the AI what to change. It will adjust the filters and rubric, then re-score candidates.
        </p>
        <div className="flex gap-3">
          <textarea
            className="min-h-[80px] flex-1 resize-none rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-sm text-slate-100 placeholder-slate-500 outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors disabled:opacity-50"
            placeholder='e.g. "Show me more senior candidates with more AWS experience"'
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            disabled={disabled || isRefining}
          />
        </div>
        <div className="mt-3 flex items-center justify-between gap-3">
          <p className="text-xs text-slate-600">
            Examples: adjust experience level, change required skills, broaden location, update company type preferences
          </p>
          <button
            className="shrink-0 rounded-lg bg-slate-700 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-slate-600 disabled:cursor-not-allowed disabled:opacity-50"
            type="submit"
            disabled={disabled || isRefining || !feedback.trim()}
          >
            {isRefining ? "Refining..." : "Refine"}
          </button>
        </div>
      </form>

      {changes !== undefined && changes.length > 0 && (
        <div className="rounded-2xl border border-cyan-900/40 bg-cyan-950/20 p-6">
          <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-cyan-300">
            What changed and why
          </h4>
          <ul className="space-y-3">
            {changes.map((c, i) => (
              <li key={i} className="rounded-lg border border-cyan-900/30 bg-slate-900/50 p-3">
                <div className="mb-1 flex items-baseline gap-3">
                  <code className="text-xs font-mono text-cyan-300">{c.field}</code>
                  <span className="text-xs text-slate-500">
                    {JSON.stringify(c.before) ?? "null"} → {JSON.stringify(c.after)}
                  </span>
                </div>
                <p className="text-sm text-slate-300">{c.reason}</p>
              </li>
            ))}
          </ul>
        </div>
      )}

      {changes !== undefined && changes.length === 0 && (
        <div className="rounded-xl border border-slate-800 bg-slate-900 px-5 py-3">
          <p className="text-sm text-slate-400">
            No changes were made — the current filters and rubric already match your feedback.
          </p>
        </div>
      )}
    </section>
  );
}
