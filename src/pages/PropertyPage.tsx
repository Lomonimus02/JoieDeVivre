import { Link, Navigate, useParams } from "react-router-dom";
import { Gallery } from "@/components/Gallery";
import { RoomCard } from "@/components/RoomCard";
import { StickyBookBar } from "@/components/BookingChrome";
import { Ornament } from "@/components/Ornament";
import { amenityLabel, getProperty, startingRate } from "@/data/collection";
import { formatEuro } from "@/lib/utils";
import { useBooking } from "@/store/booking";
import { useEffect } from "react";

export function PropertyPage() {
  const { slug = "" } = useParams();
  const property = getProperty(slug);
  const { setStay } = useBooking();

  useEffect(() => {
    if (property) setStay({ propertySlug: property.slug, roomSlug: undefined });
  }, [property?.slug]);

  if (!property) return <Navigate to="/stays" replace />;

  return (
    <div className="pb-28 lg:pb-0">
      <div className="px-0 lg:px-10 lg:pt-10">
        <div className="mx-auto max-w-[86rem]">
          <Gallery images={property.images} name={property.name} />
        </div>
      </div>

      <div className="mx-auto grid max-w-[86rem] gap-16 px-6 pt-10 lg:grid-cols-[minmax(0,1fr)_22rem] lg:px-10 lg:pt-16">
        <div>
          <p className="eyebrow text-gold">{property.location}</p>
          <h1 className="mt-4 font-serif text-5xl leading-[0.95] sm:text-6xl">{property.name}</h1>
          <p className="mt-6 max-w-2xl font-serif text-2xl italic leading-relaxed text-foreground/90">
            {property.tagline}
          </p>
          <p className="mt-6 max-w-2xl text-base leading-[1.95] text-muted-foreground">
            {property.longDescription}
          </p>

          <dl className="mt-10 grid grid-cols-2 gap-6 border-y border-border py-8 sm:grid-cols-4">
            <Stat label="Guests" value={String(property.guests)} />
            <Stat label="Bedrooms" value={String(property.bedrooms)} />
            <Stat label="Baths" value={String(property.bathrooms)} />
            <Stat label="Min. stay" value={`${property.minNights} nights`} />
          </dl>

          <section className="mt-16">
            <p className="eyebrow text-gold">The rooms</p>
            <h2 className="mt-4 font-serif text-4xl">Where you will sleep.</h2>
            <div className="mt-10 grid gap-12 sm:grid-cols-2">
              {property.rooms.map((room) => (
                <RoomCard key={room.slug} property={property} room={room} compact />
              ))}
            </div>
          </section>

          <section className="mt-20">
            <p className="eyebrow text-gold">The house</p>
            <h2 className="mt-4 font-serif text-4xl">What we keep.</h2>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {property.amenities.map((id) => (
                <li key={id} className="border-b border-border pb-3 font-serif text-xl">
                  {amenityLabel(id)}
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-20">
            <Ornament className="justify-start" />
            <blockquote className="mt-8 font-serif text-3xl italic leading-[1.35]">
              “{property.quote}”
            </blockquote>
            <div className="mt-10 space-y-5 text-base leading-[1.95] text-muted-foreground">
              {property.story.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </section>
        </div>

        <aside className="hidden lg:block">
          <div className="sticky top-28 border border-border bg-card p-8">
            <p className="eyebrow text-muted-foreground">Reserve this house</p>
            <p className="mt-4 font-serif text-4xl">
              {formatEuro(startingRate(property))}
              <span className="text-xl text-muted-foreground"> / night</span>
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              From the quietest room. The entire house is offered on the calendar.
            </p>
            <Link
              to={`/stays/${property.slug}/dates`}
              className="eyebrow mt-8 block bg-primary px-6 py-4 text-center text-primary-foreground transition-colors hover:bg-gold hover:text-primary"
            >
              Check availability
            </Link>
            <Link
              to="/contact"
              className="eyebrow mt-4 block border border-gold px-6 py-4 text-center transition-colors hover:bg-gold hover:text-primary-foreground"
            >
              Ask a question
            </Link>
            <p className="mt-6 text-xs leading-relaxed text-muted-foreground">
              No payment is taken until checkout. Calendars are kept honest — booked nights will not
              pretend to be free.
            </p>
          </div>
        </aside>
      </div>

      <StickyBookBar to={`/stays/${property.slug}/dates`} cta="Check dates" />
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="eyebrow text-muted-foreground">{label}</dt>
      <dd className="mt-2 font-serif text-2xl">{value}</dd>
    </div>
  );
}
