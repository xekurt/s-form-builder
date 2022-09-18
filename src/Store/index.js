import { configureStore } from "@reduxjs/toolkit";
import ModalReducer from "./Slices/ModalSlice";
import SurveysReducer from "./Slices/SurveysSlice";
import QuestionReducer from "./Slices/QuestionSlice";

export default configureStore({
  reducer: {
    modals: ModalReducer,
    surveys: SurveysReducer,
    questions: QuestionReducer,
  },
});
