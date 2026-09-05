import { Link, Navigate, useParams } from "react-router-dom";
import { Gallery } from "@/components/Gallery";
import { RoomCard } from "@/components/RoomCard";
import { BookingModule } from "@/components/BookingModule";
import { StickyBookBar } from "@/components/BookingChrome";
import { Ornament } from "@/components/Ornament";
import { Seo } from "@/components/Seo";
import { amenityLabel, getProperty, startingRate } from "@/data/collection";
import { residenceMeta, residenceOverview } from "@/data/residenceMeta";
import { HOUSE_POLICY } from "@/data/policies";
import { paths } from "@/lib/paths";
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

  if (!property) return <Navigate to={paths.residences} replace />;

  const meta = residenceMeta(property);

  return (
    <div className="pb-28 lg:pb-0">
      <Seo
        title={`${property.name}, ${property.location}`}
        description={`${property.tagline} ${residenceOverview(property)}. From ${formatEuro(startingRate(property))} / night.`}
        image={property.images[0]}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "LodgingBusiness",
          name: property.name,
          description: property.longDescription,
          image: property.images,
          address: {
            "@type": "PostalAddress",
            addressLocality: property.location,
            addressCountry: property.country,
          },
          numberOfRooms: property.bedrooms,
          amenityFeature: property.amenities.map((id) => ({
            "@type": "LocationFeatureSpecification",
            name: amenityLabel(id),
          })),
        }}
      />

      <section className="relative flex min-h-[88vh] items-end overflow-hidden px-6 pb-16 pt-32 lg:px-10 lg:pb-20">
        <img
          src={property.images[0]}
          alt={`${property.name} in ${property.location}`}
          className="absolute inset-0 size-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-background/20" aria-hidden />
        <div className="relative mx-auto w-full max-w-[86rem]">
          <p className="eyebrow text-gold">{property.location}</p>
          <h1 className="mt-4 max-w-4xl font-serif text-5xl leading-[0.95] sm:text-6xl lg:text-7xl">
            {property.name}
          </h1>
          <p className="mt-6 max-w-2xl font-serif text-2xl italic leading-relaxed">
            {property.tagline}
          </p>
          <p className="mt-6 font-serif text-lg text-foreground/80">{residenceOverview(property)}</p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link
              to={paths.availability(property.slug)}
              className="eyebrow bg-primary px-10 py-4 text-center text-primary-foreground hover:bg-gold hover:text-primary"
            >
              Check Availability
            </Link>
            <Link
              to={paths.availability(property.slug)}
              className="eyebrow border border-gold bg-background/70 px-10 py-4 text-center backdrop-blur-sm hover:bg-gold hover:text-primary-foreground"
            >
              Book Your Stay
            </Link>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-[86rem] px-6 pt-16 lg:px-10">
        <dl className="grid grid-cols-2 gap-6 border-y border-border py-8 sm:grid-cols-4">
          <Stat label="Guests" value={String(property.guests)} />
          <Stat label="Bedrooms" value={String(property.bedrooms)} />
          <Stat label="Baths" value={String(property.bathrooms)} />
          <Stat label="Size" value={`${meta.sizeSqm} m²`} />
        </dl>
      </div>

      <div className="mx-auto grid max-w-[86rem] gap-16 px-6 pt-16 lg:grid-cols-[minmax(0,1fr)_22rem] lg:px-10">
        <div>
          <section>
            <p className="eyebrow text-gold">The residence</p>
            <h2 className="mt-4 font-serif text-4xl">The house as it is kept.</h2>
            <p className="mt-6 max-w-2xl text-base leading-[1.95] text-muted-foreground">
              {property.longDescription}
            </p>
          </section>

          <section className="mt-16">
            <h2 className="font-serif text-3xl">Photographs</h2>
            <div className="mt-8">
              <Gallery images={property.images} name={property.name} />
            </div>
          </section>

          <section className="mt-20">
            <p className="eyebrow text-gold">The rooms</p>
            <h2 className="mt-4 font-serif text-4xl">Where you will sleep.</h2>
            <div className="mt-10 grid gap-12 sm:grid-cols-2">
              {property.rooms.map((room) => (
                <RoomCard key={room.slug} property={property} room={room} compact />
              ))}
            </div>
          </section>

          <section className="mt-20">
            <p className="eyebrow text-gold">Amenities</p>
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
            <p className="eyebrow text-gold">Location</p>
            <h2 className="mt-4 font-serif text-4xl">{property.location}</h2>
            <p className="mt-3 text-sm text-muted-foreground">{property.country} · {meta.neighborhood}</p>
            <p className="mt-6 max-w-2xl text-base leading-[1.95] text-muted-foreground">
              {meta.locationNote}
            </p>
            <div className="relative mt-10 aspect-[16/9] overflow-hidden bg-secondary">
              <img
                src={property.images[1] ?? property.images[0]}
                alt={`${property.name} surroundings in ${property.location}`}
                className="size-full object-cover opacity-80"
              />
              <div className="absolute inset-0 flex items-end bg-gradient-to-t from-background/80 to-transparent p-6">
                <p className="font-serif text-2xl italic">{property.location}</p>
              </div>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Arrival from {HOUSE_POLICY.checkIn} · Departure by {HOUSE_POLICY.checkOut}
            </p>
          </section>

          <section className="mt-20 lg:hidden">
            <BookingModule property={property} variant="bar" />
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
          <div className="sticky top-28">
            <BookingModule property={property} />
            <Link
              to={paths.contact}
              className="eyebrow mt-4 block border border-gold px-6 py-4 text-center transition-colors hover:bg-gold hover:text-primary-foreground"
            >
              Ask a question
            </Link>
          </div>
        </aside>
      </div>

      <StickyBookBar to={paths.availability(property.slug)} cta="Check Availability" />
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
