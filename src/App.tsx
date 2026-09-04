import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { BookingProvider } from "@/store/booking";
import { HomePage } from "@/pages/HomePage";
import { CatalogPage } from "@/pages/CatalogPage";
import { PropertyPage } from "@/pages/PropertyPage";
import { RoomPage } from "@/pages/RoomPage";
import { RoomsCatalogPage } from "@/pages/RoomsCatalogPage";
import { CalendarPage } from "@/pages/CalendarPage";
import { CheckoutPage } from "@/pages/CheckoutPage";
import { ConfirmationPage } from "@/pages/ConfirmationPage";
import { ContactPage } from "@/pages/ContactPage";

export default function App() {
  return (
    <BookingProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/stays" element={<CatalogPage />} />
            <Route path="/rooms" element={<RoomsCatalogPage />} />
            <Route path="/stays/:slug" element={<PropertyPage />} />
            <Route path="/stays/:slug/rooms/:roomSlug" element={<RoomPage />} />
            <Route path="/stays/:slug/dates" element={<CalendarPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/confirmed" element={<ConfirmationPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </BookingProvider>
  );
}
