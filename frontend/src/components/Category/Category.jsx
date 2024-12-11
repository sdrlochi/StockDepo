import { Add } from "../Add/Add";
import "./Category.css";
import React, { useState, useContext, useEffect } from "react";
import { SearchBar } from "../SearchBar/SearchBar";
import { DataContext } from "../../App";
import { ItemsCards } from "../ItemsCards/ItemsCards";
import { ItemsList } from "../ItemsList/ItemsList";
import { ModalAddItem } from "../ModalAddItem/ModalAddItem";
import { ModalEditCategory } from "../ModalEditCategory/ModalEditCategory";
import { jwtDecode } from "jwt-decode";

export const Category = ({ title }) => {
  const { items } = useContext(DataContext);
  const [filteredItems, setFilteredItems] = useState(items);
  const [openModal, setOpenModal] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);
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

  const isButtonDisabled = decodedToken?.role !== "admin";

  const updateFilteredItems = (filteredData) => {
    setFilteredItems(filteredData);
  };

  const handleShowCards = () => {
    setShowCards(true);
  };

  const handleShowList = () => {
    setShowCards(false);
  };

  return (
    <>
      <div className="search-add-main">
        <div className="search-item">
          <SearchBar
            placeholderText={"Search Items"}
            name="itemTitle"
            data={filteredItems}
            setData={updateFilteredItems}
            originalData={items}
          />
        </div>
        <div className="add-item">
          <button
            disabled={isButtonDisabled}
            className={
              isButtonDisabled ? "add-item-btn disabled-button" : "add-item-btn"
            }
            onClick={() => {
              setOpenModal(true);
            }}
          >
            <Add addText={"ADD ITEM"} />
          </button>
        </div>
      </div>
      {openModal && (
        <ModalAddItem
          closeModal={setOpenModal}
          modalTitle={"Add Item"}
          saveChanges={"ADD ITEM"}
          categoryName={title}
        />
      )}
      <div>
        <div className="main-container-items">
          <div className="show-item-cards">
            {showCards ? (
              <ItemsCards
                title={title}
                filteredItems={filteredItems}
                setFilteredItems={setFilteredItems}
                originalData={items}
                isButtonDisabled={isButtonDisabled}
              />
            ) : (
              <ItemsList
                title={title}
                filteredItems={filteredItems}
                setFilteredItems={setFilteredItems}
                originalData={items}
                isButtonDisabled={isButtonDisabled}
              />
            )}
          </div>
          <div className="inventory-category-right">
            <div className="item-show">
              <button onClick={handleShowCards}>
                <img src="/images/ControlPanel.png" alt="Control Panel" />
              </button>
              <button onClick={handleShowList}>
                <img src="/images/List.png" alt="list" />
              </button>
            </div>
            <br />
          </div>
        </div>
        <button
          disabled={isButtonDisabled}
          className={
            isButtonDisabled
              ? "edit-category-btn disabled-button"
              : "edit-category-btn"
          }
          onClick={() => {
            setOpenModalEdit(true);
          }}
        >
          <div className="rectangle78">
            <img src="/images/Edit.png" alt="edit" />
          </div>
          <h4>Edit Category</h4>
        </button>
        {openModalEdit && (
          <ModalEditCategory
            closeModal={setOpenModalEdit}
            modalTitle={"Edit Category"}
            saveChanges={"SAVE CHANGES"}
            categoryName={title}
          />
        )}
      </div>
    </>
  );
};
