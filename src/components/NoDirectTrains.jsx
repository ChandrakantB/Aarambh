import { useState } from "react";
import AlternativeBooking from "./AlternativeBooking";
import "./NoDirectTrains.css";

export default function NoDirectTrains({ departure, arrival }) {
  const [showBooking, setShowBooking] = useState(false);

  return (
    <div className="no-trains-container">
      <h2>No Direct Trains Available</h2>
      <p>
        We couldn't find a direct train from <strong>{departure}</strong> to <strong>{arrival}</strong>. 
        You can secure your ticket by taking a combination of two trains, buses, or mixed transport options.
      </p>
      <button className="secure-ticket-btn" onClick={() => setShowBooking(true)}>
        Secure Ticket
      </button>

      {showBooking && <AlternativeBooking departure={departure} arrival={arrival} />}
    </div>
  );
}
