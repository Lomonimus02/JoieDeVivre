import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { getProperty, getRoom, quoteStay, type Property, type Room } from "@/data/collection";

export type GuestDetails = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  requests: string;
};

export type PaymentDetails = {
  nameOnCard: string;
  last4: string;
  brand: string;
};

export type BookingDraft = {
  propertySlug?: string;
  roomSlug?: string;
  checkIn?: string;
  checkOut?: string;
  adults: number;
  children: number;
  guest: GuestDetails;
  payment?: PaymentDetails;
  confirmationId?: string;
  payInFull: boolean;
  agreedToTerms: boolean;
};

const emptyGuest: GuestDetails = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  country: "",
  requests: "",
};

const defaultDraft: BookingDraft = {
  adults: 2,
  children: 0,
  guest: emptyGuest,
  payInFull: false,
  agreedToTerms: false,
};

const STORAGE_KEY = "jdv-booking-draft";

function loadDraft(): BookingDraft {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultDraft;
    return { ...defaultDraft, ...JSON.parse(raw) };
  } catch {
    return defaultDraft;
  }
}

function saveDraft(draft: BookingDraft) {
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
}

type BookingContextValue = {
  draft: BookingDraft;
  property?: Property;
  room?: Room;
  guests: number;
  nights: number;
  quote?: ReturnType<typeof quoteStay>;
  setStay: (patch: Partial<BookingDraft>) => void;
  reset: () => void;
};

const BookingContext = createContext<BookingContextValue | null>(null);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [draft, setDraft] = useState<BookingDraft>(() =>
    typeof window === "undefined" ? defaultDraft : loadDraft(),
  );

  const setStay = (patch: Partial<BookingDraft>) => {
    setDraft((prev) => {
      const next = {
        ...prev,
        ...patch,
        guest: { ...prev.guest, ...(patch.guest ?? {}) },
      };
      saveDraft(next);
      return next;
    });
  };

  const reset = () => {
    setDraft(defaultDraft);
    sessionStorage.removeItem(STORAGE_KEY);
  };

  const property = draft.propertySlug ? getProperty(draft.propertySlug) : undefined;
  const room =
    draft.propertySlug && draft.roomSlug
      ? getRoom(draft.propertySlug, draft.roomSlug)
      : undefined;
  const guests = draft.adults + draft.children;
  const nights =
    draft.checkIn && draft.checkOut
      ? Math.max(
          0,
          Math.round(
            (new Date(draft.checkOut).getTime() - new Date(draft.checkIn).getTime()) /
              86_400_000,
          ),
        )
      : 0;
  const quote =
    property && nights > 0 ? quoteStay(property, nights, room, guests) : undefined;

  const value = useMemo(
    () => ({ draft, property, room, guests, nights, quote, setStay, reset }),
    [draft, property, room, guests, nights, quote],
  );

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
}

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error("useBooking must be used within BookingProvider");
  return ctx;
}
