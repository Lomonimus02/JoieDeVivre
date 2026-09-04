import { Link } from "react-router-dom";
import { Ornament } from "@/components/Ornament";
import { StaySearch } from "@/components/StaySearch";
import { PropertyCard } from "@/components/PropertyCard";
import { PROPERTIES } from "@/data/collection";

export function HomePage() {
  return (
    <>
      <section className="relative flex min-h-[92vh] items-center justify-center overflow-hidden px-6 pt-28 pb-24 lg:px-10">
        <img
          src="/brand/hero-terrace.jpg"
          alt="Villa terrace at golden hour with bougainvillea and linen curtains"
          className="absolute inset-0 size-full object-cover"
        />
        <div className="absolute inset-0 bg-background/45" aria-hidden />
        <div
          className="absolute inset-0 bg-gradient-to-b from-background/85 via-background/25 to-background"
          aria-hidden
        />
        <div className="relative mx-auto w-full max-w-5xl text-center rise">
          <img
            src="/brand/logo-full.png"
            alt="The Joie de Vivre Collection"
            className="mx-auto h-36 w-auto sm:h-48"
          />
          <p className="mt-10 font-serif text-3xl italic leading-[1.3] text-foreground sm:text-4xl lg:text-[2.75rem]">
            A house, a few unhurried nights,
            <br className="hidden sm:block" /> composed around joy.
          </p>
          <p className="mx-auto mt-8 max-w-xl text-base leading-[1.9] text-muted-foreground">
            Private residences with a memory — not hotels. Choose a house, a room, a stretch of
            calendar, and we will take care of the rest.
          </p>
          <div className="mt-12 text-left">
            <StaySearch />
          </div>
        </div>
      </section>

      <section className="px-6 py-28 lg:px-10">
        <div className="mx-auto grid max-w-[86rem] gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-24">
          <div>
            <p className="eyebrow text-gold">The stay</p>
            <h2 className="mt-6 font-serif text-5xl leading-[0.98] tracking-tight text-foreground sm:text-6xl">
              Not a booking engine.
              <span className="block italic text-gold">A composed week.</span>
            </h2>
          </div>
          <div className="space-y-6 text-base leading-[1.95] text-muted-foreground">
            <p>
              Every residence in the Collection was chosen the same way: we walked in and felt
              something. You choose the house, the room, and the dates. We keep the cellar stocked,
              the linen on the bed, and the calendar honest.
            </p>
            <p className="font-serif text-2xl italic leading-relaxed text-foreground">
              Catalog, house, calendar, confirmation — nothing saved for later.
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 pb-28 lg:px-10">
        <div className="mx-auto max-w-[86rem]">
          <div className="flex flex-wrap items-end justify-between gap-6 border-b border-border pb-8">
            <h2 className="font-serif text-4xl text-foreground sm:text-5xl">The Houses</h2>
            <Link to="/stays" className="eyebrow text-muted-foreground hover:text-foreground">
              View the catalog
            </Link>
          </div>
          <div className="mt-14 grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
            {PROPERTIES.slice(0, 3).map((property) => (
              <PropertyCard key={property.slug} property={property} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-blush/40 px-6 py-28 lg:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <Ornament />
          <blockquote className="mt-10 font-serif text-3xl italic leading-[1.35] text-foreground sm:text-4xl lg:text-5xl">
            “The good linen goes on the bed. The good bottle gets opened. The invitation gets
            accepted.”
          </blockquote>
          <p className="eyebrow mt-10 text-muted-foreground">Tenet IV · Nothing is saved for later</p>
        </div>
      </section>

      <section className="bg-primary px-6 py-32 text-primary-foreground lg:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow text-gold">Begin</p>
          <h2 className="mt-6 font-serif text-4xl leading-tight sm:text-5xl lg:text-6xl">
            Tell us which house would make you happy.
          </h2>
          <p className="mx-auto mt-8 max-w-xl text-base leading-[1.9] text-primary-foreground/70">
            Five residences, honest calendars, and a checkout that behaves as beautifully as the
            houses do — especially on a phone.
          </p>
          <Link
            to="/stays"
            className="eyebrow mt-12 inline-block border border-gold px-10 py-4 text-primary-foreground transition-colors duration-300 hover:bg-gold hover:text-primary"
          >
            Browse the catalog
          </Link>
        </div>
      </section>
    </>
  );
}
