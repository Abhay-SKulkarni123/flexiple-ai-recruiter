import { useEffect, useState } from "react";
import { StatusCard } from "./components/StatusCard";

type HealthResponse = {
  status: "ok";
  service: string;
};

export default function App() {
  const [health, setHealth] = useState<HealthResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/health")
      .then(async (response) => {
        if (!response.ok) throw new Error(`Request failed (${response.status})`);
        return response.json() as Promise<HealthResponse>;
      })
      .then(setHealth)
      .catch((requestError: unknown) => {
        setError(requestError instanceof Error ? requestError.message : "Unable to reach API");
      });
  }, []);

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16 text-slate-100">
      <div className="mx-auto max-w-3xl">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300">Flexiple Engineering Challenge</p>
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">Sourcing Refinement Loop</h1>
        <p className="mt-6 max-w-xl text-lg leading-8 text-slate-400">Project foundation is ready. The sourcing workflow will be added in the next stage.</p>
        <StatusCard health={health} error={error} />
      </div>
    </main>
  );
}
