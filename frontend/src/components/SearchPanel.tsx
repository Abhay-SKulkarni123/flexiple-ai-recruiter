type SearchPanelProps = {
  query: string;
  onChange: (q: string) => void;
  onSearch: (q: string) => void;
  disabled: boolean;
};

export function SearchPanel({ query, onChange, onSearch, disabled }: SearchPanelProps) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-slate-800/80 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 p-10 shadow-2xl shadow-black/50">
      {/* Subtle background decoration */}
      <div className="pointer-events-none absolute -right-32 -top-32 h-64 w-64 rounded-full bg-indigo-600/10 blur-3xl" />
      <div className="pointer-events-none absolute -left-20 -bottom-20 h-48 w-48 rounded-full bg-cyan-500/5 blur-3xl" />

      <div className="relative">
        <div className="mb-6 flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-indigo-300">
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-400" />
            New Search
          </span>
        </div>
        <h2 className="text-3xl font-bold tracking-tight text-slate-50 sm:text-4xl">
          Who are you looking for?
        </h2>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate-400">
          Describe the ideal candidate in your own words. Our AI will translate your brief into structured filters, build a fit rubric, and rank the top candidates from your database.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
              <svg
                className="h-5 w-5 text-slate-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              type="text"
              className="block w-full rounded-2xl border border-slate-700/80 bg-slate-800/50 py-4 pl-12 pr-4 text-base text-slate-100 placeholder-slate-500 shadow-inner shadow-black/20 outline-none transition-all focus:border-indigo-500 focus:bg-slate-800/80 focus:ring-4 focus:ring-indigo-500/20 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder='e.g. "Senior React developer in Bangalore, 5+ years, startup background"'
              value={query}
              onChange={(e) => onChange(e.target.value)}
              onKeyDown={(e) =>
                e.key === "Enter" && !disabled && query.trim() && onSearch(query)
              }
              disabled={disabled}
              autoFocus
            />
          </div>
          <button
            className="group relative shrink-0 overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-500 to-indigo-700 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-indigo-900/50 transition-all hover:shadow-xl hover:shadow-indigo-800/60 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
            onClick={() => onSearch(query)}
            disabled={disabled || !query.trim()}
          >
            <span className="relative flex items-center justify-center gap-2">
              Find Candidates
              <svg
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </button>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-slate-500">
          <span className="flex items-center gap-1.5">
            <span className="h-1 w-1 rounded-full bg-slate-700" />
            Skills
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-1 w-1 rounded-full bg-slate-700" />
            Experience level
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-1 w-1 rounded-full bg-slate-700" />
            Location
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-1 w-1 rounded-full bg-slate-700" />
            Company type
          </span>
        </div>
      </div>
    </div>
  );
}
