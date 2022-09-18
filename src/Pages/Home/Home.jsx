import React from "react";

import "./styles.css";
import { useState } from "react";
import SurveysTab from "./SurveysTab";

const Home = () => {
  const [activeTab, setActiveTab] = useState("surveys");

  const Tab = {
    surveys: <SurveysTab />,
  };
  return (
    <section className="home__container">
      <div className="tabs__buttons">
        <div className={`active ${activeTab === "stats" && "left"} `}></div>
        <button className="stats__button" onClick={() => setActiveTab("stats")}>
          گزارشات
        </button>
        <button
          className="surveys__button"
          onClick={() => setActiveTab("surveys")}
        >
          پرسشنامه‌ها
        </button>
      </div>
      {Tab[activeTab]}
    </section>
  );
};

export default Home;
