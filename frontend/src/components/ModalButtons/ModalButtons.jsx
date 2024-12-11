import React from "react";
import "./ModalButtons.css";

export const ModalButtons = ({
  closeModal,
  saveChanges,
  handleAddSupplier,
  handleConfirmDelete,
  handleAddCategory,
  handleAddItem,
  handleEditSupplier,
  handleAddOrder,
}) => {
  return (
    <div>
      <div className="buttons-model">
        <button className="btn-cancel" onClick={() => closeModal(false)}>
          CANCEL
        </button>
        <button
          type="submit"
          className="btn-add"
          onClick={() => {
            if (handleAddSupplier) {
              handleAddSupplier();
            } else if (handleConfirmDelete) {
              handleConfirmDelete();
            } else if (handleAddCategory) {
              handleAddCategory();
            } else if (handleAddItem) {
              handleAddItem();
            } else if (handleEditSupplier) {
              handleEditSupplier();
            } else if (handleAddOrder) {
              handleAddOrder();
            }
          }}
        >
          {saveChanges}
        </button>
      </div>
    </div>
  );
};
