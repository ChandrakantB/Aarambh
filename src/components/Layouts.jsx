import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

export default function Layout() {
  return (
    <div>
      <Navbar /> {/* Navbar will stay constant */}
      <Outlet /> {/* This will render the current page */}
    </div>
  );
}
