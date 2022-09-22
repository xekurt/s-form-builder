import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { removeQuestion, sortQuestions } from "../../Store/Slices/MainSlice";
import { addModal } from "../../Store/Slices/ModalSlice";
import preview from "../../assets/icons/preview.png";
import "./styles.css";

const Index = ({ type = "free", selectedSurvey, uncategorizedQuestions }) => {
  const dispatch = useDispatch();

  const [showError, setShowError] = useState(null);
  const [sortDetails, setSortDetails] = useState({
    parentId: "",
    originId: "",
    destinationId: "",
  });

  const renderQuestions = (item, index) => {
    const { title, type, id, parentId } = item;
    return (
      <div
        id={id}
        className="question__item"
        key={index}
        draggable
        onDragStart={handleDragStart}
        onDrop={() => handleDrop(id)}
        onDragOver={handleDragOver}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <span
            className="delete__icon"
            onClick={() => handleDeleteQuestion(parentId, id)}
          >
            ×
          </span>
          <div className="preview__icon">
            <img src={preview} alt="preview" />
          </div>

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

  const handleDeleteQuestion = (parentId, id) => {
    dispatch(removeQuestion({ parentId, id }));
  };

  useEffect(() => {
    setShowError(false);
  }, [selectedSurvey]);

  // DRAG AND DROP LOGIC
  const handleDragStart = (e) => {
    const { id } = e.target;
    setSortDetails((prevState) => ({ ...prevState, originId: id }));
  };
  const handleDrop = (id) => {
    setSortDetails((prevState) => ({ ...prevState, destinationId: id }));
  };
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    if (
      sortDetails.destinationId &&
      sortDetails.originId &&
      sortDetails.destinationId !== sortDetails.originId
    ) {
      dispatch(
        sortQuestions({
          parentId: selectedSurvey?.id || "",
          origin: sortDetails.originId,
          destination: sortDetails.destinationId,
        })
      );
      setSortDetails({ parentId: "", originId: "", destinationId: "" });
    }
  }, [sortDetails, dispatch, selectedSurvey?.id]);

  return (
    <article className="questions__column">
      <h4>
        {type === "questionnaire"
          ? "سوالات پرسشنامه : "
          : type === "exam"
          ? "سوالات آزمون : "
          : "بانک سوالات"}
        {selectedSurvey?.title}
      </h4>
      <div className="questions__wrapper">
        {selectedSurvey?.questions.map(renderQuestions) ?? (
          <p style={{ margin: "1rem auto", color: showError && "red" }}>
            {type === "questionnaire"
              ? " یک پرسشنامه انتخاب کنید"
              : "  یک آزمون انتخاب کنید"}
          </p>
        )}
        {uncategorizedQuestions?.map(renderQuestions)}

        <button className="add__question__btn" onClick={addQuestionModal}>
          اضافه کردن سوال
        </button>
      </div>
    </article>
  );
};

export default Index;
