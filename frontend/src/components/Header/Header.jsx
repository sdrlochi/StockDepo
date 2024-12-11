import React from "react";
import "./Header.css";

export const Header = ({ headerTitle, headerSubtitle, headerSubSubtitle }) => {
  return (
    <div className="header-main">
      <div className="top-section-header">
        <h1 className="header-title">{headerTitle}</h1>
        {headerSubtitle && (
          <h2 className="header-subtitle">
            <span style={{ margin: "0 8px" }}>{">"}</span>
            {headerSubtitle}
          </h2>
        )}
        {headerSubSubtitle && (
          <h2 className="header-subtitle">
            <span style={{ margin: "0 8px" }}>{">"}</span>
            {headerSubSubtitle}
          </h2>
        )}
      </div>
      <hr className="line-header" />
    </div>
  );
};
