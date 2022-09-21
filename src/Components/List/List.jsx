import React, { useState } from "react";
import { addModal } from "../../Store/Slices/ModalSlice";

import { useDispatch } from "react-redux";
import "./styles.css";

const List = ({ type, surveysData, handleSelectSurvey, selectedSurveyId }) => {
  const [movementDetails, setMovementDetails] = useState({
    originId: "",
    destinationId: "",
  });

  const dispatch = useDispatch();

  const addSurveyModal = () => {
    dispatch(addModal({ name: "survey", type }));
  };

  // UI FUNCTIONS
  const renderSurveys = (item, index) => {
    const { title, id } = item;
    return (
      <div
        id={id}
        className={`survey__item ${selectedSurveyId === id && "selected"}`}
        key={index}
        onClick={() => handleSelectSurvey(id)}
        // onDragOver={handleDragOver}
        // onDrop={() => handleDrop(id)}
      >
        <p>{title}</p>
      </div>
    );
  };

  return (
    <article className="surveys__column">
      <h4>{type === "questionnaire" ? "همه پرسشنامه‌ها" : "همه آزمون‌ها"}</h4>
      <div className="surveys__wrapper">
        {surveysData.length > 0 ? (
          surveysData.map(renderSurveys)
        ) : (
          <p style={{ margin: "1rem auto" }}>
            {type === "questionnaire"
              ? "پرسشنامه‌ای ثبت نشده است"
              : "آزمونی ثبت نشده است"}
          </p>
        )}
        <button onClick={addSurveyModal} className="add__button">
          {type === "questionnaire" ? "ساخت پرسشنامه جدید" : "ساخت آزمون جدید"}
        </button>
      </div>
    </article>
  );
};

export default List;
