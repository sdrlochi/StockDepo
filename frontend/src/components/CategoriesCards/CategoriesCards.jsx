import "./CategoriesCards.css";
import { Link } from "react-router-dom";
import React, { useState, useContext } from "react";
import { DataContext } from "../../App";
import { ModalDiscardConfirm } from "../ModalDiscardConfirm/ModalDiscardConfirm";
import moment from "moment";

export const CategoriesCards = ({
  filteredCategories,
  setFilteredCategories,
  originalData,
  isButtonDisabled,
}) => {
  const { orders } = useContext(DataContext);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [openModalDiscardConfirm, setOpenModalDiscardConfirm] = useState(false);

  const totalCostOfItemsInOneCategory = (filteredCategories) => {
    let totalCost = 0;
    // filteredCategories.items.forEach((item) => {
    //   const itemOrders = orders.filter((order) => order.item._id === item._id);
    //   const itemTotalCost = itemOrders.reduce(
    //     (acc, order) => acc + order.quantity * order.pricePerUnit,
    //     0
    //   );
    //   totalCost += itemTotalCost;
    // });
    return totalCost;
  };

  const handleCategoryDelete = async (categoryId) => {
    try {
      const res = await fetch(
        `http://localhost:9001/api/v1/category/${categoryId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (res.ok) {
        const updatedCategories = filteredCategories.filter(
          (category) => category._id !== categoryId
        );
        setFilteredCategories(updatedCategories);
      }
    } catch (err) {
      console.log("Error deleting category", err);
    }
    setOpenModalDiscardConfirm(false);
    setSelectedCategoryId(null);
  };

  return (
    <>
      <div className="main-card-category">
        {(filteredCategories.length > 0 ? filteredCategories : originalData)
          .slice(0, 8)
          .map((category) => (
            <div key={category._id} className="category-cards-container">
              <div className="images3-container">
                {category.items.slice(0, 1).map((item) => (
                  <div className="image1" key={item._id}>
                    <img src={category.image} alt={category.title} />
                  </div>
                ))}
              </div>
              <div className="card-bottom">
                <Link
                  to={`/inventory/${category.title}`}
                  className="link-cards"
                >
                  <h3 className="card-category-text">
                    <strong>{category.title}</strong>
                  </h3>
                </Link>
                <p className="content-category-text">
                  <strong>{category.items.length} Items</strong> | €{" "}
                  {Math.round(totalCostOfItemsInOneCategory(category))}
                </p>
                <div className="date-remove">
                  <span className="updated-category">
                    Updated At:{" "}
                    <strong>
                      {moment(category.date).format("MM/DD/YYYY HH:mm")}
                    </strong>
                  </span>
                  <button
                    disabled={isButtonDisabled}
                    onClick={() => {
                      setOpenModalDiscardConfirm(true);
                      setSelectedCategoryId(category._id);
                    }}
                    className={
                      isButtonDisabled
                        ? "delete-category disabled-button"
                        : "delete-category"
                    }
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
                    categoryId={selectedCategoryId}
                    handleCategoryDelete={handleCategoryDelete}
                    text={`Are you sure that you want to delete ${
                      filteredCategories.find(
                        (category) => category._id === selectedCategoryId
                      )?.title
                    }? All the items in the category will be permanently deleted. This action is irreversible.`}
                    saveChanges={"CONFIRM"}
                  />
                )}
              </div>
            </div>
          ))}
      </div>
    </>
  );
};
