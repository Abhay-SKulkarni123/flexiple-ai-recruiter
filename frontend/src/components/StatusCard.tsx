type HealthResponse = {
  status: "ok";
  service: string;
};

type StatusCardProps = {
  health: HealthResponse | null;
  error: string | null;
};

export function StatusCard({ health, error }: StatusCardProps) {
  return (
    <section className="mt-12 rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl shadow-cyan-950/20">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold">Backend connection</h2>
          <p className="mt-1 text-sm text-slate-400">Minimal API health check</p>
        </div>
        <span className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide ${health ? "bg-emerald-400/15 text-emerald-300" : error ? "bg-rose-400/15 text-rose-300" : "bg-amber-400/15 text-amber-300"}`}>
          {health ? "Connected" : error ? "Unavailable" : "Checking"}
        </span>
      </div>
      {health && <p className="mt-6 font-mono text-sm text-emerald-300">{health.service}: {health.status}</p>}
      {error && <p className="mt-6 text-sm text-rose-300">{error}</p>}
    </section>
  );
}
