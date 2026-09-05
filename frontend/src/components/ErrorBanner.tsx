type ErrorBannerProps = {
  message: string;
  onRetry?: () => void;
};

export function ErrorBanner({ message, onRetry }: ErrorBannerProps) {
  return (
    <div className="rounded-xl border border-rose-800 bg-rose-950/50 px-5 py-4 text-rose-300">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-semibold">Something went wrong</p>
          <p className="mt-1 text-sm text-rose-400">{message}</p>
        </div>
        {onRetry && (
          <button
            className="shrink-0 rounded-lg bg-rose-800 px-4 py-2 text-sm font-semibold text-rose-200 transition-colors hover:bg-rose-700"
            onClick={onRetry}
          >
            Retry
          </button>
        )}
      </div>
    </div>
  );
}
