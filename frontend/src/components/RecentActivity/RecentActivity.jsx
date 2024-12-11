import "./RecentActivity.css";
import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../../App";

export const RecentActivity = () => {
  const { activities } = useContext(DataContext);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const getUser = localStorage.getItem("username");
    setUsername(getUser);
  }, []);
  
  const recentActivities = activities.sort((a, b) => {
    return new Date(b.date) - new Date(a.date);
  }).slice(0, 4);

  return (
    <div className="resent-activity-section">
      <h3>
        <strong>Recent Activity</strong>
      </h3>
      {recentActivities.map((activity) => (
        <div className="activity-box" key={activity._id}>
          <div className="rectangle7">
            <p>
              {username} has {activity.activity} item <b>{activity.itemTitle}</b> in{" "}
              <b>
                {activity.categoryTitle}({activity.categoryTitle})
              </b>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
