import type { CandidateScore, Feedback } from "../types";

type CandidateCardProps = {
  candidate: CandidateScore;
  rank: number;
  feedback?: Feedback;
  onFeedback?: (id: string, fb: Feedback) => void;
  disabled?: boolean;
};

const scoreColor = (score: number) => {
  if (score >= 80) return "text-emerald-400";
  if (score >= 60) return "text-amber-400";
  return "text-rose-400";
};

export function CandidateCard({
  candidate,
  rank,
  feedback,
  onFeedback,
  disabled,
}: CandidateCardProps) {
  const { profile, score, explanation } = candidate;

  return (
    <article className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
      <div className="mb-3 flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
            #{rank}
          </p>
          <h4 className="mt-0.5 text-xl font-bold text-slate-100">{profile.name}</h4>
          <p className="mt-0.5 text-sm text-slate-400">{profile.current_title}</p>
        </div>
        <div className="flex flex-col items-end gap-1">
          <span
            className={`text-3xl font-black tabular-nums ${scoreColor(score)}`}
          >
            {score.toFixed(0)}
          </span>
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
            Fit Score
          </span>
        </div>
      </div>

      <div className="mb-3 grid grid-cols-2 gap-x-6 gap-y-1.5 text-xs text-slate-400">
        <p>
          <span className="font-semibold text-slate-300">{profile.years_experience}y</span>{" "}
          experience
        </p>
        <p>
          <span className="font-semibold text-slate-300">{profile.location}</span>
        </p>
        <p>
          <span className="font-semibold text-slate-300">{profile.current_company}</span>
        </p>
        <p>
          <span className="rounded bg-slate-800 px-1.5 py-0.5 font-medium text-slate-300">
            {profile.current_company_type}
          </span>
        </p>
      </div>

      {profile.skills.length > 0 && (
        <div className="mb-3 flex flex-wrap gap-1.5">
          {profile.skills.map((skill, i) => (
            <span
              key={i}
              className="rounded-md border border-slate-700 bg-slate-800 px-2 py-0.5 text-xs text-slate-300"
            >
              {skill}
            </span>
          ))}
        </div>
      )}

      <div className="mb-4 rounded-lg border border-cyan-900/40 bg-cyan-950/30 px-4 py-3">
        <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-cyan-400">
          Why this candidate
        </p>
        <p className="text-sm leading-relaxed text-slate-300">{explanation}</p>
      </div>

      {onFeedback && (
        <div className="flex gap-3">
          <button
            className={`flex-1 rounded-lg border py-2 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${
              feedback === "yes"
                ? "border-emerald-500 bg-emerald-950 text-emerald-300"
                : "border-slate-700 text-slate-400 hover:border-emerald-500 hover:text-emerald-300"
            }`}
            onClick={() => onFeedback(profile.id, "yes")}
            disabled={disabled || !!feedback}
          >
            Yes
          </button>
          <button
            className={`flex-1 rounded-lg border py-2 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${
              feedback === "no"
                ? "border-rose-500 bg-rose-950 text-rose-300"
                : "border-slate-700 text-slate-400 hover:border-rose-500 hover:text-rose-300"
            }`}
            onClick={() => onFeedback(profile.id, "no")}
            disabled={disabled || !!feedback}
          >
            No
          </button>
        </div>
      )}
    </article>
  );
}
