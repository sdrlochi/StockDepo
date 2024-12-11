import "./App.css";
import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { DashboardPage } from "./pages/dashboardPage/DashboardPage";
import { Default } from "./pages/defaultPage/Default";
import { InventoryPage } from "./pages/inventoryPage/InventoryPage";
import { ReportsPage } from "./pages/reportsPage/ReportsPage";
import { SuppliersPage } from "./pages/suppliersPage/SuppliersPage";
import { InventoryCategoryPage } from "./pages/InventoryCategoryPage/InventoryCategoryPage";
import { ActivityHistoryPage } from "./pages/ActivityHistoryPage/ActivityHistoryPage";
import { InventorySummaryPage } from "./pages/InventorySummaryPage/InventorySummaryPage";
import { InventoryItemPage } from "./pages/InventoryItemPage/InventoryItemPage";
import { MenuSidebarLeft } from "./components/menuSidebarLeft/MenuSidebarLeft";
import { NotFound } from "./components/NotFound/NotFound";
import { Toggle } from "./components/Toggle/Toggle";

export const DataContext = React.createContext();

function App() {
  const [data, setData] = useState({
    categories: [],
    items: [],
    orders: [],
    suppliers: [],
    activities: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesResponse = await fetch(
          "http://localhost:9001/api/v1/category",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        const itemsResponse = await fetch("http://localhost:9003/api/v1/item", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const ordersResponse = await fetch(
          "http://localhost:9005/api/v1/order",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        const suppliersResponse = await fetch(
          "http://localhost:9007/api/v1/supplier",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        const activitiesResponse = await fetch(
          "http://localhost:9009/api/v1/activity",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        const categoriesData = await categoriesResponse.json();
        const itemsData = await itemsResponse.json();
        const ordersData = await ordersResponse.json();
        const suppliersData = await suppliersResponse.json();
        const activitiesData = await activitiesResponse.json();

        let newData = { ...data };

        if (categoriesResponse.ok) {
          console.log("Response for categories:", categoriesData);
          newData.categories = categoriesData.data.categories;
        } else {
          console.error("Error fetching categories");
        }

        if (itemsResponse.ok) {
          console.log("Response for items:", itemsData);
          newData.items = itemsData.data.items;
        } else {
          console.error("Error fetching items");
        }

        if (ordersResponse.ok) {
          console.log("Response for orders:", ordersData);
          newData.orders = ordersData.data.orders;
        } else {
          console.error("Error fetching items");
        }

        if (suppliersResponse.ok) {
          console.log("Response for suppliers:", suppliersData);
          newData.suppliers = suppliersData.data.suppliers;
        } else {
          console.error("Error fetching suppliers");
        }

        if (activitiesResponse.ok) {
          console.log("Response for activities:", activitiesData);
          newData.activities = activitiesData.data.activities;
        } else {
          console.error("Error fetching suppliers");
        }

        setData(newData);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <DataContext.Provider value={data}>
        <main>
          <Routes>
            <Route path="/" element={<Default />} />
            <Route path="*" element={<NotFound />} />
            <Route element={<MenuSidebarLeft />}>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/inventory" element={<InventoryPage />} />
              <Route
                path="/inventory/:title"
                element={<InventoryCategoryPage />}
              />
              <Route
                path="/inventory/:title/:itemTitle"
                element={<InventoryItemPage />}
              />
              <Route path="/reports" element={<ReportsPage />} />
              <Route
                path="/reports/activityhistory"
                element={<ActivityHistoryPage />}
              />
              <Route
                path="/reports/inventorysummary"
                element={<InventorySummaryPage />}
              />
              <Route path="/suppliers" element={<SuppliersPage />} />
            </Route>
          </Routes>
        </main>
      </DataContext.Provider>
    </div>
  );
}
export default App;
