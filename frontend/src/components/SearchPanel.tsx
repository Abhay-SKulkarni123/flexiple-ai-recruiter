type SearchPanelProps = {
  query: string;
  onChange: (q: string) => void;
  onSearch: (q: string) => void;
  disabled: boolean;
};

export function SearchPanel({ query, onChange, onSearch, disabled }: SearchPanelProps) {
  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-2xl">
      <h2 className="mb-1 text-lg font-semibold text-slate-100">New Sourcing Search</h2>
      <p className="mb-6 text-sm text-slate-400">
        Describe the ideal candidate in free text. The AI will build filters and a fit rubric, then score and rank candidates.
      </p>
      <div className="flex gap-3">
        <input
          type="text"
          className="flex-1 rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-slate-100 placeholder-slate-500 outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors disabled:opacity-50"
          placeholder='e.g. "Senior React developer in Bangalore, 5+ years experience, startup background"'
          value={query}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && !disabled && query.trim() && onSearch(query)}
          disabled={disabled}
          autoFocus
        />
        <button
          className="rounded-lg bg-cyan-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-cyan-500 disabled:cursor-not-allowed disabled:opacity-50"
          onClick={() => onSearch(query)}
          disabled={disabled || !query.trim()}
        >
          Search
        </button>
      </div>
    </section>
  );
}