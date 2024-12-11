import { Header } from "../../components/Header/Header";
import { Orders } from "../../components/Orders/Orders"
import "./InventoryItemPage.css"
import React from 'react';
import { useParams } from "react-router-dom";

export const InventoryItemPage = () => {
  const { title, itemTitle } = useParams();

  return (
    <div className="inventory-main">
      <Header headerTitle={"Inventory"} headerSubtitle={title} headerSubSubtitle={itemTitle} />
      <Orders/>
    </div>
  )
}