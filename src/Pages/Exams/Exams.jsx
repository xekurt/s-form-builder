import React, { useEffect } from "react";

import "./styles.css";
import { useState } from "react";
import List from "../../Components/List/List";
import Questions from "../../Components/Questions/Index";
import { useSelector } from "react-redux";
import { useData } from "../../hooks/useData";

const Exams = () => {
  const { surveys } = useData();
  const [selectedSurvey, setSelectedSurvey] = useState(null);
  const [selectedSurveyId, setSelectedSurveyId] = useState(null);

  useEffect(() => {
    setSelectedSurvey(surveys.find((item) => item.id === selectedSurveyId));
  }, [selectedSurveyId, surveys]);

  const handleSelectSurvey = (id) => {
    setSelectedSurveyId(id);
  };

  return (
    <section className="page">
      <Questions type="exam" selectedSurvey={selectedSurvey} />
      <List
        type="exam"
        surveysData={surveys}
        handleSelectSurvey={handleSelectSurvey}
        selectedSurveyId={selectedSurveyId}
      />
    </section>
  );
};

export default Exams;
