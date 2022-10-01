import React from "react";
import Surveys from "../../Components/Surveys/Surveys";
import "./styles.css";

const Landing = () => {
  return (
    <section className="landing page">
      <div className="landing__page__header">
        <p>برای انجام دادن آزمون روی آن کلیک کنید</p>
      </div>
      <div className="landing__page__surveys">
        <Surveys />
      </div>
    </section>
  );
};

export default Landing;
