import React, { useState, useEffect } from "react";
import "./styles.css";

const App = () => {
  // State variables for times
  const [userTime, setUserTime] = useState("");
  const [japanTime, setJapanTime] = useState("");
  const [nyTime, setNyTime] = useState("");
  const [londonTime, setLondonTime] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedTime, setSelectedTime] = useState("Choose a city above");

  // Function to get current time in specific timezone
  const getTimeInZone = (zone) => {
    return new Date().toLocaleString([], { timeZone: zone });
  };

  // Update times every second
  useEffect(() => {
    const updateTimes = () => {
      setUserTime(
        "Your Location Time: " +
          getTimeInZone(Intl.DateTimeFormat().resolvedOptions().timeZone)
      );
      setJapanTime("Japan Time: " + getTimeInZone("Asia/Tokyo"));
      setNyTime("New York Time: " + getTimeInZone("America/New_York"));
      setLondonTime("London Time: " + getTimeInZone("Europe/London"));
    };

    updateTimes();
    const interval = setInterval(updateTimes, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCityChange = (e) => {
    const city = e.target.value;
    setSelectedCity(city);
    if (!city) {
      setSelectedTime("Choose a city above");
    } else {
      const cityTimeStr = getTimeInZone(city);
      setSelectedTime(`Selected City Time (${city}): ${cityTimeStr}`);
    }
  };

  return (
    <div className="app-container">
      <h1 className="header">🌍 Live World Clock</h1>
      <div className="main-box">
        {/* Time boxes */}
        <div className="time-box">{userTime}</div>
        <div className="time-box">{japanTime}</div>
        <div className="time-box">{nyTime}</div>
        <div className="time-box">{londonTime}</div>

        {/* City selector */}
        <select
          className="city-select"
          onChange={handleCityChange}
          value={selectedCity}
        >
          <option value="">Choose a city</option>
          <option value="Africa/Johannesburg">Johannesburg</option>
          <option value="Europe/Paris">Paris</option>
          <option value="Asia/Dubai">Dubai</option>
        </select>

        {/* Selected city time */}
        <div className="time-box">{selectedTime}</div>

        {/* Back link */}
        <p className="footer">
          <a href="index.html" className="back-link">
            🏠 Back to Homepage
          </a>
        </p>
      </div>
    </div>
  );
};

export default App;
