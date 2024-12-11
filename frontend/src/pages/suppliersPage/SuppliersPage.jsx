import React from "react";
import "./SuppliersPage.css";
import { Header } from "../../components/Header/Header";
import { SuppliersInfo } from "../../components/SuppliersInfo/SuppliersInfo";

export const SuppliersPage = () => {
  return (
    <div className="supplier-main">
      <div className="supplier-header">
      <Header headerTitle={"Suppliers"}/>
      </div>
      <SuppliersInfo/>
    </div>
  )
}

 