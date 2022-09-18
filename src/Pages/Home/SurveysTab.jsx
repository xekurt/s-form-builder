import React, { useState } from "react";
import { addModal } from "../../Store/Slices/ModalSlice";
import { useDispatch, useSelector } from "react-redux";
import SurveyForm from "../../Components/SurveyForm/Index";
import QuestionForm from "../../Components/QuestionForm/Index";
import "./styles.css";

const SurveysTab = () => {
  const { surveys } = useSelector((state) => state);
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
  const renderSurveys = (item, index) => {
    const { title } = item;
    return (
      <div
        className="survey__item"
        onClick={() => handleSelectSurvey(item)}
        key={index}
      >
        <p>{title}</p>
      </div>
    );
  };

  return (
    <section className="surveys__tab">
      <article className="column">
        <h4> همه سوالات</h4>
        <div className="surveys">
          {surveys.length > 0 ? (
            surveys.map(renderSurveys)
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
          {surveys.length > 0 ? (
            surveys.map(renderSurveys)
          ) : (
            <p style={{ margin: "1rem auto" }}>یک پرسشنامه انتخاب کنید</p>
          )}
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
