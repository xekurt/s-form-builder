import React, { useState, useEffect } from "react";
import { useData } from "../../hooks/useData";
import SurveyForm from "../SurveyForm/Index";

import "./styles.css";

const AddSurveyModal = ({ editSurvey, type, id }) => {
  const [surveyData, setSurveyData] = useState(null);
  const { surveys } = useData();

  useEffect(() => {
    if (editSurvey && id) {
      setSurveyData(surveys.find((survey) => survey.id === id));
    }
  }, [id, editSurvey, surveys]);

  return (
    <article className="modal__container">
      <SurveyForm type={type} editSurvey={surveyData} />
    </article>
  );
};

export default AddSurveyModal;
