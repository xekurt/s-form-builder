import { createSlice } from "@reduxjs/toolkit";

export const modalSlice = createSlice({
  name: "modals",
  initialState: [],
  reducers: {
    addModal: (state, action) => {
      const { payload } = action;
      state.push(payload);
    },
    removeModal: (state, action) => {
      state.pop();
    },
    removeAll: (state, action) => {
      state = [];
    },
  },
});

export const { addModal, removeAll, removeModal } = modalSlice.actions;
export default modalSlice.reducer;
