import React, { useState } from "react";
import "./ModalAddSupplier.css";
import { ModalHeader } from "../ModalHeader/ModalHeader";
import { ModalButtons } from "../ModalButtons/ModalButtons";

export const ModalAddSupplier = ({ closeModal, modalTitle, saveChanges }) => {
  const initialData = {
    name: "",
    address: "",
    phoneNumber: "",
    email: "",
  };
  const [formValues, setFormValues] = useState(initialData);
  const [isSubmit, setIsSubmit] = useState(false);
  const [formErrors, setFormErrors] = useState({});


  const handleAddSupplier = async () => {
   
   
    if (Object.keys().length === 0) {
      try {
        let res = await fetch("http://localhost:9007/api/v1/supplier", {
          method: "POST",
          body: JSON.stringify(formValues),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const resData = await res.json();
        
        if (res.ok) {
          setFormValues(initialData);
          setIsSubmit(true);
          saveChanges(resData);
        }
      } catch (err) {
        console.log(err);
      }
    }
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
                type="text"
                value={formValues.name}
                onChange={handleChange}
                name="name"
                id="name"
                placeholder="Name*"
                required
              />
              {formErrors?.name && <p>{formErrors.name}</p>}
            </div>
            <hr className="smaller-hr" />
            <div className="form-field">
              <input
                type="text"
                value={formValues.address}
                onChange={handleChange}
                name="address"
                id="address"
                placeholder="Address*"
                required
              />
              {formErrors?.address && <p>{formErrors.address}</p>}
            </div>
            <hr className="smaller-hr" />
            <div className="form-field">
              <input
                type="tel"
                value={formValues.phoneNumber}
                onChange={handleChange}
                name="phoneNumber"
                id="phoneNumber"
                placeholder="Phone Number*"
                required
              />
              {formErrors?.phoneNumber && <p>{formErrors.phoneNumber}</p>}
            </div>
            <hr className="smaller-hr" />
            <div className="form-field">
              <input
                type="email"
                value={formValues.email}
                onChange={handleChange}
                name="email"
                id="email"
                placeholder="Email*"
                required
              />
              {formErrors?.email && <p>{formErrors?.email}</p>}
            </div>
            <hr className="smaller-hr" />
            <ModalButtons
              closeModal={closeModal}
              saveChanges={saveChanges}
              handleAddSupplier={handleAddSupplier}
            />
          </form>
        )}
      </div>
    </div>
  );
};