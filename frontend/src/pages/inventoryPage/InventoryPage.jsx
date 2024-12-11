import { Add } from "../../components/Add/Add";
import { CategoriesCards } from "../../components/CategoriesCards/CategoriesCards";
import { CategoriesList } from "../../components/CategoriesList/CategoriesList";
import { Header } from "../../components/Header/Header";
import { Modal } from "../../components/Modal/Modal";
import { SearchBar } from "../../components/SearchBar/SearchBar";
import "./InventoryPage.css";
import React, { useState, useContext, useEffect } from "react";
import { DataContext } from "../../App";
import { jwtDecode } from "jwt-decode";

export const InventoryPage = () => {
  const { categories, items, orders } = useContext(DataContext);
  const [openModal, setOpenModal] = useState(false);
  const [filteredCategories, setFilteredCategories] = useState(categories);
  const [showCards, setShowCards] = useState(true);
  const [decodedToken, setDecodedToken] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setDecodedToken(decoded);
      } catch (error) {
        console.error("Failed to decode token", error);
      }
    }
  }, []);
  console.log(decodedToken);

  const isButtonDisabled = decodedToken?.role !== "admin";

  const totalCost = Math.round(
    orders.reduce((acc, order) => {
      const orderCost = order.quantity * order.pricePerUnit;
      return acc + orderCost;
    }, 0)
  );

  const handleShowCards = () => {
    setShowCards(true);
  };

  const handleShowList = () => {
    setShowCards(false);
  };

  const updateFilteredCategories = (filteredData) => {
    setFilteredCategories(filteredData);
  };

  return (
    <div className="inventory-main">
      <div className="top-section-inventory-page">
        <Header headerTitle={"Inventory"} />
        <div className="search-add-main">
          <div className="search-category">
            <SearchBar
              placeholderText="Search Categories"
              name="title"
              data={filteredCategories}
              originalData={categories}
              setData={updateFilteredCategories}
              isInventory={true}
            />
          </div>
          <button
            disabled={isButtonDisabled}
            className={
              isButtonDisabled
                ? "add-category-btn disabled-button"
                : "add-category-btn"
            }
            onClick={() => {
              setOpenModal(true);
            }}
          >
            <Add addText={"ADD CATEGORY"} />
          </button>
        </div>
        {openModal && (
          <Modal
            closeModal={setOpenModal}
            modalTitle={"Add Category"}
            saveChanges={"ADD CATEGORY"}
            modalFor="category"
          />
        )}
      </div>
      <div>
        <div className="inventory-summary-main">
          <div className="inventory-summary-container">
            <p>
              Categories: &nbsp;<strong>{categories.length}</strong>
            </p>
            <p>
              Items: &nbsp;<strong>{items.length}</strong>
            </p>
            <p>
              Total Orders: &nbsp;<strong>{orders.length}</strong>
            </p>
            <p>
              Total Cost: &nbsp;<strong>€{totalCost}</strong>
            </p>
          </div>
          <div className="item-show">
            <button onClick={handleShowCards}>
              <img src="/images/ControlPanel.png" alt="Control Panel" />
            </button>
            <button onClick={handleShowList}>
              <img src="/images/List.png" alt="list" />
            </button>
          </div>
        </div>
        {showCards ? (
          <CategoriesCards
            filteredCategories={filteredCategories}
            originalData={categories}
            setFilteredCategories={setFilteredCategories}
            isButtonDisabled={isButtonDisabled}
          />
        ) : (
          <CategoriesList
            filteredCategories={filteredCategories}
            originalData={categories}
            setFilteredCategories={setFilteredCategories}
            isButtonDisabled={isButtonDisabled}
          />
        )}
      </div>
    </div>
  );
};
