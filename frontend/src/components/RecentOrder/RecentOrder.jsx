import "./RecentOrder.css";
import React, { useContext, useState } from "react";
import { DataContext } from "../../App";
import { Pagination } from "../Pagination/Pagination";
import { Link } from "react-router-dom";

export const RecentOrder = () => {
  const { orders, items } = useContext(DataContext);
  const [currentPage, setCurrentPage] = useState(1);
  const orderPerPage = 4;
  const indexOfLastOrder = currentPage * orderPerPage;
  const indexOfFirstOrder = indexOfLastOrder - orderPerPage;

  const sortedOrders = orders.sort((a, b) => {
    return new Date(b.ordered) - new Date(a.ordered);
  });

  const recentOrders = sortedOrders.slice(indexOfFirstOrder, indexOfLastOrder);

  const calculateTotalPrice = (order) => {
    return order.quantity * order.pricePerUnit;
  };

  const handleNext = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrev = () => {
    setCurrentPage(currentPage - 1);
  };

  return (
    <div className="resent-order-section">
      <h3>
        <strong>Recent order</strong>
      </h3>
      <div className="navigation-recent-items">
        <div className="recent-item-box">
          <button onClick={handlePrev} className="arrow-btn">
            <img
              className="expand-arrow"
              src="/images/prev.png"
              alt="expand arrow"
            />
          </button>
          {recentOrders.map((order) => {
            // const item = items.find((item) => item._id === order.item._id);
            return (
              <div className="item-container">
                {/* <Link
                  to={`/inventory/${item.category.title}/${order.itemTitle}`}
                  className="link-cards"
                >
                  <div className="item" key={item._id}>
                  <img
                    src={`/img/items/${order.icon}`}
                    alt={`Icon for ${order.itemTitle}`}
                  />
                  <br />
                  <span className="item-name">{order.itemTitle}</span> <br />
                  <span className="quantity-cost">
                    <b>{order.quantity} Unit</b> | € {calculateTotalPrice(order)}
                  </span>
                  </div>
                </Link> */}
              </div>
            );
          })}
          <button onClick={handleNext} className="arrow-btn">
            <img
              className="expand-arrow"
              src="/images/ExpandArrow.png"
              alt="expand arrow"
            />
          </button>
        </div>
        <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} />
      </div>
    </div>
  );
};
