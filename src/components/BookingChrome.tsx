import { Link } from "react-router-dom";
import { formatEuro, formatRange } from "@/lib/utils";
import { useBooking } from "@/store/booking";

export function StickyBookBar({
  to,
  cta,
}: {
  to: string;
  cta: string;
}) {
  const { property, room, draft, nights, quote } = useBooking();
  if (!property) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-md lg:hidden">
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate font-serif text-lg leading-tight">
            {room?.name ?? property.name}
          </p>
          <p className="text-xs text-muted-foreground">
            {draft.checkIn
              ? `${formatRange(draft.checkIn, draft.checkOut)}${nights ? ` · ${nights} nights` : ""}${quote ? ` · ${formatEuro(quote.total)}` : ""}`
              : `from ${formatEuro(room?.nightly ?? property.fromNightly)} / night`}
          </p>
        </div>
        <Link
          to={to}
          className="eyebrow min-h-11 shrink-0 bg-primary px-5 py-3 text-primary-foreground"
        >
          {cta}
        </Link>
      </div>
    </div>
  );
}

export function JourneySteps({ current }: { current: 1 | 2 | 3 | 4 }) {
  const steps = ["Dates", "Terms", "Payment", "Confirmed"];
  return (
    <ol className="flex flex-wrap gap-x-6 gap-y-2">
      {steps.map((label, index) => {
        const n = index + 1;
        const active = n === current;
        const done = n < current;
        return (
          <li
            key={label}
            className={`eyebrow ${active ? "text-foreground" : done ? "text-gold" : "text-muted-foreground"}`}
          >
            0{n} {label}
          </li>
        );
      })}
    </ol>
  );
}

export function QuoteList({
  nights,
  stay,
  extra,
  cleaning,
  tax,
  total,
}: {
  nights: number;
  nightly?: number;
  stay: number;
  extra: number;
  cleaning: number;
  tax: number;
  total: number;
}) {
  return (
    <dl className="mt-6 space-y-3 border-t border-border pt-6 text-sm">
      <div className="flex justify-between gap-4 text-muted-foreground">
        <dt>Accommodation · {nights} {nights === 1 ? "night" : "nights"}</dt>
        <dd className="text-foreground">{formatEuro(stay)}</dd>
      </div>
      {extra > 0 && (
        <div className="flex justify-between gap-4 text-muted-foreground">
          <dt>Additional guests</dt>
          <dd className="text-foreground">{formatEuro(extra)}</dd>
        </div>
      )}
      <div className="flex justify-between gap-4 text-muted-foreground">
        <dt>Cleaning fee</dt>
        <dd className="text-foreground">{formatEuro(cleaning)}</dd>
      </div>
      {tax > 0 && (
        <div className="flex justify-between gap-4 text-muted-foreground">
          <dt>Taxes</dt>
          <dd className="text-foreground">{formatEuro(tax)}</dd>
        </div>
      )}
      <div className="flex justify-between border-t border-border pt-4 font-serif text-2xl">
        <dt>Total</dt>
        <dd>{formatEuro(total)}</dd>
      </div>
    </dl>
  );
}
