import "./InventorySummDashboard.css";
import React, { useContext } from "react";
import { DataContext } from "../../App";

export const InventorySummDashboard = () => {
  const { categories, items, orders } = useContext(DataContext);

  // let totalCost = 0;
  // for (let i=0; i<orders.length; i++){
  //   const quantity = orders[i].quantity;
  //   const pricePerUnit = orders[i].pricePerUnit;
  //   const orderCost = quantity * pricePerUnit;
  //   totalCost += orderCost;
  // }
  const totalCost = Math.round(
    orders.reduce((acc, order) => {
      const orderCost = order.quantity * order.pricePerUnit;
      return acc + orderCost;
    }, 0)
  );

  return (
    <div>
      <div className="inventory-summary-dashboard">
        <h3>
          <strong>Inventory Summary</strong>
        </h3>
        <div className="rectangles">
          <div className="rectangle">
            <div className="elipse1">
              <img
                classname="img-folder"
                src="/images/Folder.png"
                alt="folder"
              />
            </div>
            <p className="num">{categories.length}</p>
            <p className="text">Categories</p>
          </div>
          <div className="rectangle">
            <div className="elipse2">
              <img
                classname="img-documents"
                src="/images/Documents.png"
                alt="documents"
              />
            </div>
            <p className="num">{items.length}</p>
            <p className="text">Items</p>
          </div>
          <div className="rectangle">
            <div className="elipse3">
              <img classname="img-paper" src="/images/Paper.png" alt="paper" />
            </div>
            <p className="num">{orders.length}</p>
            <p className="text">Total Orders</p>
          </div>
          <div className="rectangle">
            <div className="elipse4">
              <img classname="img-coins" src="/images/Coins.png" alt="coins" />
            </div>
            <p className="num">€{totalCost}</p>
            <p className="text">Total Cost</p>
          </div>
        </div>
      </div>
    </div>
  );
};
