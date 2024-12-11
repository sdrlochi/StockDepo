import React, { useState } from "react";
import "./Modal.css";
import { ModalHeader } from "../ModalHeader/ModalHeader";
import { ModalButtons } from "../ModalButtons/ModalButtons";

export const Modal = ({ closeModal, modalTitle, saveChanges }) => {
  const initialData = {
    title: "",
    image: null,
  };

  const [formValues, setFormValues] = useState(initialData);
  const [isSubmit, setIsSubmit] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setFormValues({
      ...formValues,
      [name]: files ? files[0] : value,
    });

    setFormErrors({
      ...formErrors,
      [name]: "",
    });
  };

  const validate = (values) => {
    let errors = {};

    if (!values.title) errors.title = "Name is required";
    return errors;
  };

  const handleAddCategory = async () => {
    const errors = validate(formValues);
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      try {
        const formData = new FormData();
        formData.append("title", formValues.title);
        if (formValues.image) {
          formData.append("image", formValues.image);
        }

        const res = await fetch("http://localhost:9001/api/v1/category", {
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const resData = await res.json();

        console.log("resData", resData);

        if (res.ok) {
          setFormValues(initialData);
          setIsSubmit(true);
        }
      } catch (err) {
        console.log("Error submitting category:", err);
      }
    }
  };

  return (
    <div className="modal-background">
      <div className="modal-container">
        <ModalHeader modalTitle={modalTitle} closeModal={closeModal} />
        {isSubmit ? (
          <h1>Successfully added</h1>
        ) : (
          <form>
            <div className="form-field">
              <input
                className="input-modal-name"
                type="text"
                value={formValues.title}
                onChange={handleChange}
                name="title"
                id="name"
                placeholder="Name*"
                required
              />
              {formErrors?.title && <p>{formErrors.title}</p>}
            </div>
            <hr className="smaller-hr" />
            <hr className="bigger-hr" />
            <div className="add-photo">
              <img src="/images/AddImage.png" alt="addImage" />
              <label htmlFor="file-input">(Add Photo, 2MB Total)</label>
              <input
                type="file"
                id="file-input"
                name="image"
                onChange={handleChange}
                style={{ display: "none" }}
              />
            </div>
            <hr className="bigger-hr" />
            <ModalButtons
              closeModal={closeModal}
              saveChanges={saveChanges}
              handleAddCategory={handleAddCategory}
            />
          </form>
        )}
      </div>
    </div>
  );
};
