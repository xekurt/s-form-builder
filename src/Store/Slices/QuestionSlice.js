import { createSlice } from "@reduxjs/toolkit";

export const questionSlice = createSlice({
  name: "questions",
  initialState: [],
  reducers: {
    addQuestion: (state, action) => {
      const { payload } = action;
      state.push(payload);
    },
    removeQuestion: (state, action) => {
      // state = state.filter
    },
  },
});

export const { addQuestion, removeQuestion } = questionSlice.actions;
export default questionSlice.reducer;
