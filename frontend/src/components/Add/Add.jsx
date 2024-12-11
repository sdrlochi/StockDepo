import React from "react";
import "./Add.css";

export const Add = ({addText}) => {
  return (
    <div>
      <div className="inside-btn">
        <div className="rectangle37">
          <img className="add-new" src="/images/AddNew.png" alt="Add new" />
        </div>
        <p className="text-btn">{addText}</p>
      </div>
    </div>
  );
};
