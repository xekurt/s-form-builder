import React from "react";
import SurveyForm from "../SurveyForm/Index";
import "./styles.css";

const AddSurveyModal = () => {
  return (
    <article className="modal__container">
      <SurveyForm />
    </article>
  );
};

export default AddSurveyModal;
