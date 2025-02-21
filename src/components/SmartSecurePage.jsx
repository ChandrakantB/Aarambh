import { useLocation } from "react-router-dom";
import "./SecureSeat.css";

const randomCities = [
  "Jaipur", "Nagpur", "Surat", "Bhopal", "Pune", "Ahmedabad", "Chandigarh"
];

const getRandomCity = (departure, arrival) => {
  let availableCities = randomCities.filter(city => city !== departure && city !== arrival);
  return availableCities[Math.floor(Math.random() * availableCities.length)];
};

export default function SecureSeat() {
  const location = useLocation();
  const { departure, arrival } = location.state || {};

  const city1 = getRandomCity(departure, arrival);
  const city2 = getRandomCity(departure, arrival);
  const seatNumber1 = Math.floor(Math.random() * 100) + 1;
  const seatNumber2 = Math.floor(Math.random() * 100) + 1;

  return (
    <div className="secure-seat-container">
      <h2>Smart Secure Booking</h2>
      <h3>If you want to take the journey with two different seats:</h3>
      <div className="secure-seat-options">
        <div className="seat-card">
          <h3>{departure} ➝ {city1}</h3>
          <p>Seat Number: {seatNumber1}</p>
        </div>
        <div className="seat-card">
          <h3>{city1} ➝ {arrival}</h3>
          <p>Seat Number: {seatNumber2}</p>
        </div>
      </div>
    </div>
  );
}
