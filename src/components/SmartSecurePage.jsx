import { useLocation } from "react-router-dom";
import "./SecureSeat.css";


const metroCities = ["Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai", "Kolkata"];

const getMetroCity = (departure, arrival) => {
  let availableCities = metroCities.filter(city => city !== departure && city !== arrival);
  return availableCities[Math.floor(Math.random() * availableCities.length)];
};

export default function SecureSeat() {
  const location = useLocation();
  const { departure, arrival } = location.state || {};

  const metroCity = getMetroCity(departure, arrival);
  const seatNumber1 = Math.floor(Math.random() * 100) + 1;
  const seatNumber2 = Math.floor(Math.random() * 100) + 1;

  return (
    <div className="secure-seat-container">
      <h2>Smart Secure Booking</h2>
      <h3>Travel seamlessly with two different seats:</h3>
      
      <div className="secure-seat-options">
        <div className="seat-card">
          <h3>{departure} ➝ {metroCity}</h3>
          <p>Seat Number: <strong>{seatNumber1}</strong></p>
        </div>
        <div className="seat-card">
          <h3>{metroCity} ➝ {arrival}</h3>
          <p>Seat Number: <strong>{seatNumber2}</strong></p>
        </div>
      </div>

      <button className="back-btn" onClick={() => window.history.back()}>
        Back to Booking
      </button>
    </div>
  );
}
