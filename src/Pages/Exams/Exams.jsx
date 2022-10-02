import React, { useEffect } from "react";
import { useState } from "react";
import Surveys from "../../Components/Surveys/Surveys";
import Questions from "../../Components/Questions/Index";
import { useData } from "../../hooks/useData";
import { useMovement } from "../../hooks/useMovement";
import "./styles.css";
import { useDispatch } from "react-redux";
import { addModal } from "../../Store/Slices/ModalSlice";

const Exams = () => {
  const { surveys, questions } = useData();
  const [exams, setExams] = useState();
  const { handleDrop, handleDragStart } = useMovement();
  const dispatch = useDispatch();

  // Filter all surveys and access exams
  useEffect(() => {
    setExams(surveys?.filter((survey) => survey?.type === "exam"));
  }, [surveys]);

  const addQuestionModal = () => {
    dispatch(addModal({ name: "question", type: "exam" }));
  };

  const addSurveyModal = () => {
    dispatch(addModal({ name: "survey", type: "exam" }));
  };

  return (
    <section className="page">
      <div className="exams__questions__container">
        <Questions
          type="exam"
          handleStartMovement={handleDragStart}
          questions={questions}
        />
        <button className="add__question__btn" onClick={addQuestionModal}>
          اضافه کردن سوال
        </button>
      </div>
      <div className="exams__surveys__container">
        <Surveys
          type="exam"
          surveysData={exams}
          handleEndMovement={handleDrop}
        />
        <button onClick={addSurveyModal} className="add__button">
          ساخت آزمون جدید
        </button>
      </div>
    </section>
  );
};

export default Exams;
