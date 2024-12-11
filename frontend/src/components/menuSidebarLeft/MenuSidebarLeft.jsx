import "./MenuSidebarLeft.css";
import React, {useState} from "react";
import { Link, Outlet, NavLink } from "react-router-dom";

export const MenuSidebarLeft = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  const logout = () => {
    setLoggedIn(false);
    localStorage.setItem("loggedIn", "false");
    localStorage.removeItem("token");
  };

  return (
    <>
      <div className="menu-panel">
        <Link to="/dashboard">
          <img className="logo" src="/images/logo1.png" alt="logoItLabs" />
        </Link>
        <div className="sidebar-navigation">
          <NavLink className="dashboard-link" to="/dashboard">
            <img
              className="dashboard-img"
              src="/images/DashboardLayout.png"
              alt="dashboard-layout"
            />
            <h1>Dashboard</h1>
          </NavLink>
          <NavLink className="items-nav-link" to="/inventory">
            <img
              className="product"
              src="/images/ProductLayout.png"
              alt="product"
            />
            <h1>Inventory</h1>
          </NavLink>
          <NavLink className="reports-link" to="/reports">
            <img
              className="combo-chart"
              src="/images/ComboChart.png"
              alt="combo-chart"
            />
            <h1>Reports</h1>
          </NavLink>
          <NavLink className="suppliers-link" to="/suppliers">
            <h1>Suppliers</h1>
          </NavLink>
          <NavLink className="signout" to="/" onClick={logout}>
            <img
              className="shutdown"
              src="/images/Shutdown.png"
              alt="shutdown"
            />
            <h1>Sign Out</h1>
          </NavLink>
        </div>
      </div>
      <Outlet />
    </>
  );
};
