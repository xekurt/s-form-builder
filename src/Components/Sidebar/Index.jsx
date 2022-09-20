import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./styles.css";
const Index = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  return (
    <div className={`sidebar__container ${showSidebar ? "" : "disable"}`}>
      <div className="sidebar__button__container">
        <span
          onClick={() => {
            setShowSidebar(!showSidebar);
          }}
        >
          {`${showSidebar ? ">" : "<"}`}
        </span>
      </div>
      <ul className="page__items">
        <li>پرسشنامه</li>
        <Link to="analytics">
          <li>پروفایل</li>
        </Link>
        <li>خروج</li>
      </ul>
    </div>
  );
};

export default Index;
