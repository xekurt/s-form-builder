import { configureStore } from "@reduxjs/toolkit";
import ModalReducer from "./Slices/ModalSlice";
import MainReducer from "./Slices/MainSlice";

export default configureStore({
  reducer: {
    modals: ModalReducer,
    main: MainReducer,
  },
});
