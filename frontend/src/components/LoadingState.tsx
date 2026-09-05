type LoadingStateProps = {
  message?: string;
  subtitle?: string;
};

export function LoadingState({ message = "Thinking...", subtitle }: LoadingStateProps) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-slate-800/80 bg-gradient-to-br from-slate-900/60 to-slate-900/30 p-16 text-center backdrop-blur-sm">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.07),transparent_70%)]" />
      <div className="relative">
        <div className="mb-6 inline-flex">
          <div className="relative">
            <div className="h-14 w-14 animate-spin rounded-full border-4 border-indigo-900 border-t-indigo-400" />
            <div className="absolute inset-0 animate-pulse rounded-full bg-indigo-500/10" />
          </div>
        </div>
        <p className="text-lg font-semibold text-slate-200">{message}</p>
        {subtitle && (
          <p className="mt-2 max-w-md mx-auto text-sm text-slate-500">{subtitle}</p>
        )}
      </div>
    </div>
  );
}
