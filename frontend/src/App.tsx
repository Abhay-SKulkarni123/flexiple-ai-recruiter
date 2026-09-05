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
  | { kind: "results"; data: SearchResponse; changes: RefinementChange[] | null; isRefining: boolean }
  | { kind: "error"; message: string; query: string };

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
        const err = await res.json().catch(() => ({ error: `Request failed (${res.status})` }));
        throw new Error(err.error || `Request failed (${res.status})`);
      }
      const data: SearchResponse = await res.json();
      setPhase({ kind: "results", data, changes: null, isRefining: false });
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
        const err = await res.json().catch(() => ({ error: `Request failed (${res.status})` }));
        throw new Error(err.error || `Request failed (${res.status})`);
      }
      const data: RefinementResponse = await res.json();
      setFeedback({});
      setPhase({ kind: "results", data, changes: data.changes, isRefining: false });
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
    <main className="min-h-screen bg-slate-950 px-4 py-8 text-slate-100 sm:px-6 sm:py-12">
      <div className="mx-auto max-w-5xl">
        <header className="mb-10 flex items-end justify-between gap-4">
          <div>
            <p className="mb-1 text-xs font-semibold uppercase tracking-[0.25em] text-cyan-300">
              Flexiple Sourcing
            </p>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Sourcing Refinement Loop
            </h1>
          </div>
          {phase.kind === "results" && (
            <button
              className="shrink-0 rounded-lg border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-300 transition-colors hover:border-cyan-500 hover:text-cyan-300 disabled:opacity-50"
              onClick={startNew}
              disabled={frozen}
            >
              New Search
            </button>
          )}
        </header>

        {phase.kind === "idle" && (
          <SearchPanel
            query={query}
            onChange={setQuery}
            onSearch={runSearch}
            disabled={false}
          />
        )}

        {phase.kind === "loading" && (
          <>
            <SearchPanel
              query={phase.query}
              onChange={() => {}}
              onSearch={() => {}}
              disabled
            />
            <div className="mt-8">
              <LoadingState message="Interpreting query, filtering candidates, and scoring with the LLM..." />
            </div>
          </>
        )}

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

        {phase.kind === "results" && (
          <div className="space-y-6">
            <FreezeButton
              isFrozen={frozen}
              onFreeze={() => setFrozen(true)}
              disabled={phase.isRefining}
            />
            {frozen && (
              <div className="rounded-xl border border-amber-500/40 bg-amber-500/10 px-5 py-3">
                <p className="text-sm font-semibold text-amber-300">
                  This is your final, frozen sourcing result.
                </p>
                <p className="mt-1 text-xs text-amber-400/80">
                  To run another search, click "New Search" at the top.
                </p>
              </div>
            )}
            <div className="grid gap-6 lg:grid-cols-2">
              <FiltersPanel filters={phase.data.filters} disabled={frozen} />
              <RubricPanel rubric={phase.data.rubric} disabled={frozen} />
            </div>

            <CandidateList
              candidates={phase.data.rankedCandidates}
              feedback={feedback}
              onFeedback={recordFeedback}
              disabled={frozen}
            />

            {phase.isRefining && (
              <LoadingState message="Refining filters and re-scoring candidates..." />
            )}

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
  );
}