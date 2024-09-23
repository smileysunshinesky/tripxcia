import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, Auth } from "@/layouts";
import Ticket from "./pages/dashboard/Ticket";
import Invoice from "./pages/dashboard/Invoice";
import { SignIn } from "./pages/auth";
import HotelBill from "./pages/dashboard/HotelBill";

function App() {
  return (
    <Routes>
      <Route path="/dashboard/*" element={<Dashboard />} />
      <Route path="/ticket/:id" element={<Ticket/>} />
      <Route path="/invoice/:id" element={<Invoice />} />
      <Route path='/hotel/bill/:id' element={<HotelBill />} />
      <Route path="/auth/signIn" element={<SignIn />} />
      <Route path="*" element={<Navigate to="/dashboard/home" replace />} />
    </Routes>
  );
}

export default App;
