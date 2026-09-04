import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { PropertyCard } from "@/components/PropertyCard";
import { StaySearch } from "@/components/StaySearch";
import { PROPERTIES, rangeAvailable } from "@/data/collection";

export function CatalogPage() {
  const [params] = useSearchParams();
  const region = params.get("region") ?? "";
  const from = params.get("from") ?? "";
  const to = params.get("to") ?? "";
  const guests = Number(params.get("guests") ?? 0);

  const results = useMemo(() => {
    return PROPERTIES.filter((property) => {
      if (region && property.region !== region) return false;
      if (guests && property.guests < guests) return false;
      if (from && to && !rangeAvailable(property, from, to)) return false;
      return true;
    });
  }, [region, from, to, guests]);

  return (
    <div className="px-6 pb-28 pt-16 lg:px-10">
      <div className="mx-auto max-w-[86rem]">
        <p className="eyebrow text-gold">The catalog</p>
        <h1 className="mt-5 max-w-3xl font-serif text-5xl leading-[0.98] tracking-tight sm:text-6xl">
          Houses chosen for character.
          <span className="block italic text-gold">Reserved by the week, not the algorithm.</span>
        </h1>
        <p className="mt-8 max-w-2xl text-base leading-[1.9] text-muted-foreground">
          Five residences across France, Morocco, Italy, London and the Portuguese coast. Filter by
          place, party and dates — unavailable houses simply step aside.
        </p>

        <div className="mt-12 border border-border">
          <StaySearch variant="bar" />
        </div>

        <div className="mt-14 flex items-end justify-between border-b border-border pb-6">
          <p className="font-serif text-2xl">
            {results.length} {results.length === 1 ? "house" : "houses"}
          </p>
          <p className="eyebrow text-muted-foreground">
            {from && to ? "Matching your dates" : "Private residences"}
          </p>
        </div>

        {results.length === 0 ? (
          <div className="py-24 text-center">
            <p className="font-serif text-3xl italic">Those nights are already spoken for.</p>
            <p className="mx-auto mt-4 max-w-md text-muted-foreground">
              Try different dates, or write to us — we sometimes know of a neighbouring house that
              is not yet in the catalog.
            </p>
          </div>
        ) : (
          <div className="mt-14 grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((property) => (
              <PropertyCard key={property.slug} property={property} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
