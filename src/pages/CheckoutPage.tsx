import { type FormEvent, useMemo, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { JourneySteps, QuoteList } from "@/components/BookingChrome";
import { Seo } from "@/components/Seo";
import { stayIsBookable } from "@/data/collection";
import { formatEuro, formatStayDates, uid } from "@/lib/utils";
import { paths } from "@/lib/paths";
import { useBooking } from "@/store/booking";

export function CheckoutPage() {
  const navigate = useNavigate();
  const { draft, property, room, quote, nights, guests, setStay } = useBooking();
  const [error, setError] = useState("");
  const [card, setCard] = useState("4242 4242 4242 4242");
  const [expiry, setExpiry] = useState("12 / 28");
  const [cvc, setCvc] = useState("123");

  const ready = Boolean(
    property &&
      room &&
      quote &&
      draft.agreedToTerms &&
      stayIsBookable(property, draft.checkIn, draft.checkOut, nights, guests, room.sleeps),
  );

  const due = useMemo(() => {
    if (!quote) return 0;
    return draft.payInFull ? quote.total : quote.deposit;
  }, [quote, draft.payInFull]);

  if (!ready || !property || !room || !quote) {
    return (
      <Navigate
        to={property ? paths.availability(property.slug) : paths.residences}
        replace
      />
    );
  }

  const onPay = (event: FormEvent) => {
    event.preventDefault();
    const { firstName, lastName, email } = draft.guest;
    if (!firstName.trim() || !lastName.trim() || !email.includes("@")) {
      setError("A name and a working email, if you would.");
      return;
    }
    const digits = card.replace(/\D/g, "");
    if (digits.length < 16 || expiry.replace(/\D/g, "").length < 4 || cvc.length < 3) {
      setError("The card details look incomplete.");
      return;
    }
    const confirmationId = uid("JDV");
    setStay({
      confirmationId,
      payment: {
        nameOnCard: `${draft.guest.firstName} ${draft.guest.lastName}`.trim(),
        last4: digits.slice(-4),
        brand: digits.startsWith("4") ? "Visa" : "Card",
      },
    });
    navigate(paths.confirmed);
  };

  return (
    <div className="px-6 pb-24 pt-12 lg:px-10">
      <Seo title="Secure checkout" description={`Complete your booking at ${property.name}.`} />
      <div className="mx-auto max-w-[86rem]">
        <JourneySteps current={3} />
        <h1 className="mt-10 font-serif text-4xl sm:text-5xl">Complete your booking</h1>
        <p className="mt-4 max-w-xl text-base leading-[1.9] text-muted-foreground">
          Guest details and a visual representation of a secure card payment. No charge is made.
        </p>

        <div className="mt-12 grid gap-14 lg:grid-cols-[minmax(0,1fr)_22rem]">
          <form onSubmit={onPay} className="space-y-12">
            <section>
              <p className="eyebrow text-gold">Guest information</p>
              <div className="mt-8 space-y-8">
                <div className="grid gap-6 sm:grid-cols-2">
                  <Field
                    label="First name"
                    value={draft.guest.firstName}
                    autoComplete="given-name"
                    onChange={(firstName) => setStay({ guest: { ...draft.guest, firstName } })}
                  />
                  <Field
                    label="Last name"
                    value={draft.guest.lastName}
                    autoComplete="family-name"
                    onChange={(lastName) => setStay({ guest: { ...draft.guest, lastName } })}
                  />
                </div>
                <Field
                  label="Email"
                  type="email"
                  value={draft.guest.email}
                  autoComplete="email"
                  onChange={(email) => setStay({ guest: { ...draft.guest, email } })}
                />
                <Field
                  label="Phone"
                  type="tel"
                  value={draft.guest.phone}
                  autoComplete="tel"
                  onChange={(phone) => setStay({ guest: { ...draft.guest, phone } })}
                />
              </div>
            </section>

            <section>
              <div className="flex flex-wrap items-end justify-between gap-4">
                <p className="eyebrow text-gold">Payment</p>
                <p className="eyebrow text-muted-foreground">Secure payment</p>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                Prototype only — use any 16 digits. 4242 works, as it always has.
              </p>
              <div className="mt-8 space-y-8">
                <Field
                  label="Card number"
                  value={card}
                  inputMode="numeric"
                  autoComplete="cc-number"
                  onChange={(value) => setCard(formatCard(value))}
                />
                <div className="grid grid-cols-2 gap-6">
                  <Field
                    label="Expiration"
                    value={expiry}
                    autoComplete="cc-exp"
                    onChange={(value) => setExpiry(formatExpiry(value))}
                  />
                  <Field
                    label="CVV"
                    value={cvc}
                    inputMode="numeric"
                    autoComplete="cc-csc"
                    onChange={(value) => setCvc(value.replace(/\D/g, "").slice(0, 4))}
                  />
                </div>
              </div>
            </section>

            {error && <p className="text-sm text-blush-deep">{error}</p>}
            <div className="flex flex-col gap-4 sm:flex-row">
              <button
                type="submit"
                className="eyebrow bg-primary px-10 py-4 text-primary-foreground hover:bg-gold hover:text-primary"
              >
                Complete Booking · {formatEuro(due)}
              </button>
              <Link to={paths.terms} className="eyebrow border border-gold px-10 py-4 text-center">
                Back to terms
              </Link>
            </div>
          </form>

          <aside>
            <div className="border border-border bg-card p-7 lg:sticky lg:top-28">
              <p className="eyebrow text-muted-foreground">Order summary</p>
              <img src={room.images[0]} alt={room.name} className="mt-5 aspect-[4/3] w-full object-cover" />
              <h2 className="mt-5 font-serif text-3xl">{property.name}</h2>
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
                Due now · <span className="font-serif text-xl text-foreground">{formatEuro(due)}</span>
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  autoComplete,
  inputMode,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  autoComplete?: string;
  inputMode?: "numeric";
}) {
  return (
    <label className="block">
      <span className="eyebrow text-muted-foreground">{label}</span>
      <input
        type={type}
        value={value}
        autoComplete={autoComplete}
        inputMode={inputMode}
        onChange={(e) => onChange(e.target.value)}
        className="mt-3 w-full border-b border-input bg-transparent py-3 text-lg outline-none"
      />
    </label>
  );
}

function formatCard(value: string) {
  return value
    .replace(/\D/g, "")
    .slice(0, 16)
    .replace(/(\d{4})(?=\d)/g, "$1 ");
}

function formatExpiry(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 4);
  if (digits.length <= 2) return digits;
  return `${digits.slice(0, 2)} / ${digits.slice(2)}`;
}
