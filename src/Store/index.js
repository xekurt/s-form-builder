import { configureStore } from "@reduxjs/toolkit";
import ModalReducer from "./Slices/ModalSlice";
import SurveysReducer from "./Slices/SurveysSlice";

export default configureStore({
  reducer: {
    modals: ModalReducer,
    surveys: SurveysReducer,
  },
});
