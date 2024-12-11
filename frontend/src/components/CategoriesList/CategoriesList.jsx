import React, { useState, useContext } from "react";
import "./CategoriesList.css";
import { Link } from "react-router-dom";
import { DataContext } from "../../App";
import { ModalDiscardConfirm } from "../ModalDiscardConfirm/ModalDiscardConfirm";
import moment from "moment";

export const CategoriesList = ({
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
    filteredCategories.items.forEach((item) => {
      // const itemOrders = orders.filter((order) => order.item._id === item._id);
      // const itemTotalCost = itemOrders.reduce(
      //   (acc, order) => acc + order.quantity * order.pricePerUnit,
      //   0
      // );
      // totalCost += itemTotalCost;
    });
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
      <div className="main-list-category">
        {(filteredCategories.length > 0 ? filteredCategories : originalData)
          .slice(0, 4)
          .map((category) => (
            <div key={category._id} className="list-container">
              <div className="images3-container-list">
                {category.items.slice(0, 1).map((item) => (
                  <div className="image1-list">
                    <img src={`/img/items/${item.icon}`} alt="img1" />
                  </div>
                ))}
                <div className="image2-3-list">
                  {category.items.slice(1, 2).map((item) => (
                    <div className="image2-list">
                      <img src={`/img/items/${item.icon}`} alt="img2" />
                    </div>
                  ))}
                  {category.items.slice(2, 3).map((item) => (
                    <div className="image3-list">
                      <img src={`/img/items/${item.icon}`} alt="img3" />
                    </div>
                  ))}
                </div>
              </div>
              <div className="middle-container-list">
                <Link
                  to={`/inventory/${category.title}`}
                  className="link-cards"
                >
                  <h3 className="list-category-text">
                    <strong>{category.title}</strong>
                  </h3>
                </Link>
                <p className="content-category-text-list">
                  <strong>{category.items.length} Items</strong> | €{" "}
                  {Math.round(totalCostOfItemsInOneCategory(category))}
                </p>
              </div>
              <div className="date-remove-list">
                <hr />
                <span className="updated-date-category-list">
                  Updated At: <br />
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
                      ? "delete-category-list disabled-button"
                      : "delete-category-list"
                  }
                >
                  <img
                    className="delete-img-list"
                    src="/images/Delete.png"
                    alt="delete supplier"
                  />
                </button>
                {openModalDiscardConfirm && (
                  <ModalDiscardConfirm
                    closeModal={setOpenModalDiscardConfirm}
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
  )
}
