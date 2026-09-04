import { useEffect } from "react";
import { Link, Navigate, useParams, useSearchParams } from "react-router-dom";
import { DateRangeCalendar } from "@/components/DateRangeCalendar";
import { JourneySteps, QuoteList, StickyBookBar } from "@/components/BookingChrome";
import { getProperty, getRoom } from "@/data/collection";
import { formatEuro, formatRange } from "@/lib/utils";
import { useBooking } from "@/store/booking";
import { Minus, Plus } from "lucide-react";

export function CalendarPage() {
  const { slug = "" } = useParams();
  const [params] = useSearchParams();
  const property = getProperty(slug);
  const { draft, setStay, quote, nights } = useBooking();
  const roomFromQuery = params.get("room") ?? "";

  useEffect(() => {
    if (!property) return;
    setStay({
      propertySlug: property.slug,
      roomSlug: roomFromQuery || draft.roomSlug || property.rooms[0].slug,
    });
    // Seed from the URL once per house; later room taps live in booking state.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [property?.slug]);

  const selectedRoom =
    (draft.roomSlug ? getRoom(slug, draft.roomSlug) : undefined) ??
    (roomFromQuery ? getRoom(slug, roomFromQuery) : undefined) ??
    property?.rooms[0];

  const minNights = property?.minNights ?? 2;
  const ready = Boolean(draft.checkIn && draft.checkOut && selectedRoom && nights >= minNights);

  const onDates = (checkIn?: string, checkOut?: string) => {
    setStay({ checkIn, checkOut, roomSlug: selectedRoom?.slug });
  };

  if (!property) return <Navigate to="/stays" replace />;

  return (
    <div className="px-6 pb-32 pt-12 lg:px-10 lg:pb-24">
      <div className="mx-auto max-w-[86rem]">
        <JourneySteps current={2} />
        <p className="eyebrow mt-10 text-gold">{property.location}</p>
        <h1 className="mt-4 max-w-3xl font-serif text-4xl leading-[0.98] sm:text-5xl">
          When would you like {property.name}?
        </h1>
        <p className="mt-5 max-w-xl text-base leading-[1.9] text-muted-foreground">
          Tap an arrival, then a departure. Booked nights are struck through. The house asks for at
          least {minNights} nights.
        </p>

        <div className="mt-12 grid gap-14 lg:grid-cols-[minmax(0,1fr)_22rem]">
          <div>
            <DateRangeCalendar
              property={property}
              checkIn={draft.checkIn}
              checkOut={draft.checkOut}
              minNights={minNights}
              onChange={onDates}
            />

            <fieldset className="mt-14 border-t border-border pt-10">
              <legend className="eyebrow text-gold">Which room</legend>
              <div className="mt-6 grid gap-4">
                <button
                  type="button"
                  onClick={() => setStay({ roomSlug: "entire-house" })}
                  className={`flex gap-4 border p-4 text-left transition-colors ${
                    selectedRoom?.slug === "entire-house"
                      ? "border-gold bg-blush/30"
                      : "border-border hover:border-gold/50"
                  }`}
                >
                  <img src={property.images[0]} alt="" className="size-20 object-cover sm:size-24" />
                  <span className="min-w-0">
                    <span className="block font-serif text-2xl leading-tight">The entire house</span>
                    <span className="mt-1 block text-sm text-muted-foreground">
                      Sleeps {property.guests} · {formatEuro(property.fromNightly)} / night
                    </span>
                  </span>
                </button>
                {property.rooms.map((item) => {
                  const active = selectedRoom?.slug === item.slug;
                  return (
                    <button
                      key={item.slug}
                      type="button"
                      onClick={() => setStay({ roomSlug: item.slug })}
                      className={`flex gap-4 border p-4 text-left transition-colors ${
                        active ? "border-gold bg-blush/30" : "border-border hover:border-gold/50"
                      }`}
                    >
                      <img src={item.images[0]} alt="" className="size-20 object-cover sm:size-24" />
                      <span className="min-w-0">
                        <span className="block font-serif text-2xl leading-tight">{item.name}</span>
                        <span className="mt-1 block text-sm text-muted-foreground">
                          Sleeps {item.sleeps} · {formatEuro(item.nightly)} / night
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </fieldset>

            <div className="mt-10 flex flex-wrap items-center gap-8 border-t border-border pt-8">
              <GuestStepper
                label="Adults"
                value={draft.adults}
                min={1}
                max={selectedRoom?.sleeps ?? property.guests}
                onChange={(adults) => setStay({ adults })}
              />
              <GuestStepper
                label="Children"
                value={draft.children}
                min={0}
                max={4}
                onChange={(children) => setStay({ children })}
              />
            </div>
            {ready && (
              <Link
                to="/checkout"
                className="eyebrow mt-10 block bg-primary px-6 py-4 text-center text-primary-foreground hover:bg-gold hover:text-primary lg:hidden"
              >
                Continue to checkout
              </Link>
            )}
          </div>

          <aside className="hidden lg:block">
            <div className="sticky top-28 border border-border bg-card p-8">
              <p className="eyebrow text-muted-foreground">Your stay</p>
              <h2 className="mt-3 font-serif text-3xl">{selectedRoom?.name}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{property.name}</p>
              <p className="mt-6 font-serif text-xl">
                {draft.checkIn
                  ? formatRange(draft.checkIn, draft.checkOut)
                  : "Dates still open"}
              </p>
              {quote && (
                <QuoteList
                  nights={nights}
                  nightly={quote.nightly}
                  stay={quote.stay}
                  extra={quote.extra}
                  cleaning={quote.cleaning}
                  tax={quote.tax}
                  total={quote.total}
                />
              )}
              {ready ? (
                <Link
                  to="/checkout"
                  className="eyebrow mt-8 block bg-primary px-6 py-4 text-center text-primary-foreground hover:bg-gold hover:text-primary"
                >
                  Continue to checkout
                </Link>
              ) : (
                <p className="mt-8 text-sm leading-relaxed text-muted-foreground">
                  Choose arrival, departure, and a room to continue.
                </p>
              )}
            </div>
          </aside>
        </div>
      </div>

      {ready && <StickyBookBar to="/checkout" cta="Checkout" />}
    </div>
  );
}

function GuestStepper({
  label,
  value,
  min,
  max,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
}) {
  return (
    <div>
      <p className="eyebrow text-muted-foreground">{label}</p>
      <div className="mt-3 flex items-center gap-3">
        <button
          type="button"
          className="flex size-10 items-center justify-center border border-border disabled:opacity-30"
          disabled={value <= min}
          onClick={() => onChange(Math.max(min, value - 1))}
        >
          <Minus className="size-4" />
        </button>
        <span className="w-6 text-center font-serif text-xl">{value}</span>
        <button
          type="button"
          className="flex size-10 items-center justify-center border border-border disabled:opacity-30"
          disabled={value >= max}
          onClick={() => onChange(Math.min(max, value + 1))}
        >
          <Plus className="size-4" />
        </button>
      </div>
    </div>
  );
}
