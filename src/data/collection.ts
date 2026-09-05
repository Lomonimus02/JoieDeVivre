import { addDays, isoDate, parseIso } from "@/lib/utils";

export type Amenity = {
  id: string;
  label: string;
};

export type Room = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  sleeps: number;
  beds: string;
  sizeSqm: number;
  nightly: number;
  images: string[];
  amenities: string[];
};

export type Property = {
  slug: string;
  name: string;
  location: string;
  country: string;
  region: string;
  tagline: string;
  description: string;
  longDescription: string;
  quote: string;
  guests: number;
  bedrooms: number;
  bathrooms: number;
  minNights: number;
  fromNightly: number;
  cleaningFee: number;
  touristTaxPerNight: number;
  images: string[];
  amenities: string[];
  story: string[];
  rooms: Room[];
  booked: string[];
};

const img = (id: string, w = 1600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const AMENITIES: Record<string, Amenity> = {
  pool: { id: "pool", label: "Private pool" },
  kitchen: { id: "kitchen", label: "Kitchen for lingering" },
  cellar: { id: "cellar", label: "Stocked cellar" },
  linen: { id: "linen", label: "Proper linen" },
  wifi: { id: "wifi", label: "Quiet wifi" },
  fireplace: { id: "fireplace", label: "Fireplace" },
  garden: { id: "garden", label: "Garden & terrace" },
  hammam: { id: "hammam", label: "Hammam" },
  rooftop: { id: "rooftop", label: "Rooftop" },
  staff: { id: "staff", label: "Housekeeper" },
  breakfast: { id: "breakfast", label: "Breakfast basket" },
  parking: { id: "parking", label: "Parking" },
  bath: { id: "bath", label: "Deep bath" },
  sea: { id: "sea", label: "Near the sea" },
  village: { id: "village", label: "Walk to the village" },
  piano: { id: "piano", label: "Piano" },
  courtyard: { id: "courtyard", label: "Courtyard" },
  shutters: { id: "shutters", label: "Blackout shutters" },
};

function bookedAround(seeds: Array<[number, number, number, number]>) {
  const dates: string[] = [];
  for (const [y, m, d, nights] of seeds) {
    const start = new Date(y, m - 1, d);
    for (let i = 0; i < nights; i += 1) {
      const cur = new Date(start);
      cur.setDate(start.getDate() + i);
      const iso = `${cur.getFullYear()}-${String(cur.getMonth() + 1).padStart(2, "0")}-${String(cur.getDate()).padStart(2, "0")}`;
      dates.push(iso);
    }
  }
  return dates;
}

export const PROPERTIES: Property[] = [
  {
    slug: "villa-aurore",
    name: "Villa Aurore",
    location: "Luberon, Provence",
    country: "France",
    region: "Provence",
    tagline: "An eighteenth-century bastide above the lavender plain.",
    description:
      "Long lunches under the plane tree, a kitchen built for six pairs of hands, and shutters that keep the afternoon exactly where it should be.",
    longDescription:
      "Villa Aurore was built for a silk merchant who wanted the hills more than the town. We kept the original doorframes, the slightly crooked staircase, and the limewash that goes rose at six o’clock. What you come for is the hush — and the table that has hosted a hundred slow evenings.",
    quote: "Beauty may draw you in. Character makes you want to stay.",
    guests: 12,
    bedrooms: 6,
    bathrooms: 5,
    minNights: 3,
    fromNightly: 890,
    cleaningFee: 280,
    touristTaxPerNight: 8,
    images: [
      "/brand/hero-terrace.jpg",
      img("photo-1600585154340-0ef3d699c2d0"),
      img("photo-1600210492486-724fe5c67fb0"),
      img("photo-1616594039964-ae9021a400a0"),
      img("photo-1600566753190-17f0baa2a6c3"),
      img("photo-1600607687939-ce8a6c25118c"),
    ],
    amenities: ["pool", "kitchen", "cellar", "garden", "linen", "fireplace", "staff", "breakfast", "parking", "shutters"],
    story: [
      "The plane tree is older than the Republic. Lunch is taken under it, always, unless it is raining properly.",
      "The cellar is stocked with grower champagne and a local red we refuse to put on a list.",
      "Mornings begin with the pool, which holds the night’s cool until ten.",
    ],
    booked: bookedAround([
      [2026, 9, 12, 5],
      [2026, 9, 26, 4],
      [2026, 10, 8, 6],
      [2026, 10, 24, 3],
    ]),
    rooms: [
      {
        slug: "chambre-de-lavande",
        name: "Chambre de Lavande",
        tagline: "East light, linen, and the first view of the plain.",
        description:
          "A high-ceilinged room with original parquet, a dressing alcove, and a window that opens onto lavender if you time it right. The bed faces the shutters, which is the entire point.",
        sleeps: 2,
        beds: "King, dressed in stonewashed linen",
        sizeSqm: 32,
        nightly: 420,
        images: [
          img("photo-1618773928121-c32242e63f39"),
          img("photo-1631049307264-da0ec9d70304"),
          img("photo-1578683010236-d716f9a3f461"),
        ],
        amenities: ["linen", "shutters", "bath"],
      },
      {
        slug: "the-plane-tree-suite",
        name: "The Plane Tree Suite",
        tagline: "For the people who linger longest at the table.",
        description:
          "A connecting suite looking onto the courtyard: one king, one twin, a writing desk that has never once been used for writing. Built for a family, or for two couples who know each other well.",
        sleeps: 4,
        beds: "King + twin, or two queens",
        sizeSqm: 48,
        nightly: 680,
        images: [
          img("photo-1590490360182-c0cfff4b1c0d"),
          img("photo-1505693416388-ac5ce068fe85"),
          img("photo-1600585154526-990dced4db0d"),
        ],
        amenities: ["linen", "fireplace", "garden"],
      },
      {
        slug: "the-garden-room",
        name: "The Garden Room",
        tagline: "A quieter corner, with its own door to the rosemary.",
        description:
          "Ground-floor, independent, and slightly separate from the house — which guests either love immediately or come to love by the second morning. A deep bath. No clock.",
        sleeps: 2,
        beds: "Queen",
        sizeSqm: 26,
        nightly: 360,
        images: [
          img("photo-1616594039964-ae9021a400a0"),
          img("photo-1600573472592-401b489a3cdc"),
          img("photo-1584132967334-10e028bd69f7"),
        ],
        amenities: ["bath", "garden", "linen"],
      },
    ],
  },
  {
    slug: "riad-zahra",
    name: "Riad Zahra",
    location: "Medina, Marrakech",
    country: "Morocco",
    region: "Marrakech",
    tagline: "Cool zellige courtyards and a fountain that has not stopped in ninety years.",
    description:
      "A rooftop for the call to prayer at dusk, rooms arranged around water, and a hammam that is used as it was meant to be used — slowly, and without conversation.",
    longDescription:
      "Riad Zahra sits on a lane you will miss the first time. That is by design. Inside: citrus, shade, and tilework we refused to ‘refresh’. The house sleeps eight if everyone is fond of each other, six if they are not. Either way, the courtyard does the hosting.",
    quote: "Rest is not the reward for a life well lived. It is the method.",
    guests: 8,
    bedrooms: 4,
    bathrooms: 4,
    minNights: 2,
    fromNightly: 640,
    cleaningFee: 160,
    touristTaxPerNight: 6,
    images: [
      img("photo-1489749798305-4fea3ae63d43"),
      img("photo-1533106497176-45ae19e68ba2"),
      "/brand/pillar-wellness.jpg",
      img("photo-1518684079-3c830dcef090"),
      img("photo-1548013146-72479768bada"),
      img("photo-1566073771259-6a8506099945"),
    ],
    amenities: ["hammam", "rooftop", "courtyard", "cellar", "staff", "breakfast", "linen", "wifi"],
    story: [
      "The fountain has not been silent since 1934. We had it looked at. It was fine.",
      "Mint tea is not optional. It arrives at the hour the light hits the west wall.",
      "The hammam is private to the house. Book it for dawn if you can bear to wake.",
    ],
    booked: bookedAround([
      [2026, 9, 8, 4],
      [2026, 9, 19, 3],
      [2026, 10, 2, 5],
      [2026, 10, 18, 4],
    ]),
    rooms: [
      {
        slug: "courtyard-suite",
        name: "Courtyard Suite",
        tagline: "Doors onto water. Sleep to the fountain.",
        description:
          "The principal room, with a carved ceiling and a bed that faces the courtyard rather than a wall. In the afternoon the shutters stay closed, and the room becomes a well.",
        sleeps: 2,
        beds: "King",
        sizeSqm: 38,
        nightly: 390,
        images: [
          img("photo-1571896349842-33c89424de2d"),
          img("photo-1611892440504-42a792e24d32"),
          img("photo-1582719478250-c89cae4dc85b"),
        ],
        amenities: ["courtyard", "linen", "bath"],
      },
      {
        slug: "rooftop-chamber",
        name: "Rooftop Chamber",
        tagline: "The last light, and the Atlas if the air is clear.",
        description:
          "Up a narrow stair, a room that is all terrace and sky. Best in the cooler months. A daybed outside is where most guests actually sleep until someone makes them come in.",
        sleeps: 2,
        beds: "Queen + daybed",
        sizeSqm: 22,
        nightly: 310,
        images: [
          img("photo-1520250497591-112f2f40a3f4"),
          img("photo-1540541338287-41700290dee6"),
          img("photo-1551882547-ff40c63fe5fa"),
        ],
        amenities: ["rooftop", "linen"],
      },
      {
        slug: "the-fountain-room",
        name: "The Fountain Room",
        tagline: "Grounded, tiled, and a little more private.",
        description:
          "A quieter chamber off the side patio, with a painted ceiling and a bath set into the floor. Chosen by guests who prefer the house’s hush to its rooftop.",
        sleeps: 2,
        beds: "King",
        sizeSqm: 28,
        nightly: 340,
        images: [
          img("photo-1600210492493-0946911123ea"),
          img("photo-1600607687644-c7171b42498b"),
          img("photo-1600566753086-00f18fb6b3ea"),
        ],
        amenities: ["bath", "linen", "courtyard"],
      },
    ],
  },
  {
    slug: "casa-delle-rose",
    name: "Casa delle Rose",
    location: "Valle d’Itria, Puglia",
    country: "Italy",
    region: "Puglia",
    tagline: "A whitewashed masseria with vaulted ceilings and an olive grove.",
    description:
      "Mornings that smell of bread from the village, a trullo roof you can climb, and a table that is always too long for the number of people you thought you invited.",
    longDescription:
      "Casa delle Rose was a working masseria until the 1970s. We kept the working kitchen, the stone floors that hold the day’s cool, and the rose garden that gives the house its slightly excessive name. The village is twelve minutes on a bicycle we actually expect you to use.",
    quote: "The good linen goes on the bed. The good bottle gets opened.",
    guests: 10,
    bedrooms: 5,
    bathrooms: 4,
    minNights: 3,
    fromNightly: 780,
    cleaningFee: 220,
    touristTaxPerNight: 7,
    images: [
      img("photo-1613977257363-707ba9348227"),
      img("photo-1523531294919-4bcd7c65e216"),
      img("photo-1516483638261-f4dbaf036963"),
      img("photo-1600596542815-ffad4c1539a9"),
      img("photo-1600047509807-ba8f99d2cdbc"),
      img("photo-1472220625704-91e1462799b2"),
    ],
    amenities: ["pool", "kitchen", "garden", "village", "cellar", "linen", "staff", "parking", "breakfast"],
    story: [
      "The olive oil on the table is from the trees you can see from the breakfast chairs.",
      "A baker in Cisternino leaves bread at the gate if you leave a note the night before.",
      "The vaulted rooms stay cool without theatre. Thick stone is still the best technology we have.",
    ],
    booked: bookedAround([
      [2026, 9, 4, 6],
      [2026, 9, 22, 5],
      [2026, 10, 10, 4],
      [2026, 10, 28, 3],
    ]),
    rooms: [
      {
        slug: "vaulted-suite",
        name: "Vaulted Suite",
        tagline: "The original master’s room, under a star vault.",
        description:
          "A cool, high room with a star-vaulted ceiling, a bed dressed in heavy linen, and a window onto the grove. In summer you sleep with the doors open onto the courtyard.",
        sleeps: 2,
        beds: "King",
        sizeSqm: 36,
        nightly: 410,
        images: [
          img("photo-1613490493576-7fde63acd811"),
          img("photo-1600210492486-724fe5c67fb0"),
          img("photo-1600585154340-0ef3d699c2d0"),
        ],
        amenities: ["linen", "garden", "bath"],
      },
      {
        slug: "olive-grove-room",
        name: "Olive Grove Room",
        tagline: "Morning light through the trees, and almost no reason to get up.",
        description:
          "A quieter room at the grove edge, with a writing table we have seen used, for once. Twins that can be joined. Particularly good for people who rise early and want the pool first.",
        sleeps: 2,
        beds: "Twins or king",
        sizeSqm: 24,
        nightly: 320,
        images: [
          img("photo-1590490360182-c0cfff4b1c0d"),
          img("photo-1578683010236-d716f9a3f461"),
          img("photo-1505693416388-ac5ce068fe85"),
        ],
        amenities: ["garden", "linen"],
      },
      {
        slug: "masseria-master",
        name: "The Masseria Master",
        tagline: "For the person who invited everyone else.",
        description:
          "The largest chamber: a sitting alcove, a bath with a view of roses, and enough wardrobe for a month. It is the room we give to the friend who organised the week.",
        sleeps: 2,
        beds: "King, extra daybed",
        sizeSqm: 44,
        nightly: 520,
        images: [
          img("photo-1631049307264-da0ec9d70304"),
          img("photo-1618773928121-c32242e63f39"),
          img("photo-1600573472592-401b489a3cdc"),
        ],
        amenities: ["bath", "linen", "fireplace"],
      },
    ],
  },
  {
    slug: "the-mews-house",
    name: "The Mews House",
    location: "Notting Hill, London",
    country: "United Kingdom",
    region: "London",
    tagline: "A cobbled lane, a scarlet door, and two hours of perfect afternoon light.",
    description:
      "A garden room that fills with light for exactly two hours each afternoon, a kitchen that knows how to host six, and the particular quiet of a mews that the rest of the city has forgotten.",
    longDescription:
      "The Mews House is the smallest house in the Collection, and the one guests write to us about most. It is not grand. It is precise: a scarlet door, a staircase with its own logic, and a garden room where the light behaves as if it had been directed. Portobello is four minutes. The house feels further.",
    quote: "The flawless is forgettable. Personality is the whole point.",
    guests: 4,
    bedrooms: 2,
    bathrooms: 2,
    minNights: 2,
    fromNightly: 540,
    cleaningFee: 120,
    touristTaxPerNight: 0,
    images: [
      img("photo-1464146072230-91cabc968266"),
      img("photo-1502672260266-1c1ef2d93688"),
      img("photo-1512917774080-9991f1c4c750"),
      img("photo-1512918728675-ed5a9ecdebfd"),
      img("photo-1522708323590-d24dbb6b0267"),
      img("photo-1493809842364-78817add7ffb"),
    ],
    amenities: ["kitchen", "garden", "fireplace", "wifi", "linen", "piano", "village"],
    story: [
      "The garden room is the reason the house exists in the Collection. Sit there from three to five. That is the instruction.",
      "There is a piano because a previous owner left it, and because London evenings sometimes require it.",
      "We do not pretend this is the countryside. It is London, done properly, at a human scale.",
    ],
    booked: bookedAround([
      [2026, 9, 10, 3],
      [2026, 9, 18, 4],
      [2026, 10, 1, 3],
      [2026, 10, 15, 5],
    ]),
    rooms: [
      {
        slug: "garden-room",
        name: "The Garden Room",
        tagline: "The two-hour light, and a bed that faces the fig.",
        description:
          "Not a bedroom in the usual sense — a garden room with a bed in it, which is better. Glass onto the courtyard, linen the colour of stone, and the fig tree as a roommate.",
        sleeps: 2,
        beds: "King",
        sizeSqm: 28,
        nightly: 320,
        images: [
          img("photo-1600210492486-724fe5c67fb0"),
          img("photo-1600585154526-990dced4db0d"),
          img("photo-1600566753190-17f0baa2a6c3"),
        ],
        amenities: ["garden", "linen", "fireplace"],
      },
      {
        slug: "scarlet-chamber",
        name: "The Scarlet Chamber",
        tagline: "Upstairs, quieter, with the lane as a soundtrack.",
        description:
          "The original bedroom, under the eaves, with a dressing room and a bath that looks at sky. You hear horses on the cobbles sometimes, which is not a metaphor — there is a mews stables still in use two doors down.",
        sleeps: 2,
        beds: "Queen",
        sizeSqm: 20,
        nightly: 260,
        images: [
          img("photo-1616594039964-ae9021a400a0"),
          img("photo-1578683010236-d716f9a3f461"),
          img("photo-1505693416388-ac5ce068fe85"),
        ],
        amenities: ["bath", "linen", "shutters"],
      },
    ],
  },
  {
    slug: "quinta-do-sol",
    name: "Quinta do Sol",
    location: "Comporta, Portugal",
    country: "Portugal",
    region: "Comporta",
    tagline: "Pine, salt air, and lime-washed walls. Ten minutes from the Atlantic.",
    description:
      "A hundred years from hurry. Sand in the hallway is considered correct. The house opens onto a deck, the deck onto pines, the pines onto a path that ends, eventually, in the sea.",
    longDescription:
      "Quinta do Sol is a low, limewashed house among umbrella pines, built for summers that refuse to end at Sunday. We added almost nothing: a better kitchen, deeper sofas, a cellar that understands vinho and champagne equally. The Atlantic is ten minutes by bicycle. Most guests take twenty, on purpose.",
    quote: "Joy arrives most often when we make room for it.",
    guests: 10,
    bedrooms: 5,
    bathrooms: 4,
    minNights: 4,
    fromNightly: 920,
    cleaningFee: 250,
    touristTaxPerNight: 5,
    images: [
      img("photo-1499793983690-e29da59ef1c2"),
      "/brand/pillar-residences.jpg",
      img("photo-1520250497591-112f2f40a3f4"),
      img("photo-1540541338287-41700290dee6"),
      img("photo-1600047509807-ba8f99d2cdbc"),
      img("photo-1600596542815-ffad4c1539a9"),
    ],
    amenities: ["pool", "sea", "kitchen", "garden", "cellar", "linen", "staff", "parking", "breakfast"],
    story: [
      "There is a speaker in the kitchen drawer and a playlist labelled ‘before dinner’. Use both.",
      "The pool is unheated. In September this is a virtue.",
      "A fisherman in Carrasqueira will sell you whatever came in that morning if you arrive before nine, and look as if you mean it.",
    ],
    booked: bookedAround([
      [2026, 9, 5, 7],
      [2026, 9, 20, 6],
      [2026, 10, 6, 5],
      [2026, 10, 22, 4],
    ]),
    rooms: [
      {
        slug: "atlantic-suite",
        name: "Atlantic Suite",
        tagline: "The largest room, and the one that hears the sea first.",
        description:
          "Limewashed, high-bedded, with a terrace onto the pines. The shutters do a particular trick at sunrise. Guests who stay a week usually stop setting an alarm.",
        sleeps: 2,
        beds: "King",
        sizeSqm: 40,
        nightly: 480,
        images: [
          img("photo-1618773928121-c32242e63f39"),
          img("photo-1582719478250-c89cae4dc85b"),
          img("photo-1571896349842-33c89424de2d"),
        ],
        amenities: ["linen", "garden", "shutters"],
      },
      {
        slug: "pine-room",
        name: "Pine Room",
        tagline: "Needles against the glass, and a cooler sleep.",
        description:
          "A shaded room on the grove side, with twin beds that join, and a door straight to the deck. Preferred by guests who swim before coffee.",
        sleeps: 2,
        beds: "Twins or king",
        sizeSqm: 22,
        nightly: 340,
        images: [
          img("photo-1590490360182-c0cfff4b1c0d"),
          img("photo-1631049307264-da0ec9d70304"),
          img("photo-1600607687939-ce8a6c25118c"),
        ],
        amenities: ["garden", "linen"],
      },
      {
        slug: "limewash-chamber",
        name: "Limewash Chamber",
        tagline: "White, quiet, and a bath you will not rush.",
        description:
          "The most interior room in the house — which, here, is a compliment. Thick walls, a deep tub, and almost no view, by design. For the person who came to Comporta to sleep.",
        sleeps: 2,
        beds: "Queen",
        sizeSqm: 26,
        nightly: 360,
        images: [
          img("photo-1600573472592-401b489a3cdc"),
          img("photo-1616594039964-ae9021a400a0"),
          img("photo-1578683010236-d716f9a3f461"),
        ],
        amenities: ["bath", "linen", "shutters"],
      },
    ],
  },
];

export const REGIONS = [...new Set(PROPERTIES.map((p) => p.region))];

export function getProperty(slug: string) {
  return PROPERTIES.find((p) => p.slug === slug);
}

export function entireHouse(property: Property): Room {
  return {
    slug: "entire-house",
    name: `The whole of ${property.name}`,
    tagline: "Every room, the kitchen, the garden — the house as it was meant to be kept.",
    description: property.longDescription,
    sleeps: property.guests,
    beds: `${property.bedrooms} bedrooms`,
    sizeSqm: property.rooms.reduce((sum, room) => sum + room.sizeSqm, 0),
    nightly: property.fromNightly,
    images: property.images.slice(0, 3),
    amenities: property.amenities.slice(0, 6),
  };
}

export function getRoom(propertySlug: string, roomSlug: string) {
  const property = getProperty(propertySlug);
  if (!property) return undefined;
  if (roomSlug === "entire-house") return entireHouse(property);
  return property.rooms.find((r) => r.slug === roomSlug);
}

export function startingRate(property: Property) {
  return Math.min(...property.rooms.map((room) => room.nightly));
}

export function allRooms() {
  return PROPERTIES.flatMap((property) =>
    property.rooms.map((room) => ({ property, room })),
  );
}

export function amenityLabel(id: string) {
  return AMENITIES[id]?.label ?? id;
}

export function rangeAvailable(property: Property, from: string, to: string) {
  const end = parseIso(to);
  let cursor = parseIso(from);
  while (cursor < end) {
    if (property.booked.includes(isoDate(cursor))) return false;
    cursor = addDays(cursor, 1);
  }
  return true;
}

export function stayIsBookable(
  property: Property,
  checkIn?: string,
  checkOut?: string,
  nights = 0,
  guests = 0,
  capacity?: number,
) {
  if (!checkIn || !checkOut || nights < property.minNights) return false;
  if (!rangeAvailable(property, checkIn, checkOut)) return false;
  if (capacity && guests > capacity) return false;
  return true;
}

export function quoteStay(
  property: Property,
  nights: number,
  room?: Room,
  guests = 2,
) {
  const nightly = room?.nightly ?? property.fromNightly;
  const stay = nightly * nights;
  const extraGuests = Math.max(0, guests - 2);
  const extra = extraGuests * 45 * nights;
  const tax = property.touristTaxPerNight * nights * guests;
  const total = stay + extra + property.cleaningFee + tax;
  return {
    nightly,
    nights,
    stay,
    extra,
    cleaning: property.cleaningFee,
    tax,
    total,
    deposit: Math.round(total * 0.3),
  };
}
