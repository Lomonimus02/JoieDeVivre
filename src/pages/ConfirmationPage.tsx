import { Link, Navigate } from "react-router-dom";
import { Ornament } from "@/components/Ornament";
import { formatEuro, formatRange } from "@/lib/utils";
import { useBooking } from "@/store/booking";

export function ConfirmationPage() {
  const { draft, property, room, quote, nights, guests, reset } = useBooking();

  if (!draft.confirmationId || !property || !room || !quote) {
    return <Navigate to="/stays" replace />;
  }

  const due = draft.payInFull ? quote.total : quote.deposit;

  return (
    <div className="px-6 py-20 lg:px-10">
      <div className="mx-auto max-w-2xl text-center">
        <p className="eyebrow text-gold">Confirmed</p>
        <h1 className="mt-5 font-serif text-5xl leading-[0.98] sm:text-6xl">
          The house is expecting you.
        </h1>
        <p className="mt-8 font-serif text-2xl italic text-muted-foreground">
          {draft.confirmationId}
        </p>
        <Ornament className="mt-10" />
        <p className="mx-auto mt-10 max-w-lg text-base leading-[1.95] text-muted-foreground">
          A note is on its way to {draft.guest.email || "your address"}. Arrival notes, cellar list
          and the code for the gate will follow two days before{" "}
          {draft.checkIn
            ? new Date(draft.checkIn).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
              })
            : "your stay"}
          .
        </p>
      </div>

      <article className="mx-auto mt-16 max-w-2xl border border-border bg-card">
        <img src={room.images[0]} alt="" className="aspect-[16/9] w-full object-cover" />
        <div className="px-6 py-8 sm:px-10">
          <p className="eyebrow text-gold">{property.location}</p>
          <h2 className="mt-3 font-serif text-4xl">{property.name}</h2>
          <p className="mt-1 text-muted-foreground">{room.name}</p>
          <dl className="mt-8 space-y-3 text-sm">
            <Line label="Dates" value={formatRange(draft.checkIn, draft.checkOut)} />
            <Line label="Nights" value={String(nights)} />
            <Line label="Guests" value={String(guests)} />
            <Line
              label="Guest"
              value={`${draft.guest.firstName} ${draft.guest.lastName}`.trim() || "—"}
            />
            <Line
              label="Payment"
              value={`${draft.payment?.brand ?? "Card"} ···· ${draft.payment?.last4 ?? "4242"}`}
            />
            <Line label="Taken now" value={formatEuro(due)} />
            <Line label="Stay total" value={formatEuro(quote.total)} />
          </dl>
          <p className="mt-8 text-sm leading-relaxed text-muted-foreground">
            Prototype only — no card was charged, and no reservation was sent to a property manager.
            The feeling, however, should be the real thing.
          </p>
        </div>
      </article>

      <div className="mx-auto mt-12 flex max-w-2xl flex-wrap justify-center gap-4">
        <Link
          to="/stays"
          onClick={() => reset()}
          className="eyebrow bg-primary px-10 py-4 text-primary-foreground hover:bg-gold hover:text-primary"
        >
          Browse another house
        </Link>
        <Link to="/" className="eyebrow border border-gold px-10 py-4">
          Return home
        </Link>
      </div>
    </div>
  );
}

function Line({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-border pb-3">
      <dt className="eyebrow text-muted-foreground">{label}</dt>
      <dd className="font-serif text-xl">{value}</dd>
    </div>
  );
}
