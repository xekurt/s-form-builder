import React from "react";
import { addModal } from "../../Store/Slices/ModalSlice";
import { useDispatch } from "react-redux";
import "./styles.css";
import { useState } from "react";

const Home = () => {
  const [activeTab, setActiveTab] = useState("surveys");
  const dispatch = useDispatch();
  const addSurveyModal = () => {
    dispatch(addModal("survey"));
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
      <div></div>
      {/* <button onClick={addSurveyModal}>ساخت پرسشنامه</button> */}
    </section>
  );
};

export default Home;
