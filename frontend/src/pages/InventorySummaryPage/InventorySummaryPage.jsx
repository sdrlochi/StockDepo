import React, { useContext, useState } from "react";
import "./InventorySummaryPage.css";
import { ReportsChart } from "../../components/ReportsChart/ReportsChart";
import { DataContext } from "../../App";
import { Header } from "../../components/Header/Header";

export const InventorySummaryPage = () => {
  const { categories } = useContext(DataContext);
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleDateFromChange = (e) => {
    setDateFrom(e.target.value);
  };

  const handleDateToChange = (e) => {
    setDateTo(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleShowResults = () => {
    setShowResults(true);
  };

  const handleReset = (e) => {
    setDateFrom("");
    setDateTo("");
    setShowResults(false);
    setSelectedCategory("");
  };

  return (
    <div className="reports-main">
      <Header headerTitle={"Reports"} headerSubtitle={"Inventory Summary"} />
      <div className="btns-container">
        <div class="input-container">
          <label htmlFor="">Date From</label>
          <input
            type="date"
            className="input-calendar"
            id="dateFrom"
            name="dateFrom"
            placeholder="Date From"
            value={dateFrom}
            onChange={handleDateFromChange}
          />
        </div>
        <div class="input-container">
          <label htmlFor="">Date To</label>
          <input
            type="date"
            className="input-calendar"
            id="dateTo"
            name="dateTo"
            value={dateTo}
            onChange={handleDateToChange}
          />
        </div>
        <select
          className="select-category"
          id="categoryDropdown"
          name="category"
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category._id} value={category.title}>
              {category.title}
            </option>
          ))}
        </select>
        <button
          className="btn-show-reset"
          onClick={showResults ? handleReset : handleShowResults}
        >
          {showResults ? "RESET" : "SHOW"}
        </button>
      </div>

      <ReportsChart
        dateFrom={dateFrom}
        dateTo={dateTo}
        selectedCategory={selectedCategory}
        showResults={showResults}
      />
    </div>
  );
};
