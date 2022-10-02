import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useData } from "../../hooks/useData";
import "./styles.css";

const TakeSurvey = () => {
  const location = useLocation();
  const [data, setData] = useState({
    surveyInfo: {},
    surveyQuestions: [],
  });
  const [formStructure, setFormStructure] = useState([]);
  const [started, setStarted] = useState(false);
  const { surveys, questions } = useData();
  console.info(formStructure);
  useEffect(() => {
    if (questions.length > 0 && surveys.length > 0) {
      const surveyId = location.pathname.split("/")[2];
      // find target survey
      const survey = surveys.find((item) => item.id === surveyId);
      const { questionIds } = survey;

      let questionItems = [];
      // find all question items and store them
      questionIds.forEach((id) => {
        questionItems.push(questions.find((item) => item.id === id));
      });

      let formObjects = [];
      questionItems.forEach((item) => {
        const { type, id } = item;

        if (type === "descriptive") {
          formObjects = [
            ...formObjects,
            { id, type: "text", label: item.title, value: "" },
          ];
        } else if (type === "fourAnswer") {
          formObjects = [
            ...formObjects,
            {
              id,
              type: "four",
              label: item.title,
              options: item.options.map((opt) => ({ ...opt, value: false })),
              valie: "",
            },
          ];
        }
      });
      setFormStructure(formObjects);
    }
  }, [location, questions, surveys]);

  const handleTextInput = (e) => {
    const { id, value } = e.target;
    setFormStructure(
      formStructure.map((item) => {
        if (item.id === id) {
          return { ...item, value };
        } else {
          return item;
        }
      })
    );
  };
  const renderQuestions = (item, index) => {
    const { type } = item;
    if (type === "text") {
      return (
        <div className="input__box" key={index}>
          <label>
            {item.label}
            {item.defaultScore && (
              <span>{` (${item?.defaultScore} نمره) `}</span>
            )}
          </label>
          <input
            id={item.id}
            onChange={handleTextInput}
            value={formStructure.find((form) => form.id === item.id).value}
          />
        </div>
      );
    } else if (type === "four") {
      return (
        <div className="question__content" key={item.id}>
          <label>{item.label}</label>
          {item.options.map((option) => (
            <div key={option.title} className="four__answer__template">
              <label htmlFor={item.id}>{option.title}</label>
              <input
                type="checkbox"
                style={{ width: "26px" }}
                id={item.id}
                name={item.id}
              />
            </div>
          ))}
        </div>
      );
    }
  };

  return (
    <section className="takesurvey__container page">
      <div className="takesurvey__header">
        <h3>{data.surveyInfo?.title}</h3>
        <p>{data.surveyInfo?.desc}</p>
      </div>
      <div className="takesurvey__wrapper">
        {formStructure.map(renderQuestions)}
        <div className="takesurvey__buttons">
          {!started && (
            <button onClick={() => setStarted(true)}>شروع آزمون</button>
          )}
          {started && (
            <div className="started__buttons">
              <button id="end" onClick={() => setStarted(false)}>
                پایان آزمون
              </button>
              <div>
                <button id="next">سوال بعد</button>
                <button id="prev">سوال قبل</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default TakeSurvey;
