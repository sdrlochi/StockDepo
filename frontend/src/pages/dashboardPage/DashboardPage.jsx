import "./DashboardPage.css";
import { InventorySummDashboard } from "../../components/inventorySumDashboard/InventorySummDashboard";
import { TopSectonDashboard } from "../../components/topSectionDashboard/TopSectonDashboard";
import { RecentActivity } from "../../components/RecentActivity/RecentActivity";
import { RecentOrder } from "../../components/RecentOrder/RecentOrder";

export const DashboardPage = () => {
  return (
    <div className="dashboard">
      <div className="dashboard-header">
      <TopSectonDashboard />
      </div>
      <div className="dashboard-main">
        <InventorySummDashboard />
        <RecentActivity />
        <RecentOrder />
      </div>
    </div>
  );
};
