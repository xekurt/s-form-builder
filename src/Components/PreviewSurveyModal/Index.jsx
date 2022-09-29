import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useData } from "../../hooks/useData";
import Questions from "../Questions/Index";
import "./styles.css";

const Index = ({ id }) => {
  const [surveyData, setSurveyData] = useState();
  const { surveys, questions } = useData();

  useEffect(() => {
    const surveyInfo = surveys.find((item) => item.id === id);
    const surveyQuestions = questions?.filter((question) =>
      question.parents.includes(id)
    );
    setSurveyData({ surveyInfo, surveyQuestions });
  }, [surveys, questions, id]);

  return (
    <section className="modal__container">
      <div className="general__info__container">
        <div className="general__info">
          <p>
            {`اطلاعات مربوط به ${
              surveyData?.surveyInfo.type === "exam" ? "آزمون" : "پرسشنامه"
            } : ${surveyData?.surveyInfo.title}`}
          </p>
          <p>تاریخ شروع : {surveyData?.surveyInfo.startDate}</p>
          <p>تاریخ پایان : {surveyData?.surveyInfo.endDate}</p>
        </div>
        <div className="survey__questions">
          <Questions
            questions={surveyData?.surveyQuestions}
            parentId={surveyData?.surveyInfo.id}
            remove
          />
        </div>
      </div>
    </section>
  );
};

export default Index;
