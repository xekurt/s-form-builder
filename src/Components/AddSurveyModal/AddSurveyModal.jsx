import React from "react";
import SurveyForm from "../SurveyForm/Index";
import "./styles.css";

const AddSurveyModal = ({ type }) => {
  return (
    <article className="modal__container">
      <SurveyForm type={type} />
    </article>
  );
};

export default AddSurveyModal;
