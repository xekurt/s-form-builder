import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeModal } from "../../Store/Slices/ModalSlice";
import AddQuestionModal from "../AddQuestionModal/Index";
import AddSurveyModal from "../AddSurveyModal/AddSurveyModal";
import "./styles.css";

const Index = ({ children }) => {
  const modal = useSelector((state) => state.modals[state.modals.length - 1]);
  const [modalDetails, setModalDetails] = useState({
    name: "",
    type: "",
  });
  useEffect(() => {
    if (modal) {
      setModalDetails({ ...modal });
    }
  }, [modal]);

  const dispatch = useDispatch();

  const modalComponents = {
    survey: (type) => <AddSurveyModal type={type} />,
    question: (type) => <AddQuestionModal type={type} />,
  };

  const handleRemoveModal = () => {
    dispatch(removeModal());
  };

  return (
    <>
      {!!modal && (
        <div className="modal__provider">
          <div className="modal__wrapper">
            <span className="close__btn" onClick={handleRemoveModal}>
              ×
            </span>
            {modalComponents[modalDetails.name] &&
              modalComponents[modalDetails.name](modalDetails.type)}
          </div>
        </div>
      )}
      {children}
    </>
  );
};

export default Index;
