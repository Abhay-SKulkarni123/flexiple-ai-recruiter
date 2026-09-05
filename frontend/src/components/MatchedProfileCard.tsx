import type { CandidateProfile, Feedback } from "../types";

type MatchedProfileCardProps = {
  profile: CandidateProfile;
  rank: number;
  feedback?: Feedback;
  onFeedback?: (id: string, fb: Feedback) => void;
  disabled?: boolean;
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

export function MatchedProfileCard({
  profile,
  rank,
  feedback,
  onFeedback,
  disabled,
}: MatchedProfileCardProps) {
  return (
    <article className="group relative overflow-hidden rounded-2xl border border-slate-800/60 bg-slate-900/40 p-6 shadow-md shadow-black/10 transition-all hover:border-slate-700/80 hover:bg-slate-900/60">
      <div className="flex gap-6">
        {/* Left: Candidate info */}
        <div className="min-w-0 flex-1">
          <div className="mb-1 flex items-center gap-2.5">
            <span className="inline-flex h-6 min-w-6 items-center justify-center rounded-md bg-slate-700/60 px-1.5 text-[11px] font-bold text-slate-400 ring-1 ring-slate-600/40">
              {rank}
            </span>
            <h4 className="truncate text-base font-bold text-slate-200">
              {profile.name}
            </h4>
          </div>
          <p className="ml-9 truncate text-sm text-slate-500">
            {profile.current_title}
          </p>

          {/* Metadata row */}
          <dl className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-xs text-slate-500">
            <div className="flex items-center gap-1.5">
              <svg className="h-3.5 w-3.5 shrink-0 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <dd>
                <span className="font-semibold text-slate-300">{profile.years_experience}y</span>{" "}
                <span className="text-slate-600">experience</span>
              </dd>
            </div>
            <div className="flex items-center gap-1.5">
              <svg className="h-3.5 w-3.5 shrink-0 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <dd className="font-semibold text-slate-300">{profile.location}</dd>
            </div>
            <div className="flex items-center gap-1.5">
              <svg className="h-3.5 w-3.5 shrink-0 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              <dd className="font-semibold text-slate-300">{profile.current_company}</dd>
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
            <div className="mt-3">
              <ul className="flex flex-wrap gap-1.5">
                {profile.skills.map((skill, i) => (
                  <li
                    key={i}
                    className="rounded-md border border-slate-800/60 bg-slate-800/40 px-2.5 py-1 text-xs text-slate-400"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Feedback buttons */}
          {onFeedback && (
            <div className="mt-4 flex gap-2">
              <button
                className={`flex flex-1 items-center justify-center gap-2 rounded-xl border py-2 text-xs font-semibold transition-all disabled:cursor-not-allowed disabled:opacity-50 ${
                  feedback === "yes"
                    ? "border-emerald-500/60 bg-emerald-500/15 text-emerald-300"
                    : "border-slate-700/60 bg-slate-800/40 text-slate-400 hover:border-emerald-500/40 hover:text-emerald-300"
                }`}
                onClick={() => onFeedback(profile.id, "yes")}
                disabled={disabled || !!feedback}
              >
                {feedback === "yes" ? "Yes ✓" : "Yes"}
              </button>
              <button
                className={`flex flex-1 items-center justify-center gap-2 rounded-xl border py-2 text-xs font-semibold transition-all disabled:cursor-not-allowed disabled:opacity-50 ${
                  feedback === "no"
                    ? "border-rose-500/60 bg-rose-500/15 text-rose-300"
                    : "border-slate-700/60 bg-slate-800/40 text-slate-400 hover:border-rose-500/40 hover:text-rose-300"
                }`}
                onClick={() => onFeedback(profile.id, "no")}
                disabled={disabled || !!feedback}
              >
                {feedback === "no" ? "No ✓" : "No"}
              </button>
            </div>
          )}
        </div>

        {/* Right: unranked indicator */}
        <div className="flex shrink-0 flex-col items-center">
          <div className="flex h-16 w-16 flex-col items-center justify-center rounded-2xl border border-slate-700/60 bg-slate-800/50">
            <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-slate-500">
              Not
            </span>
            <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-slate-500">
              Scored
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}
