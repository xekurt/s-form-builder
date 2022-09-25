import React from "react";
import edit from "../../assets/icons/edit.png";

const questionItem = ({
  id,
  index,
  parentId,
  type,
  title,
  options,
  handleDragOver,
  handleDragStart,
  handleDeleteQuestion,
  handleDrop,
  handleEditQestion,
}) => {
  return (
    <div
      id={id}
      className="question__item"
      key={index}
      draggable
      onDragStart={() => handleDragStart(id, parentId)}
      onDrop={() => handleDrop(id)}
      onDragOver={handleDragOver}
    >
      <div className="question__actions">
        <span
          className="delete__icon"
          onClick={() => handleDeleteQuestion(parentId, id)}
        >
          ×
        </span>
        <div
          className="edit__icon"
          onClick={() => handleEditQestion(parentId, id)}
        >
          <img src={edit} alt="preview" />
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
      <div className="question__content">
        <p>{title} </p>
        <div className="question__answer__area">
          {type === "descriptive" && <textarea disabled />}

          {type === "fourAnswer" &&
            options.map(({ id, title }, index) => {
              return (
                <div key={index} className="four__answer__template">
                  <label htmlFor={id}>{title}</label>
                  <input
                    type="radio"
                    disabled
                    style={{ width: "26px" }}
                    id={id}
                    name={id}
                  />
                </div>
              );
            })}
          {type === "multipleChoice" &&
            options.map(({ id, title }, index) => {
              return (
                <div key={index} className="four__answer__template">
                  <label htmlFor={id}>{title}</label>
                  <input
                    type="checkbox"
                    disabled
                    style={{ width: "26px" }}
                    id={id}
                    name={id}
                  />
                </div>
              );
            })}
          {type === "truthy" && (
            <div key={index} className="truthy__answer__template">
              <label htmlFor={id}>صحیح</label>
              <input type="checkbox" disabled style={{ width: "26px" }} />
              <label htmlFor={id}>غلط</label>
              <input
                type="checkbox"
                disabled
                style={{ width: "26px" }}
                name={id}
                id={id}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default questionItem;
