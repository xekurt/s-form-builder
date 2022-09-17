import React from "react";
import { useState } from "react";
import "./styles.css";
const Index = () => {
  const [showSidebar, setShowSidebar] = useState(true);
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
        <li>پروفایل</li>
        <li>خروج</li>
      </ul>
    </div>
  );
};

export default Index;
