import "./ItemsList.css";
import { Link } from "react-router-dom";
import React, { useState, useContext } from "react";
import { DataContext } from "../../App";
import { ModalDiscardConfirm } from "../ModalDiscardConfirm/ModalDiscardConfirm";
import moment from "moment";

export const ItemsList = ({
  title,
  filteredItems,
  setFilteredItems,
  originalData,
  isButtonDisabled
}) => {
  const { orders } = useContext(DataContext);
  const oneCategory = filteredItems.filter(
    (item) => item.category.title === title
  );
  const oneCategoryOriginal = originalData.filter(
    (item) => item.category.title === title
  );

  const [selectedItemId, setSelectedItemId] = useState(null);
  const [openModalDiscardConfirm, setOpenModalDiscardConfirm] = useState(false);

  const handleDeleteItem = async (itemId) => {
    try {
      const res = await fetch(`http://localhost:9003/api/v1/item/${itemId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (res.ok) {
        const updatedItems = filteredItems.filter(
          (item) => item._id !== itemId
        );
        setFilteredItems(updatedItems);
      }
    } catch (err) {
      console.log("Error deleting item", err);
    }
    setOpenModalDiscardConfirm(false);
    setSelectedItemId(null);
  };

  return (
    <>
      <div className="main-list-item">
        {(oneCategory.length > 0 ? oneCategory : oneCategoryOriginal)
          .slice(0, 4)
          .map((item) => {
            const { totalPrice } = orders.reduce(
              (acc, order) => {
                if (order.itemTitle === item.itemTitle) {
                  acc.totalPrice += order.quantity * order.pricePerUnit;
                }
                return acc;
              },
              { totalPrice: 0 }
            );
            return (
              <div key={item._id} className="list-container">
                <div className="list-container-img">
                  <img
                    className="item-image"
                    src={`/img/items/${item.icon}`}
                    alt={`Icon for ${item.itemTitle}`}
                  />
                </div>
                <div className="middle-container-list">
                  <Link
                    to={`/inventory/${title}/${item.itemTitle}`}
                    className="link-list"
                  >
                    <h3 className="list-item-text">
                      <strong>{item.itemTitle}</strong>
                    </h3>
                  </Link>
                  <p className="content-item-text-list">
                    <strong>{item.order.length} Purchase records</strong> | €{" "}
                    {Math.round(totalPrice)}
                  </p>
                </div>
                <div className="date-remove-list">
                  <hr />
                  <span className="updated-date-item-list">
                    Updated At: <br />
                    <strong>
                      {moment(item.date).format("MM/DD/YYYY HH:mm")}
                    </strong>
                  </span>
                  <button
                    disabled={isButtonDisabled}
                    onClick={() => {
                      setOpenModalDiscardConfirm(true);
                      setSelectedItemId(item._id);
                    }}
                    className={isButtonDisabled ?"delete-item-list disabled-button" : "delete-item-list"}
                  >
                    <img
                      className="delete-img"
                      src="/images/Delete.png"
                      alt="delete supplier"
                    />
                  </button>
                </div>
                {openModalDiscardConfirm && (
                  <ModalDiscardConfirm
                    closeModal={setOpenModalDiscardConfirm}
                    itemId={selectedItemId}
                    handleDeleteItem={handleDeleteItem}
                    text={`Are you sure that you want to delete the ${
                      filteredItems.find((item) => item._id === selectedItemId)
                        ?.itemTitle
                    } item? All associated orders in the item will be deleted. This action is irreversible.`}
                    saveChanges={"CONFIRM"}
                  />
                )}
              </div>
            )
          })}
      </div>
    </>
  );
};
