import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { moveQuestion } from "../Store/Slices/MainSlice";

export const useMovement = () => {
  const [movementDetails, setMovementDetails] = useState({
    questionId: "",
    destinationId: "",
  });

  const dispatch = useDispatch();

  // Movement logic
  const handleDragStart = (id) => {
    setMovementDetails((prevState) => ({
      ...prevState,
      questionId: id,
    }));
  };
  const handleDrop = (id) => {
    setMovementDetails((prevState) => ({ ...prevState, destinationId: id }));
  };

  useEffect(() => {
    if (movementDetails.destinationId && movementDetails.questionId) {
      dispatch(moveQuestion({ ...movementDetails }));
      setMovementDetails({ destinationId: "", questionId: "" });
    }
  }, [movementDetails, dispatch]);

  return {
    handleDragStart,
    handleDrop,
  };
};
