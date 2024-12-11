import { Header } from "../../components/Header/Header";
import "./ReportsPage.css";
import { Link } from "react-router-dom";

export const ReportsPage = () => {
  return (
    <div className="reports-main">
      <Header headerTitle={"Reports"} />
      <div className="activity-history">
        <Link to={"/reports/activityhistory"} className="title-activity">
          <img
            className="time-mashine-img"
            src="/images/TimeMachine.png"
            alt="time-mashine"
          />
          <h1>Activity History</h1>
        </Link>
        <p>
          Activity history helps keep track of the things you do with your
          items, categories, tags, etc., such as creating, editing or deleting
        </p>
      </div>
      <hr className="line9" />
      <div className="inventory-summary-reports">
        <Link to={"/reports/inventorysummary"} className="title-inventory">
          <img
            className="product-img-r"
            src="/images/Product.png"
            alt="product"
          />
          <h1>Inventory Summary</h1>
        </Link>
        <p>
          Inventory Summary provides detailed visualizations about the total
          cost of the categories over a period of time.
        </p>
      </div>
      <hr className="line10" />
    </div>
  );
};
