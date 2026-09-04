import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="border-t border-border bg-secondary/60">
      <div className="mx-auto max-w-[86rem] px-6 py-20 lg:px-10">
        <div className="grid gap-14 md:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <img
              src="/brand/logo-full.png"
              alt="The Joie de Vivre Collection"
              width={721}
              height={512}
              className="h-28 w-auto"
            />
            <p className="mt-6 max-w-sm font-serif text-xl italic leading-relaxed text-muted-foreground">
              A philosophy of living beautifully — gathered into residences, rituals, and
              celebrations across the world.
            </p>
          </div>
          <div>
            <h3 className="eyebrow text-muted-foreground">The Houses</h3>
            <ul className="mt-6 space-y-3">
              {[
                { to: "/stays", label: "All residences" },
                { to: "/rooms", label: "Rooms & suites" },
                { to: "/stays/villa-aurore", label: "Villa Aurore" },
                { to: "/stays/riad-zahra", label: "Riad Zahra" },
              ].map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="font-serif text-lg text-foreground/80 transition-colors hover:text-gold"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="eyebrow text-muted-foreground">Connect</h3>
            <ul className="mt-6 space-y-3">
              <li>
                <Link
                  to="/contact"
                  className="font-serif text-lg text-foreground/80 transition-colors hover:text-gold"
                >
                  Enquiries
                </Link>
              </li>
              <li>
                <a
                  href="mailto:hello@joiedevivrecollection.com"
                  className="font-serif text-lg text-foreground/80 transition-colors hover:text-gold"
                >
                  hello@joiedevivrecollection.com
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-16 flex flex-col gap-3 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="eyebrow text-muted-foreground">Private Residences · Timeless Experiences</p>
          <p className="eyebrow text-muted-foreground">
            © {new Date().getFullYear()} The Joie de Vivre Collection
          </p>
        </div>
      </div>
    </footer>
  );
}
