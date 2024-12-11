import "./TopSectionDashboard.css";
import { useState, useEffect } from "react";

export const TopSectonDashboard = () => {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const getUser = localStorage.getItem("username");
    setUsername(getUser);
  }, []);

  return (
    <div className="top-section-dashboard">
      <div className="top-section">
        <h1>Dashboard</h1>
        <div className="user-section">
          <h2>Welcome back, {username}!</h2>
        </div>
      </div>
      <hr />
    </div>
  );
};
