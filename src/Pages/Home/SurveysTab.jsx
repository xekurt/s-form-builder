import React, { useEffect, useState } from "react";
import { addModal } from "../../Store/Slices/ModalSlice";
import { useDispatch, useSelector } from "react-redux";
import "./styles.css";

const SurveysTab = () => {
  const state = useSelector((state) => state);
  console.info(state);
  const { main } = state;
  const { surveys, uncategorizedQuestions: questions } = main;
  const [movementDetails, setMovementDetails] = useState({
    originId: "",
    destinationId: "",
  });
  const [selectedSurvey, setSelectedSurvey] = useState(null);

  const dispatch = useDispatch();
  const addSurveyModal = () => {
    dispatch(addModal("survey"));
  };
  const addQuestionModal = () => {
    dispatch(addModal("question"));
  };

  const handleSelectSurvey = (item) => {
    setSelectedSurvey(item);
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

  useEffect(() => {
    // console.info(movementDetails);
  }, [movementDetails]);

  // UI FUNCTIONS
  const renderSurveys = (item, index) => {
    const { title, id } = item;
    return (
      <div
        id={id}
        className="survey__item"
        onClick={() => handleSelectSurvey(item)}
        key={index}
        onDragOver={handleDragOver}
        onDrop={() => handleDrop(id)}
      >
        <p>{title}</p>
      </div>
    );
  };
  const renderQuestions = (item, index) => {
    const { title, type, id } = item;
    return (
      <div
        id={id}
        className="question__item"
        onClick={() => handleSelectSurvey(item)}
        key={index}
        draggable
        onDragStart={handleDragStart}
      >
        <span>
          {type === "multipleChoice"
            ? "چهارگزینه‌ای"
            : type === "truthy"
            ? "صحیح و غلط"
            : "تشریحی"}
        </span>
        <p>{title}</p>
      </div>
    );
  };

  return (
    <section className="surveys__tab">
      <article className="column">
        <h4> همه سوالات</h4>
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
      <article className="column">
        <h4> سوالات این پرسشنامه</h4>
        <div className="surveys">
          <p style={{ margin: "1rem auto" }}>یک پرسشنامه انتخاب کنید</p>
        </div>
      </article>
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
