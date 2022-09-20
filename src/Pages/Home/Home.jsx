import React from "react";

import "./styles.css";
import { useState } from "react";
import SurveysTab from "./SurveysTab";

const Home = () => {
  const [activeTab, setActiveTab] = useState("surveys");

  return (
    <section className="home__container">
      <div className="tabs__buttons">
        {/* <div className={`active ${activeTab === "stats" && "left"} `}></div>
        <button className="stats__button" onClick={() => setActiveTab("stats")}>
          گزارشات
        </button>
        <button
          className="surveys__button"
          onClick={() => setActiveTab("surveys")}
        >
          پرسشنامه‌ها
        </button> */}
        <SurveysTab />
      </div>
    </section>
  );
};

export default Home;
