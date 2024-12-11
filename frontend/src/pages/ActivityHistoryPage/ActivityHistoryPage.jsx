import React from "react";
import { Activities } from "../../components/Activities/Activities";
import "./ActivityHistoryPage.css";
import { Header } from "../../components/Header/Header";

export const ActivityHistoryPage = () => {
  return (
    <div className="reports-main">
      <Header headerTitle={"Reports"} headerSubtitle={"Activity History"} />
      <Activities />
    </div>
  );
};
