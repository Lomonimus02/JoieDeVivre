import { type FormEvent, useMemo, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { JourneySteps, QuoteList } from "@/components/BookingChrome";
import { formatRange, uid } from "@/lib/utils";
import { useBooking } from "@/store/booking";

type Step = "details" | "payment";

export function CheckoutPage() {
  const navigate = useNavigate();
  const { draft, property, room, quote, nights, guests, setStay } = useBooking();
  const [step, setStep] = useState<Step>("details");
  const [error, setError] = useState("");
  const [card, setCard] = useState("4242 4242 4242 4242");
  const [expiry, setExpiry] = useState("12 / 28");
  const [cvc, setCvc] = useState("123");

  const ready = Boolean(
    property && room && draft.checkIn && draft.checkOut && quote && nights > 0,
  );

  const due = useMemo(() => {
    if (!quote) return 0;
    return draft.payInFull ? quote.total : quote.deposit;
  }, [quote, draft.payInFull]);

  if (!ready || !property || !room || !quote) {
    return <Navigate to="/stays" replace />;
  }

  const onDetails = (event: FormEvent) => {
    event.preventDefault();
    const { firstName, lastName, email } = draft.guest;
    if (!firstName.trim() || !lastName.trim() || !email.includes("@")) {
      setError("A name and a working email, if you would.");
      return;
    }
    setError("");
    setStep("payment");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const onPay = (event: FormEvent) => {
    event.preventDefault();
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
    navigate("/confirmed");
  };

  return (
    <div className="px-6 pb-24 pt-12 lg:px-10">
      <div className="mx-auto max-w-[86rem]">
        <JourneySteps current={step === "details" ? 3 : 4} />
        <h1 className="mt-10 font-serif text-4xl sm:text-5xl">
          {step === "details" ? "Who is arriving?" : "How would you like to pay?"}
        </h1>
        <p className="mt-4 max-w-xl text-base leading-[1.9] text-muted-foreground">
          {step === "details"
            ? "The stay is held while you finish. We will send the house notes to this address."
            : "This is a prototype. No charge is made. Use any 16 digits — 4242 works, as it always has."}
        </p>

        <div className="mt-12 grid gap-14 lg:grid-cols-[minmax(0,1fr)_22rem]">
          <div>
            {step === "details" ? (
              <form onSubmit={onDetails} className="space-y-8">
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
                <div className="grid gap-6 sm:grid-cols-2">
                  <Field
                    label="Telephone"
                    type="tel"
                    value={draft.guest.phone}
                    autoComplete="tel"
                    onChange={(phone) => setStay({ guest: { ...draft.guest, phone } })}
                  />
                  <Field
                    label="Country of residence"
                    value={draft.guest.country}
                    autoComplete="country-name"
                    onChange={(country) => setStay({ guest: { ...draft.guest, country } })}
                  />
                </div>
                <label className="block">
                  <span className="eyebrow text-muted-foreground">Anything we should know</span>
                  <textarea
                    rows={4}
                    value={draft.guest.requests}
                    onChange={(e) =>
                      setStay({ guest: { ...draft.guest, requests: e.target.value } })
                    }
                    className="mt-3 w-full border-b border-input bg-transparent py-3 outline-none"
                    placeholder="Late arrival, a birthday, a fear of stairs…"
                  />
                </label>
                {error && <p className="text-sm text-blush-deep">{error}</p>}
                <div className="flex flex-wrap gap-4">
                  <button
                    type="submit"
                    className="eyebrow bg-primary px-10 py-4 text-primary-foreground hover:bg-gold hover:text-primary"
                  >
                    Continue to payment
                  </button>
                  <Link
                    to={`/stays/${property.slug}/dates`}
                    className="eyebrow border border-gold px-10 py-4"
                  >
                    Edit dates
                  </Link>
                </div>
              </form>
            ) : (
              <form onSubmit={onPay} className="space-y-8">
                <fieldset className="space-y-4">
                  <legend className="eyebrow text-gold">Amount due now</legend>
                  <label className="flex cursor-pointer items-start gap-4 border border-border p-5">
                    <input
                      type="radio"
                      name="pay"
                      checked={!draft.payInFull}
                      onChange={() => setStay({ payInFull: false })}
                      className="mt-1 accent-gold"
                    />
                    <span>
                      <span className="block font-serif text-2xl">Hold with 30%</span>
                      <span className="mt-1 block text-sm text-muted-foreground">
                        Balance due 14 days before arrival. The house is confirmed either way.
                      </span>
                    </span>
                  </label>
                  <label className="flex cursor-pointer items-start gap-4 border border-border p-5">
                    <input
                      type="radio"
                      name="pay"
                      checked={draft.payInFull}
                      onChange={() => setStay({ payInFull: true })}
                      className="mt-1 accent-gold"
                    />
                    <span>
                      <span className="block font-serif text-2xl">Pay in full</span>
                      <span className="mt-1 block text-sm text-muted-foreground">
                        For guests who prefer the matter closed.
                      </span>
                    </span>
                  </label>
                </fieldset>

                <Field
                  label="Name on card"
                  value={`${draft.guest.firstName} ${draft.guest.lastName}`.trim()}
                  onChange={() => undefined}
                  readOnly
                />
                <Field
                  label="Card number"
                  value={card}
                  inputMode="numeric"
                  autoComplete="cc-number"
                  onChange={(value) => setCard(formatCard(value))}
                />
                <div className="grid grid-cols-2 gap-6">
                  <Field
                    label="Expiry"
                    value={expiry}
                    autoComplete="cc-exp"
                    onChange={(value) => setExpiry(formatExpiry(value))}
                  />
                  <Field
                    label="CVC"
                    value={cvc}
                    inputMode="numeric"
                    autoComplete="cc-csc"
                    onChange={(value) => setCvc(value.replace(/\D/g, "").slice(0, 4))}
                  />
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  By confirming you agree to the house rules of {property.name}: no events without
                  notice, no smoking indoors, and the good bottle may be opened on a Tuesday.
                </p>
                {error && <p className="text-sm text-blush-deep">{error}</p>}
                <div className="flex flex-wrap gap-4">
                  <button
                    type="submit"
                    className="eyebrow bg-primary px-10 py-4 text-primary-foreground hover:bg-gold hover:text-primary"
                  >
                    Confirm · {due.toLocaleString("en-GB", { style: "currency", currency: "EUR", maximumFractionDigits: 0 })}
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep("details")}
                    className="eyebrow border border-gold px-10 py-4"
                  >
                    Back
                  </button>
                </div>
              </form>
            )}
          </div>

          <aside>
            <div className="border border-border bg-card p-7 lg:sticky lg:top-28">
              <img src={room.images[0]} alt="" className="aspect-[4/3] w-full object-cover" />
              <p className="eyebrow mt-5 text-gold">{property.location}</p>
              <h2 className="mt-2 font-serif text-3xl">{room.name}</h2>
              <p className="text-sm text-muted-foreground">{property.name}</p>
              <p className="mt-4 font-serif text-xl">
                {formatRange(draft.checkIn, draft.checkOut)}
              </p>
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
                Due now ·{" "}
                <span className="text-foreground">
                  {due.toLocaleString("en-GB", {
                    style: "currency",
                    currency: "EUR",
                    maximumFractionDigits: 0,
                  })}
                </span>
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
  readOnly,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  autoComplete?: string;
  inputMode?: "numeric";
  readOnly?: boolean;
}) {
  return (
    <label className="block">
      <span className="eyebrow text-muted-foreground">{label}</span>
      <input
        type={type}
        value={value}
        autoComplete={autoComplete}
        inputMode={inputMode}
        readOnly={readOnly}
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
