import React from "react";
import { generateRandom } from "../../utils/randomId";
import { useState } from "react";

import "./styles.css";
import { useDispatch } from "react-redux";
import { addQuestion } from "../../Store/Slices/MainSlice";
import { removeModal } from "../../Store/Slices/ModalSlice";
import FirstStep from "./FirstStep";
import SecondStep from "./SecondStep";

const Index = ({ editQuestion, type, parentId }) => {
  const dispatch = useDispatch();
  const [activeStep, setActiveStep] = useState(1);
  const [error, setError] = useState("initial");
  const [questionData, setQuestionData] = useState({
    id: generateRandom(),
    title: "",
    for: type,
    type: "",
    defaultScore: "",
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

    // Create proper form based on user filters
    let question = questionData;
    if (question.type === "fourAnswer") {
      question = { ...question, options: [...fourAnswerOptions] };
    } else if (question.type === "truthy") {
      question = { ...question, options: truthyOptions };
    } else if (question.type === "multipleChoice") {
      question = { ...question, options: [...multipleChoiceOptions] };
    }

    // Check if form has a parent or not
    if (parentId) {
      dispatch(addQuestion({ ...question, parentId }));
    } else {
      dispatch(addQuestion(question));
    }
    dispatch(removeModal());
  };

  const handleNextPage = () => {
    if (!questionData.type || !questionData.title) {
      return setError("step");
    }
    setActiveStep(2);
  };

  return (
    <>
      {activeStep === 1 ? (
        <FirstStep
          questionData={questionData}
          handleInput={handleInput}
          handleCheckbox={handleCheckbox}
          error={error}
        />
      ) : (
        <SecondStep
          questionData={questionData}
          handleInput={handleInput}
          fourAnswerOptions={fourAnswerOptions}
          handlefourAnswerTitle={handlefourAnswerTitle}
          handlefourAnswerValue={handlefourAnswerValue}
          handleMultipleChoiceValue={handleMultipleChoiceValue}
          multipleChoiceOptions={multipleChoiceOptions}
          handleMultipleChoiceTitle={handleMultipleChoiceTitle}
          handleAddOption={handleAddOption}
          truthyOptions={truthyOptions}
          handleTruthyChange={handleTruthyChange}
          error={error}
        />
      )}
      {error === "step" && (
        <p style={{ color: "red" }}>لطفا تیتر سوال و نوع آن را مشخص کنید</p>
      )}
      <div className="question__form__buttons">
        <button
          className="question__form__cancell__button"
          onClick={() =>
            activeStep === 2 ? setActiveStep(1) : dispatch(removeModal())
          }
        >
          {activeStep === 1 ? "لغو" : "مرحله قبل"}
        </button>
        <button
          className="question__form__create__button"
          onClick={() =>
            activeStep === 1 ? handleNextPage() : handleCreateQuestion()
          }
        >
          {activeStep === 1 ? "مرحله بعد" : "ایجاد سوال"}
        </button>
      </div>
    </>
  );
};

export default Index;
