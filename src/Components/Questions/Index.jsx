import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import {
  deleteQuestion,
  removeQuestion,
  sortQuestions,
} from "../../Store/Slices/MainSlice";
import { addModal } from "../../Store/Slices/ModalSlice";
import QuestionItem from "./QuestionItem";

import "./styles.css";

const Index = ({ handleStartMovement, questions, remove, parentId }) => {
  const dispatch = useDispatch();

  const [sortDetails, setSortDetails] = useState({
    parentId: "",
    originId: "",
    destinationId: "",
  });

  const renderQuestions = (item, index) => {
    return (
      <QuestionItem
        {...item}
        parentId={parentId}
        handleDrop={handleDrop}
        handleDragOver={handleDragOver}
        handleDragStart={handleDragStart}
        handleEditQestion={handleEditQestion}
        handleDeleteQuestion={handleDeleteQuestion}
        handleRemoveQuestion={handleRemoveQuestion}
        key={index}
        remove={remove}
      />
    );
  };

  const handleDeleteQuestion = (id) => {
    dispatch(deleteQuestion({ id }));
  };
  const handleRemoveQuestion = (id, parentId) => {
    dispatch(removeQuestion({ id, parentId }));
  };
  const handleEditQestion = (id) => {
    dispatch(addModal({ name: "updateQuestion", id }));
  };

  // DRAG AND DROP LOGIC
  const handleDragStart = (id) => {
    setSortDetails((prevState) => ({ ...prevState, originId: id }));
    handleStartMovement(id);
  };
  const handleDrop = (id) => {
    setSortDetails((prevState) => ({ ...prevState, destinationId: id }));
  };
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    if (
      sortDetails.destinationId &&
      sortDetails.originId &&
      sortDetails.destinationId !== sortDetails.originId
    ) {
      dispatch(
        sortQuestions({
          origin: sortDetails.originId,
          destination: sortDetails.destinationId,
        })
      );
      setSortDetails({ originId: "", destinationId: "" });
    }
  }, [sortDetails, dispatch]);

  return (
    <article className="questions__column">
      <div className="questions__wrapper">
        {questions?.map(renderQuestions)}
        {questions?.length === 0 && "سوالی وجود ندارد"}
        {!questions && "سوالی وجود ندارد"}
      </div>
    </article>
  );
};

export default Index;
