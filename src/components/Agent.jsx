import { useState, useEffect } from "react";
import { vapi } from "@/lib/vapi.sdk"; 
import { useNavigate } from "react-router-dom";

const TourismAgent = () => {
  const navigate = useNavigate();
  const [callStatus, setCallStatus] = useState("INACTIVE");
  const [itinerary, setItinerary] = useState(null);

  useEffect(() => {
    const onCallStart = () => setCallStatus("ACTIVE");
    const onCallEnd = async () => {
      setCallStatus("FINISHED");

     
      try {
        const res = await fetch("/api/get-itinerary"); 
        const data = await res.json();
        setItinerary(data);
      } catch (err) {
        console.error("Failed to fetch itinerary", err);
      }
    };

    const onError = (error) => console.error("Error:", error);

    vapi.on("call-start", onCallStart);
    vapi.on("call-end", onCallEnd);
    vapi.on("error", onError);

    return () => {
      vapi.off("call-start", onCallStart);
      vapi.off("call-end", onCallEnd);
      vapi.off("error", onError);
    };
  }, []);

  const handleCall = async () => {
    setCallStatus("CONNECTING");
    await vapi.start(process.env.REACT_APP_VAPI_TOURISM_WORKFLOW_ID);
  };

  const handleDisconnect = () => {
    setCallStatus("FINISHED");
    vapi.stop();
  };

  return (
    <div className="tourism-agent">
      {callStatus !== "ACTIVE" && callStatus !== "CONNECTING" && (
        <button onClick={handleCall} className="btn-start">
          Start Trip Planning Call
        </button>
      )}

      {callStatus === "CONNECTING" && <p>Connecting to AI travel agent...</p>}

      {callStatus === "ACTIVE" && (
        <button onClick={handleDisconnect} className="btn-end">
          End Call
        </button>
      )}

      {/* Itinerary display after call ends */}
      {itinerary && (
        <div className="itinerary">
          <h2>Trip to {itinerary.location}</h2>
          <h3>Recommended Hotels</h3>
          <ul>
            {itinerary.hotels.map((hotel, i) => (
              <li key={i}>
                <a href={hotel.bookingUrl} target="_blank" rel="noreferrer">{hotel.name}</a> - {hotel.price}
              </li>
            ))}
          </ul>

          <h3>Transport Options</h3>
          <ul>
            {itinerary.transport.map((t, i) => (
              <li key={i}>
                <a href={t.bookingUrl} target="_blank" rel="noreferrer">{t.name}</a> - {t.price}
              </li>
            ))}
          </ul>

          <h3>Day-by-Day Plan</h3>
          <ol>
            {itinerary.days.map((day, i) => (
              <li key={i}>
                <strong>Day {i+1}:</strong> {day.activities.join(", ")}
              </li>
            ))}
          </ol>

          <p><strong>Total Budget:</strong> {itinerary.totalBudget}</p>
          <p><strong>Budget per Person:</strong> {itinerary.budgetPerPerson}</p>
        </div>
      )}
    </div>
  );
};

export default TourismAgent;
