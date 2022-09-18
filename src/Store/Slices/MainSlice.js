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
    moveQuestion: (state, action) => {
      const { payload } = action;
      const target = state.uncategorizedQuestions.find((item) => {
        return item.id === payload.originId;
      });
      state.surveys = state.surveys.map((survey) => {
        if (survey.id === payload.destinationId) {
          return { ...survey, questions: [...survey.questions, target] };
        } else return survey;
      });
      state.uncategorizedQuestions = state.uncategorizedQuestions.filter(
        (item) => item.id !== payload.originId
      );
    },
  },
});

export const { addSurvey, clearAllSurveys, addQuestion, moveQuestion } =
  mainSlice.actions;
export default mainSlice.reducer;
