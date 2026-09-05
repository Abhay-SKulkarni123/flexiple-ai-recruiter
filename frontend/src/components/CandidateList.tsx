import type { CandidateScore, CandidateProfile, Feedback } from "../types";
import { CandidateCard } from "./CandidateCard";
import { MatchedProfileCard } from "./MatchedProfileCard";

type CandidateListProps = {
  matches: CandidateProfile[];
  rankedCandidates: CandidateScore[];
  feedback: Record<string, Feedback>;
  onFeedback?: (id: string, fb: Feedback) => void;
  disabled?: boolean;
};

export function CandidateList({
  matches,
  rankedCandidates,
  feedback,
  onFeedback,
  disabled,
}: CandidateListProps) {
  const rankedIds = new Set(rankedCandidates.map((c) => c.profile.id));

  const ranked = matches
    .filter((p) => rankedIds.has(p.id))
    .map((p) => {
      const score = rankedCandidates.find((c) => c.profile.id === p.id)!;
      return { profile: p, score, rank: rankedCandidates.indexOf(score) + 1 };
    });

  const unranked = matches
    .filter((p) => !rankedIds.has(p.id))
    .map((p, i) => ({ profile: p, rank: ranked.length + i + 1 }));

  const matchWord = matches.length === 1 ? "match" : "matches";

  if (matches.length === 0) {
    return (
      <section>
        <div className="mb-5 flex items-center justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-indigo-400">
              Ranked results
            </p>
            <h3 className="mt-1 text-xl font-bold text-slate-50">Candidates</h3>
          </div>
        </div>
        <div className="relative overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-900/50 p-16 text-center backdrop-blur-sm">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-800/80">
            <svg
              className="h-7 w-7 text-slate-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
              />
            </svg>
          </div>
          <p className="text-base font-semibold text-slate-400">
            No candidates match your filters
          </p>
          <p className="mt-2 max-w-sm mx-auto text-sm text-slate-600">
            Try broadening your filters or adjusting the rubric to see more results.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section>
      <div className="mb-5 flex items-center justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-indigo-400">
            All matches
          </p>
          <h3 className="mt-1 text-xl font-bold text-slate-50">
            {matches.length} {matchWord}
          </h3>
        </div>
        {unranked.length > 0 && (
          <span className="rounded-full border border-slate-700/60 bg-slate-800/50 px-3 py-1 text-xs font-medium text-slate-400">
            {ranked.length} ranked · {unranked.length} unscored
          </span>
        )}
      </div>

      {/* Ranked section */}
      {ranked.length > 0 && (
        <div className="mb-3">
          <div className="mb-2 flex items-center gap-2">
            <div className="h-px flex-1 bg-gradient-to-r from-indigo-500/60 to-transparent" />
            <p className="text-[10px] font-semibold uppercase tracking-widest text-indigo-400">
              Top Ranked
            </p>
            <div className="h-px flex-1 bg-gradient-to-l from-indigo-500/60 to-transparent" />
          </div>
          <div className="space-y-3">
            {ranked.map(({ profile, score, rank }) => (
              <CandidateCard
                key={profile.id}
                candidate={score}
                rank={rank}
                feedback={feedback[profile.id]}
                onFeedback={onFeedback}
                disabled={disabled}
              />
            ))}
          </div>
        </div>
      )}

      {/* Unranked section */}
      {unranked.length > 0 && (
        <div>
          <div className="mb-2 flex items-center gap-2">
            <div className="h-px flex-1 bg-gradient-to-r from-slate-700/60 to-transparent" />
            <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-500">
              Other Matches
            </p>
            <div className="h-px flex-1 bg-gradient-to-l from-slate-700/60 to-transparent" />
          </div>
          <div className="space-y-3">
            {unranked.map(({ profile, rank }) => (
              <MatchedProfileCard
                key={profile.id}
                profile={profile}
                rank={rank}
                feedback={feedback[profile.id]}
                onFeedback={onFeedback}
                disabled={disabled}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
