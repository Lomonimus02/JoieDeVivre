import { Link } from "react-router-dom";
import { Ornament } from "@/components/Ornament";
import { PropertyCard } from "@/components/PropertyCard";
import { Seo } from "@/components/Seo";
import { PROPERTIES } from "@/data/collection";
import { FOUNDER } from "@/data/founder";
import { JOURNAL } from "@/data/journal";
import { paths } from "@/lib/paths";

const pillars = [
  {
    title: "Wellness",
    text: "A hammam used slowly. A pool that holds the night’s cool. Shade, water, and a house that lets the body remember how to rest.",
    href: paths.wellness,
  },
  {
    title: "Longevity",
    text: "A stay measured in mornings. The Collection is for people who intend to feel the week in their bones — and to return.",
    href: paths.wellness,
  },
  {
    title: "Exploration",
    text: "The village is twelve minutes. The lane is easy to miss. Joy is often a short walk from a house that knows how to wait.",
    href: paths.journal,
  },
];

export function HomePage() {
  return (
    <>
      <Seo
        title="The Joie de Vivre Collection | Private Residences"
        description="A collection of private residences across France, Morocco, Italy, London and the Portuguese coast — composed around hospitality, wellness, longevity and exploration."
        image="/brand/hero-terrace.jpg"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "The Joie de Vivre Collection",
          url: "https://joiedevivrecollection.com",
          founder: {
            "@type": "Person",
            name: FOUNDER.name,
            url: "https://joiedevivrecollection.com/about",
          },
        }}
      />

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
        <div className="relative mx-auto w-full max-w-4xl text-center rise">
          <img
            src="/brand/logo-full.png"
            alt="The Joie de Vivre Collection"
            className="mx-auto h-36 w-auto sm:h-48"
          />
          <h1 className="mt-10 font-serif text-3xl italic leading-[1.3] text-foreground sm:text-4xl lg:text-[2.75rem]">
            A house, a few unhurried nights,
            <br className="hidden sm:block" /> composed around joy.
          </h1>
          <p className="mx-auto mt-8 max-w-xl text-base leading-[1.9] text-muted-foreground">
            Private residences with a memory — not hotels. Hospitality, wellness, longevity and
            exploration, gathered into houses you can actually book.
          </p>
          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              to={paths.residences}
              className="eyebrow w-full border border-gold bg-primary px-10 py-4 text-center text-primary-foreground transition-colors hover:bg-gold hover:text-primary sm:w-auto"
            >
              Explore the Collection
            </Link>
            <Link
              to={`${paths.residences}#find`}
              className="eyebrow w-full border border-gold px-10 py-4 text-center text-foreground transition-colors hover:bg-gold hover:text-primary-foreground sm:w-auto"
            >
              Find Your Residence
            </Link>
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
              Discover, residence, calendar, confirmation — nothing saved for later.
            </p>
          </div>
        </div>
      </section>

      <section id="the-collection" className="px-6 pb-28 lg:px-10">
        <div className="mx-auto max-w-[86rem]">
          <div className="flex flex-wrap items-end justify-between gap-6 border-b border-border pb-8">
            <div>
              <p className="eyebrow text-gold">The Collection</p>
              <h2 className="mt-4 font-serif text-4xl text-foreground sm:text-5xl">The Residences</h2>
            </div>
            <Link to={paths.residences} className="eyebrow text-muted-foreground hover:text-foreground">
              View all residences
            </Link>
          </div>
          <div className="mt-14 grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
            {PROPERTIES.map((property) => (
              <PropertyCard key={property.slug} property={property} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-secondary/50 px-6 py-28 lg:px-10">
        <div className="mx-auto max-w-[86rem]">
          <p className="eyebrow text-gold">The life of the house</p>
          <h2 className="mt-5 max-w-3xl font-serif text-4xl leading-[1.05] sm:text-5xl">
            Wellness, longevity,
            <span className="italic text-gold"> exploration.</span>
          </h2>
          <div className="mt-16 grid gap-16 md:grid-cols-3">
            {pillars.map((pillar) => (
              <article key={pillar.title}>
                <h3 className="font-serif text-3xl">{pillar.title}</h3>
                <p className="mt-5 text-base leading-[1.95] text-muted-foreground">{pillar.text}</p>
                <Link to={pillar.href} className="eyebrow mt-6 inline-block border-b border-gold pb-1">
                  Read on
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-28 lg:px-10">
        <div className="mx-auto grid max-w-[86rem] items-center gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-24">
          <div>
            <p className="eyebrow text-gold">Meet the Founder</p>
            <h2 className="mt-5 font-serif text-4xl leading-[1.02] sm:text-5xl">{FOUNDER.name}</h2>
            <p className="mt-8 max-w-xl text-base leading-[1.95] text-muted-foreground">
              {FOUNDER.introduction}
            </p>
            <p className="mt-6 max-w-xl font-serif text-2xl italic leading-relaxed text-foreground">
              {FOUNDER.lede}
            </p>
            <Link
              to={paths.about}
              className="eyebrow mt-10 inline-block border border-gold px-10 py-4 transition-colors hover:bg-gold hover:text-primary-foreground"
            >
              Discover the Story
            </Link>
          </div>
          <img
            src={FOUNDER.portrait}
            alt={FOUNDER.portraitAlt}
            className="aspect-[4/5] w-full object-cover"
          />
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

      <section className="px-6 py-28 lg:px-10">
        <div className="mx-auto max-w-[86rem]">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="font-serif text-4xl sm:text-5xl">From the Journal</h2>
            <Link to={paths.journal} className="eyebrow text-muted-foreground hover:text-foreground">
              All essays
            </Link>
          </div>
          <div className="mt-14 grid gap-12 md:grid-cols-3">
            {JOURNAL.map((article) => (
              <article key={article.slug}>
                <Link to={paths.article(article.slug)} className="group block">
                  <img
                    src={article.image}
                    alt={article.imageAlt}
                    className="aspect-[4/5] w-full object-cover transition-transform duration-[1200ms] group-hover:scale-[1.03]"
                  />
                  <p className="eyebrow mt-6 text-gold">{article.eyebrow}</p>
                  <h3 className="mt-3 font-serif text-2xl leading-tight">{article.title}</h3>
                  <p className="mt-3 text-sm leading-[1.85] text-muted-foreground">{article.excerpt}</p>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-primary px-6 py-32 text-primary-foreground lg:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow text-gold">Begin</p>
          <h2 className="mt-6 font-serif text-4xl leading-tight sm:text-5xl lg:text-6xl">
            Tell us which house would make you happy.
          </h2>
          <p className="mx-auto mt-8 max-w-xl text-base leading-[1.9] text-primary-foreground/70">
            Five residences now — and a platform built for many more. Honest calendars, a clear
            price, and a checkout that behaves as beautifully as the houses do.
          </p>
          <Link
            to={paths.residences}
            className="eyebrow mt-12 inline-block border border-gold px-10 py-4 text-primary-foreground transition-colors duration-300 hover:bg-gold hover:text-primary"
          >
            Book a Residence
          </Link>
        </div>
      </section>
    </>
  );
}
