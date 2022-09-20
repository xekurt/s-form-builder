import React, { useCallback, useEffect, useState } from "react";
import { addModal } from "../../Store/Slices/ModalSlice";
import { moveQuestion, removeQuestion } from "../../Store/Slices/MainSlice";
import { useDispatch, useSelector } from "react-redux";
import "./styles.css";

const SurveysTab = () => {
  const state = useSelector((state) => state);
  const { main } = state;
  const { surveys, uncategorizedQuestions: questions } = main;

  const [movementDetails, setMovementDetails] = useState({
    originId: "",
    destinationId: "",
  });
  const [selectedSurveyId, setSelectedSurveyId] = useState("");
  const [selectedSurvey, setSelectedSurvey] = useState(null);

  const dispatch = useDispatch();
  const addSurveyModal = () => {
    dispatch(addModal("survey"));
  };
  const addQuestionModal = () => {
    dispatch(addModal("question"));
  };

  const handleDeleteQuestion = (surveyId, id) => {
    dispatch(removeQuestion({ surveyId, id }));
  };
  useEffect(() => {
    setSelectedSurvey(surveys.find((item) => item.id === selectedSurveyId));
  }, [selectedSurveyId, surveys]);
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

  useEffect(() => {
    if (movementDetails.destinationId && movementDetails.originId) {
      dispatch(moveQuestion(movementDetails));
      setMovementDetails({ originId: "", destinationId: "" });
    }
  }, [movementDetails, dispatch]);

  // UI FUNCTIONS
  const renderSurveys = (item, index) => {
    const { title, id } = item;
    return (
      <div
        id={id}
        className={`survey__item ${selectedSurveyId === id && "selected"}`}
        key={index}
        onClick={() => setSelectedSurveyId(id)}
        onDragOver={handleDragOver}
        onDrop={() => handleDrop(id)}
      >
        <p>{title}</p>
      </div>
    );
  };
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

  return (
    <section className="surveys__tab">
      <article className="column">
        <h4> سوالات دسته بندی نشده</h4>
        <div className="surveys">
          {questions.length > 0 ? (
            questions.map(renderQuestions)
          ) : (
            <p style={{ margin: "1rem auto" }}>سوالی وجود ندارد</p>
          )}
          <button onClick={addQuestionModal} className="add__question__button">
            ایجاد سوال جدید +
          </button>
        </div>
      </article>
      {/* <article className="column">
        <h4> سوالات پرسشنامه : {selectedSurvey?.title}</h4>
        <div className="surveys">
          {selectedSurvey ? (
            selectedSurvey.questions.map(renderQuestions)
          ) : (
            <p style={{ margin: "1rem auto" }}>یک پرسشنامه انتخاب کنید</p>
          )}
        </div>
      </article> */}
      <article className="column">
        <h4>همه پرسشنامه‌ها</h4>
        <div className="surveys">
          {surveys.length > 0 ? (
            surveys.map(renderSurveys)
          ) : (
            <p style={{ margin: "1rem auto" }}>پرسشنامه ای ثبت نشده است</p>
          )}
          <button onClick={addSurveyModal} className="add__button">
            ساخت پرسشنامه +
          </button>
        </div>
      </article>
    </section>
  );
};

export default SurveysTab;
