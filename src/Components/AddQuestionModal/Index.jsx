import React from "react";
import QuestionForm from "../QuestionForm/Index";

const AddQuestionModal = ({ type, parentId }) => {
  return (
    <section className="modal__container">
      <QuestionForm type={type} parentId={parentId} />
    </section>
  );
};

export default AddQuestionModal;
