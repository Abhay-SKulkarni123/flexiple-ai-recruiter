type FreezeButtonProps = {
  isFrozen: boolean;
  onFreeze: () => void;
  disabled: boolean;
};

export function FreezeButton({ isFrozen, onFreeze, disabled }: FreezeButtonProps) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-amber-800/40 bg-amber-950/20 px-5 py-3">
      <div>
        <p className="text-sm font-semibold text-amber-300">
          {isFrozen ? "Search frozen" : "Satisfied with results?"}
        </p>
        <p className="text-xs text-amber-400/70">
          {isFrozen
            ? "This sourcing session is complete. Start a new search to refine further."
            : "Freeze to mark this search as final."}
        </p>
      </div>
      <button
        className={`rounded-lg px-5 py-2.5 text-sm font-semibold transition-colors disabled:cursor-not-allowed ${
          isFrozen
            ? "border border-amber-600 bg-amber-900/50 text-amber-400"
            : "bg-amber-600 text-white hover:bg-amber-500 disabled:opacity-50"
        }`}
        onClick={onFreeze}
        disabled={disabled || isFrozen}
      >
        {isFrozen ? "Frozen" : "Freeze Search"}
      </button>
    </div>
  );
}
