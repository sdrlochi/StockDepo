import React, { useContext } from "react";
import { DataContext } from "../../App";
import "./ModalInvoice.css";
import { ModalHeader } from "../ModalHeader/ModalHeader";
import { ModalButtons } from "../ModalButtons/ModalButtons";

export const ModalInvoice = ({ closeModal, modalTitle, saveChanges }) => {
  const { suppliers, orders } = useContext(DataContext);

  return (
    <div className="modal-invoice-background">
      <div className="modal-invoice-container">
        <ModalHeader modalTitle={modalTitle} closeModal={closeModal} />
        <form>
          <input
            className="invoice-name"
            type="text"
            name="invoicename"
            id="invoicename"
            placeholder="Invoice Name"
            required
          />
          <hr className="smaller-hr-invoice" />
          <select className="select-supplier" name="supplier" id="supplier">
            <option>Supplier</option>
            {suppliers.map((supplier) => (
              <option key={supplier._id} value={supplier.name}>
                {supplier.name}
              </option>
            ))}
          </select>
          <hr className="smaller-hr-invoice" />
          <input
            type="date"
            className="calendar-invoice"
            id="date"
            name="date"
          />
          <select className="select" name="selectorders" id="selectorders">
            <option value="">Select Orders</option>
            {orders.map((order) => (
              <option key={order._id} value={order.name}>
                {order.itemTitle + " " + order.quantity}
              </option>
            ))}
          </select>
          <hr className="smaller-hr-invoice" />
          <ModalButtons closeModal={closeModal} saveChanges={saveChanges} />
        </form>
      </div>
    </div>
  );
};
