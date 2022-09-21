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
        <Link to="/exams">
          <li>مدیریت آزمون</li>
        </Link>

        <Link to="/questionnaire">
          <li>مدیریت پرسشنامه</li>
        </Link>
        <Link to="/questions_bank">
          <li>بانک سوالات</li>
        </Link>
        <Link to="analytics">
          <li>گزارشات</li>
        </Link>

        <li>خروج</li>
      </ul>
    </div>
  );
};

export default Index;
