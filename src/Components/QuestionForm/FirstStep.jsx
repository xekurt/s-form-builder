import React from "react";

const FirstStep = ({ questionData, handleInput, error, handleCheckbox }) => {
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
          style={{ border: error.field === "title" && "1px solid red" }}
        />
        {error.field === "title" && (
          <p style={{ fontSize: "12px", color: "red" }}>
            {error.error === "small" && "حداقل 3 کاراکتر را وارد کنید"}
            {error.error === "special" &&
              "تیتر سوال نباید با علایم نگارشی شروع شود"}
          </p>
        )}
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
        {error.field === "type" && (
          <p style={{ fontSize: "12px", color: "red", marginRight: "1rem" }}>
            {error.error === "small" && "یک گزینه را انتخاب کنید"}
          </p>
        )}
      </div>
    </>
  );
};

export default FirstStep;
