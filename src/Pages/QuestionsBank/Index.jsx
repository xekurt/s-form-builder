import React from "react";
import { useDispatch } from "react-redux";
import Questions from "../../Components/Questions/Index";
import { useData } from "../../hooks/useData";
import { addModal } from "../../Store/Slices/ModalSlice";
import "./styles.css";
const Index = () => {
  const dispatch = useDispatch();
  const { uncategorizedQuestions } = useData();
  const addQuestionModal = () => {
    dispatch(addModal({ name: "question", type: "free" }));
  };
  return (
    <section className="page">
      <div className="questionnaire__questions__container">
        <Questions uncategorizedQuestions={uncategorizedQuestions} />
        <button className="add__question__btn" onClick={addQuestionModal}>
          اضافه کردن سوال
        </button>
      </div>
    </section>
  );
};

export default Index;
