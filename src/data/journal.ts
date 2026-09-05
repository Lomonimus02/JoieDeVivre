const img = (id: string, w = 1600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export type JournalArticle = {
  slug: string;
  title: string;
  eyebrow: string;
  excerpt: string;
  date: string;
  image: string;
  imageAlt: string;
  residenceSlug?: string;
  body: string[];
};

export const JOURNAL: JournalArticle[] = [
  {
    slug: "nothing-is-saved-for-later",
    title: "Nothing is saved for later",
    eyebrow: "Tenet IV",
    excerpt:
      "The good linen, the good bottle, the invitation accepted. A short note on why the Collection refuses to treat joy as a reward.",
    date: "12 August 2026",
    image: "/brand/hero-terrace.jpg",
    imageAlt: "A villa terrace at golden hour, linen curtains moving in the breeze",
    body: [
      "We keep a short list of tenets, and the fourth is the one guests remember. The good linen goes on the bed. The good bottle gets opened. The invitation gets accepted. Nothing is saved for a more deserving occasion.",
      "A house in the Collection is not a showroom. It is a place where the week is allowed to be the occasion. That is why the calendars are honest, why the cellar is stocked before you arrive, and why we would rather leave a night empty than pretend it is free.",
      "If you are looking for a stay that behaves like a later, this is not it. Come when you can. The plane tree will still be there.",
    ],
  },
  {
    slug: "a-week-in-the-luberon",
    title: "A week in the Luberon",
    eyebrow: "Villa Aurore",
    excerpt:
      "Long lunches under a plane tree older than the Republic, and a kitchen built for six pairs of hands.",
    date: "3 July 2026",
    image: img("photo-1600585154340-0ef3d699c2d0"),
    imageAlt: "Provence stone house and garden light",
    residenceSlug: "villa-aurore",
    body: [
      "Villa Aurore was built for a silk merchant who wanted the hills more than the town. Guests still come for the hush — and for the table that has hosted a hundred slow evenings.",
      "Mornings begin with the pool, which holds the night’s cool until ten. Lunch is taken under the plane tree, always, unless it is raining properly. The cellar is stocked with grower champagne and a local red we refuse to put on a list.",
      "You do not need a programme. You need a few unhurried nights and a house that already knows what to do with them.",
    ],
  },
  {
    slug: "the-method-of-rest",
    title: "Rest is the method",
    eyebrow: "Wellness",
    excerpt:
      "A hammam used slowly, a fountain that has not stopped since 1934, and a courtyard that does the hosting.",
    date: "19 June 2026",
    image: img("photo-1489749798305-4fea3ae63d43"),
    imageAlt: "A quiet courtyard with water and shade",
    residenceSlug: "riad-zahra",
    body: [
      "Riad Zahra sits on a lane you will miss the first time. Inside: citrus, shade, and tilework we refused to refresh. The house sleeps eight if everyone is fond of each other, six if they are not.",
      "Mint tea arrives at the hour the light hits the west wall. The hammam is private to the house — book it for dawn if you can bear to wake. This is what we mean by wellness: not a treatment list, but a building that lets the body remember how to rest.",
      "Longevity, if it is anything practical, is a week spent this way — and the decision to return.",
    ],
  },
];

export function getArticle(slug: string) {
  return JOURNAL.find((article) => article.slug === slug);
}
