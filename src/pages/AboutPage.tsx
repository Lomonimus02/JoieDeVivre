import { Link } from "react-router-dom";
import { Ornament } from "@/components/Ornament";
import { Seo } from "@/components/Seo";
import { FOUNDER } from "@/data/founder";
import { paths } from "@/lib/paths";

export function AboutPage() {
  return (
    <div className="pb-28">
      <Seo
        title={`${FOUNDER.name} | Founder of The Joie de Vivre Collection`}
        description={`${FOUNDER.name} is the founder of The Joie de Vivre Collection — a hospitality, wellness, longevity and exploration house. ${FOUNDER.introduction}`}
        image={FOUNDER.portrait}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Person",
          name: FOUNDER.name,
          jobTitle: FOUNDER.role,
          image: FOUNDER.portrait,
          worksFor: {
            "@type": "Organization",
            name: FOUNDER.collection,
          },
          url: "https://joiedevivrecollection.com/about",
        }}
      />

      <section className="px-6 pt-16 lg:px-10">
        <div className="mx-auto grid max-w-[86rem] items-end gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
          <div>
            <p className="eyebrow text-gold">Meet the Founder</p>
            <h1 className="mt-5 font-serif text-5xl leading-[0.95] sm:text-6xl lg:text-7xl">
              {FOUNDER.name}
            </h1>
            <p className="mt-6 font-serif text-2xl italic text-muted-foreground">
              Founder, {FOUNDER.collection}
            </p>
            <p className="mt-10 max-w-xl text-base leading-[1.95] text-muted-foreground">
              {FOUNDER.introduction}
            </p>
          </div>
          <img
            src={FOUNDER.portrait}
            alt={FOUNDER.portraitAlt}
            className="aspect-[4/5] w-full object-cover"
          />
        </div>
      </section>

      <section className="px-6 py-28 lg:px-10">
        <div className="mx-auto max-w-3xl">
          <Ornament className="justify-start" />
          <blockquote className="mt-10 font-serif text-3xl italic leading-[1.35] sm:text-4xl">
            “{FOUNDER.lede}”
          </blockquote>
          <div className="mt-14 space-y-6 text-base leading-[1.95] text-muted-foreground">
            {FOUNDER.story.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-secondary/50 px-6 py-28 lg:px-10">
        <div className="mx-auto max-w-[86rem]">
          <p className="eyebrow text-gold">Philosophy</p>
          <h2 className="mt-5 max-w-2xl font-serif text-4xl sm:text-5xl">
            How a house should behave.
          </h2>
          <div className="mt-16 grid gap-14 md:grid-cols-2">
            {FOUNDER.pillars.map((pillar) => (
              <article key={pillar.title} className="border-t border-border pt-8">
                <h3 className="font-serif text-3xl">{pillar.title}</h3>
                <p className="mt-5 text-base leading-[1.95] text-muted-foreground">{pillar.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-28 lg:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-serif text-4xl sm:text-5xl">The houses are waiting.</h2>
          <p className="mx-auto mt-6 max-w-xl text-base leading-[1.9] text-muted-foreground">
            If a week in one of them would make you happy, begin with the Collection — or write, and
            we will begin with you.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              to={paths.residences}
              className="eyebrow w-full border border-gold bg-primary px-10 py-4 text-center text-primary-foreground hover:bg-gold hover:text-primary sm:w-auto"
            >
              Explore the Collection
            </Link>
            <Link
              to={paths.contact}
              className="eyebrow w-full border border-gold px-10 py-4 text-center hover:bg-gold hover:text-primary-foreground sm:w-auto"
            >
              Write to Élise
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
