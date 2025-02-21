import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./TrainList.css";
import BookingForm from "./BookingForm.jsx";

const trainData = [
  { id: 1, name: "Rajdhani Express", from: "Mumbai", to: "Delhi", time: "06:00 AM", duration: "16h", price: "500" },
  { id: 2, name: "Rajdhani Express", from: "Chennai", to: "Kolkata", time: "06:00 AM", duration: "16h", price: "570" },
  { id: 3, name: "Rajdhani Express", from: "Bangalore", to: "Hyderabad", time: "06:00 AM", duration: "16h", price: "780" },
  { id: 4, name: "Shatabdi Express", from: "Pune", to: "Ahmedabad", time: "07:30 AM", duration: "12h", price: "245" },
  { id: 5, name: "Shatabdi Express", from: "Jaipur", to: "Lucknow", time: "07:30 AM", duration: "12h", price: "475" },
  { id: 6, name: "Shatabdi Express", from: "Mumbai", to: "Delhi", time: "07:30 AM", duration: "12h", price: "645" },
  { id: 7, name: "Shatabdi Express", from: "Delhi", to: "Chennai", time: "07:30 AM", duration: "12h", price: "945" },
  { id: 8, name: "Shatabdi Express", from: "Nagpur", to: "Chennai", time: "07:30 AM", duration: "12h", price: "845" },
  { id: 9, name: "Duronto Express", from: "Mumbai", to: "Delhi", time: "08:15 AM", duration: "18h", price: "655" },
  { id: 10, name: "Duronto Express", from: "Surat", to: "Nagpur", time: "08:15 AM", duration: "18h", price: "700" },
  { id: 11, name: "Duronto Express", from: "Bangalore", to: "Mumbai", time: "08:15 AM", duration: "18h", price: "876" },
  { id: 12, name: "Duronto Express", from: "Bangalore", to: "Indore", time: "08:15 AM", duration: "18h", price: "560" },
  { id: 13, name: "Garib Rath", from: "Hyderabad", to: "Pune", time: "09:00 AM", duration: "10h", price: "879" },
  { id: 14, name: "Garib Rath", from: "Bhopal", to: "Patna", time: "09:00 AM", duration: "10h", price: "786" },
  { id: 15, name: "Garib Rath", from: "Mumbai", to: "Delhi", time: "09:00 AM", duration: "10h", price: "487" },
  { id: 16, name: "Garib Rath", from: "Hyderabad", to: "Chandigarh", time: "09:00 AM", duration: "10h", price: "877" },
  { id: 17, name: "Tejas Express", from: "Delhi", to: "Mumbai", time: "10:30 AM", duration: "15h", price: "865" },
  { id: 18, name: "Tejas Express", from: "Mumbai", to: "Delhi", time: "10:30 AM", duration: "15h", price: "724" },
];

const markUnavailableTrains = (trains) => {
  return trains.map(train => ({
    ...train,
    noSeatsAvailable: Math.random() < 0.4, // 40% chance of a train having no seats
  }));
};

export default function TrainList({ departure, arrival, onNoDirectTrains }) {
  const [filteredTrains, setFilteredTrains] = useState([]);
  const [selectedTrain, setSelectedTrain] = useState(null);
  const [secureSeatTrain, setSecureSeatTrain] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const filtered = trainData.filter(train => train.from === departure && train.to === arrival);
    if (filtered.length === 0) {
      onNoDirectTrains();  // Trigger Smart Secure prompt when no direct trains exist
    }
    setFilteredTrains(markUnavailableTrains(filtered)); // Randomly mark some trains as full
  }, [departure, arrival, onNoDirectTrains]);

  return (
    <div className="train-list">
      {filteredTrains.length > 0 ? (
        filteredTrains.map(train => (
          <div key={train.id} className={`train-card ${train.noSeatsAvailable ? "no-seats" : ""}`}>
            <h2>{train.name}</h2>
            <p><strong>Departure:</strong> {train.from} at {train.time}</p>
            <p><strong>Duration:</strong> {train.duration}</p>
            <p><strong>Price:</strong> {train.price}</p>

            {train.noSeatsAvailable ? (
              <button className="secure-seat-btn" onClick={() => setSecureSeatTrain(train)}>
                Secure through Smart Secure
              </button>
            ) : (
              <button className="book-btn" onClick={() => setSelectedTrain(train)}>
                Book Now
              </button>
            )}
          </div>
        ))
      ) :
      //  (
        <p style={{ fontSize: '16px', color: 'white' }} className="no-trains">  </p>
      // )
      }

      {selectedTrain && (
        <BookingForm train={selectedTrain} onClose={() => setSelectedTrain(null)} />
      )}

      {secureSeatTrain && (
        <div className="secure-modal">
          <div className="secure-content">
            <h3>Do you want to secure a seat through Smart Secure?</h3>
            <button className="confirm-btn" onClick={() => navigate("/secure-seat", { state: { departure, arrival } })}>
              Yes
            </button>
            <button className="cancel-btn" onClick={() => setSecureSeatTrain(null)}>
              No
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
