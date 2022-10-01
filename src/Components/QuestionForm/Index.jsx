import React from "react";
import { generateRandom } from "../../utils/randomId";
import { useState } from "react";

import "./styles.css";
import { useDispatch } from "react-redux";
import { addQuestion, updateQuestion } from "../../Store/Slices/MainSlice";
import { removeModal } from "../../Store/Slices/ModalSlice";
import FirstStep from "./FirstStep";
import SecondStep from "./SecondStep";
import { useEffect } from "react";
import { validateField, validateFourAnswer } from "../../utils/validation";

const Index = ({ editQuestion = null, type }) => {
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
    },
  ]);

  const [truthyOptions, setTruthyOptions] = useState(false);

  // Editing
  useEffect(() => {
    if (editQuestion) {
      setQuestionData({ ...editQuestion });
      if (editQuestion.type === "fourAnswer") {
        setfourAnswerOptions(editQuestion.options);
      } else if (editQuestion.type === "multipleChoice") {
        setMultipleChoiceOptions(editQuestion.options);
      } else if (editQuestion.type === "truthy") {
        setTruthyOptions(editQuestion.options);
      }
    }
  }, [editQuestion]);

  const handleInput = (e) => {
    setError(true);
    const { id, value } = e.target;
    setQuestionData((prevState) => ({ ...prevState, [id]: value }));
  };
  const handlefourAnswerTitle = (e) => {
    setError(true);
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
    setError(true);
    const { id } = e.target;
    setQuestionData((prevState) => ({ ...prevState, type: id }));
  };

  const handlefourAnswerValue = (e) => {
    setError(true);
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
    setError(true);
    setMultipleChoiceOptions((prevState) => [
      ...prevState,
      {
        id: generateRandom(),
        title: "",
        value: false,
      },
    ]);
  };
  const handleDeleteOption = (id) => {
    setError(true);
    setMultipleChoiceOptions((prevState) =>
      prevState.filter((item) => item.id !== id)
    );
  };
  const handleMultipleChoiceTitle = (e) => {
    setError(true);
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
    setError(true);
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
  const handleSubmit = () => {
    let question = questionData;
    if (question.type === "fourAnswer") {
      question = { ...question, options: [...fourAnswerOptions] };
    } else if (question.type === "truthy") {
      question = { ...question, options: truthyOptions };
    } else if (question.type === "multipleChoice") {
      question = { ...question, options: [...multipleChoiceOptions] };
    }
    if (editQuestion) {
      dispatch(updateQuestion(question));
    } else {
      dispatch(addQuestion(question));
    }
    dispatch(removeModal());
  };

  const renderNextButtonContent = () => {
    if (activeStep === 1) {
      if (type === "questionnaire" && questionData.type === "descriptive")
        return editQuestion ? "ذخیره" : "ایجاد سوال";
      else {
        return "مرحله بعد";
      }
    } else {
      return editQuestion ? "ذخیره" : "ایجاد سوال";
    }
  };

  const handleNextButton = () => {
    if (activeStep === 1) {
      const validateFirstStep = (question) => {
        const titleError = validateField(question.title);
        const typeError = validateField(question.type);
        if (titleError !== true) return { error: titleError, field: "title" };
        if (typeError !== true) return { error: typeError, field: "type" };
        return true;
      };
      const tempError = validateFirstStep(questionData);
      setError(tempError);
      if (tempError !== true) return;
      if (type === "questionnaire" && questionData.type === "descriptive")
        handleSubmit();
      else {
        setActiveStep(2);
      }
    } else {
      const validateSecondStep = (defaultScore, fourAnswer, multiple) => {
        // validate score
        const scoreError =
          defaultScore.length < 1
            ? {
                error: "small",
                field: "defaultScore",
              }
            : true;

        // validate fouranswer titles and values
        const fourAnswerError = validateFourAnswer(fourAnswer);
        const multipleChoiceError = validateFourAnswer(multiple);

        if (questionData.for === "exam" && scoreError !== true)
          return scoreError;
        if (questionData.type === "fourAnswer" && fourAnswerError !== true) {
          return { error: fourAnswerError, field: "fourAnswer" };
        }
        if (
          questionData.type === "multipleChoice" &&
          multipleChoiceError !== true
        ) {
          return { error: multipleChoiceError, field: "multipleChoice" };
        }

        return true;
      };
      const tempError = validateSecondStep(
        questionData.defaultScore,
        fourAnswerOptions,
        multipleChoiceOptions
      );
      setError(tempError);
      if (tempError !== true) return;
      handleSubmit();
    }
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
          error={error}
          handleInput={handleInput}
          questionData={questionData}
          truthyOptions={truthyOptions}
          handleAddOption={handleAddOption}
          fourAnswerOptions={fourAnswerOptions}
          handleTruthyChange={handleTruthyChange}
          multipleChoiceOptions={multipleChoiceOptions}
          handlefourAnswerTitle={handlefourAnswerTitle}
          handlefourAnswerValue={handlefourAnswerValue}
          handleMultipleChoiceValue={handleMultipleChoiceValue}
          handleMultipleChoiceTitle={handleMultipleChoiceTitle}
          handleDeleteOption={handleDeleteOption}
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
          onClick={handleNextButton}
        >
          {renderNextButtonContent()}
        </button>
      </div>
    </>
  );
};

export default Index;
