import { type FormEvent, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Property } from "@/data/collection";
import { rangeAvailable, startingRate } from "@/data/collection";
import { paths } from "@/lib/paths";
import { addDays, formatEuro, isoDate, nightsBetween, parseIso, startOfDay } from "@/lib/utils";
import { useBooking } from "@/store/booking";
import { GuestStepper } from "@/components/GuestStepper";

export function BookingModule({
  property,
  variant = "card",
}: {
  property: Property;
  variant?: "card" | "bar";
}) {
  const navigate = useNavigate();
  const { draft, setStay } = useBooking();
  const today = useMemo(() => startOfDay(new Date()), []);
  const [checkIn, setCheckIn] = useState(draft.checkIn ?? "");
  const [checkOut, setCheckOut] = useState(draft.checkOut ?? "");
  const [adults, setAdults] = useState(draft.adults);
  const [children, setChildren] = useState(draft.children);
  const [error, setError] = useState("");
  const minOut = checkIn
    ? isoDate(addDays(parseIso(checkIn), property.minNights))
    : isoDate(addDays(today, 1));
  const childMax = Math.max(0, property.guests - adults);

  const applyAdults = (next: number) => {
    const nextAdults = Math.min(next, property.guests);
    setAdults(nextAdults);
    setChildren((prev) => Math.min(prev, Math.max(0, property.guests - nextAdults)));
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (checkIn && checkOut) {
      const nights = nightsBetween(checkIn, checkOut);
      if (nights < property.minNights) {
        setError(`The house asks for at least ${property.minNights} nights.`);
        return;
      }
      if (!rangeAvailable(property, checkIn, checkOut)) {
        setError("Those nights are already spoken for. Choose another stretch.");
        return;
      }
    }
    if (adults + children > property.guests) {
      setError(`The house sleeps ${property.guests}.`);
      return;
    }
    setError("");
    setStay({
      propertySlug: property.slug,
      checkIn: checkIn || undefined,
      checkOut: checkOut || undefined,
      adults,
      children,
    });
    navigate(paths.availability(property.slug));
  };

  const guests = (
    <div className="flex flex-wrap gap-8">
      <GuestStepper label="Adults" value={adults} min={1} max={property.guests} onChange={applyAdults} />
      <GuestStepper label="Children" value={children} min={0} max={childMax} onChange={setChildren} />
    </div>
  );

  if (variant === "bar") {
    return (
      <form onSubmit={onSubmit} className="border border-border bg-card">
        <div className="grid gap-0 lg:grid-cols-3">
          <label className="border-b border-border px-5 py-4 lg:border-b-0 lg:border-r">
            <span className="eyebrow text-muted-foreground">Check-in</span>
            <input
              type="date"
              value={checkIn}
              min={isoDate(today)}
              onChange={(e) => {
                setCheckIn(e.target.value);
                setError("");
                if (checkOut && checkOut <= e.target.value) setCheckOut("");
              }}
              className="mt-2 w-full bg-transparent font-serif text-lg outline-none [color-scheme:light]"
            />
          </label>
          <label className="border-b border-border px-5 py-4 lg:border-b-0 lg:border-r">
            <span className="eyebrow text-muted-foreground">Check-out</span>
            <input
              type="date"
              value={checkOut}
              min={minOut}
              onChange={(e) => {
                setCheckOut(e.target.value);
                setError("");
              }}
              className="mt-2 w-full bg-transparent font-serif text-lg outline-none [color-scheme:light]"
            />
          </label>
          <div className="flex flex-col justify-between gap-4 px-5 py-4 sm:flex-row sm:items-end">
            {guests}
            <button
              type="submit"
              className="eyebrow min-h-11 bg-primary px-6 py-3 text-primary-foreground hover:bg-gold hover:text-primary"
            >
              Check Availability
            </button>
          </div>
        </div>
        {error && <p className="px-5 pb-4 text-sm text-blush-deep">{error}</p>}
      </form>
    );
  }

  return (
    <form onSubmit={onSubmit} className="border border-border bg-card p-8">
      <p className="eyebrow text-muted-foreground">Book your stay</p>
      <p className="mt-4 font-serif text-4xl">
        {formatEuro(startingRate(property))}
        <span className="text-xl text-muted-foreground"> / night</span>
      </p>
      <p className="mt-2 text-sm text-muted-foreground">From the quietest room. Entire residence on request.</p>

      <label className="mt-8 block border-b border-input pb-3">
        <span className="eyebrow text-muted-foreground">Check-in</span>
        <input
          type="date"
          value={checkIn}
          min={isoDate(today)}
          onChange={(e) => {
            setCheckIn(e.target.value);
            setError("");
            if (checkOut && checkOut <= e.target.value) setCheckOut("");
          }}
          className="mt-2 w-full bg-transparent font-serif text-xl outline-none [color-scheme:light]"
        />
      </label>
      <label className="mt-6 block border-b border-input pb-3">
        <span className="eyebrow text-muted-foreground">Check-out</span>
        <input
          type="date"
          value={checkOut}
          min={minOut}
          onChange={(e) => {
            setCheckOut(e.target.value);
            setError("");
          }}
          className="mt-2 w-full bg-transparent font-serif text-xl outline-none [color-scheme:light]"
        />
      </label>

      <div className="mt-8">{guests}</div>
      {error && <p className="mt-6 text-sm text-blush-deep">{error}</p>}

      <button
        type="submit"
        className="eyebrow mt-8 w-full bg-primary px-6 py-4 text-center text-primary-foreground transition-colors hover:bg-gold hover:text-primary"
      >
        Check Availability
      </button>
      <p className="mt-5 text-xs leading-relaxed text-muted-foreground">
        Minimum stay {property.minNights} nights. Booked dates will not pretend to be free.
      </p>
    </form>
  );
}
