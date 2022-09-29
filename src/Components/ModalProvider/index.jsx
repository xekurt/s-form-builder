import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeModal } from "../../Store/Slices/ModalSlice";
import AddQuestionModal from "../AddQuestionModal/Index";
import PreviewSurveyModal from "../PreviewSurveyModal/Index";
import AddSurveyModal from "../AddSurveyModal/AddSurveyModal";
import "./styles.css";

const Index = ({ children }) => {
  const modal = useSelector((state) => state.modals[state.modals.length - 1]);
  const [modalDetails, setModalDetails] = useState({
    name: "",
    type: "",
    parentId: "",
    id: "",
  });
  useEffect(() => {
    if (modal) {
      setModalDetails({ ...modal });
    }
    return () => {
      setModalDetails({ name: "", type: "" });
    };
  }, [modal]);

  const dispatch = useDispatch();

  const modalComponents = {
    survey: (props) => {
      return <AddSurveyModal {...props} />;
    },
    question: (props) => {
      return <AddQuestionModal {...props} />;
    },
    updateSurvey: (props) => {
      return <AddSurveyModal editSurvey {...props} />;
    },
    previewSurvey: (props) => {
      return <PreviewSurveyModal {...props} />;
    },
    updateQuestion: (props) => {
      return <AddQuestionModal editQuestion {...props} />;
    },
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
              modalComponents[modalDetails.name]({ ...modalDetails })}
          </div>
        </div>
      )}
      {children}
    </>
  );
};

export default Index;
