import React, { useState } from "react";
import { useEffect } from "react";
import { useData } from "../../hooks/useData";
import QuestionForm from "../QuestionForm/Index";

const AddQuestionModal = ({ editQuestion, type, parentId, id }) => {
  const [questionData, setQuestionData] = useState(null);
  const { surveys, uncategorizedQuestions } = useData();

  useEffect(() => {
    if (editQuestion && parentId) {
      const data = surveys
        .find((survey) => survey.id === parentId)
        .questions.find((question) => question.id === id);
      setQuestionData(data);
    } else if ((editQuestion, !parentId)) {
      setQuestionData(
        uncategorizedQuestions.find((question) => question.id === id)
      );
    }
  }, [editQuestion, parentId, id, surveys, uncategorizedQuestions]);

  return (
    <section className="modal__container">
      <QuestionForm
        editQuestion={questionData}
        type={type}
        parentId={parentId}
      />
    </section>
  );
};

export default AddQuestionModal;
