import { Link, Navigate } from "react-router-dom";
import { JourneySteps } from "@/components/BookingChrome";
import { Ornament } from "@/components/Ornament";
import { Seo } from "@/components/Seo";
import { formatEuro, formatStayDates } from "@/lib/utils";
import { paths } from "@/lib/paths";
import { useBooking } from "@/store/booking";

export function ConfirmationPage() {
  const { draft, property, room, quote, nights } = useBooking();

  if (!draft.confirmationId || !property || !room || !quote) {
    return <Navigate to={paths.residences} replace />;
  }

  const name = draft.guest.firstName.trim() || "guest";

  return (
    <div className="px-6 py-20 lg:px-10">
      <Seo
        title="Booking confirmed"
        description={`Your stay at ${property.name} is confirmed. Confirmation ${draft.confirmationId}.`}
      />
      <div className="mx-auto max-w-2xl">
        <JourneySteps current={4} />
        <div className="mt-12 text-center">
          <p className="eyebrow text-gold">Booking Confirmed</p>
          <h1 className="mt-5 font-serif text-5xl leading-[0.98] sm:text-6xl">
            Thank you, {name}.
          </h1>
          <p className="mt-8 font-serif text-2xl italic text-foreground">
            {property.name}
          </p>
          <p className="mt-2 font-serif text-xl text-muted-foreground">
            {formatStayDates(draft.checkIn, draft.checkOut)}
          </p>
          <p className="mt-6 eyebrow text-gold">{draft.confirmationId}</p>
          <Ornament className="mt-10" />
          <p className="mx-auto mt-10 max-w-lg text-base leading-[1.95] text-muted-foreground">
            A confirmation has been sent to {draft.guest.email || "your email"}. Arrival notes,
            cellar list and the code for the gate will follow two days before the stay.
          </p>
        </div>
      </div>

      <article className="mx-auto mt-16 max-w-2xl border border-border bg-card">
        <img src={room.images[0]} alt={property.name} className="aspect-[16/9] w-full object-cover" />
        <div className="px-6 py-8 sm:px-10">
          <p className="eyebrow text-gold">{property.location}</p>
          <h2 className="mt-3 font-serif text-4xl">{property.name}</h2>
          <p className="mt-1 text-muted-foreground">{room.name}</p>
          <p className="mt-6 text-sm text-muted-foreground">
            {nights} nights · {formatEuro(quote.total)}
          </p>
        </div>
      </article>

      <div className="mx-auto mt-12 flex max-w-2xl flex-col gap-4 sm:flex-row sm:justify-center">
        <Link
          to={paths.reservation}
          className="eyebrow bg-primary px-10 py-4 text-center text-primary-foreground hover:bg-gold hover:text-primary"
        >
          View Reservation
        </Link>
        <Link to={paths.home} className="eyebrow border border-gold px-10 py-4 text-center">
          Return home
        </Link>
      </div>
    </div>
  );
}
