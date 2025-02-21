import { useState } from "react";
import "./LoginForm.css";

export default function LoginForm({ onClose, onLogin }) {
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!credentials.email || !credentials.password) {
      alert("Please fill in all fields.");
      return;
    }
    localStorage.setItem("user", JSON.stringify(credentials)); // Save login state
    onLogin();
    onClose();
  };

  return (
    <div className="login-modal">
      <div className="login-card">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={credentials.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={credentials.password}
            onChange={handleChange}
            required
          />
          <button type="submit" className="login-btn">Login</button>
          <button type="button" className="close-btn" onClick={onClose}>Close</button>
        </form>
      </div>
    </div>
  );
}

