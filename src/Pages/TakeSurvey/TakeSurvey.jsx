import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useData } from "../../hooks/useData";
import "./styles.css";

const TakeSurvey = () => {
  const location = useLocation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [data, setData] = useState({
    surveyInfo: {},
    surveyQuestions: [],
  });
  const [formStructure, setFormStructure] = useState([]);
  const [started, setStarted] = useState(false);
  const { surveys, questions } = useData();

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
        } else if (type === "fourAnswer" || type === "multipleChoice") {
          formObjects = [
            ...formObjects,
            {
              id,
              type,
              label: item.title,
              options: item.options.map((opt) => ({ ...opt, value: false })),
              value: "",
            },
          ];
        } else if (type === "truthy") {
          formObjects = [
            ...formObjects,
            { id, type, label: item.title, value: null },
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
  const handleFourAnswerInput = (e) => {
    const { id, value } = e.target;

    setFormStructure(
      formStructure.map((item) => {
        if (item.type === "fourAnswer") {
          return {
            ...item,
            options: item.options.map((option) => {
              if (option.id === id) {
                return { ...option, value: true };
              } else {
                return { ...option, value: false };
              }
            }),
          };
        } else return item;
      })
    );
  };
  const handleMultipleChoiceInput = (e) => {
    const { id } = e.target;

    setFormStructure(
      formStructure.map((item) => {
        if (item.type === "multipleChoice") {
          return {
            ...item,
            options: item.options.map((option) => {
              if (option.id === id) {
                return { ...option, value: true };
              } else return option;
            }),
          };
        } else return item;
      })
    );
  };
  const handleTruthyInput = (e) => {
    const { name, id } = e.target;
    setFormStructure(
      formStructure.map((form) => {
        if (form.id === id) {
          return { ...form, value: name === "truth" ? true : false };
        } else return form;
      })
    );
  };

  const renderQuestion = (item, index) => {
    const { type } = item;
    if (type === "text") {
      return (
        <div className="input__box question" key={index}>
          <label>
            {item.label}
            {item.defaultScore && (
              <span>{` (${item?.defaultScore} نمره) `}</span>
            )}
          </label>
          <input
            disabled={!started}
            id={item.id}
            onChange={handleTextInput}
            value={formStructure.find((form) => form.id === item.id).value}
          />
        </div>
      );
    } else if (type === "fourAnswer") {
      return (
        <div className="input__box question" key={item.id}>
          <label>{item.label}</label>
          {item.options.map((option) => (
            <div key={option.title} className="input__option">
              <label htmlFor={option.id}>{option.title}</label>
              <input
                disabled={!started}
                type="checkbox"
                style={{ width: "26px" }}
                checked={
                  formStructure
                    .find((form) => form.id === item.id)
                    .options.find((op) => op.id === option.id).value
                }
                id={option.id}
                name={option.id}
                onChange={handleFourAnswerInput}
              />
            </div>
          ))}
        </div>
      );
    } else if (type === "multipleChoice") {
      return (
        <div className="input__box question" key={item.id}>
          <label>{item.label}</label>
          {item.options.map((option) => (
            <div key={option.title} className="input__option">
              <label htmlFor={option.id}>{option.title}</label>
              <input
                disabled={!started}
                type="checkbox"
                style={{ width: "26px" }}
                id={option.id}
                name={option.id}
                checked={
                  formStructure
                    .find((form) => form.id === item.id)
                    .options.find((op) => op.id === option.id).value
                }
                onChange={handleMultipleChoiceInput}
              />
            </div>
          ))}
        </div>
      );
    } else if (type === "truthy") {
      return (
        <div className="input__box question" key={index}>
          <label>
            {item.label}
            {item.defaultScore && (
              <span>{` (${item.defaultScore} نمره) `}</span>
            )}
          </label>
          <div className="truthy__template">
            <label htmlFor="truth">صحیح</label>
            <input
              disabled={!started}
              type="radio"
              name="truth"
              checked={formStructure.find((form) => form.id === item.id).value}
              onChange={handleTruthyInput}
              id={item.id}
            />
          </div>
          <div className="truthy__template">
            <label>غلط</label>
            <input
              disabled={!started}
              type="radio"
              name="false"
              checked={
                formStructure.find((form) => form.id === item.id).value ===
                false
              }
              onChange={handleTruthyInput}
              id={item.id}
            />
          </div>
        </div>
      );
    }
  };
  const renderQuestions = (item, index) => {
    return index === currentIndex && renderQuestion(item, index);
  };

  return (
    <section className="takesurvey__container page">
      <h3 style={{ margin: "2rem auto" }}>روی دکمه شروع آزمون کلیک کنید</h3>
      <div className="takesurvey__header">
        <h3>{data.surveyInfo?.title}</h3>
        <p>{data.surveyInfo?.desc}</p>
      </div>
      <div className="takesurvey__wrapper">
        {formStructure.map(renderQuestions)}
      </div>
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
              <button
                id="prev"
                onClick={() =>
                  currentIndex > 0
                    ? setCurrentIndex((prevState) => prevState - 1)
                    : null
                }
              >
                سوال قبل
              </button>
              <button
                id="next"
                onClick={() =>
                  currentIndex < formStructure.length - 1
                    ? setCurrentIndex((prevState) => prevState + 1)
                    : null
                }
              >
                سوال بعد
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default TakeSurvey;
