const img = (id: string, w = 1200) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const FOUNDER = {
  name: "Élise Marchand",
  role: "Founder",
  collection: "The Joie de Vivre Collection",
  portrait: img("photo-1494790108377-be9c29b29330"),
  portraitAlt: "Élise Marchand, founder of The Joie de Vivre Collection",
  lede: "A house is not a product. It is a way of spending time — and time, spent well, is the only luxury that compounds.",
  introduction:
    "Élise Marchand founded The Joie de Vivre Collection after years of staying in places that photographed beautifully and felt like nobody lived there. The houses she keeps are chosen the same way a friend is chosen: you walk in, and something in you settles.",
  story: [
    "The Collection began with a single bastide in the Luberon and a refusal to treat hospitality as inventory. Élise had worked in houses that were technically perfect and emotionally vacant. She wanted the opposite: rooms with a memory, calendars that tell the truth, and a week composed around the guest rather than the channel.",
    "Each residence is still walked before it is named. If the kitchen cannot hold a long lunch, if the linen is a compromise, if the village has been edited out of the experience — it does not enter the Collection. Scale, when it comes, will follow the same rule.",
    "What guests often call wellness is, for her, simply how a house behaves: morning light, a pool that holds the night’s cool, a hammam used slowly, a path that ends in the sea. Longevity is the unhurried week. Exploration is the bicycle left by the gate, and the baker who still leaves bread if you write a note.",
  ],
  pillars: [
    {
      title: "Hospitality",
      text: "The good linen goes on the bed. The good bottle is opened. Someone has thought about the hour you arrive, and the hour you will want to be left alone.",
    },
    {
      title: "Wellness",
      text: "Not a menu of treatments — a house that lets the body remember how to rest. Water, shade, silence, and a kitchen that does not hurry you.",
    },
    {
      title: "Longevity",
      text: "A stay measured in mornings, not checkboxes. The Collection is built for people who intend to feel the week in their bones, and to return.",
    },
    {
      title: "Exploration",
      text: "The village is twelve minutes. The lane is easy to miss. Joy, more often than not, is a short walk from a house that knows how to wait.",
    },
  ],
};
