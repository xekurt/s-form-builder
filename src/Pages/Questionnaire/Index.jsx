import React, { useState, useEffect } from "react";
import List from "../../Components/List/List";
import Questions from "../../Components/Questions/Index";
import { useData } from "../../hooks/useData";
import "./styles.css";
const Index = () => {
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
      <Questions type="questionnaire" selectedSurvey={selectedSurvey} />
      <List
        type="questionnaire"
        surveysData={surveys}
        handleSelectSurvey={handleSelectSurvey}
        selectedSurveyId={selectedSurveyId}
      />
    </section>
  );
};

export default Index;
