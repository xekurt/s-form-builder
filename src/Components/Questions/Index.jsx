import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { removeQuestion } from "../../Store/Slices/MainSlice";
import { addModal } from "../../Store/Slices/ModalSlice";
import "./styles.css";

const Index = ({ type = "free", selectedSurvey, uncategorizedQuestions }) => {
  const dispatch = useDispatch();
  const [showError, setShowError] = useState(null);
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
    // if your in questions bank page then this line will be executed
    if (type === "free") {
      dispatch(addModal({ name: "question", type }));
    }
    // else if your in questionnaire or exams page you must have selected a (questionnaire or exam) in order to be able to add a new question
    else {
      if (!selectedSurvey) {
        setShowError(true);
      } else {
        setShowError(false);
        dispatch(
          addModal({ name: "question", type, parentId: selectedSurvey.id })
        );
      }
    }
  };

  const handleDeleteQuestion = (surveyId, id) => {
    dispatch(removeQuestion({ surveyId, id }));
  };

  useEffect(() => {
    setShowError(false);
  }, [selectedSurvey]);

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
          <p style={{ margin: "1rem auto", color: showError && "red" }}>
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
