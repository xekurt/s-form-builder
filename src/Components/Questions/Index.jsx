import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { removeQuestion } from "../../Store/Slices/MainSlice";
import { addModal } from "../../Store/Slices/ModalSlice";
import "./styles.css";

const Index = ({
  type = "questionnaire",
  selectedSurvey,
  uncategorizedQuestions,
}) => {
  const dispatch = useDispatch();

  const [movementDetails, setMovementDetails] = useState({
    originId: "",
    destinationId: "",
  });

  const renderQuestions = (item, index) => {
    const { title, type, id, surveyId } = item;
    return (
      <div
        id={id}
        className="question__item"
        key={index}
        draggable
        onDragStart={handleDragStart}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <span
            className="delete__icon"
            onClick={() => handleDeleteQuestion(surveyId, id)}
          >
            ×
          </span>

          <span className="tag">
            {type === "fourAnswer"
              ? "چهارگزینه‌ای"
              : type === "truthy"
              ? "صحیح و غلط"
              : type === "multipleChoice"
              ? "چندجوابی"
              : "تشریحی"}
          </span>
        </div>
        <p>{title}</p>
      </div>
    );
  };
  const addQuestionModal = () => {
    dispatch(addModal({ name: "question", type }));
  };

  const handleDeleteQuestion = (surveyId, id) => {
    dispatch(removeQuestion({ surveyId, id }));
  };

  // DRAG AND DROP LOGIC
  const handleDrop = (id) => {
    setMovementDetails((prevState) => ({ ...prevState, destinationId: id }));
  };
  const handleDragOver = (e) => {
    e.preventDefault();
  };
  const handleDragStart = (e) => {
    const { id } = e.target;
    setMovementDetails((prevState) => ({ ...prevState, originId: id }));
  };

  return (
    <article className="questions__column">
      <h4>
        {type === "questionnaire" ? "سوالات پرسشنامه : " : "سوالات آزمون : "}
        {selectedSurvey?.title}
      </h4>
      <div className="questions__wrapper">
        {selectedSurvey ? (
          selectedSurvey.questions.map(renderQuestions)
        ) : (
          <p style={{ margin: "1rem auto" }}>
            {type === "questionnaire"
              ? " یک پرسشنامه انتخاب کنید"
              : "  یک آزمون انتخاب کنید"}
          </p>
        )}
        {uncategorizedQuestions ? (
          uncategorizedQuestions.map(renderQuestions)
        ) : (
          <p style={{ margin: "1rem auto" }}>هیچ سوالی ساخته نشده است</p>
        )}
        <button className="add__question__btn" onClick={addQuestionModal}>
          اضافه کردن سوال
        </button>
      </div>
    </article>
  );
};

export default Index;
