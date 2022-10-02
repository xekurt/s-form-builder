import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import profile from "../../assets/icons/user.png";
import "./styles.css";
const Index = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    setShowSidebar(false);
  }, [pathname]);

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
      <div className={`profile__container ${!showSidebar && "hide"}`}>
        <div className="profile__image">
          <img src={profile} alt="profile" />
        </div>
        <div className="profile__data__container">
          <p>ayoubrezaei79@gmail.com</p>
          <p>09180858596</p>
        </div>
      </div>
      <ul className="page__items">
        <Link to="/landing">
          <li className={`${pathname.includes("exams") && "tab__selected"}`}>
            صفحه اصلی
          </li>
        </Link>
        <Link to="/exams">
          <li className={`${pathname.includes("exams") && "tab__selected"}`}>
            مدیریت آزمون
          </li>
        </Link>

        <Link to="/questionnaire">
          <li
            className={`${
              pathname.includes("questionnaire") && "tab__selected"
            }`}
          >
            مدیریت پرسشنامه
          </li>
        </Link>
        <Link to="/questions_bank">
          <li
            className={`${
              pathname.includes("question_bank") && "tab__selected"
            }`}
          >
            بانک سوالات
          </li>
        </Link>
        <Link to="analytics">
          <li
            className={`${pathname.includes("analytics") && "tab__selected"}`}
          >
            گزارشات
          </li>
        </Link>

        <li>خروج</li>
      </ul>
    </div>
  );
};

export default Index;
