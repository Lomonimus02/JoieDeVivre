import { Link } from "react-router-dom";
import type { Property, Room } from "@/data/collection";
import { formatEuro } from "@/lib/utils";

export function RoomCard({
  property,
  room,
  compact = false,
}: {
  property: Property;
  room: Room;
  compact?: boolean;
}) {
  return (
    <article className="group">
      <Link to={`/stays/${property.slug}/rooms/${room.slug}`} className="block overflow-hidden">
        <img
          src={room.images[0]}
          alt={room.name}
          className={`w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04] ${
            compact ? "aspect-[4/3]" : "aspect-[4/5]"
          }`}
        />
      </Link>
      <p className="eyebrow mt-5 text-gold">
        Sleeps {room.sleeps} · {room.sizeSqm} m²
      </p>
      <h3 className="mt-2 font-serif text-2xl leading-tight text-foreground sm:text-3xl">
        <Link to={`/stays/${property.slug}/rooms/${room.slug}`}>{room.name}</Link>
      </h3>
      <p className="mt-2 text-sm leading-[1.85] text-muted-foreground">{room.tagline}</p>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm">
          {formatEuro(room.nightly)}
          <span className="text-muted-foreground"> / night</span>
        </p>
        <Link
          to={`/stays/${property.slug}/dates?room=${room.slug}`}
          className="eyebrow border-b border-gold pb-1 text-foreground/70 transition-colors hover:text-foreground"
        >
          Check dates
        </Link>
      </div>
    </article>
  );
}
