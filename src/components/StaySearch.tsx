import { type FormEvent, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Minus, Plus } from "lucide-react";
import { PROPERTIES, REGIONS } from "@/data/collection";
import { useBooking } from "@/store/booking";
import { isoDate, addDays, startOfDay } from "@/lib/utils";

type Props = {
  variant?: "hero" | "bar";
};

export function StaySearch({ variant = "hero" }: Props) {
  const navigate = useNavigate();
  const { draft, setStay } = useBooking();
  const today = useMemo(() => startOfDay(new Date()), []);
  const [region, setRegion] = useState("");
  const [checkIn, setCheckIn] = useState(draft.checkIn ?? "");
  const [checkOut, setCheckOut] = useState(draft.checkOut ?? "");
  const [adults, setAdults] = useState(draft.adults);
  const [children, setChildren] = useState(draft.children);
  const [openGuests, setOpenGuests] = useState(false);

  const minOut = checkIn ? isoDate(addDays(new Date(checkIn), 1)) : isoDate(addDays(today, 1));

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    setStay({ checkIn: checkIn || undefined, checkOut: checkOut || undefined, adults, children });
    const params = new URLSearchParams();
    if (region) params.set("region", region);
    if (checkIn) params.set("from", checkIn);
    if (checkOut) params.set("to", checkOut);
    params.set("guests", String(adults + children));
    navigate(`/stays?${params.toString()}`);
  };

  const field =
    variant === "hero"
      ? "flex min-h-[4.5rem] flex-1 flex-col justify-center border-b border-border px-4 py-3 lg:border-b-0 lg:border-r"
      : "flex min-h-[3.75rem] flex-1 flex-col justify-center border-b border-border px-3 py-2 md:border-b-0 md:border-r";

  return (
    <form
      onSubmit={onSubmit}
      className={`relative w-full bg-background/90 shadow-[0_20px_60px_-28px_rgba(28,28,40,0.35)] backdrop-blur-md ${
        variant === "hero" ? "mx-auto max-w-5xl" : ""
      }`}
    >
      <div className="flex flex-col lg:flex-row lg:items-stretch">
        <label className={field}>
          <span className="eyebrow text-muted-foreground">Where</span>
          <select
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            className="mt-1 w-full bg-transparent font-serif text-lg outline-none [color-scheme:light]"
          >
            <option value="">Any house in the Collection</option>
            {REGIONS.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>
        <label className={field}>
          <span className="eyebrow text-muted-foreground">Arrive</span>
          <input
            type="date"
            value={checkIn}
            min={isoDate(today)}
            onChange={(e) => {
              setCheckIn(e.target.value);
              if (checkOut && checkOut <= e.target.value) setCheckOut("");
            }}
            className="mt-1 w-full bg-transparent font-serif text-lg outline-none [color-scheme:light]"
          />
        </label>
        <label className={field}>
          <span className="eyebrow text-muted-foreground">Depart</span>
          <input
            type="date"
            value={checkOut}
            min={minOut}
            onChange={(e) => setCheckOut(e.target.value)}
            className="mt-1 w-full bg-transparent font-serif text-lg outline-none [color-scheme:light]"
          />
        </label>
        <div className={`${field} relative`}>
          <button
            type="button"
            onClick={() => setOpenGuests((v) => !v)}
            className="text-left"
          >
            <span className="eyebrow text-muted-foreground">Guests</span>
            <span className="mt-1 block font-serif text-lg">
              {adults + children} {adults + children === 1 ? "guest" : "guests"}
            </span>
          </button>
          {openGuests && (
            <div className="absolute top-full right-0 left-0 z-20 border border-border bg-background p-5 shadow-lg">
              <Stepper label="Adults" value={adults} min={1} max={12} onChange={setAdults} />
              <Stepper
                label="Children"
                value={children}
                min={0}
                max={8}
                onChange={setChildren}
              />
              <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                Houses sleep between 4 and {Math.max(...PROPERTIES.map((p) => p.guests))}.
              </p>
            </div>
          )}
        </div>
        <button
          type="submit"
          className="eyebrow bg-primary px-8 py-5 text-primary-foreground transition-colors duration-300 hover:bg-gold hover:text-primary lg:px-10"
        >
          Search stays
        </button>
      </div>
    </form>
  );
}

function Stepper({
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
    <div className="flex items-center justify-between gap-6 py-3">
      <span className="font-serif text-lg">{label}</span>
      <div className="flex items-center gap-3">
        <button
          type="button"
          aria-label={`Fewer ${label}`}
          disabled={value <= min}
          onClick={() => onChange(Math.max(min, value - 1))}
          className="flex size-9 items-center justify-center border border-border disabled:opacity-30"
        >
          <Minus className="size-4" />
        </button>
        <span className="w-6 text-center">{value}</span>
        <button
          type="button"
          aria-label={`More ${label}`}
          disabled={value >= max}
          onClick={() => onChange(Math.min(max, value + 1))}
          className="flex size-9 items-center justify-center border border-border disabled:opacity-30"
        >
          <Plus className="size-4" />
        </button>
      </div>
    </div>
  );
}
