import type { ObjectiveFilters } from "../types";

type FiltersPanelProps = {
  filters: ObjectiveFilters;
  disabled: boolean;
};

const formatExperience = (
  exp: ObjectiveFilters["experience"]
): string => {
  if (!exp) return "Any";
  const { min, max } = exp;
  if (min === null && max === null) return "Any";
  if (min !== null && max !== null) return `${min}–${max} yrs`;
  if (min !== null) return `${min}+ yrs`;
  return `Up to ${max} yrs`;
};

const List = ({ items, empty }: { items: string[]; empty: string }) => {
  if (items.length === 0) {
    return <p className="text-sm text-slate-500">{empty}</p>;
  }
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((it, i) => (
        <span
          key={i}
          className="rounded-md bg-slate-800 px-2.5 py-1 text-xs font-medium text-cyan-300"
        >
          {it}
        </span>
      ))}
    </div>
  );
};

export function FiltersPanel({ filters, disabled }: FiltersPanelProps) {
  return (
    <section
      className={`rounded-2xl border border-slate-800 bg-slate-900 p-6 ${
        disabled ? "opacity-70" : ""
      }`}
    >
      <header className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300">
          Objective Filters
        </h3>
        {disabled && (
          <span className="rounded-full bg-amber-400/15 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-amber-300">
            Locked
          </span>
        )}
      </header>
      <div className="space-y-4 text-sm">
        <div>
          <p className="mb-1.5 text-slate-400">Skills</p>
          <List items={filters.skills} empty="No skill filters set" />
        </div>
        <div>
          <p className="mb-1.5 text-slate-400">Experience</p>
          <p className="text-slate-200">{formatExperience(filters.experience)}</p>
        </div>
        <div>
          <p className="mb-1.5 text-slate-400">Locations</p>
          <List items={filters.locations} empty="No location filters set" />
        </div>
        <div>
          <p className="mb-1.5 text-slate-400">Company types</p>
          <List items={filters.companyTypes} empty="No company-type filters set" />
        </div>
      </div>
    </section>
  );
}
