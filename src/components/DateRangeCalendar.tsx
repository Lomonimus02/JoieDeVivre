import { ChevronLeft, ChevronRight } from "lucide-react";
import { useMemo, useState } from "react";
import type { Property } from "@/data/collection";
import {
  daysInMonth,
  isoDate,
  isSameDay,
  monthLabel,
  parseIso,
  startOfDay,
  weekdayIndex,
} from "@/lib/utils";
import { cn } from "@/lib/utils";

type Props = {
  property: Property;
  checkIn?: string;
  checkOut?: string;
  minNights: number;
  onChange: (checkIn?: string, checkOut?: string) => void;
};

const WEEKDAYS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

export function DateRangeCalendar({
  property,
  checkIn,
  checkOut,
  minNights,
  onChange,
}: Props) {
  const today = useMemo(() => startOfDay(new Date()), []);
  const [cursor, setCursor] = useState(() => new Date(today.getFullYear(), today.getMonth(), 1));

  const months = [cursor, new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1)];

  const booked = useMemo(() => new Set(property.booked), [property.booked]);

  const isUnavailable = (date: Date) => {
    if (date < today) return true;
    return booked.has(isoDate(date));
  };

  const inRange = (date: Date) => {
    if (!checkIn || !checkOut) return false;
    const t = date.getTime();
    return t > parseIso(checkIn).getTime() && t < parseIso(checkOut).getTime();
  };

  const select = (date: Date) => {
    if (isUnavailable(date)) return;
    const iso = isoDate(date);
    if (!checkIn || (checkIn && checkOut)) {
      onChange(iso, undefined);
      return;
    }
    const start = parseIso(checkIn);
    if (date <= start) {
      onChange(iso, undefined);
      return;
    }
    const nights = Math.round((date.getTime() - start.getTime()) / 86_400_000);
    if (nights < minNights) return;
    const cursorDay = new Date(start);
    while (cursorDay < date) {
      if (booked.has(isoDate(cursorDay))) {
        onChange(iso, undefined);
        return;
      }
      cursorDay.setDate(cursorDay.getDate() + 1);
    }
    onChange(checkIn, iso);
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <button
          type="button"
          onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() - 1, 1))}
          className="flex size-10 items-center justify-center border border-border"
          aria-label="Previous month"
        >
          <ChevronLeft className="size-4" />
        </button>
        <p className="eyebrow text-muted-foreground">Select a stay</p>
        <button
          type="button"
          onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1))}
          className="flex size-10 items-center justify-center border border-border"
          aria-label="Next month"
        >
          <ChevronRight className="size-4" />
        </button>
      </div>

      <div className="grid gap-10 lg:grid-cols-2">
        {months.map((monthDate, index) => {
          const year = monthDate.getFullYear();
          const month = monthDate.getMonth();
          const lead = weekdayIndex(year, month);
          const count = daysInMonth(year, month);
          const cells: Array<Date | null> = [
            ...Array.from({ length: lead }, () => null),
            ...Array.from({ length: count }, (_, i) => new Date(year, month, i + 1)),
          ];
          return (
            <div key={`${year}-${month}`} className={index === 1 ? "hidden lg:block" : ""}>
              <h3 className="mb-5 font-serif text-2xl">{monthLabel(year, month)}</h3>
              <div className="grid grid-cols-7 gap-y-1 text-center">
                {WEEKDAYS.map((d) => (
                  <span key={d} className="eyebrow py-2 text-muted-foreground">
                    {d}
                  </span>
                ))}
                {cells.map((date, i) => {
                  if (!date) return <span key={`e-${i}`} />;
                  const iso = isoDate(date);
                  const unavailable = isUnavailable(date);
                  const selected = (checkIn && iso === checkIn) || (checkOut && iso === checkOut);
                  const start = checkIn && iso === checkIn;
                  const end = checkOut && iso === checkOut;
                  const between = inRange(date);
                  const tooShort =
                    !!checkIn &&
                    !checkOut &&
                    date > parseIso(checkIn) &&
                    Math.round((date.getTime() - parseIso(checkIn).getTime()) / 86_400_000) <
                      minNights;
                  return (
                    <button
                      key={iso}
                      type="button"
                      disabled={unavailable}
                      onClick={() => select(date)}
                      className={cn(
                        "relative mx-auto flex size-11 items-center justify-center text-sm transition-colors touch-manipulation",
                        unavailable && "cursor-not-allowed text-muted-foreground/35 line-through",
                        tooShort && !unavailable && "text-muted-foreground/50",
                        between && "bg-blush/70",
                        selected && "bg-primary text-primary-foreground",
                        start && checkOut && "rounded-l-none",
                        end && "rounded-r-none",
                        !unavailable && !selected && "hover:bg-gold/20",
                      )}
                    >
                      {date.getDate()}
                      {isSameDay(date, today) && !selected && (
                        <span className="absolute bottom-1 left-1/2 size-1 -translate-x-1/2 bg-gold" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 flex flex-wrap gap-6 text-sm text-muted-foreground">
        <Legend swatch="bg-primary" label="Selected" />
        <Legend swatch="bg-blush" label="Your nights" />
        <Legend swatch="bg-transparent line-through" label="Unavailable" />
        <p>Minimum stay · {minNights} nights</p>
      </div>
      {checkIn && !checkOut && (
        <p className="mt-4 font-serif text-lg italic text-foreground">
          Choose a departure at least {minNights} nights after{" "}
          {parseIso(checkIn).toLocaleDateString("en-GB", { day: "numeric", month: "long" })}.
        </p>
      )}
    </div>
  );
}

function Legend({ swatch, label }: { swatch: string; label: string }) {
  return (
    <span className="flex items-center gap-2">
      <span className={cn("size-3 border border-border", swatch)} />
      {label}
    </span>
  );
}
