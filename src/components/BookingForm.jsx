import { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import "./BookingForm.css";

export default function BookingForm({ train, onClose }) {
  const [passengers, setPassengers] = useState([{ name: "", age: "", gender: "" }]);
  const [confirmed, setConfirmed] = useState(false);
  const [totalFare, setTotalFare] = useState(0);

  const farePerPassenger = parseInt(train.price.replace("₹", ""), 10);

  const addPassenger = () => {
    setPassengers([...passengers, { name: "", age: "", gender: "" }]);
  };

  const removePassenger = (index) => {
    const updatedPassengers = passengers.filter((_, i) => i !== index);
    setPassengers(updatedPassengers);
  };

  const handleConfirmBooking = () => {
    setTotalFare(passengers.length * farePerPassenger);
    setConfirmed(true);
  };

  return (
    <div className="booking-modal">
      <div className="booking-card">
        {confirmed ? (
          // ✅ Ticket Generation
          <div className="ticket">
            <h2>🎟️ Train Ticket</h2>
            <p><strong>Train:</strong> {train.name}</p>
            <p><strong>From:</strong> {train.from} <strong>To:</strong> {train.to}</p>
            <p><strong>Departure:</strong> {train.time}</p>
            <p><strong>Duration:</strong> {train.duration}</p>
            <p><strong>Total Fare:</strong> ${totalFare}</p>
            <h3>Passengers:</h3>
            <ul>
              {passengers.map((p, index) => (
                <li key={index}>{p.name} (Age: {p.age}, {p.gender})</li>
              ))}
            </ul>
            {/* ✅ QR Code */}
            <QRCodeCanvas value={`Train: ${train.name}, Passengers: ${JSON.stringify(passengers)}`} size={120} />
            <button className="close-btn" onClick={onClose}>Close</button>
          </div>
        ) : (
          // ✅ Booking Form
          <>
            <h2>Booking for {train.name}</h2>
            <p><strong>From:</strong> {train.from} <strong>To:</strong> {train.to}</p>
            <p><strong>Departure Time:</strong> {train.time}</p>
            <form>
              {passengers.map((passenger, index) => (
                <div key={index} className="passenger-info">
                  <input
                    type="text"
                    placeholder="Name"
                    value={passenger.name}
                    onChange={(e) => {
                      const updatedPassengers = [...passengers];
                      updatedPassengers[index].name = e.target.value;
                      setPassengers(updatedPassengers);
                    }}
                  />
                  <input
                    type="number"
                    placeholder="Age"
                    value={passenger.age}
                    onChange={(e) => {
                      const updatedPassengers = [...passengers];
                      updatedPassengers[index].age = e.target.value;
                      setPassengers(updatedPassengers);
                    }}
                  />
                  <select
                    value={passenger.gender}
                    onChange={(e) => {
                      const updatedPassengers = [...passengers];
                      updatedPassengers[index].gender = e.target.value;
                      setPassengers(updatedPassengers);
                    }}
                  >
                    <option value="">Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                  {index > 0 && (
                    <button type="button" className="remove-btn" onClick={() => removePassenger(index)}>❌</button>
                  )}
                </div>
              ))}
              <button type="button" className="add-passenger-btn" onClick={addPassenger}>➕ Add Passenger</button>
              <h3>Total Fare: ${passengers.length * farePerPassenger}</h3>
              <button type="button" className="confirm-btn" onClick={handleConfirmBooking}>Confirm Booking</button>
              <button type="button" className="close-btn" onClick={onClose}>Close</button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
