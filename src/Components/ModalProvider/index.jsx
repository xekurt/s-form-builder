import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeModal } from "../../Store/Slices/ModalSlice";
import AddSurveyModal from "../AddSurveyModal/AddSurveyModal";
import "./styles.css";

const Index = ({ children }) => {
  const { modals } = useSelector((state) => state);

  const dispatch = useDispatch();

  const modalComponents = {
    survey: <AddSurveyModal />,
  };

  const handleRemoveModal = () => {
    dispatch(removeModal());
  };

  return (
    <>
      {modals.length > 0 && (
        <div className="modal__provider">
          <div className="modal__wrapper">
            <span className="close__btn" onClick={handleRemoveModal}>
              ×
            </span>
            {modalComponents[modals[modals.length - 1]]}
          </div>
        </div>
      )}
      {children}
    </>
  );
};

export default Index;
