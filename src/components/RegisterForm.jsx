import { useState } from "react";
import "./RegisterForm.css";

export default function RegisterForm({ onClose, onRegister }) {
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  });

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!userData.firstName || !userData.lastName || !userData.email || !userData.password || !userData.phone) {
      alert("Please fill in all fields.");
      return;
    }

    if (userData.password !== userData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    localStorage.setItem("registeredUser", JSON.stringify(userData));
    alert("Registration Successful! Redirecting to Login...");
    onRegister(); // This should navigate to the login section
    onClose();
  };

  return (
    <div className="register-modal">
      <div className="register-card">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={userData.firstName}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={userData.lastName}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={userData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={userData.password}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={userData.confirmPassword}
            onChange={handleChange}
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={userData.phone}
            onChange={handleChange}
            required
          />
          <button type="submit" className="register-btn">Register</button>
          <button type="button" className="close-btn" onClick={onClose}>Close</button>
        </form>
      </div>
    </div>
  );
}
