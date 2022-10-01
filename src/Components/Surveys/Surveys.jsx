import React from "react";
import { addModal } from "../../Store/Slices/ModalSlice";
import { useDispatch } from "react-redux";
import edit from "../../assets/icons/edit.png";
import preview from "../../assets/icons/preview.png";
import form from "../../assets/icons/form.png";
import { removeSurvey } from "../../Store/Slices/MainSlice";
import "./styles.css";
import { useNavigate } from "react-router-dom";

const Surveys = ({ type, surveysData, client, handleEndMovement }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDeleteSurvey = (id) => {
    dispatch(removeSurvey({ id }));
  };

  const handleEditSurvey = (id) => {
    dispatch(addModal({ name: "updateSurvey", id }));
  };
  const handlePreviewSurvey = (id) => {
    dispatch(addModal({ name: "previewSurvey", id }));
  };

  const handleTakeSurvey = (id) => {
    navigate(`/takesurvey/${id}`);
  };

  // UI FUNCTIONS
  const renderSurveys = (item, index) => {
    const { title, id } = item;
    return (
      <div
        id={id}
        className={`survey__item ${client && "cursor"}`}
        key={index}
        onClick={() => client && handleTakeSurvey(id)}
        onDragOver={handleDragOver}
        onDrop={() => handleEndMovement(id)}
      >
        {client ? (
          <div className="client__icons">
            <div className="form__icon">
              <img src={form} alt="" />
            </div>
          </div>
        ) : (
          <div className="admin__icons">
            <span
              className="delete__icon"
              onClick={() => handleDeleteSurvey(id)}
            >
              ×
            </span>
            <div
              className="preview__icon"
              onClick={() => handlePreviewSurvey(id)}
            >
              <img src={preview} alt="preview" />
            </div>
            <div className="edit__icon" onClick={() => handleEditSurvey(id)}>
              <img src={edit} alt="edit" />
            </div>
          </div>
        )}
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
      </div>
    </article>
  );
};

export default Surveys;
