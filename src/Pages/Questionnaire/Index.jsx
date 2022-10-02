import React, { useState, useEffect } from "react";
import Surveys from "../../Components/Surveys/Surveys";
import Questions from "../../Components/Questions/Index";
import { useData } from "../../hooks/useData";
import { useMovement } from "../../hooks/useMovement";
import "./styles.css";
import { useDispatch } from "react-redux";
import { addModal } from "../../Store/Slices/ModalSlice";

const Index = () => {
  const dispatch = useDispatch();
  const { surveys, questions } = useData();
  const [questionnaires, setQuestionnaires] = useState();
  const { handleDrop, handleDragStart } = useMovement();

  // Filter out questionnaires from surveys
  useEffect(() => {
    console.info(surveys);
    setQuestionnaires(
      surveys?.filter((survey) => survey?.type === "questionnaire")
    );
  }, [surveys]);

  const addQuestionModal = () => {
    dispatch(addModal({ name: "question", type: "questionnaire" }));
  };
  const addSurveyModal = () => {
    dispatch(addModal({ name: "survey", type: "questionnaire" }));
  };

  return (
    <section className="page">
      <div className="questionnaire__questions__container">
        <Questions
          type="questionnaire"
          handleStartMovement={handleDragStart}
          questions={questions}
        />
        <button className="add__question__btn" onClick={addQuestionModal}>
          اضافه کردن سوال
        </button>
      </div>
      <div className="questionnaire__surveys__container">
        <Surveys
          type="questionnaire"
          surveysData={questionnaires}
          handleEndMovement={handleDrop}
        />
        <button onClick={addSurveyModal} className="add__button">
          ساخت آزمون جدید
        </button>
      </div>
    </section>
  );
};

export default Index;
