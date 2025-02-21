import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import TrainList from "./TrainList.jsx";
import NoDirectTrains from "./NoDirectTrains.jsx";
import "./TrainsPage.css";

export default function TrainsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { date, departure, arrival } = location.state || {};
  const [showSmartSecureOption, setShowSmartSecureOption] = useState(false);
  const [showNoDirectTrains, setShowNoDirectTrains] = useState(false);

  return (
    <div className="trains-page-container">
      <header className="trains-header">
        <h1>Trains from {departure} to {arrival}</h1>
        <p className="date-info">Date: {date}</p>
      </header>

      {/* TrainList remains unchanged */}
      <TrainList 
        departure={departure} 
        arrival={arrival} 
        onNoDirectTrains={() => setShowNoDirectTrains(true)}
      />

      {/* No Direct Trains Component */}
      {showNoDirectTrains && (
        <NoDirectTrains 
          departure={departure} 
          arrival={arrival} 
          onSecureTicket={() => navigate("/secure-seat", { state: { departure, arrival } })}
        />
      )}

      {/* Smart Secure Option only appears if no direct trains are found */}
      {showSmartSecureOption && (
        <div className="smart-secure-container">
          <h2>No direct trains available</h2>
          <p>Would you like to Smart Secure your ticket by taking multiple trains or a combination of train and bus?</p>
          <button 
            className="smart-secure-btn" 
            onClick={() => navigate("/secure-seat", { state: { departure, arrival } })}
          >
            Yes, Smart Secure my Ticket
          </button>
          <button 
            className="cancel-secure-btn" 
            onClick={() => setShowSmartSecureOption(false)}
          >
            No, I'll check other options
          </button>
        </div>
      )}
    </div>
  );
}
