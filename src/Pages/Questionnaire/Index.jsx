import React, { useState, useEffect } from "react";
import Surveys from "../../Components/Surveys/Surveys";
import Questions from "../../Components/Questions/Index";
import { useData } from "../../hooks/useData";
import { useMovement } from "../../hooks/useMovement";
import "./styles.css";

const Index = () => {
  const { surveys } = useData();
  const [questionnaires, setQuestionnaires] = useState();
  const { handleDrop, handleDragStart } = useMovement();
  const [selectedSurvey, setSelectedSurvey] = useState(null);
  const [selectedSurveyId, setSelectedSurveyId] = useState(null);

  // Filter out questionnaires from surveys
  useEffect(() => {
    setQuestionnaires(
      surveys.filter((survey) => survey.type === "questionnaire")
    );
  }, [surveys]);

  useEffect(() => {
    setSelectedSurvey(surveys.find((item) => item.id === selectedSurveyId));
  }, [selectedSurveyId, surveys]);

  const handleSelectSurvey = (id) => {
    setSelectedSurveyId(id);
  };

  return (
    <section className="page">
      <Questions
        type="questionnaire"
        selectedSurvey={selectedSurvey}
        handleStartMovement={handleDragStart}
      />
      <Surveys
        type="questionnaire"
        surveysData={questionnaires}
        handleSelectSurvey={handleSelectSurvey}
        selectedSurveyId={selectedSurveyId}
        handleEndMovement={handleDrop}
      />
    </section>
  );
};

export default Index;
