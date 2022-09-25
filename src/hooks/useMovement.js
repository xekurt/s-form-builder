import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { moveQuestion } from "../Store/Slices/MainSlice";

export const useMovement = () => {
  const [movementDetails, setMovementDetails] = useState({
    parentId: "",
    questionId: "",
    destinationId: "",
  });

  const dispatch = useDispatch();

  // Movement logic
  const handleDragStart = (id, parentId) => {
    setMovementDetails((prevState) => ({
      ...prevState,
      questionId: id,
      parentId,
    }));
  };
  const handleDrop = (id) => {
    setMovementDetails((prevState) => ({ ...prevState, destinationId: id }));
  };

  useEffect(() => {
    if (
      movementDetails.destinationId &&
      movementDetails.questionId &&
      movementDetails.parentId &&
      movementDetails.destinationId !== movementDetails.parentId
    ) {
      dispatch(moveQuestion({ ...movementDetails }));
      setMovementDetails({ destinationId: "", questionId: "", parentId: "" });
    }
  }, [movementDetails, dispatch]);

  return {
    handleDragStart,
    handleDrop,
  };
};
