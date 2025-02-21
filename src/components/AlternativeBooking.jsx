import { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import "./AlternativeBooking.css";

const metroCity = "Metro City"; // Metro city as an intermediate stop

const alternativeOptions = [
  { type: "Train", from: "Departure", to: metroCity, seat: Math.floor(Math.random() * 50) + 1 },
  { type: "Bus", from: metroCity, to: "Arrival", seat: Math.floor(Math.random() * 30) + 1 },
];

export default function AlternativeBooking({ departure, arrival }) {
  const [passenger, setPassenger] = useState({ name: "", age: "", gender: "" });
  const [ticketGenerated, setTicketGenerated] = useState(false);
  const [selected, setSelected] = useState(false);
  const ticketID = `ALT-${Math.floor(100000 + Math.random() * 900000)}`;

  const handleSelection = () => {
    setSelected(true);
  };

  const handleBooking = () => {
    setTicketGenerated(true);
  };

  return (
    <div className="alternative-booking-container">
      {!selected ? (
        <div className="alternative-options">
          <h3>Alternative Travel Options</h3>
          {alternativeOptions.map((option, index) => (
            <div key={index} className="option-card">
              <p><strong>Type:</strong> {option.type}</p>
              <p><strong>From:</strong> {index === 0 ? departure : metroCity}</p>
              <p><strong>To:</strong> {index === 0 ? metroCity : arrival}</p>
              <p><strong>Seat:</strong> {option.seat}</p>
            </div>
          ))}
          <button className="smart-select-btn" onClick={handleSelection}>Smart Select</button>
        </div>
      ) : ticketGenerated ? (
        <div className="ticket booked">
          <h2>Your Alternative Ticket</h2>
          <p><strong>Passenger:</strong> {passenger.name}, {passenger.age} years, {passenger.gender}</p>
          <p><strong>Route:</strong> {departure} → {metroCity} → {arrival}</p>
          <p><strong>Seat Numbers:</strong> {alternativeOptions[0].seat}, {alternativeOptions[1].seat}</p>
          <p><strong>Ticket ID:</strong> {ticketID}</p>
          <QRCodeCanvas value={ticketID} size={120} />
        </div>
      ) : (
        <div className="booking-form">
          <h3>Enter Passenger Details</h3>
          <input type="text" placeholder="Name" value={passenger.name} onChange={(e) => setPassenger({ ...passenger, name: e.target.value })} />
          <input type="number" placeholder="Age" value={passenger.age} onChange={(e) => setPassenger({ ...passenger, age: e.target.value })} />
          <select value={passenger.gender} onChange={(e) => setPassenger({ ...passenger, gender: e.target.value })}>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          <button className="confirm-booking-btn" onClick={handleBooking}>Confirm Booking</button>
        </div>
      )}
    </div>
  );
}

