import { Link, Navigate, useNavigate } from "react-router-dom";
import { JourneySteps, QuoteList } from "@/components/BookingChrome";
import { Seo } from "@/components/Seo";
import { stayIsBookable } from "@/data/collection";
import { HOUSE_POLICY } from "@/data/policies";
import { paths } from "@/lib/paths";
import { formatDay, formatEuro, formatStayDates } from "@/lib/utils";
import { useBooking } from "@/store/booking";

export function TermsPage() {
  const navigate = useNavigate();
  const { draft, property, room, quote, nights, guests, setStay } = useBooking();

  const ready = Boolean(
    property &&
      room &&
      quote &&
      stayIsBookable(property, draft.checkIn, draft.checkOut, nights, guests, room.sleeps),
  );

  if (!ready || !property || !room || !quote) {
    return (
      <Navigate
        to={property ? paths.availability(property.slug) : paths.residences}
        replace
      />
    );
  }

  const due = draft.payInFull ? quote.total : quote.deposit;

  const continueToPayment = () => {
    if (!draft.agreedToTerms) return;
    navigate(paths.checkout);
  };

  return (
    <div className="px-6 pb-24 pt-12 lg:px-10">
      <Seo title="Booking terms" description={`Review stay details and terms for ${property.name}.`} />
      <div className="mx-auto max-w-[86rem]">
        <JourneySteps current={2} />
        <h1 className="mt-10 font-serif text-4xl sm:text-5xl">Review your stay</h1>
        <p className="mt-4 max-w-xl text-base leading-[1.9] text-muted-foreground">
          Dates, price, and the terms of the house — then a secure payment screen. Nothing is charged
          in this prototype.
        </p>

        <div className="mt-12 grid gap-14 lg:grid-cols-[minmax(0,1fr)_22rem]">
          <div className="space-y-14">
            <section>
              <p className="eyebrow text-gold">Stay details</p>
              <dl className="mt-6 space-y-4">
                <Row label="Residence" value={property.name} />
                <Row label="Stay" value={room.name} />
                <Row label="Check-in" value={`${formatDay(draft.checkIn)} · from ${HOUSE_POLICY.checkIn}`} />
                <Row label="Check-out" value={`${formatDay(draft.checkOut)} · by ${HOUSE_POLICY.checkOut}`} />
                <Row label="Guests" value={`${guests} ${guests === 1 ? "guest" : "guests"}`} />
                <Row label="Nights" value={String(nights)} />
              </dl>
              <Link
                to={paths.availability(property.slug)}
                className="eyebrow mt-6 inline-block border-b border-gold pb-1"
              >
                Edit dates
              </Link>
            </section>

            <section>
              <p className="eyebrow text-gold">Payment options</p>
              <fieldset className="mt-6 space-y-4">
                <legend className="sr-only">How to pay</legend>
                <label className="flex cursor-pointer items-start gap-4 border border-border p-5">
                  <input
                    type="radio"
                    name="pay"
                    checked={draft.payInFull}
                    onChange={() => setStay({ payInFull: true })}
                    className="mt-1 accent-[oklch(68.35%_0.0765_82.4)]"
                  />
                  <span>
                    <span className="block font-serif text-2xl">Pay in full</span>
                    <span className="mt-1 block text-sm text-muted-foreground">
                      {formatEuro(quote.total)} now. For guests who prefer the matter closed.
                    </span>
                  </span>
                </label>
                <label className="flex cursor-pointer items-start gap-4 border border-border p-5">
                  <input
                    type="radio"
                    name="pay"
                    checked={!draft.payInFull}
                    onChange={() => setStay({ payInFull: false })}
                    className="mt-1 accent-[oklch(68.35%_0.0765_82.4)]"
                  />
                  <span>
                    <span className="block font-serif text-2xl">Pay 30% deposit</span>
                    <span className="mt-1 block text-sm text-muted-foreground">
                      {formatEuro(quote.deposit)} now. Balance due {HOUSE_POLICY.balanceDaysBefore}{" "}
                      days before arrival.
                    </span>
                  </span>
                </label>
              </fieldset>
            </section>

            <section>
              <p className="eyebrow text-gold">Cancellation policy</p>
              <ul className="mt-6 space-y-6">
                {HOUSE_POLICY.cancellation.map((item) => (
                  <li key={item.title} className="border-b border-border pb-5">
                    <p className="font-serif text-2xl">{item.title}</p>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <p className="eyebrow text-gold">Booking terms</p>
              <ul className="mt-6 space-y-3 text-sm leading-relaxed text-muted-foreground">
                {HOUSE_POLICY.terms.map((term) => (
                  <li key={term} className="border-b border-border pb-3">
                    {term}
                  </li>
                ))}
              </ul>
              <label className="mt-8 flex cursor-pointer items-start gap-4">
                <input
                  type="checkbox"
                  checked={draft.agreedToTerms}
                  onChange={(e) => setStay({ agreedToTerms: e.target.checked })}
                  className="mt-1 size-4 accent-[oklch(68.35%_0.0765_82.4)]"
                />
                <span className="font-serif text-lg leading-relaxed">
                  I agree to the booking terms
                </span>
              </label>
            </section>

            <button
              type="button"
              disabled={!draft.agreedToTerms}
              onClick={continueToPayment}
              className="eyebrow w-full bg-primary px-10 py-4 text-primary-foreground hover:bg-gold hover:text-primary disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto"
            >
              Continue to Secure Payment
            </button>
          </div>

          <aside>
            <div className="border border-border bg-card p-7 lg:sticky lg:top-28">
              <img src={room.images[0]} alt={room.name} className="aspect-[4/3] w-full object-cover" />
              <p className="eyebrow mt-5 text-gold">{property.location}</p>
              <h2 className="mt-2 font-serif text-3xl">{property.name}</h2>
              <p className="text-sm text-muted-foreground">{room.name}</p>
              <p className="mt-4 font-serif text-xl">{formatStayDates(draft.checkIn, draft.checkOut)}</p>
              <p className="text-sm text-muted-foreground">
                {nights} nights · {guests} {guests === 1 ? "guest" : "guests"}
              </p>
              <QuoteList
                nights={nights}
                nightly={quote.nightly}
                stay={quote.stay}
                extra={quote.extra}
                cleaning={quote.cleaning}
                tax={quote.tax}
                total={quote.total}
              />
              <p className="mt-4 text-sm text-muted-foreground">
                Due now · <span className="text-foreground">{formatEuro(due)}</span>
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col justify-between gap-1 border-b border-border pb-3 sm:flex-row sm:items-baseline">
      <dt className="eyebrow text-muted-foreground">{label}</dt>
      <dd className="font-serif text-xl">{value}</dd>
    </div>
  );
}
