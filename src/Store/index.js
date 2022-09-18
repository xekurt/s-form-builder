import { configureStore } from "@reduxjs/toolkit";
import ModalReducer from "./Slices/ModalSlice";
import MainReducer from "./Slices/SurveysSlice";

export default configureStore({
  reducer: {
    modals: ModalReducer,
    main: MainReducer,
  },
});
