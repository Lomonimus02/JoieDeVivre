import { BrowserRouter, Navigate, Route, Routes, useParams } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { BookingProvider } from "@/store/booking";
import { HomePage } from "@/pages/HomePage";
import { CatalogPage } from "@/pages/CatalogPage";
import { PropertyPage } from "@/pages/PropertyPage";
import { RoomPage } from "@/pages/RoomPage";
import { RoomsCatalogPage } from "@/pages/RoomsCatalogPage";
import { CalendarPage } from "@/pages/CalendarPage";
import { TermsPage } from "@/pages/TermsPage";
import { CheckoutPage } from "@/pages/CheckoutPage";
import { ConfirmationPage } from "@/pages/ConfirmationPage";
import { ReservationPage } from "@/pages/ReservationPage";
import { ContactPage } from "@/pages/ContactPage";
import { AboutPage } from "@/pages/AboutPage";
import { WellnessPage } from "@/pages/WellnessPage";
import { JournalPage } from "@/pages/JournalPage";
import { JournalArticlePage } from "@/pages/JournalArticlePage";
import { paths } from "@/lib/paths";

function LegacyStayRedirect() {
  const { slug = "" } = useParams();
  return <Navigate to={paths.residence(slug)} replace />;
}

function LegacyDatesRedirect() {
  const { slug = "" } = useParams();
  return <Navigate to={paths.availability(slug)} replace />;
}

function LegacyRoomRedirect() {
  const { slug = "", roomSlug = "" } = useParams();
  return <Navigate to={paths.room(slug, roomSlug)} replace />;
}

export default function App() {
  return (
    <BookingProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path={paths.home} element={<HomePage />} />
            <Route path={paths.residences} element={<CatalogPage />} />
            <Route path="/residences/:slug" element={<PropertyPage />} />
            <Route path="/residences/:slug/rooms/:roomSlug" element={<RoomPage />} />
            <Route path="/residences/:slug/availability" element={<CalendarPage />} />
            <Route path={paths.rooms} element={<RoomsCatalogPage />} />
            <Route path={paths.terms} element={<TermsPage />} />
            <Route path={paths.checkout} element={<CheckoutPage />} />
            <Route path={paths.confirmed} element={<ConfirmationPage />} />
            <Route path={paths.reservation} element={<ReservationPage />} />
            <Route path={paths.about} element={<AboutPage />} />
            <Route path={paths.wellness} element={<WellnessPage />} />
            <Route path={paths.journal} element={<JournalPage />} />
            <Route path="/journal/:slug" element={<JournalArticlePage />} />
            <Route path={paths.contact} element={<ContactPage />} />
            <Route path="/stays" element={<Navigate to={paths.residences} replace />} />
            <Route path="/stays/:slug" element={<LegacyStayRedirect />} />
            <Route path="/stays/:slug/dates" element={<LegacyDatesRedirect />} />
            <Route path="/stays/:slug/availability" element={<LegacyDatesRedirect />} />
            <Route path="/stays/:slug/rooms/:roomSlug" element={<LegacyRoomRedirect />} />
            <Route path="*" element={<Navigate to={paths.home} replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </BookingProvider>
  );
}
