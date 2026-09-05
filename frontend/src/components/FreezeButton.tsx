type FreezeButtonProps = {
  isFrozen: boolean;
  onFreeze: () => void;
  disabled: boolean;
};

export function FreezeButton({ isFrozen, onFreeze, disabled }: FreezeButtonProps) {
  return (
    <div
      className={`flex flex-col items-start justify-between gap-4 rounded-2xl border p-5 sm:flex-row sm:items-center ${
        isFrozen
          ? "border-amber-500/40 bg-amber-500/10"
          : "border-amber-500/20 bg-gradient-to-br from-amber-500/5 to-amber-500/[0.02]"
      }`}
    >
      <div className="flex items-start gap-3">
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
            isFrozen ? "bg-amber-500/20" : "bg-amber-500/10"
          }`}
        >
          <svg
            className={`h-5 w-5 ${isFrozen ? "text-amber-300" : "text-amber-400"}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
        </div>
        <div>
          <p className="font-semibold text-amber-200">
            {isFrozen ? "Search is frozen" : "Satisfied with the results?"}
          </p>
          <p className="mt-0.5 text-sm text-amber-400/80">
            {isFrozen
              ? "This sourcing session is complete. Start a new search to refine further."
              : "Freeze to mark this search as final and prevent further changes."}
          </p>
        </div>
      </div>
      <button
        className={`shrink-0 rounded-xl px-6 py-2.5 text-sm font-semibold transition-all disabled:cursor-not-allowed ${
          isFrozen
            ? "border border-amber-500/40 bg-amber-500/20 text-amber-200"
            : "bg-gradient-to-br from-amber-500 to-amber-600 text-white shadow-lg shadow-amber-900/40 hover:from-amber-400 hover:to-amber-500 hover:shadow-amber-800/50 active:scale-[0.98] disabled:opacity-50"
        }`}
        onClick={onFreeze}
        disabled={disabled || isFrozen}
      >
        {isFrozen ? (
          <span className="flex items-center gap-2">
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Frozen
          </span>
        ) : (
          "Freeze Search"
        )}
      </button>
    </div>
  );
}
