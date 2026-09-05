import type { Property } from "@/data/collection";

export type ResidenceMeta = {
  sizeSqm: number;
  neighborhood: string;
  locationNote: string;
};

const META: Record<string, ResidenceMeta> = {
  "villa-aurore": {
    sizeSqm: 420,
    neighborhood: "A hill village above the Luberon plain, twenty minutes from Apt.",
    locationNote:
      "The house sits above the lavender plain, with the village a short walk down and Aix an hour when you want a city. Most guests do not.",
  },
  "riad-zahra": {
    sizeSqm: 280,
    neighborhood: "A quiet lane in the medina, a few turns from the usual route.",
    locationNote:
      "You will miss the door the first time. That is by design. Inside the walls: citrus, shade, and the Atlas on a clear evening from the roof.",
  },
  "casa-delle-rose": {
    sizeSqm: 390,
    neighborhood: "Valle d’Itria, twelve minutes by bicycle from the village.",
    locationNote:
      "A working masseria until the 1970s, still surrounded by the grove that fills the bottles on the table. Cisternino is close; the sea is a morning’s outing.",
  },
  "the-mews-house": {
    sizeSqm: 148,
    neighborhood: "A cobbled mews in Notting Hill, four minutes from Portobello.",
    locationNote:
      "London at a human scale. The lane is quiet enough that you hear horses from the stables two doors down. The garden room holds the afternoon light from three to five.",
  },
  "quinta-do-sol": {
    sizeSqm: 370,
    neighborhood: "Umbrella pines above Comporta, ten minutes from the Atlantic.",
    locationNote:
      "A low limewashed house among the pines. The path from the deck ends, eventually, in the sea. Sand in the hallway is considered correct.",
  },
};

export function residenceMeta(property: Property): ResidenceMeta {
  return (
    META[property.slug] ?? {
      sizeSqm: Math.round(property.rooms.reduce((sum, room) => sum + room.sizeSqm, 0) * 1.4),
      neighborhood: property.location,
      locationNote: property.description,
    }
  );
}

export function residenceOverview(property: Property) {
  const meta = residenceMeta(property);
  return `${property.guests} Guests · ${property.bedrooms} Bedrooms · ${property.bathrooms} Baths · ${meta.sizeSqm} m²`;
}
