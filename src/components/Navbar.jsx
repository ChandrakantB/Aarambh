import { Link } from "react-router-dom";
import { FaTicketAlt } from "react-icons/fa";
import "./Navbar.css"; // Add styling here

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        <FaTicketAlt className="logo-icon" />
        <span><strong> <style color = "white"></style>Smart Ticket</strong></span>
      </div>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/help">Help</Link>
        <Link to="/login">Login</Link>
        <Link to="/register" className="register-btn">Register</Link>
      </div>
    </nav>
  );
}
