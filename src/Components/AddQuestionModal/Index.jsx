import React, { useState } from "react";
import { useEffect } from "react";
import { useData } from "../../hooks/useData";
import QuestionForm from "../QuestionForm/Index";

const AddQuestionModal = ({ editQuestion, type, id }) => {
  const [questionData, setQuestionData] = useState(null);
  const { questions } = useData();

  // Editing a question
  useEffect(() => {
    setQuestionData(questions.find((question) => question.id === id));
  }, [editQuestion, id, questions]);

  return (
    <section className="modal__container">
      <QuestionForm editQuestion={questionData} type={type} />
    </section>
  );
};

export default AddQuestionModal;
