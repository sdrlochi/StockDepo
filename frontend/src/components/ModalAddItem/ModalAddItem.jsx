import React, { useState } from "react";
import "./ModalAddItem.css";
import { ModalHeader } from "../ModalHeader/ModalHeader";
import { ModalButtons } from "../ModalButtons/ModalButtons";
import { useNavigate } from "react-router-dom";

export const ModalAddItem = ({
  closeModal,
  modalTitle,
  saveChanges,
  categoryName,
}) => {
  const initialData = {
    itemTitle: "",
  };

  const [formValues, setFormValues] = useState(initialData);
  const [file, setFile] = useState();
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    setFormErrors({ ...formErrors, [name]: "" });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const validate = (values) => {
    let errors = {};
    if (!values.itemTitle) errors.itemTitle = "Name is required";
    return errors;
  };

  const handleAddItem = async () => {
    console.log(formValues);
    const errors = validate(formValues);
    setFormErrors(errors);
    if (Object.keys(errors).length === 0) {
      try {
        const formData = new FormData();
        formData.append("icon", file);
        formData.append("itemTitle", formValues.itemTitle);
        formData.append("categoryTitle", categoryName);

        let res = await fetch("http://localhost:9003/api/v1/item", {
          method: "POST",
          // body: JSON.stringify({
          //   itemTitle: formValues.itemTitle,
          //   categoryTitle: categoryName,
          // }),
          body: formData,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        let resData = await res.json();
        console.log("res", res);
        if (res.ok) {
          setIsSubmit(true);
          navigate("/inventory");
        } else {
          console.error("Failed to upload file");
        }
      } catch (err) {
        console.log(err);
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
                value={formValues.itemTitle}
                onChange={handleChange}
                name="itemTitle"
                id="name"
                placeholder="Name*"
                required
              />
              {formErrors?.itemTitle && <p>{formErrors.itemTitle}</p>}
            </div>
            <hr className="smaller-hr" />
            <hr className="bigger-hr" />
            <div className="add-photo">
              <img src="/images/AddImage.png" alt="addImage" />
              <label for="file-input">(Add Photo, 2MB Total)</label>
              <input
                type="file"
                id="file-input"
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
            </div>
            <hr className="bigger-hr" />
            <ModalButtons
              closeModal={closeModal}
              saveChanges={saveChanges}
              handleAddItem={handleAddItem}
            />
          </form>
        )}
      </div>
    </div>
  );
};
