import { Link } from "react-router-dom";
import { allRooms } from "@/data/collection";
import { RoomCard } from "@/components/RoomCard";
import { Seo } from "@/components/Seo";
import { paths } from "@/lib/paths";

export function RoomsCatalogPage() {
  const listings = allRooms();

  return (
    <div className="px-6 pb-28 pt-16 lg:px-10">
      <Seo
        title="Rooms & suites"
        description="Sleeping rooms across The Joie de Vivre Collection — named like people, reserved on their own."
      />
      <div className="mx-auto max-w-[86rem]">
        <p className="eyebrow text-gold">Rooms & suites</p>
        <h1 className="mt-5 max-w-3xl font-serif text-5xl leading-[0.98] tracking-tight sm:text-6xl">
          Sleeping rooms,
          <span className="block italic text-gold">named like people.</span>
        </h1>
        <p className="mt-8 max-w-2xl text-base leading-[1.9] text-muted-foreground">
          Each chamber in the Collection is its own stay. Choose a room first if you already know
          how you like to sleep — or begin with the house.
        </p>
        <Link to={paths.residences} className="eyebrow mt-8 inline-block border-b border-gold pb-1">
          Prefer the houses
        </Link>

        <div className="mt-16 grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
          {listings.map(({ property, room }) => (
            <div key={`${property.slug}-${room.slug}`}>
              <p className="mb-4 eyebrow text-muted-foreground">{property.name}</p>
              <RoomCard property={property} room={room} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
