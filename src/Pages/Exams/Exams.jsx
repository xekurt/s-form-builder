import React, { useEffect } from "react";

import "./styles.css";
import { useState } from "react";
import List from "../../Components/List/List";
import Questions from "../../Components/Questions/Index";
import { useDispatch } from "react-redux";
import { useData } from "../../hooks/useData";
import { moveQuestion } from "../../Store/Slices/MainSlice";

const Exams = () => {
  const dispatch = useDispatch();
  const { surveys } = useData();
  const [exams, setExams] = useState();
  const [selectedSurvey, setSelectedSurvey] = useState(null);
  const [selectedSurveyId, setSelectedSurveyId] = useState(null);
  const [movementDetails, setMovementDetails] = useState({
    parentId: "",
    questionId: "",
    destinationId: "",
  });
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
        type="exam"
        selectedSurvey={selectedSurvey}
        handleStartMovement={handleDragStart}
      />
      <List
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
