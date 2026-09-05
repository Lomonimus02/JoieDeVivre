import { Link } from "react-router-dom";
import { Seo } from "@/components/Seo";
import { JOURNAL } from "@/data/journal";
import { paths } from "@/lib/paths";

export function JournalPage() {
  return (
    <div className="px-6 pb-28 pt-16 lg:px-10">
      <Seo
        title="Journal"
        description="Notes from The Joie de Vivre Collection — houses, tenets, and the unhurried week."
      />
      <div className="mx-auto max-w-[86rem]">
        <p className="eyebrow text-gold">Journal</p>
        <h1 className="mt-5 max-w-3xl font-serif text-5xl leading-[0.98] sm:text-6xl">
          Notes from the houses.
          <span className="block italic text-gold">Nothing saved for later.</span>
        </h1>
        <p className="mt-8 max-w-2xl text-base leading-[1.9] text-muted-foreground">
          Short essays from the Collection — residences, rituals, and the tenets we keep.
        </p>

        <div className="mt-16 grid gap-16 md:grid-cols-2 lg:grid-cols-3">
          {JOURNAL.map((article) => (
            <article key={article.slug}>
              <Link to={paths.article(article.slug)} className="group block">
                <img
                  src={article.image}
                  alt={article.imageAlt}
                  className="aspect-[4/5] w-full object-cover transition-transform duration-[1200ms] group-hover:scale-[1.03]"
                />
                <p className="eyebrow mt-6 text-gold">{article.date}</p>
                <h2 className="mt-3 font-serif text-3xl leading-tight">{article.title}</h2>
                <p className="mt-4 text-sm leading-[1.85] text-muted-foreground">{article.excerpt}</p>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
