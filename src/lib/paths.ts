export const paths = {
  home: "/",
  residences: "/residences",
  residence: (slug: string) => `/residences/${slug}`,
  room: (slug: string, roomSlug: string) => `/residences/${slug}/rooms/${roomSlug}`,
  availability: (slug: string, room?: string) =>
    room ? `/residences/${slug}/availability?room=${room}` : `/residences/${slug}/availability`,
  rooms: "/rooms",
  terms: "/booking/terms",
  checkout: "/checkout",
  confirmed: "/confirmed",
  reservation: "/reservation",
  about: "/about",
  wellness: "/wellness",
  journal: "/journal",
  article: (slug: string) => `/journal/${slug}`,
  contact: "/contact",
} as const;
