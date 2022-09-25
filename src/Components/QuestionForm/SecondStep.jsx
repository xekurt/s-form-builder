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
  error,
}) => {
  return (
    <>
      {questionData.for === "exam" && (
        <div className="box">
          <label htmlFor="title" style={{ color: error === "title" && "red" }}>
            نمره سوال را وارد کنید
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={questionData.defaultScore}
            // onChange={handleInput}
          />
        </div>
      )}
      {questionData.type === "fourAnswer" && (
        <div className="options">
          <div className="box">
            <div className="option">
              <input
                type="text"
                id={fourAnswerOptions[0].id}
                value={fourAnswerOptions[0].title}
                onChange={handlefourAnswerTitle}
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
        </div>
      )}
      {questionData.type === "multipleChoice" && (
        <div className="options">
          {multipleChoiceOptions.map((option, i) => {
            const { tag, index, id } = option;
            return (
              <div className="box" key={i}>
                <div className="option">
                  <input
                    type="text"
                    id={id}
                    value={
                      multipleChoiceOptions.find((item) => item.id === id).title
                    }
                    onChange={handleMultipleChoiceTitle}
                  />
                  <p>{tag + (index + 1)}</p>
                  <input
                    type="checkbox"
                    checked={
                      multipleChoiceOptions.find((item) => item.id === id).value
                    }
                    id={id}
                    onChange={handleMultipleChoiceValue}
                  />
                </div>
              </div>
            );
          })}
          <button onClick={handleAddOption}>اضافه کردن گزینه</button>
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
    </>
  );
};

export default SecondStep;
