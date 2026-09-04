import { Link } from "react-router-dom";
import { startingRate, type Property } from "@/data/collection";
import { formatEuro } from "@/lib/utils";

export function PropertyCard({ property }: { property: Property }) {
  return (
    <Link to={`/stays/${property.slug}`} className="group block">
      <div className="overflow-hidden">
        <img
          src={property.images[0]}
          alt={property.name}
          className="aspect-[4/5] w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.05]"
        />
      </div>
      <p className="eyebrow mt-6 text-gold">{property.location}</p>
      <h3 className="mt-3 font-serif text-3xl leading-tight text-foreground">{property.name}</h3>
      <p className="mt-3 text-sm leading-[1.85] text-muted-foreground">{property.tagline}</p>
      <div className="mt-5 flex items-end justify-between gap-4">
        <span className="eyebrow inline-block border-b border-gold pb-1 text-foreground/70 transition-colors group-hover:text-foreground">
          View the house
        </span>
        <p className="text-sm text-muted-foreground">
          from {formatEuro(startingRate(property))}
          <span className="text-foreground/50"> / night</span>
        </p>
      </div>
    </Link>
  );
}
