import React from "react";
import { addModal } from "../../Store/Slices/ModalSlice";
import { useDispatch } from "react-redux";
import edit from "../../assets/icons/edit.png";
import { removeSurvey } from "../../Store/Slices/MainSlice";
import "./styles.css";

const Surveys = ({
  type,
  surveysData,
  handleSelectSurvey,
  selectedSurveyId,
  handleEndMovement,
}) => {
  const dispatch = useDispatch();

  const addSurveyModal = () => {
    dispatch(addModal({ name: "survey", type }));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDeleteSurvey = (id) => {
    dispatch(removeSurvey({ id }));
  };

  const handleEditSurvey = (id) => {
    dispatch(addModal({ name: "updateSurvey", id }));
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
        onDragOver={handleDragOver}
        onDrop={() => handleEndMovement(id)}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <span className="delete__icon" onClick={() => handleDeleteSurvey(id)}>
            ×
          </span>
          <div className="edit__icon" onClick={() => handleEditSurvey(id)}>
            <img src={edit} alt="preview" />
          </div>
        </div>
        <p>{title}</p>
      </div>
    );
  };

  return (
    <article className="surveys__column">
      <h4>{type === "questionnaire" ? "همه پرسشنامه‌ها" : "همه آزمون‌ها"}</h4>
      <div className="surveys__wrapper">
        {surveysData?.length > 0 ? (
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

export default Surveys;
