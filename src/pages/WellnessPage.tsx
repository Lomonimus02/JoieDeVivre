import { Link } from "react-router-dom";
import { Seo } from "@/components/Seo";
import { paths } from "@/lib/paths";

const chapters = [
  {
    title: "Hospitality",
    image: "/brand/hero-terrace.jpg",
    imageAlt: "A terrace set for a long lunch",
    text: "The good linen goes on the bed. The cellar is stocked before you arrive. Someone has thought about the hour you will want to be left alone — and the hour you will want a glass poured without asking.",
  },
  {
    title: "Wellness",
    image: "/brand/pillar-wellness.jpg",
    imageAlt: "Water, shade and a quiet courtyard",
    text: "Not a menu of treatments. A hammam used slowly. A pool that holds the night’s cool until ten. Rooms that become wells in the afternoon. The body remembers how to rest when the house does not hurry it.",
  },
  {
    title: "Longevity",
    image: "/brand/pillar-residences.jpg",
    imageAlt: "A limewashed house among pines",
    text: "A stay measured in mornings, not checkboxes. The Collection is built for people who intend to feel the week in their bones — and to return to the same table, the same fountain, the same two hours of light.",
  },
  {
    title: "Exploration",
    image: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "A village lane in late afternoon",
    text: "The village is twelve minutes on a bicycle we actually expect you to use. The baker still leaves bread if you write a note. The lane to the riad is easy to miss. Joy, more often than not, is a short walk from a house that knows how to wait.",
  },
];

export function WellnessPage() {
  return (
    <div className="pb-28">
      <Seo
        title="Wellness, longevity and exploration"
        description="The Joie de Vivre Collection is a hospitality and lifestyle house — wellness, longevity and exploration gathered into private residences."
      />

      <section className="px-6 pt-16 lg:px-10">
        <div className="mx-auto max-w-[86rem]">
          <p className="eyebrow text-gold">The life of the house</p>
          <h1 className="mt-5 max-w-3xl font-serif text-5xl leading-[0.98] sm:text-6xl">
            Wellness is how a house
            <span className="block italic text-gold">behaves.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-base leading-[1.95] text-muted-foreground">
            The Collection is an international hospitality and lifestyle house — residences first,
            and around them a way of spending time: hospitality, wellness, longevity and exploration.
          </p>
        </div>
      </section>

      <div className="mx-auto mt-20 max-w-[86rem] space-y-28 px-6 lg:px-10">
        {chapters.map((chapter, index) => (
          <article
            key={chapter.title}
            className={`grid items-center gap-12 lg:grid-cols-2 lg:gap-20 ${
              index % 2 === 1 ? "lg:[&>img]:order-first" : ""
            }`}
          >
            <div>
              <p className="eyebrow text-gold">0{index + 1}</p>
              <h2 className="mt-4 font-serif text-4xl sm:text-5xl">{chapter.title}</h2>
              <p className="mt-6 text-base leading-[1.95] text-muted-foreground">{chapter.text}</p>
            </div>
            <img src={chapter.image} alt={chapter.imageAlt} className="aspect-[4/5] w-full object-cover" />
          </article>
        ))}
      </div>

      <section className="mt-28 px-6 lg:px-10">
        <div className="mx-auto max-w-3xl border-t border-border pt-16 text-center">
          <h2 className="font-serif text-4xl">Begin with a house.</h2>
          <p className="mx-auto mt-6 max-w-xl text-muted-foreground">
            The philosophy is easier to feel from a terrace than from a page.
          </p>
          <Link
            to={paths.residences}
            className="eyebrow mt-10 inline-block border border-gold px-10 py-4 hover:bg-gold hover:text-primary-foreground"
          >
            Explore the Collection
          </Link>
        </div>
      </section>
    </div>
  );
}
