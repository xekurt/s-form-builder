import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Surveys from "../../Components/Surveys/Surveys";
import Questions from "../../Components/Questions/Index";
import { useData } from "../../hooks/useData";
import { moveQuestion } from "../../Store/Slices/MainSlice";
import "./styles.css";
const Index = () => {
  const dispatch = useDispatch();
  const { surveys } = useData();
  const [questionnaires, setQuestionnaires] = useState();
  const [movementDetails, setMovementDetails] = useState({
    parentId: "",
    questionId: "",
    destinationId: "",
  });
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

  // Movement logic
  const handleDragStart = (id, parentId) => {
    setMovementDetails((prevState) => ({
      ...prevState,
      questionId: id,
      parentId,
    }));
  };
  const handleDrop = (id) => {
    setMovementDetails((prevState) => ({ ...prevState, destinationId: id }));
  };

  useEffect(() => {
    if (
      movementDetails.destinationId &&
      movementDetails.questionId &&
      movementDetails.parentId
    ) {
      dispatch(moveQuestion({ ...movementDetails }));
      setMovementDetails({ destinationId: "", questionId: "", parentId: "" });
    }
  }, [movementDetails, dispatch]);

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
