import React from "react";

const Header = ({ handleSubmit, handleChange, searchString }) => (
  <header className="header" id="home">
    <h1 className="title">The Explorer</h1>
    <div className="search-container">
      <form onSubmit={handleSubmit}>
        <input
          className="search-input"
          type="text"
          placeholder="Search"
          value={searchString}
          onChange={handleChange}
        />
        <button
          className="btn btn-primary"
          type="submit"
          disabled={searchString && searchString.length === 0 ? true : false}
        >
          Explore
        </button>
      </form>
    </div>
  </header>
);

export default Header;
