import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

const Dashboard = lazy(() => import("@/layouts/dashboard"));
const Ticket = lazy(() => import("./pages/dashboard/Ticket"));
const Invoice = lazy(() => import("./pages/dashboard/Invoice"));
const HotelBill = lazy(() => import("./pages/dashboard/HotelBill"));
const SignIn = lazy(() => import("./pages/auth/signIn"));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/dashboard/*" element={<Dashboard />} />
        <Route path="/ticket/:id" element={<Ticket />} />
        <Route path="/invoice/:id" element={<Invoice />} />
        <Route path="/hotel/bill/:id" element={<HotelBill />} />
        <Route path="/auth/signIn" element={<SignIn />} />
        <Route path="*" element={<Navigate to="/dashboard/home" replace />} />
      </Routes>
    </Suspense>
  );
}

export default App;
