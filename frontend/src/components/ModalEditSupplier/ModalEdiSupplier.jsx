import React, { useState, useEffect, useContext } from "react";
import { DataContext } from "../../App";
import { ModalHeader } from "../ModalHeader/ModalHeader";
import { ModalButtons } from "../ModalButtons/ModalButtons";

export const ModalEditSupplier = ({
  closeModal,
  modalTitle,
  saveChanges,
  supplier,
}) => {
  const { suppliers, setSuppliers } = useContext(DataContext);
  const [formValues, setFormValues] = useState({
    name: supplier.name,
    address: supplier.address,
    phoneNumber: supplier.phoneNumber,
    email: supplier.email,
  });
  const [isSubmit, setIsSubmit] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  // const [editSupplier, setEditSupplier] = useState(null);

  console.log("Form Values:", formValues);

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

  const validate = (values) => {
    const regexPhone = /^\+\d{1,3}\d{6,14}$/;
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const errors = {};

    if (!values.name) errors.name = "Name is required";

    if (!values.address) errors.address = "Address is required";

    if (!values.phoneNumber) {
      errors.phoneNumber = "Phone number is required";
    } else if (!regexPhone.test(values.phoneNumber)) {
      errors.phoneNumber = "This is not a valid phone format";
    }

    if (!values.email) {
      errors.email = "Email is required";
    } else if (!regexEmail.test(values.email)) {
      errors.email = "This is not a valid email format";
    }
    return errors;
  };

  const handleEditSupplier = async (e) => {
    e.preventDefault();
    setIsSubmit(true); // Start loading state

    const errors = validate(formValues);
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      try {
        const res = await fetch(
          `http://localhost:9007/api/v1/supplier/${supplier._id}`,
    
          {
            
            method: "PUT",
            body: JSON.stringify(formValues),
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              
            },
            
          }
        );
        const resData = await res.json();
        console.log(resData); // Log the response

        if (resData.ok) {
          closeModal(false);
          const updatedSuppliers = suppliers.map((sup) =>
            sup._id === supplier._id ? { ...sup, ...formValues } : sup
          );
          setSuppliers(updatedSuppliers);
        } else {
          // Handle API errors (e.g., resData.error)
          console.log("Error updating supplier:", resData);
        }
      } catch (error) {
        console.log("Error editing supplier", error);
      } finally {
        setIsSubmit(false); // Reset loading state
      }
    } else {
      setIsSubmit(false); // Reset loading state if there are errors
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
              handleEditSupplier={handleEditSupplier}
            />
          </form>
        )}
      </div>
    </div>
  );
};
