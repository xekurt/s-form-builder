import React from "react";

const SecondStep = ({
  questionData,
  fourAnswerOptions,
  handlefourAnswerTitle,
  handlefourAnswerValue,
  handleMultipleChoiceValue,
  multipleChoiceOptions,
  handleMultipleChoiceTitle,
  handleAddOption,
  truthyOptions,
  handleTruthyChange,
  handleInput,
  handleDeleteOption,
  error,
}) => {
  return (
    <section className="second__step">
      {questionData.for === "exam" && (
        <div className="box">
          <label
            htmlFor="title"
            style={{ color: error.field === "defaultScore" && "red" }}
          >
            نمره سوال را وارد کنید
          </label>
          <input
            type="number"
            id="defaultScore"
            name="defaultScore"
            value={questionData.defaultScore}
            onChange={handleInput}
            style={{
              border: error.field === "defaultScore" && "1px solid red",
            }}
          />
        </div>
      )}
      {questionData.type === "fourAnswer" && (
        <div className="options">
          <div className="box">
            <div className="option">
              <input
                type="text"
                id={fourAnswerOptions[0]?.id}
                value={fourAnswerOptions[0]?.title}
                onChange={handlefourAnswerTitle}
                style={{
                  border:
                    error?.error?.id === fourAnswerOptions[0]?.id &&
                    "1px solid red",
                }}
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
          {error.field === "fourAnswer" && (
            <p style={{ color: "red", fontSize: "12px", textAlign: "center" }}>
              {error.error === "title"
                ? "لطفا تیتر همه گزینه‌ها را پر کنید"
                : "لطفا یک جواب درست را تعیین کنید"}
            </p>
          )}
        </div>
      )}
      {questionData.type === "multipleChoice" && (
        <div className="options">
          <p>گزینه‌ها را وارد کنید</p>
          {multipleChoiceOptions.map((option, i) => {
            const { id } = option;
            return (
              <div className="box shadow" key={i}>
                <div className="option">
                  <input
                    type="text"
                    id={id}
                    value={
                      multipleChoiceOptions.find((item) => item.id === id).title
                    }
                    onChange={handleMultipleChoiceTitle}
                  />

                  <input
                    type="checkbox"
                    checked={
                      multipleChoiceOptions.find((item) => item.id === id).value
                    }
                    id={id}
                    onChange={handleMultipleChoiceValue}
                  />
                  <span
                    className="delete__option__icon"
                    onClick={() => handleDeleteOption(id)}
                  >
                    ×
                  </span>
                </div>
              </div>
            );
          })}
          {error.field === "multipleChoice" && (
            <p style={{ color: "red", fontSize: "12px", textAlign: "center" }}>
              {error.error === "title"
                ? "لطفا تیتر همه گزینه‌ها را پر کنید"
                : error.error === "value"
                ? "لطفا حداقل یک جواب درست را تعیین کنید"
                : error.error === "value"
                ? "تیتر گزینه‌ها نباید با علایم نگارشی شروع شود"
                : ""}
            </p>
          )}
          <button onClick={handleAddOption}>اضافه کردن گزینه</button>
        </div>
      )}
      {questionData.type === "truthy" && (
        <div className="truthy__container">
          <div className="option">
            <p>صحیح</p>
            <input
              type="checkbox"
              id="true"
              checked={truthyOptions}
              onChange={handleTruthyChange}
            />
          </div>

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
      )}
      {(error === "option-value" || error === "option-title") && (
        <p style={{ color: "red" }}>
          تیتر تمام گزینه‌ها را پر کرده و گزینه صحیح را مشخص کنید
        </p>
      )}
    </section>
  );
};

export default SecondStep;
