import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useBooking } from "@/store/booking";
import { formatRange } from "@/lib/utils";

const links = [
  { to: "/stays", label: "The Houses" },
  { to: "/rooms", label: "Rooms" },
  { to: "/contact", label: "Enquire" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { draft } = useBooking();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const stayLabel =
    draft.checkIn && draft.checkOut
      ? formatRange(draft.checkIn, draft.checkOut)
      : draft.propertySlug
        ? "Your stay"
        : null;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled || open
          ? "border-b border-border bg-background/90 backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-[86rem] items-center justify-between px-5 py-4 lg:px-10">
        <Link to="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <img
            src="/brand/crest.png"
            alt="The Joie de Vivre Collection crest"
            width={588}
            height={464}
            className="h-9 w-auto md:h-10"
          />
          <span className="hidden font-serif text-lg leading-none tracking-[0.14em] text-foreground sm:block">
            JOIE DE VIVRE
          </span>
        </Link>

        <nav className="hidden items-center gap-9 lg:flex">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `eyebrow relative text-foreground/70 transition-colors hover:text-foreground ${
                  isActive ? "text-foreground" : ""
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
          {stayLabel && (
            <NavLink
              to={draft.propertySlug ? `/stays/${draft.propertySlug}/dates` : "/stays"}
              className="eyebrow text-gold"
            >
              {stayLabel}
            </NavLink>
          )}
          <Link
            to="/stays"
            className="eyebrow border border-gold px-5 py-2.5 text-foreground transition-colors duration-300 hover:bg-gold hover:text-primary-foreground"
          >
            Reserve a stay
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="lg:hidden"
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-background lg:hidden">
          <nav className="flex flex-col px-6 py-4">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="border-b border-border py-4 font-serif text-2xl text-foreground"
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/stays"
              className="eyebrow mt-6 border border-gold px-5 py-3.5 text-center text-foreground"
            >
              Reserve a stay
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
