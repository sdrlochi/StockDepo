import React, { useContext } from "react";
import { DataContext } from "../../App";
import "./ModalMoveItem.css";
import { ModalHeader } from "../ModalHeader/ModalHeader";

export const ModalMoveItem = ({ closeModal, modalTitle }) => {
  const { categories } = useContext(DataContext);
  return (
    <div className="modal-move-background">
      <div className="modal-container-move">
        <ModalHeader modalTitle={modalTitle} closeModal={closeModal}/>
        <div className="modal-move-main">
          <hr />
          <div className="scrollable-container">
            {categories.map((category) => (
              <div className="move-container">
                <img src="/images/Folder1.png" alt="addImage" />
                <h2>{category.title}</h2>
              </div>
            ))}
          </div>
        </div>
        <button className="btn-move">Move Item</button>
      </div>
    </div>
  );
};
