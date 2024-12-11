import React, { useContext, useState, useEffect } from "react";
import "./ModalEditCategory.css";
import { ModalHeader } from "../ModalHeader/ModalHeader";
import { ModalButtons } from "../ModalButtons/ModalButtons";
import { DataContext } from "../../App";

export const ModalEditCategory = ({
  closeModal,
  modalTitle,
  saveChanges,
  categoryName,
}) => {
  const { categories, setCategories } = useContext(DataContext);
  const initialData = {
    title: categoryName,
  };

  const [formValues, setFormValues] = useState(initialData);
  const [isEdited, setIsEdited] = useState(false);

  useEffect(() => {
    console.log(formValues);
  }, [formValues]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleEditCategory = async (e) => {
    const category = categories.find(
      (category) => category.title === categoryName
    );
    const categoryId = category._id;
    console.log("category", category);
    console.log("categoryId", categoryId);
    try {
      e.preventDefault();
      const res = await fetch(
        `http://localhost:9001/api/v1/category/${categoryId}`,
        {
          method: "PATCH",
          body: JSON.stringify(formValues),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const resData = await res.json();

      console.log("resData", resData);
      if (res.ok) {
        setIsEdited(true);
        closeModal(false);
        const updatedCategories = categories.map((cat) => {
          if (cat._id === category._id) {
            return { ...cat, ...formValues };
          }
          return cat;
        });
        setCategories(updatedCategories);
      } else {
        e.preventDefault();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="modal-background">
      <div className="modal-container">
        <ModalHeader modalTitle={modalTitle} closeModal={closeModal} />
        {isEdited ? (
          <h1>Successfully edited</h1>
        ) : (
          <form>
            <div className="form-field">
              <label htmlFor="name">
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
              </label>
            </div>
            <hr className="smaller-hr" />
            <hr className="bigger-hr" />
            <div className="add-photo">
              <img src="/images/AddImage.png" alt="addImage" />
              <label htmlFor="file-input">(Add Photo, 2MB Total)</label>
              {/* <input type="file" id="file-input" style={{ display: "none" }} onChange={(e)=>setFile(e.target.files[0])}/> */}
            </div>
            <hr className="bigger-hr" />
            {/* <ModalButtons
            closeModal={closeModal}
            saveChanges={saveChanges}
            handleEditCategory={handleEditCategory}
          />   */}
            <div className="buttons-model">
              <button className="btn-cancel" onClick={() => closeModal(false)}>
                CANCEL
              </button>
              <button
                type="submit"
                className="btn-add"
                onClick={handleEditCategory}
              >
                {saveChanges}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
