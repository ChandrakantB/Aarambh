import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaTicketAlt } from "react-icons/fa";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import "./HomePage.css";


export default function HomePage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    date: "",
    departure: "",
    arrival: "",
  });

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) setIsLoggedIn(true);
  }, []);

  const cities = [
    "Delhi", "Mumbai", "Kolkata", "Chennai", "Bangalore", "Hyderabad", 
    "Pune", "Ahmedabad", "Jaipur", "Lucknow", "Chandigarh", "Bhopal",
    "Indore", "Patna", "Surat", "Nagpur", "Thiruvananthapuram", "Visakhapatnam"
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      alert("Please log in to book tickets.");
      return;
    }
    if (!formData.departure || !formData.arrival || !formData.date) {
      alert("Please fill in all fields.");
      return;
    }
    navigate("/trains", { state: formData });
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    setShowLogin(false);
  };

  const handleRegister = () => {
    setShowRegister(false);
    setShowLogin(true);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="bg-white bg-opacity-90 shadow-md p-4 fixed w-full top-0 flex justify-between items-center z-50">
        <div className="text-2xl font-bold flex items-center space-x-2">
          <FaTicketAlt className="text-blue-500" />
          <span id="title">Smart Ticket</span>
        </div>
        <div className="nav-links space-x-4">
          <a id="login-btn" href="/" className="nav-item">Home</a>
          <a id="login-btn" href="/help" className="nav-item">Help</a>

          {!isLoggedIn ? (
            <>
              <button id="login-btn" className="nav-item small-btn" onClick={() => setShowLogin(true)}>Login</button>
              <button  className="nav-item register-btn" onClick={() => setShowRegister(true)}>Register</button>

            </>
          ) : (
            <button id="login-btn" className="nav-item small-btn" onClick={() => {
              localStorage.removeItem("user");
              setIsLoggedIn(false);
            }}>Logout</button>
          )}
        </div>
      </nav>

      {/* Hero Section with Form */}
      <section className="hero-section">
        <h1 className="hero-title">The Future of Smart Ticketing 🚀</h1>
        <p className="hero-subtext">
          Book your tickets seamlessly with AI-powered recommendations, real-time availability, and secure blockchain verification.
        </p>

        {/* Booking Form */}
        <form onSubmit={handleSubmit} className="form-box">
          <label>Select Date:</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />

          <label>Departure City:</label>
          <select name="departure" value={formData.departure} onChange={handleChange} required>
            <option value="">Select Departure</option>
            {cities.map((city, index) => (
              <option key={index} value={city}>{city}</option>
            ))}
          </select>

          <label>Arrival City:</label>
          <select name="arrival" value={formData.arrival} onChange={handleChange} required>
            <option value="">Select Arrival</option>
            {cities.map((city, index) => (
              <option key={index} value={city}>{city}</option>
            ))}
          </select>

          <button type="submit" className="next-button">Next</button>
        </form>
      </section>

      {/* About Section */}
      <footer className="about-section">
        <h2>About Smart Ticket</h2>
        <p>Smart Ticket is a modern ticketing solution for travel and events, integrating AI, real-time booking insights, and fraud protection.</p>
        <div className="contact-info">
          <p>📍 Location: JABALPUR, INDIA </p>
          <p>📧 Email: support@smartticket.com</p>
          <p>📞 Contact: +91 123-456-7890</p>
        </div>
        <p className="copyright">© 2025 Smart Ticket. All rights reserved.</p>
      </footer>

      {/* Modals */}
      {showLogin && <LoginForm onClose={() => setShowLogin(false)} onLogin={handleLogin} />}
      {showRegister && <RegisterForm onClose={() => setShowRegister(false)} onRegister={handleRegister} />}
    </div>
  );
}
