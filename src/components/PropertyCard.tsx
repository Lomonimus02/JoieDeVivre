import { Link } from "react-router-dom";
import { startingRate, type Property } from "@/data/collection";
import { paths } from "@/lib/paths";
import { formatEuro } from "@/lib/utils";

export function PropertyCard({
  property,
  featured = false,
}: {
  property: Property;
  featured?: boolean;
}) {
  return (
    <article className={featured ? "lg:col-span-2" : undefined}>
      <Link to={paths.residence(property.slug)} className="group block">
        <div className="overflow-hidden">
          <img
            src={property.images[0]}
            alt={`${property.name} in ${property.location}`}
            className={`w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04] ${
              featured ? "aspect-[16/10] lg:aspect-[16/8]" : "aspect-[4/5]"
            }`}
          />
        </div>
        <p className="eyebrow mt-6 text-gold">{property.location}</p>
        <h3 className="mt-3 font-serif text-3xl leading-tight text-foreground sm:text-4xl">
          {property.name}
        </h3>
        <p className="mt-3 max-w-xl text-sm leading-[1.85] text-muted-foreground">
          {property.description}
        </p>
        <div className="mt-6 flex flex-wrap items-end justify-between gap-4">
          <span className="eyebrow inline-block border-b border-gold pb-1 text-foreground/70 transition-colors group-hover:text-foreground">
            Explore Residence
          </span>
          <p className="text-sm text-muted-foreground">
            From {formatEuro(startingRate(property))}
            <span className="text-foreground/50"> / night</span>
          </p>
        </div>
      </Link>
    </article>
  );
}
