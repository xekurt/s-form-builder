import { createSlice } from "@reduxjs/toolkit";

export const mainSlice = createSlice({
  name: "main",
  initialState: { uncategorizedQuestions: [], surveys: [] },
  reducers: {
    addSurvey: (state, action) => {
      const { payload } = action;
      state.surveys.push(payload);
    },
    removeSurvey: (state, action) => {
      state.surveys.pop();
    },
    clearAllSurveys: (state, action) => {
      state.surveys = [];
    },
    addQuestion: (state, action) => {
      const { payload } = action;
      state.uncategorizedQuestions.push(payload);
    },
  },
});

export const { addSurvey, clearAllSurveys, addQuestion } = mainSlice.actions;
export default mainSlice.reducer;
