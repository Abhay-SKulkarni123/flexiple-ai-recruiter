type LoadingStateProps = {
  message?: string;
};

export function LoadingState({ message = "Thinking..." }: LoadingStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-800 bg-slate-900 py-20">
      <div className="mb-4 h-8 w-8 animate-spin rounded-full border-4 border-slate-700 border-t-cyan-400" />
      <p className="text-slate-400">{message}</p>
    </div>
  );
}
