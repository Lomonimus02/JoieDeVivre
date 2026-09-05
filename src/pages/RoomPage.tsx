import { Link, Navigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { Gallery } from "@/components/Gallery";
import { StickyBookBar } from "@/components/BookingChrome";
import { Seo } from "@/components/Seo";
import { amenityLabel, getProperty, getRoom } from "@/data/collection";
import { formatEuro } from "@/lib/utils";
import { paths } from "@/lib/paths";
import { useBooking } from "@/store/booking";

export function RoomPage() {
  const { slug = "", roomSlug = "" } = useParams();
  const property = getProperty(slug);
  const room = property ? getRoom(slug, roomSlug) : undefined;
  const { setStay } = useBooking();

  useEffect(() => {
    if (property && room) setStay({ propertySlug: property.slug, roomSlug: room.slug });
  }, [property?.slug, room?.slug]);

  if (!property || !room) return <Navigate to={paths.residences} replace />;

  return (
    <div className="pb-28 lg:pb-16">
      <Seo
        title={`${room.name} at ${property.name}`}
        description={`${room.tagline} Sleeps ${room.sleeps}. From ${formatEuro(room.nightly)} / night at ${property.name}, ${property.location}.`}
        image={room.images[0]}
      />
      <div className="px-0 lg:px-10 lg:pt-10">
        <div className="mx-auto max-w-[86rem]">
          <Gallery images={room.images} name={room.name} />
        </div>
      </div>

      <div className="mx-auto max-w-[86rem] px-6 pt-10 lg:px-10">
        <Link to={paths.residence(property.slug)} className="eyebrow text-muted-foreground">
          ← {property.name}
        </Link>
        <p className="eyebrow mt-8 text-gold">{property.location}</p>
        <h1 className="mt-4 font-serif text-5xl leading-[0.95] sm:text-6xl">{room.name}</h1>
        <p className="mt-6 max-w-2xl font-serif text-2xl italic">{room.tagline}</p>
        <p className="mt-6 max-w-2xl text-base leading-[1.95] text-muted-foreground">
          {room.description}
        </p>

        <dl className="mt-10 grid grid-cols-2 gap-6 border-y border-border py-8 sm:grid-cols-4">
          <div>
            <dt className="eyebrow text-muted-foreground">Sleeps</dt>
            <dd className="mt-2 font-serif text-2xl">{room.sleeps}</dd>
          </div>
          <div>
            <dt className="eyebrow text-muted-foreground">Beds</dt>
            <dd className="mt-2 font-serif text-2xl">{room.beds}</dd>
          </div>
          <div>
            <dt className="eyebrow text-muted-foreground">Size</dt>
            <dd className="mt-2 font-serif text-2xl">{room.sizeSqm} m²</dd>
          </div>
          <div>
            <dt className="eyebrow text-muted-foreground">From</dt>
            <dd className="mt-2 font-serif text-2xl">{formatEuro(room.nightly)}</dd>
          </div>
        </dl>

        <ul className="mt-10 flex flex-wrap gap-3">
          {room.amenities.map((id) => (
            <li key={id} className="border border-border px-4 py-2 font-serif text-lg">
              {amenityLabel(id)}
            </li>
          ))}
        </ul>

        <div className="mt-14 flex flex-wrap gap-4">
          <Link
            to={paths.availability(property.slug, room.slug)}
            className="eyebrow bg-primary px-10 py-4 text-primary-foreground hover:bg-gold hover:text-primary"
          >
            Check these dates
          </Link>
          <Link
            to={paths.residence(property.slug)}
            className="eyebrow border border-gold px-10 py-4 hover:bg-gold hover:text-primary-foreground"
          >
            Back to the house
          </Link>
        </div>
      </div>

      <StickyBookBar to={paths.availability(property.slug, room.slug)} cta="Check Availability" />
    </div>
  );
}
