import React, { useState, useContext, useEffect } from "react";
import { DataContext } from "../../App";
import "./SuppliersInfo.css";
import { SearchBar } from "../SearchBar/SearchBar";
import { Add } from "../Add/Add";
import { ModalAddSupplier } from "../ModalAddSupplier/ModalAddSupplier";
import { ModalDiscardConfirm } from "../ModalDiscardConfirm/ModalDiscardConfirm";
import { ModalEditSupplier } from "../ModalEditSupplier/ModalEdiSupplier";

export const SuppliersInfo = () => {
  const { suppliers, setSuppliers } = useContext(DataContext);
  const [selectedSupplierId, setSelectedSupplierId] = useState(null);
  const [filteredSuppliers, setFilteredSuppliers] = useState(suppliers);
  const [openModalAddSupplier, setOpenModalAddSupplier] = useState(false);
  const [openModalEditSupplier, setOpenModalEditSupplier] = useState(false);
  const [openModalDiscardConfirm, setOpenModalDiscardConfirm] = useState(false);
  const [editSupplier, setEditSupplier] = useState(null);

  const handleDeleteSupplier = async (supplierId) => {
    try {
      const res = await fetch(
        `http://localhost:9007/api/v1/supplier/${supplierId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (res.ok) {
        setSuppliers([]);
        setFilteredSuppliers([]);
        const fetchedSuppliers = await fetchSuppliers();
        setSuppliers(fetchedSuppliers);
        setFilteredSuppliers(fetchedSuppliers);
      } else {
        console.error("Failed to delete supplier");
      }
    } catch (error) {
      console.error("Error deleting supplier", error);
    }
  };

  const closeModal = () => {
    setOpenModalDiscardConfirm(false);
    setSelectedSupplierId(null);
    console.log("Modal closed, supplier ID reset");
  };

  const fetchSuppliers = async () => {
    try {
      const res = await fetch("http://localhost:9007/api/v1/suppliers", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (res.ok) {
        const data = await res.json();
        console.log("Fetched suppliers:", data.suppliers); // Debug fetched data
        setSuppliers(data.suppliers);
        setFilteredSuppliers(data.suppliers);
        return data.suppliers;
      } else {
        console.error("Failed to fetch suppliers");
        return [];
      }
    } catch (error) {
      console.error("Error fetching suppliers", error);
      return [];
    }
  };

  const updateFilteredSuppliers = (filteredData) => {
    setFilteredSuppliers(filteredData);
  };

  useEffect(() => {
    console.log("Suppliers updated:", suppliers);
    console.log("Filtered Suppliers updated:", filteredSuppliers);
  }, [suppliers, filteredSuppliers]);

  return (
    <div className="suppliers-main">
      <div className="search-add-main">
        <SearchBar
          placeholderText="Search Suppliers"
          name="name"
          data={suppliers}
          setData={updateFilteredSuppliers}
        />
        <button
          className="add-supplier-btn"
          onClick={() => {
            setOpenModalAddSupplier(true);
          }}
        >
          <Add addText={"ADD SUPPLIER"} />
        </button>
      </div>
      <div className="suppliersInfo-main-container">
        {(filteredSuppliers.length > 0 ? filteredSuppliers : suppliers).map(
          (supplier) => {
            return (
              <div className="supplier-card" key={supplier._id}>
                <div className="supplier-title">
                  <h2>{supplier.name}</h2>
                </div>
                <div className="supplier-details">
                  <div className="supplier-address-box">
                    <span className="address-text">Address:</span>
                    <span className="address-info-text">
                      {supplier.address}
                    </span>
                  </div>
                  <hr className="supplier-line" />
                  <div className="supplier-phoneNumber-box">
                    <span className="phoneNumber-num">
                      Phone <br /> Number:
                    </span>
                    <span className="phoneNumber-info-num">
                      {supplier.phoneNumber}
                    </span>
                  </div>
                  <hr className="supplier-line" />
                  <div className="supplier-email-box">
                    <span className="email-text">Email:</span>
                    <span className="email-info-text">{supplier.email}</span>
                  </div>
                  <hr className="supplier-line" />
                </div>
                <div className="edit-delete-container">
                  <button
                    className="edit-supplier"
                    onClick={() => {
                      setOpenModalEditSupplier(true);
                      setSelectedSupplierId(supplier._id);
                      console.log(supplier._id);
                    }}
                  >
                    <img
                      className="edit-btn"
                      src="/images/icone-crayon-vert1.png"
                      alt="edit supplier"
                    />
                  </button>
                  <button
                    onClick={() => {
                      setOpenModalDiscardConfirm(true);
                      setSelectedSupplierId(supplier._id);
                    }}
                    className="delete-supplier"
                  >
                    <img
                      className="delete-btn"
                      src="/images/Delete.png"
                      alt="delete supplier"
                    />
                  </button>
                </div>
              </div>
            );
          }
        )}
      </div>
      {openModalAddSupplier && (
        <ModalAddSupplier
          modalTitle={"Add Supplier"}
          closeModal={() => {
            setOpenModalAddSupplier(false);
          }}
          saveChanges={"ADD SUPPLIER"}
        />
      )}
      {openModalEditSupplier && (
        <ModalEditSupplier
          modalTitle={"Edit Supplier"}
          closeModal={() => {
            setOpenModalEditSupplier(false);
          }}
          saveChanges={"SAVE CHANGES"}
          supplier={selectedSupplierId}
        />
      )}
      {openModalDiscardConfirm && (
        <ModalDiscardConfirm
          closeModal={closeModal}
          supplierId={selectedSupplierId}
          handleDeleteSupplier={handleDeleteSupplier}
          text={"Do you want to delete this supplier?"}
          saveChanges={"CONFIRM"}
        />
      )}
    </div>
  );
};
