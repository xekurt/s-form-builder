import React, { useEffect } from "react";
import { useState } from "react";
import Surveys from "../../Components/Surveys/Surveys";
import Questions from "../../Components/Questions/Index";
import { useData } from "../../hooks/useData";
import { useMovement } from "../../hooks/useMovement";
import "./styles.css";

const Exams = () => {
  const { surveys } = useData();
  const [exams, setExams] = useState();
  const [selectedSurvey, setSelectedSurvey] = useState(null);
  const [selectedSurveyId, setSelectedSurveyId] = useState(null);
  const { handleDrop, handleDragStart } = useMovement();

  // Filter all surveys and access exams
  useEffect(() => {
    setExams(surveys.filter((survey) => survey.type === "exam"));
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
        type="exam"
        selectedSurvey={selectedSurvey}
        handleStartMovement={handleDragStart}
      />
      <Surveys
        type="exam"
        surveysData={exams}
        handleSelectSurvey={handleSelectSurvey}
        selectedSurveyId={selectedSurveyId}
        handleEndMovement={handleDrop}
      />
    </section>
  );
};

export default Exams;
