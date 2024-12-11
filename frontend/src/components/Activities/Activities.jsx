import "./Activities.css";
import React, { useState, useContext, useEffect } from "react";
import { DataContext } from "../../App";
import { FilterActivities } from "../FilterActivities/FilterActivities";
import moment from "moment";

export const Activities = () => {
  const { activities } = useContext(DataContext);
  const [selectedActivity, setSelectedActivity] = useState("all");
  const [username, setUsername] = useState("");

  useEffect(() => {
    const getUser = localStorage.getItem("username");
    setUsername(getUser);
  }, []);

  const sortedActivities = activities.sort((a, b) => {
    return new Date(b.date) - new Date(a.date);
  });

  const filteredActivities = selectedActivity === "all" ? sortedActivities : activities.filter((activity) => activity.activity === selectedActivity).sort((a, b)=> {
    return new Date(b.date) - new Date(a.date);
  });

  const handleChange = (e) => {
    setSelectedActivity(e.target.id);
  }
  
  return (
    <div className="main-container-activities">
      <div className="activities-container">
        <div className="img-container-sort">
          <img
            className="descending-sorting"
            src="/images/DescendingSorting.png"
            alt="Descending Sorting"
          />
        </div>
        <div className="recent-activity-container">
          {filteredActivities.slice(0, 11).map((activity) => (
            <div key={activity._id} className="activity-box1">
              <p className="activity-box-text">
                {username} has {activity.activity} item <b>{activity.itemTitle}</b> in <b>{activity.categoryTitle}({activity.categoryTitle})</b>
              </p>
              <p>{moment(activity.date).format("MM/DD/YYYY HH:mm")}</p>
            </div>
          ))}
        </div>
      </div>
      <FilterActivities handleChange={handleChange} selectedActivity={selectedActivity}/>
    </div>
  );
};
