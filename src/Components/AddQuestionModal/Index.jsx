import React from "react";
import QuestionForm from "../QuestionForm/Index";

const AddQuestionModal = ({ type }) => {
  return (
    <section className="modal__container">
      <QuestionForm type={type} />
    </section>
  );
};

export default AddQuestionModal;
