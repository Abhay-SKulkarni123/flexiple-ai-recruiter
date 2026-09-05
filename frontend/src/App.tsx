import { useState } from "react";
import { SearchPanel } from "./components/SearchPanel";
import { LoadingState } from "./components/LoadingState";
import { ErrorBanner } from "./components/ErrorBanner";
import { FiltersPanel } from "./components/FiltersPanel";
import { RubricPanel } from "./components/RubricPanel";
import { CandidateList } from "./components/CandidateList";
import { RefinementPanel } from "./components/RefinementPanel";
import { FreezeButton } from "./components/FreezeButton";
import type {
  SearchResponse,
  RefinementResponse,
  Feedback,
  RefinementChange,
} from "./types";

type Phase =
  | { kind: "idle" }
  | { kind: "loading"; query: string }
  | {
      kind: "results";
      data: SearchResponse;
      changes: RefinementChange[] | null;
      isRefining: boolean;
    }
  | { kind: "error"; message: string; query: string };

const SessionBadge = ({
  phase,
  frozen,
}: {
  phase: Phase;
  frozen: boolean;
}) => {
  if (frozen) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-300">
        <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
        Session frozen
      </span>
    );
  }
  if (
    phase.kind === "loading" ||
    (phase.kind === "results" && phase.isRefining)
  ) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-300">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-indigo-400" />
        Processing
      </span>
    );
  }
  if (phase.kind === "results") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-300">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
        {phase.data.rankedCandidates.length} ranked
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-700/60 bg-slate-800/50 px-3 py-1 text-xs font-medium text-slate-400">
      <span className="h-1.5 w-1.5 rounded-full bg-slate-600" />
      Ready
    </span>
  );
};

export default function App() {
  const [query, setQuery] = useState("");
  const [phase, setPhase] = useState<Phase>({ kind: "idle" });
  const [feedback, setFeedback] = useState<Record<string, Feedback>>({});
  const [frozen, setFrozen] = useState(false);

  const runSearch = async (q: string) => {
    setPhase({ kind: "loading", query: q });
    setFeedback({});
    setFrozen(false);
    try {
      const res = await fetch("/api/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: q }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({
          error: `Request failed (${res.status})`,
        }));
        throw new Error(err.error || `Request failed (${res.status})`);
      }
      const data: SearchResponse = await res.json();
      setPhase({
        kind: "results",
        data,
        changes: null,
        isRefining: false,
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Search failed";
      setPhase({ kind: "error", message, query: q });
    }
  };

  const runRefine = async (text: string) => {
    if (phase.kind !== "results") return;
    setPhase({ ...phase, isRefining: true });
    setFrozen(false);
    try {
      const res = await fetch("/api/refine", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          filters: phase.data.filters,
          rubric: phase.data.rubric,
          feedback: text,
        }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({
          error: `Request failed (${res.status})`,
        }));
        throw new Error(err.error || `Request failed (${res.status})`);
      }
      const data: RefinementResponse = await res.json();
      setFeedback({});
      setPhase({
        kind: "results",
        data,
        changes: data.changes,
        isRefining: false,
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Refinement failed";
      setPhase({ kind: "error", message, query: phase.data.rubric.summary });
    }
  };

  const startNew = () => {
    setQuery("");
    setPhase({ kind: "idle" });
    setFeedback({});
    setFrozen(false);
  };

  const recordFeedback = (id: string, fb: Feedback) => {
    setFeedback((prev) => ({ ...prev, [id]: fb }));
  };

  return (
    <div className="min-h-screen bg-[#080c14]">
      {/* ── Page header ─────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 border-b border-slate-800/60 bg-[#080c14]/95 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <div className="flex items-center gap-3">
            {/* Logo mark */}
            <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-700 shadow-lg shadow-indigo-900/60">
              <svg
                className="h-4.5 w-4.5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
              <div className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full border-2 border-[#080c14] bg-emerald-400" />
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-indigo-400">
                Flexiple
              </p>
              <p className="text-sm font-bold leading-none text-slate-200">
                AI Recruiter
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <SessionBadge phase={phase} frozen={frozen} />
            {phase.kind === "results" && (
              <button
                className="rounded-xl border border-slate-700/60 bg-slate-800/50 px-4 py-2 text-xs font-semibold text-slate-300 shadow transition-all hover:border-indigo-500/50 hover:bg-slate-800 hover:text-indigo-300 disabled:opacity-50"
                onClick={startNew}
                disabled={frozen}
              >
                New Search
              </button>
            )}
          </div>
        </div>
      </header>

      {/* ── Main content ─────────────────────────────────────────── */}
      <main className="px-4 py-8 sm:px-6 sm:py-10">
        <div className="mx-auto max-w-6xl space-y-8">
          {/* Search / idle */}
          {phase.kind === "idle" && (
            <SearchPanel
              query={query}
              onChange={setQuery}
              onSearch={runSearch}
              disabled={false}
            />
          )}

          {/* Loading */}
          {phase.kind === "loading" && (
            <div className="space-y-8">
              <SearchPanel
                query={phase.query}
                onChange={() => {}}
                onSearch={() => {}}
                disabled
              />
              <LoadingState
                message="Interpreting your brief"
                subtitle="Building objective filters, generating a subjective fit rubric, filtering candidates, and scoring with AI..."
              />
            </div>
          )}

          {/* Error */}
          {phase.kind === "error" && (
            <div className="space-y-6">
              <SearchPanel
                query={phase.query}
                onChange={setQuery}
                onSearch={runSearch}
                disabled={false}
              />
              <ErrorBanner
                message={phase.message}
                onRetry={() => runSearch(phase.query)}
              />
            </div>
          )}

          {/* Results */}
          {phase.kind === "results" && (
            <div className="space-y-8">
              <FreezeButton
                isFrozen={frozen}
                onFreeze={() => setFrozen(true)}
                disabled={phase.isRefining}
              />

              {frozen && (
                <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-5">
                  <p className="font-semibold text-amber-200">
                    This search is frozen and final.
                  </p>
                  <p className="mt-1 text-sm text-amber-400/70">
                    Click{" "}
                    <span className="font-semibold text-amber-300">
                      New Search
                    </span>{" "}
                    in the top right to run a fresh search.
                  </p>
                </div>
              )}

              {/* Filters + Rubric */}
              <div className="grid gap-6 lg:grid-cols-2">
                <FiltersPanel
                  filters={phase.data.filters}
                  disabled={frozen}
                />
                <RubricPanel rubric={phase.data.rubric} disabled={frozen} />
              </div>

              {/* Candidates */}
              <CandidateList
                candidates={phase.data.rankedCandidates}
                feedback={feedback}
                onFeedback={recordFeedback}
                disabled={frozen}
              />

              {/* Refining */}
              {phase.isRefining && (
                <LoadingState
                  message="Refining search"
                  subtitle="Updating filters, adjusting rubric, and re-scoring all candidates..."
                />
              )}

              {/* Refinement */}
              {!frozen && (
                <RefinementPanel
                  onRefine={runRefine}
                  changes={phase.changes ?? undefined}
                  isRefining={phase.isRefining}
                  disabled={frozen}
                />
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
