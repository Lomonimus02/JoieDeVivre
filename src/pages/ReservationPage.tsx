import { Link, Navigate } from "react-router-dom";
import { Seo } from "@/components/Seo";
import { HOUSE_POLICY } from "@/data/policies";
import { formatEuro, formatStayDates } from "@/lib/utils";
import { paths } from "@/lib/paths";
import { useBooking } from "@/store/booking";

export function ReservationPage() {
  const { draft, property, room, quote, nights, guests, reset } = useBooking();

  if (!draft.confirmationId || !property || !room || !quote) {
    return <Navigate to={paths.residences} replace />;
  }

  const due = draft.payInFull ? quote.total : quote.deposit;

  return (
    <div className="px-6 pb-24 pt-16 lg:px-10">
      <Seo title={`Reservation ${draft.confirmationId}`} description={`Reservation details for ${property.name}.`} />
      <div className="mx-auto max-w-2xl">
        <p className="eyebrow text-gold">Your reservation</p>
        <h1 className="mt-4 font-serif text-5xl">{draft.confirmationId}</h1>
        <p className="mt-4 text-muted-foreground">
          Held for {draft.guest.firstName} {draft.guest.lastName}
        </p>

        <article className="mt-12 border border-border bg-card">
          <img src={property.images[0]} alt={property.name} className="aspect-[16/9] w-full object-cover" />
          <div className="px-6 py-8 sm:px-10">
            <h2 className="font-serif text-4xl">{property.name}</h2>
            <p className="mt-1 text-muted-foreground">{room.name} · {property.location}</p>
            <dl className="mt-8 space-y-3">
              <Line label="Dates" value={formatStayDates(draft.checkIn, draft.checkOut)} />
              <Line label="Nights" value={String(nights)} />
              <Line label="Guests" value={String(guests)} />
              <Line label="Arrival" value={`From ${HOUSE_POLICY.checkIn}`} />
              <Line label="Departure" value={`By ${HOUSE_POLICY.checkOut}`} />
              <Line
                label="Payment"
                value={`${draft.payment?.brand ?? "Card"} ···· ${draft.payment?.last4 ?? "4242"}`}
              />
              <Line label="Taken now" value={formatEuro(due)} />
              <Line label="Stay total" value={formatEuro(quote.total)} />
            </dl>
            <p className="mt-8 text-sm leading-relaxed text-muted-foreground">
              Prototype only — no card was charged, and no reservation was sent to a property
              manager. The feeling, however, should be the real thing.
            </p>
          </div>
        </article>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Link
            to={paths.residences}
            onClick={() => reset()}
            className="eyebrow bg-primary px-10 py-4 text-center text-primary-foreground hover:bg-gold hover:text-primary"
          >
            Browse another house
          </Link>
          <Link to={paths.contact} className="eyebrow border border-gold px-10 py-4 text-center">
            Write to the house
          </Link>
        </div>
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
