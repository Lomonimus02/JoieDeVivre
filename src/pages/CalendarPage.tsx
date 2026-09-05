import { useEffect } from "react";
import { Link, Navigate, useParams, useSearchParams } from "react-router-dom";
import { DateRangeCalendar } from "@/components/DateRangeCalendar";
import { JourneySteps, QuoteList, StickyBookBar } from "@/components/BookingChrome";
import { GuestStepper } from "@/components/GuestStepper";
import { Seo } from "@/components/Seo";
import { getProperty, getRoom, stayIsBookable } from "@/data/collection";
import { formatEuro, formatRange, formatStayDates } from "@/lib/utils";
import { paths } from "@/lib/paths";
import { useBooking } from "@/store/booking";

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
      roomSlug: roomFromQuery || draft.roomSlug || "entire-house",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [property?.slug, roomFromQuery]);

  const selectedRoom =
    (roomFromQuery ? getRoom(slug, roomFromQuery) : undefined) ??
    (draft.roomSlug ? getRoom(slug, draft.roomSlug) : undefined) ??
    (property ? getRoom(slug, "entire-house") : undefined);

  useEffect(() => {
    const cap = selectedRoom?.sleeps ?? property?.guests;
    if (!cap) return;
    if (draft.adults + draft.children > cap) {
      setStay({ adults: Math.min(draft.adults, cap), children: 0 });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedRoom?.slug]);

  const minNights = property?.minNights ?? 2;
  const capacity = selectedRoom?.sleeps ?? property?.guests ?? 0;
  const guests = draft.adults + draft.children;
  const childMax = Math.max(0, capacity - draft.adults);
  const ready = Boolean(
    property &&
      selectedRoom &&
      stayIsBookable(property, draft.checkIn, draft.checkOut, nights, guests, capacity),
  );

  const onDates = (checkIn?: string, checkOut?: string) => {
    setStay({ checkIn, checkOut, roomSlug: selectedRoom?.slug });
  };

  if (!property) return <Navigate to={paths.residences} replace />;

  return (
    <div className="px-6 pb-32 pt-12 lg:px-10 lg:pb-24">
      <Seo
        title={`Availability · ${property.name}`}
        description={`Check dates for ${property.name} in ${property.location}. Minimum stay ${minNights} nights.`}
      />
      <div className="mx-auto max-w-[86rem]">
        <JourneySteps current={1} />
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
              <legend className="eyebrow text-gold">Which stay</legend>
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
                    <span className="block font-serif text-2xl leading-tight">The entire residence</span>
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
                max={capacity}
                onChange={(adults) => {
                  const next = Math.min(adults, capacity);
                  setStay({
                    adults: next,
                    children: Math.min(draft.children, Math.max(0, capacity - next)),
                  });
                }}
              />
              <GuestStepper
                label="Children"
                value={draft.children}
                min={0}
                max={childMax}
                onChange={(children) => setStay({ children: Math.min(children, childMax) })}
              />
            </div>
            {ready && quote && (
              <div className="mt-10 border border-border bg-card p-6 lg:hidden">
                <p className="font-serif text-2xl">{formatStayDates(draft.checkIn, draft.checkOut)}</p>
                <QuoteList
                  nights={nights}
                  nightly={quote.nightly}
                  stay={quote.stay}
                  extra={quote.extra}
                  cleaning={quote.cleaning}
                  tax={quote.tax}
                  total={quote.total}
                />
                <Link
                  to={paths.terms}
                  className="eyebrow mt-8 block bg-primary px-6 py-4 text-center text-primary-foreground hover:bg-gold hover:text-primary"
                >
                  Continue to Booking
                </Link>
              </div>
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
                  to={paths.terms}
                  className="eyebrow mt-8 block bg-primary px-6 py-4 text-center text-primary-foreground hover:bg-gold hover:text-primary"
                >
                  Continue to Booking
                </Link>
              ) : (
                <p className="mt-8 text-sm leading-relaxed text-muted-foreground">
                  {draft.checkIn && draft.checkOut
                    ? "Those nights are not free, or the stay is shorter than the house allows."
                    : "Choose arrival, departure, and a room to continue."}
                </p>
              )}
            </div>
          </aside>
        </div>
      </div>

      {ready && <StickyBookBar to={paths.terms} cta="Continue" />}
    </div>
  );
}
