import { Minus, Plus } from "lucide-react";

export function GuestStepper({
  label,
  value,
  min,
  max,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
}) {
  return (
    <div>
      <p className="eyebrow text-muted-foreground">{label}</p>
      <div className="mt-3 flex items-center gap-3">
        <button
          type="button"
          aria-label={`Fewer ${label}`}
          className="flex size-10 items-center justify-center border border-border disabled:opacity-30"
          disabled={value <= min}
          onClick={() => onChange(Math.max(min, value - 1))}
        >
          <Minus className="size-4" />
        </button>
        <span className="w-6 text-center font-serif text-xl">{value}</span>
        <button
          type="button"
          aria-label={`More ${label}`}
          className="flex size-10 items-center justify-center border border-border disabled:opacity-30"
          disabled={value >= max}
          onClick={() => onChange(Math.min(max, value + 1))}
        >
          <Plus className="size-4" />
        </button>
      </div>
    </div>
  );
}
