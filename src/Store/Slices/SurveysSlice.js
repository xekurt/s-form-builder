import { createSlice } from "@reduxjs/toolkit";

export const surveysSlice = createSlice({
  name: "survies",
  initialState: [],
  reducers: {
    addSurvey: (state, action) => {
      const { payload } = action;
      state.push(payload);
    },
    removeSurvey: (state, action) => {
      state.pop();
    },
    clearAllSurve: (state, action) => {
      state = [];
    },
  },
});

export const { addSurvey, clearAllSurveys } = surveysSlice.actions;
export default surveysSlice.reducer;
