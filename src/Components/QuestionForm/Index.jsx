import React from "react";
import { generateRandom } from "../../utils/randomId";
import { useState } from "react";

import "./styles.css";
import { useDispatch } from "react-redux";
import { addQuestion } from "../../Store/Slices/MainSlice";
import { removeModal } from "../../Store/Slices/ModalSlice";

const Index = ({ editQuestion }) => {
  const dispatch = useDispatch();
  const [error, setError] = useState("initial");
  const [questionData, setQuestionData] = useState({
    id: generateRandom(),
    title: "",
    for: "normal",
    type: "",
    surveyId: "",
  });
  const [fourAnswerOptions, setfourAnswerOptions] = useState([
    { title: "", value: false, id: generateRandom() },
    { title: "", value: false, id: generateRandom() },
    { title: "", value: false, id: generateRandom() },
    { title: "", value: false, id: generateRandom() },
  ]);
  const [multipleChoiceOptions, setMultipleChoiceOptions] = useState([
    {
      id: generateRandom(),
      tag: "گزینه",
      title: "",
      value: false,
      index: 0,
    },
  ]);
  const [truthyOptions, setTruthyOptions] = useState(false);

  const handleInput = (e) => {
    setError("");
    const { id, value } = e.target;
    setQuestionData((prevState) => ({ ...prevState, [id]: value }));
  };
  const handlefourAnswerTitle = (e) => {
    setError("");
    const { id, value } = e.target;
    setfourAnswerOptions((prevState) => {
      return prevState.map((item) => {
        if (item.id === id) {
          return { ...item, title: value };
        } else return item;
      });
    });
  };

  const handleCheckbox = (e) => {
    setError("");
    const { id } = e.target;
    setQuestionData((prevState) => ({ ...prevState, type: id }));
  };

  const handlefourAnswerValue = (e) => {
    setError("");
    const { id } = e.target;
    setfourAnswerOptions((prevState) =>
      prevState.map((item) => {
        if (item.id === id) {
          return { ...item, value: true };
        } else {
          return { ...item, value: false };
        }
      })
    );
  };
  const handleTruthyChange = (e) => {
    const { id } = e.target;
    if (id === "true") {
      setTruthyOptions(true);
    } else {
      setTruthyOptions(false);
    }
  };

  const handleAddOption = (e) => {
    setMultipleChoiceOptions((prevState) => [
      ...prevState,
      {
        index: prevState[prevState.length - 1].index + 1,
        id: generateRandom(),
        title: "",
        value: false,
        tag: "گزینه",
      },
    ]);
  };
  const handleMultipleChoiceTitle = (e) => {
    const { id, value } = e.target;
    setMultipleChoiceOptions((prevState) =>
      prevState.map((item) => {
        if (item.id === id) {
          return { ...item, title: value };
        } else {
          return item;
        }
      })
    );
  };
  const handleMultipleChoiceValue = (e) => {
    const { id } = e.target;
    setMultipleChoiceOptions((prevState) =>
      prevState.map((item) => {
        if (item.id === id) {
          return { ...item, value: !item.value };
        } else {
          return item;
        }
      })
    );
  };
  const handleCreateQuestion = () => {
    const validateForm = (question, four, multiple) => {
      if (question.title.trim().length < 1) {
        return "title";
      } else if (question.type.trim().length < 1) {
        return "type";
      }
      // Validation for Four answer
      if (question.type === "fourAnswer") {
        if (!four.every((item) => item.title.trim().length > 0)) {
          return "option-title";
        } else if (
          !four.some((item) => item.value) &&
          question.for === "azmoon"
        ) {
          return "option-value";
        }
      }
      // Validation for multipleChoice
      if (question.type === "multipleChoice") {
        if (!multiple.every((item) => item.title.trim().length > 0)) {
          return "option-title";
        } else if (
          !multiple.some((item) => item.value) &&
          question.for === "azmoon"
        ) {
          return "option-value";
        }
      }
      return "";
    };
    const tempError = validateForm(
      questionData,
      fourAnswerOptions,
      multipleChoiceOptions
    );
    setError(tempError);
    if (tempError) return;

    let question = questionData;
    if (question.type === "fourAnswer") {
      question = { ...question, options: [...fourAnswerOptions] };
    } else if (question.type === "truthy") {
      question = { ...question, options: truthyOptions };
    } else if (question.type === "multipleChoice") {
      question = { ...question, options: [...multipleChoiceOptions] };
    }

    dispatch(addQuestion(question));
    dispatch(removeModal());
  };

  return (
    <>
      <div className="radio__container">
        <label style={{ color: error === "for" && "red" }}>
          تیپ سوال را مشخص کنید *
        </label>
        <div className="radio__items">
          <div className="radio__item">
            <input
              type="radio"
              id="azmoon"
              value="azmoon"
              checked={questionData.for === "azmoon"}
              onChange={() => {
                setQuestionData((prevState) => ({
                  ...prevState,
                  for: "azmoon",
                }));
              }}
            />
            <label htmlFor="azmoon">آزمون</label>
          </div>
          <div className="radio__item">
            <input
              type="radio"
              id="normal"
              value="normal"
              checked={questionData.for === "normal"}
              onChange={() => {
                setQuestionData((prevState) => ({
                  ...prevState,
                  for: "normal",
                }));
              }}
            />
            <label htmlFor="normal">معمولی</label>
          </div>
        </div>
      </div>
      <div className="box">
        <label htmlFor="title" style={{ color: error === "title" && "red" }}>
          * تیتر سوال را وارد نمایید
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={questionData.title}
          onChange={handleInput}
        />
      </div>
      <div className="box">
        <label htmlFor="desc" style={{ color: error === "type" && "red" }}>
          * نوع سوال را انتخاب کنید :
        </label>
        <div className="option">
          <p>تشریحی</p>
          <input
            type="checkbox"
            id="descriptive"
            name="descriptive"
            onChange={handleCheckbox}
            value={questionData.type}
            checked={questionData.type === "descriptive"}
          />
        </div>
        <div className="option">
          <p>چهار گزینه‌ای</p>
          <input
            type="checkbox"
            id="fourAnswer"
            name="fourAnswer"
            onChange={handleCheckbox}
            value={questionData.type}
            checked={questionData.type === "fourAnswer"}
          />
        </div>
        <div className="option">
          <p>صحیح و غلط</p>
          <input
            type="checkbox"
            id="truthy"
            name="truthy"
            value={questionData.type}
            checked={questionData.type === "truthy"}
            onChange={handleCheckbox}
          />
        </div>
        <div className="option">
          <p>چند جوابی</p>
          <input
            type="checkbox"
            id="multipleChoice"
            name="multipleChoice"
            value={questionData.type}
            checked={questionData.type === "multipleChoice"}
            onChange={handleCheckbox}
          />
        </div>
      </div>
      {questionData.type === "fourAnswer" && (
        <div className="options">
          <div className="box">
            <div className="option">
              <input
                type="text"
                id={fourAnswerOptions[0].id}
                value={fourAnswerOptions[0].title}
                onChange={handlefourAnswerTitle}
              />
              <p>گزینه 1</p>
              <input
                type="checkbox"
                checked={fourAnswerOptions[0].value}
                id={fourAnswerOptions[0].id}
                onChange={handlefourAnswerValue}
              />
            </div>
          </div>
          <div className="box">
            <div className="option">
              <input
                type="text"
                id={fourAnswerOptions[1].id}
                value={fourAnswerOptions[1].title}
                onChange={handlefourAnswerTitle}
              />
              <p>گزینه 2</p>
              <input
                type="checkbox"
                checked={fourAnswerOptions[1].value}
                id={fourAnswerOptions[1].id}
                onChange={handlefourAnswerValue}
              />
            </div>
          </div>
          <div className="box">
            <div className="option">
              <input
                type="text"
                id={fourAnswerOptions[2].id}
                value={fourAnswerOptions[2].title}
                onChange={handlefourAnswerTitle}
              />
              <p>گزینه 3</p>
              <input
                type="checkbox"
                checked={fourAnswerOptions[2].value}
                id={fourAnswerOptions[2].id}
                onChange={handlefourAnswerValue}
              />
            </div>
          </div>
          <div className="box">
            <div className="option">
              <input
                type="text"
                id={fourAnswerOptions[3].id}
                value={fourAnswerOptions[3].title}
                onChange={handlefourAnswerTitle}
              />
              <p>گزینه 4</p>
              <input
                type="checkbox"
                checked={fourAnswerOptions[3].value}
                id={fourAnswerOptions[3].id}
                onChange={handlefourAnswerValue}
              />
            </div>
          </div>
        </div>
      )}
      {questionData.type === "multipleChoice" && (
        <div className="options">
          {multipleChoiceOptions.map((option, i) => {
            const { tag, index, id } = option;
            return (
              <div className="box" key={i}>
                <div className="option">
                  <input
                    type="text"
                    id={id}
                    value={
                      multipleChoiceOptions.find((item) => item.id === id).title
                    }
                    onChange={handleMultipleChoiceTitle}
                  />
                  <p>{tag + (index + 1)}</p>
                  <input
                    type="checkbox"
                    checked={
                      multipleChoiceOptions.find((item) => item.id === id).value
                    }
                    id={id}
                    onChange={handleMultipleChoiceValue}
                  />
                </div>
              </div>
            );
          })}
          <button onClick={handleAddOption}>اضافه کردن گزینه</button>
        </div>
      )}
      {questionData.type === "truthy" && (
        <div className="options">
          <div className="box">
            <div className="option">
              <p>صحیح</p>
              <input
                type="checkbox"
                id="true"
                checked={truthyOptions}
                onChange={handleTruthyChange}
              />
            </div>
          </div>
          <div className="box">
            <div className="option">
              <p>غلط</p>
              <input
                type="checkbox"
                id="false"
                checked={!truthyOptions}
                onChange={handleTruthyChange}
              />
            </div>
          </div>
        </div>
      )}
      {(error === "option-value" || error === "option-title") && (
        <p style={{ color: "red" }}>
          تیتر تمام گزینه‌ها را پر کرده و گزینه صحیح را مشخص کنید
        </p>
      )}
      <button className="create__button" onClick={handleCreateQuestion}>
        {editQuestion ? "ذخیره تغییرات" : "ایجاد سوال"}
      </button>
    </>
  );
};

export default Index;
