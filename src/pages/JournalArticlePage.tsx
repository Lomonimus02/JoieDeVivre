import { Link, Navigate, useParams } from "react-router-dom";
import { Ornament } from "@/components/Ornament";
import { Seo } from "@/components/Seo";
import { getArticle } from "@/data/journal";
import { getProperty } from "@/data/collection";
import { paths } from "@/lib/paths";

export function JournalArticlePage() {
  const { slug = "" } = useParams();
  const article = getArticle(slug);
  const residence = article?.residenceSlug ? getProperty(article.residenceSlug) : undefined;

  if (!article) return <Navigate to={paths.journal} replace />;

  return (
    <article className="px-6 pb-28 pt-16 lg:px-10">
      <Seo title={article.title} description={article.excerpt} image={article.image} />
      <div className="mx-auto max-w-3xl">
        <Link to={paths.journal} className="eyebrow text-muted-foreground">
          ← Journal
        </Link>
        <p className="eyebrow mt-10 text-gold">
          {article.eyebrow} · {article.date}
        </p>
        <h1 className="mt-5 font-serif text-5xl leading-[0.98] sm:text-6xl">{article.title}</h1>
        <p className="mt-8 font-serif text-2xl italic leading-relaxed text-muted-foreground">
          {article.excerpt}
        </p>
      </div>
      <div className="mx-auto mt-14 max-w-[86rem]">
        <img src={article.image} alt={article.imageAlt} className="aspect-[16/9] w-full object-cover" />
      </div>
      <div className="mx-auto mt-16 max-w-3xl space-y-6 text-base leading-[1.95] text-muted-foreground">
        {article.body.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
      {residence && (
        <div className="mx-auto mt-16 max-w-3xl border-t border-border pt-12">
          <Ornament className="justify-start" />
          <p className="mt-8 eyebrow text-gold">Stay here</p>
          <h2 className="mt-4 font-serif text-4xl">{residence.name}</h2>
          <p className="mt-3 text-muted-foreground">{residence.location}</p>
          <Link
            to={paths.residence(residence.slug)}
            className="eyebrow mt-8 inline-block border border-gold px-10 py-4 hover:bg-gold hover:text-primary-foreground"
          >
            Explore Residence
          </Link>
        </div>
      )}
    </article>
  );
}
