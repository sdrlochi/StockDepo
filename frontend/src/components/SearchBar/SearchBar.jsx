import React, { useState, useEffect } from "react";
import "./SearchBar.css";

export const SearchBar = ({
  placeholderText,
  data,
  setData,
  name,
  originalData,
  isInventory
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(()=>{
    if(isInventory){
      if (!searchQuery) {
       setData(originalData);
      }
      const filteredData = originalData?.filter((item) =>
        item[name].toLowerCase().includes(searchQuery.toLowerCase())
      );
      setData(filteredData);
    }
  },[searchQuery, isInventory]);
  
  useEffect(()=>{
    if(!isInventory){
      const filteredData = data.filter((item) =>
      item[name].toLowerCase().includes(searchQuery.toLowerCase())
    );
       setData(filteredData);
    }
  },[searchQuery, isInventory])

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
  };

  return (
    <>
      <label className="search-label" htmlFor="search">
        <img className="search-img" src="/images/Search.png" alt="Search" />
        <input
          className="input-search"
          type="text"
          id="search"
          name="search"
          value={searchQuery}
          placeholder={placeholderText}
          onChange={handleSearch}
        />
      </label>
    </>
  );
};
