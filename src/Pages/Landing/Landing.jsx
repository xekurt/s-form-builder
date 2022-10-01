import React from "react";
import Surveys from "../../Components/Surveys/Surveys";
import { useData } from "../../hooks/useData";
import "./styles.css";

const Landing = () => {
  const { surveys } = useData();
  return (
    <section className="landing page">
      <div className="landing__page__header">
        <p>برای انجام دادن آزمون روی آن کلیک کنید</p>
      </div>
      <div className="landing__page__surveys">
        <Surveys surveysData={surveys} client />
      </div>
    </section>
  );
};

export default Landing;
