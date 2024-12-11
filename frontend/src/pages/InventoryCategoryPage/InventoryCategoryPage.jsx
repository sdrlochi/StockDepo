import "./InventoryCategoryPage.css";
import { useParams } from "react-router-dom";
import React from "react";
import { Category } from "../../components/Category/Category";
import { Header } from "../../components/Header/Header";

export const InventoryCategoryPage = () => {
  const { title } = useParams();

  return (
    <div className="inventory-main">
      <Header headerTitle={"Inventory"} headerSubtitle={title} />
      <Category title={title}/>
    </div>
  );
};
