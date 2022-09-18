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
    type: "",
  });
  const [multipleChoiceOptions, setMultipleChoiceOptions] = useState([
    { title: "", value: false, label: "option1" },
    { title: "", value: false, label: "option2" },
    { title: "", value: false, label: "option3" },
    { title: "", value: false, label: "option4" },
  ]);
  const [truthyOptions, setTruthyOptions] = useState(false);

  const handleInput = (e) => {
    setError("");
    const { id, value } = e.target;
    setQuestionData((prevState) => ({ ...prevState, [id]: value }));
  };
  const handleOptionsLabel = (e) => {
    setError("");
    const { id, value } = e.target;
    setMultipleChoiceOptions((prevState) => {
      return prevState.map((item) => {
        if (item.label === id) {
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

  const handleMultipleChoiceValue = (e) => {
    setError("");
    const { id } = e.target;
    setMultipleChoiceOptions((prevState) =>
      prevState.map((item) => {
        if (item.label === id) {
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
  const handleCreateQuestion = () => {
    const validateForm = (question, multiple) => {
      if (question.title.trim().length < 1) {
        return "title";
      } else if (question.type.trim().length < 1) {
        return "type";
      }
      if (question.type === "multipleChoice") {
        if (!multiple.every((item) => item.title.trim().length > 0)) {
          return "option-title";
        } else if (!multiple.some((item) => item.value)) {
          return "option-value";
        }
      }
      return "";
    };

    const tempError = validateForm(questionData, multipleChoiceOptions);
    setError(tempError);
    if (tempError) return;

    let question = questionData;
    if (question.type === "multipleChoice") {
      question = { ...question, options: [...multipleChoiceOptions] };
    } else if (question.type === "truthy") {
      question = { ...question, options: truthyOptions };
    }
    dispatch(addQuestion(question));
    dispatch(removeModal());
  };

  return (
    <>
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
            id="multipleChoice"
            name="multipleChoice"
            onChange={handleCheckbox}
            value={questionData.type}
            checked={questionData.type === "multipleChoice"}
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
      </div>
      {questionData.type === "multipleChoice" && (
        <div className="options">
          <div className="box">
            <div className="option">
              <input
                type="text"
                id="option1"
                value={multipleChoiceOptions[0].title}
                onChange={handleOptionsLabel}
              />
              <p>گزینه 1</p>
              <input
                type="checkbox"
                checked={multipleChoiceOptions[0].value}
                id="option1"
                onChange={handleMultipleChoiceValue}
              />
            </div>
          </div>
          <div className="box">
            <div className="option">
              <input
                type="text"
                id="option2"
                value={multipleChoiceOptions[1].title}
                onChange={handleOptionsLabel}
              />
              <p>گزینه 2</p>
              <input
                type="checkbox"
                checked={multipleChoiceOptions[1].value}
                id="option2"
                onChange={handleMultipleChoiceValue}
              />
            </div>
          </div>
          <div className="box">
            <div className="option">
              <input
                type="text"
                id="option3"
                value={multipleChoiceOptions[2].title}
                onChange={handleOptionsLabel}
              />
              <p>گزینه 3</p>
              <input
                type="checkbox"
                checked={multipleChoiceOptions[2].value}
                id="option3"
                onChange={handleMultipleChoiceValue}
              />
            </div>
          </div>
          <div className="box">
            <div className="option">
              <input
                type="text"
                id="option4"
                value={multipleChoiceOptions[3].title}
                onChange={handleOptionsLabel}
              />
              <p>گزینه 4</p>
              <input
                type="checkbox"
                checked={multipleChoiceOptions[3].value}
                id="option4"
                onChange={handleMultipleChoiceValue}
              />
            </div>
          </div>
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
