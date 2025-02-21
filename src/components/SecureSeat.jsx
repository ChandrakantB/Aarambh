import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import QRCode from "qrcode.react"; // Ensure you have installed this package
import "./SecureSeat.css";

const randomCities = ["Jaipur", "Nagpur", "Surat", "Bhopal", "Pune", "Ahmedabad", "Chandigarh"];

const getRandomCity = (departure, arrival) => {
  let availableCities = randomCities.filter(city => city !== departure && city !== arrival);
  return availableCities[Math.floor(Math.random() * availableCities.length)];
};

export default function SecureSeat() {
  const location = useLocation();
  const navigate = useNavigate();
  const { departure, arrival } = location.state || {};

  const city1 = getRandomCity(departure, arrival);
  const seatNumber1 = Math.floor(Math.random() * 100) + 1;
  const seatNumber2 = Math.floor(Math.random() * 100) + 1;

  const [showBookingForm, setShowBookingForm] = useState(false);
  const [ticketGenerated, setTicketGenerated] = useState(false);
  const [passenger, setPassenger] = useState({ name: "", age: "", gender: "" });
  const [ticketID, setTicketID] = useState("");

  const handlePassengerSubmit = () => {
    if (passenger.name && passenger.age && passenger.gender) {
      setTicketID(`TICKET-${Math.floor(Math.random() * 100000)}`);
      setTicketGenerated(true);
    } else {
      alert("Please fill all passenger details.");
    }
  };

  return (
    <div className="secure-seat-container">
      <h2>Smart Secure Booking</h2>
      <h3>Your Seat Allocation:</h3>

      <div className="secure-seat-options">
        <div className="seat-card premium-card">
          <h3>{departure} ➝ {city1}</h3>
          <p>Seat Number: {seatNumber1}</p>
        </div>
        <div className="seat-card premium-card">
          <h3>{city1} ➝ {arrival}</h3>
          <p>Seat Number: {seatNumber2}</p>
        </div>
      </div>

      {/* Buttons to Accept or Decline */}
      <div className="confirmation-section">
        <h4>Would you like to proceed?</h4>
        <button className="premium-button" onClick={() => setShowBookingForm(true)}>Yes</button>
        <button className="premium-button" onClick={() => navigate(-1)}>No</button>
      </div>

      {/* Passenger Booking Form */}
      {showBookingForm && !ticketGenerated && (
        <div className="passenger-form premium-card">
          <h3>Enter Passenger Details</h3>
          <input type="text" placeholder="Name" value={passenger.name} onChange={(e) => setPassenger({ ...passenger, name: e.target.value })} />
          <input type="number" placeholder="Age" value={passenger.age} onChange={(e) => setPassenger({ ...passenger, age: e.target.value })} />
          <select value={passenger.gender} onChange={(e) => setPassenger({ ...passenger, gender: e.target.value })}>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          <button className="premium-button" onClick={handlePassengerSubmit}>Generate Ticket</button>
        </div>
      )}

      {/* Ticket Display with QR Code */}
      {ticketGenerated && (
        <div className="ticket-section premium-card">
          <h3>Your Ticket</h3>
          <p><strong>Passenger:</strong> {passenger.name}, {passenger.age} years, {passenger.gender}</p>
          <p><strong>Ticket ID:</strong> {ticketID}</p>
          <QRCode value={ticketID} />
        </div>
      )}
    </div>
  );
}
