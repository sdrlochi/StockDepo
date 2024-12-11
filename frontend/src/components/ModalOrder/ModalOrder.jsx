import React, { useContext, useState, useEffect } from "react";
import { DataContext } from "../../App";
import "./ModalOrder.css";
import { ModalHeader } from "../ModalHeader/ModalHeader";
import { ModalButtons } from "../ModalButtons/ModalButtons";
import moment from "moment";

export const ModalOrder = ({
  closeModal,
  modalTitle,
  saveChanges,
  itemName,
  categoryName
}) => {
  const { orders, setOrders } = useContext(DataContext);
  

  const initialData = {
    supplierName: "",
    quantity: "",
    pricePerUnit: "",
    ordered: "",
  };
  const [formValues, setFormValues] = useState(initialData);
  const [ordered, setOrdered] = useState(moment().format("YYYY-MM-DD"));
  const [isSubmit, setIsSubmit] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    console.log(formValues);
  }, [formValues]);

  const validate = (values) => {
    const errors = {};

    if (!values.supplierName) {
      errors.supplierName = "Supplier is required";
    }

    if (!values.quantity) errors.quantity = "Quantity is required";

    if (!values.pricePerUnit) {
      errors.pricePerUnit = "Total Price is required";
    }
    return errors;
  };

  const handleOrderedChange = (e) => {
    const selectedDate = e.target.value;
    setOrdered(selectedDate);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
    setFormErrors({
      ...formErrors,
      [name]: "",
    });
  };

  const handleAddOrder = async () => {
    console.log(formValues);
    const errors = validate(formValues);
    console.log("Validation errors:", errors);
    setFormErrors(errors);
    if (Object.keys(errors).length === 0) {
      try {
        let res = await fetch("http://localhost:9005/api/v1/order", {
          method: "POST",
          body: JSON.stringify({
            supplierName: formValues.supplierName,
            quantity: formValues.quantity,
            pricePerUnit: formValues.pricePerUnit,
            itemTitle: itemName,
            categoryTitle: categoryName
          }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (res.ok) {
          const newOrder = await res.json();
          setOrders([...orders, newOrder]);
          setIsSubmit(true);
          console.log("res", res);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="modal-order-background">
      <div className="modal-order-container">
        <ModalHeader modalTitle={modalTitle} closeModal={closeModal} />
        {isSubmit ? (
          <h1>Loading changes...</h1>
        ) : (
          <form>
            <div className="form-field">
              <input
                className="supplierName"
                type="text"
                value={formValues.supplierName}
                onChange={handleChange}
                name="supplierName"
                id="supplierName"
                placeholder="Supplier*"
                required
              />
              {formErrors?.supplierName && <p>{formErrors.supplierName}</p>}
            </div>
            <hr className="smaller-hr" />
            <div className="form-field">
              <input
                className="quantity"
                type="number"
                value={formValues.quantity}
                onChange={handleChange}
                name="quantity"
                id="quantity"
                placeholder="Quantity*"
                required
              />
              {formErrors?.quantity && <p>{formErrors.quantity}</p>}
            </div>
            <hr className="smaller-hr" />
            <div className="form-field">
              <input
                type="number"
                value={formValues.pricePerUnit}
                onChange={handleChange}
                name="pricePerUnit"
                id="pricePerUnit"
                placeholder="Price per unit*"
                required
              />
              {formErrors?.pricePerUnit && <p>{formErrors.pricePerUnit}</p>}
            </div>
            <hr className="smaller-hr" />
            <div className="input-ordered">
              <input
                type="date"
                id="ordered"
                name="ordered"
                value={ordered}
                onChange={handleOrderedChange}
              />
            </div>
            <hr className="bigger-hr" />
            <ModalButtons
              closeModal={closeModal}
              saveChanges={saveChanges}
              handleAddOrder={handleAddOrder}
            />
          </form>
        )}
      </div>
    </div>
  );
};
