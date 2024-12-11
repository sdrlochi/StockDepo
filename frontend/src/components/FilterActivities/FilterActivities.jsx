import React from "react";
import "./FilterActivities.css";

export const FilterActivities = ({ handleChange, selectedActivity }) => {
  return (
    <>
      <div className="activity-sidebar-right">
        <h1>Filter Activities</h1>
        <hr id="filter-hr" />
        <input
          type="radio"
          name="select-activity"
          id="all"
          checked={selectedActivity === "all"}
          onChange={handleChange}
        />
        <label htmlFor="radio">All activity</label>
        <br />
        <input
          type="radio"
          name="select-activity"
          id="moved"
          checked={selectedActivity === "moved"}
          onChange={handleChange}
        />
        <label htmlFor="radio">Moved</label>
        <br />
        <input
          type="radio"
          name="select-activity"
          id="edited"
          checked={selectedActivity === "edited"}
          onChange={handleChange}
        />
        <label htmlFor="radio">Edited</label>
        <br />
        <input
          type="radio"
          name="select-activity"
          id="deleted"
          checked={selectedActivity === "deleted"}
          onChange={handleChange}
        />
        <label htmlFor="radio">Deleted</label>
        <br />
        <input
          type="radio"
          name="select-activity"
          id="created"
          checked={selectedActivity === "created"}
          onChange={handleChange}
        />
        <label htmlFor="radio">Created</label>
        <br />
        <input
          type="radio"
          name="select-activity"
          id="ordered"
          checked={selectedActivity === "ordered"}
          onChange={handleChange}
        />
        <label htmlFor="radio">Ordered</label>
      </div>
    </>
  );
};
