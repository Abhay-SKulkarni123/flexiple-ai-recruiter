import type { CandidateScore, Feedback } from "../types";

type CandidateCardProps = {
  candidate: CandidateScore;
  rank: number;
  feedback?: Feedback;
  onFeedback?: (id: string, fb: Feedback) => void;
  disabled?: boolean;
};

const scoreColor = (score: number) => {
  if (score >= 80) return "from-emerald-500 to-emerald-400";
  if (score >= 60) return "from-amber-500 to-amber-400";
  return "from-rose-500 to-rose-400";
};

const scoreTextColor = (score: number) => {
  if (score >= 80) return "text-emerald-300";
  if (score >= 60) return "text-amber-300";
  return "text-rose-300";
};

const scoreLabel = (score: number) => {
  if (score >= 80) return "Excellent fit";
  if (score >= 60) return "Good fit";
  return "Possible fit";
};

const titleCase = (s: string) =>
  s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();

const companyTypeColor = (t: string) => {
  const lower = t.toLowerCase();
  if (lower === "startup") return "bg-orange-500/10 text-orange-300 border-orange-500/30";
  if (lower === "scaleup") return "bg-blue-500/10 text-blue-300 border-blue-500/30";
  if (lower === "faang" || lower === "big tech" || lower === "bigtech")
    return "bg-purple-500/10 text-purple-300 border-purple-500/30";
  if (lower === "agency") return "bg-teal-500/10 text-teal-300 border-teal-500/30";
  if (lower === "product") return "bg-pink-500/10 text-pink-300 border-pink-500/30";
  return "bg-slate-700/50 text-slate-300 border-slate-600/50";
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
    <article className="group relative overflow-hidden rounded-2xl border border-slate-800/80 bg-gradient-to-br from-slate-900/80 to-slate-900/40 p-6 shadow-lg shadow-black/20 transition-all hover:border-slate-700/80 hover:shadow-xl hover:shadow-black/30">
      {/* Top accent line based on score */}
      <div className={`absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r ${scoreColor(score)} opacity-60`} />

      <div className="flex gap-6">
        {/* Left: Candidate info */}
        <div className="min-w-0 flex-1">
          <div className="mb-1 flex items-center gap-2.5">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-indigo-500/20 text-[11px] font-bold text-indigo-300 ring-1 ring-indigo-500/30">
              {rank}
            </span>
            <h4 className="truncate text-lg font-bold text-slate-50">
              {profile.name}
            </h4>
          </div>
          <p className="ml-9 truncate text-sm font-medium text-slate-400">
            {profile.current_title}
          </p>

          {/* Metadata row */}
          <dl className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs text-slate-400">
            <div className="flex items-center gap-1.5">
              <svg className="h-3.5 w-3.5 shrink-0 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <dd>
                <span className="font-semibold text-slate-200">{profile.years_experience}y</span>{" "}
                <span className="text-slate-500">experience</span>
              </dd>
            </div>
            <div className="flex items-center gap-1.5">
              <svg className="h-3.5 w-3.5 shrink-0 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <dd>
                <span className="font-semibold text-slate-200">{profile.location}</span>
              </dd>
            </div>
            <div className="flex items-center gap-1.5">
              <svg className="h-3.5 w-3.5 shrink-0 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              <dd className="font-semibold text-slate-200">{profile.current_company}</dd>
            </div>
            <div className="flex items-center">
              <span
                className={`inline-block rounded-md border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${companyTypeColor(profile.current_company_type)}`}
              >
                {titleCase(profile.current_company_type)}
              </span>
            </div>
          </dl>

          {/* Skills */}
          {profile.skills.length > 0 && (
            <div className="mt-4">
              <ul className="flex flex-wrap gap-1.5">
                {profile.skills.map((skill, i) => (
                  <li
                    key={i}
                    className="rounded-md border border-slate-700/60 bg-slate-800/60 px-2.5 py-1 text-xs font-medium text-slate-300"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Why this candidate */}
          <div className="mt-4 rounded-xl border border-indigo-500/20 bg-indigo-500/5 p-4">
            <div className="mb-1.5 flex items-center gap-1.5">
              <svg className="h-3.5 w-3.5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-indigo-400">
                Why this candidate
              </p>
            </div>
            <p className="text-sm leading-relaxed text-slate-300">{explanation}</p>
          </div>

          {/* Feedback buttons */}
          {onFeedback && (
            <div className="mt-4 flex gap-2">
              <button
                className={`flex flex-1 items-center justify-center gap-2 rounded-xl border py-2.5 text-sm font-semibold transition-all disabled:cursor-not-allowed disabled:opacity-50 ${
                  feedback === "yes"
                    ? "border-emerald-500/60 bg-emerald-500/15 text-emerald-300 shadow-md shadow-emerald-900/30"
                    : "border-slate-700/60 bg-slate-800/40 text-slate-400 hover:border-emerald-500/40 hover:bg-emerald-500/5 hover:text-emerald-300"
                }`}
                onClick={() => onFeedback(profile.id, "yes")}
                disabled={disabled || !!feedback}
              >
                {feedback === "yes" ? (
                  <>
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Marked Yes
                  </>
                ) : (
                  <>
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    Yes
                  </>
                )}
              </button>
              <button
                className={`flex flex-1 items-center justify-center gap-2 rounded-xl border py-2.5 text-sm font-semibold transition-all disabled:cursor-not-allowed disabled:opacity-50 ${
                  feedback === "no"
                    ? "border-rose-500/60 bg-rose-500/15 text-rose-300 shadow-md shadow-rose-900/30"
                    : "border-slate-700/60 bg-slate-800/40 text-slate-400 hover:border-rose-500/40 hover:bg-rose-500/5 hover:text-rose-300"
                }`}
                onClick={() => onFeedback(profile.id, "no")}
                disabled={disabled || !!feedback}
              >
                {feedback === "no" ? (
                  <>
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    Marked No
                  </>
                ) : (
                  <>
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    No
                  </>
                )}
              </button>
            </div>
          )}
        </div>

        {/* Right: Score */}
        <div className="flex shrink-0 flex-col items-center">
          <div className={`relative flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br ${scoreColor(score)} shadow-lg shadow-black/40`}>
            <div className="absolute inset-0.5 rounded-[14px] bg-slate-900/85 backdrop-blur-sm" />
            <div className="relative flex flex-col items-center">
              <span className={`text-3xl font-black leading-none tabular-nums ${scoreTextColor(score)}`}>
                {score.toFixed(0)}
              </span>
              <span className="mt-0.5 text-[9px] font-bold uppercase tracking-[0.1em] text-slate-400">
                Score
              </span>
            </div>
          </div>
          <p className={`mt-2 text-[10px] font-bold uppercase tracking-wider ${scoreTextColor(score)}`}>
            {scoreLabel(score)}
          </p>
        </div>
      </div>
    </article>
  );
}
