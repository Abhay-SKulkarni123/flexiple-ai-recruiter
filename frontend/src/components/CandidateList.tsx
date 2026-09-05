import type { CandidateScore, Feedback } from "../types";
import { CandidateCard } from "./CandidateCard";

type CandidateListProps = {
  candidates: CandidateScore[];
  feedback: Record<string, Feedback>;
  onFeedback?: (id: string, fb: Feedback) => void;
  disabled?: boolean;
};

export function CandidateList({ candidates, feedback, onFeedback, disabled }: CandidateListProps) {
  if (candidates.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-800 bg-slate-900 px-6 py-12 text-center">
        <p className="font-semibold text-slate-300">No candidates match the filters.</p>
        <p className="mt-1 text-sm text-slate-500">
          Try broadening the filters or adjusting the rubric.
        </p>
      </div>
    );
  }

  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300">
          Top Candidates
        </h3>
        <span className="rounded-full bg-slate-800 px-3 py-0.5 text-xs font-medium text-slate-400">
          {candidates.length} shown
        </span>
      </div>
      <div className="space-y-4">
        {candidates.map((c, i) => (
          <CandidateCard
            key={c.profile.id}
            candidate={c}
            rank={i + 1}
            feedback={feedback[c.profile.id]}
            onFeedback={onFeedback}
            disabled={disabled}
          />
        ))}
      </div>
    </section>
  );
}
