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
      // state.surveys.pop();
    },
    clearAllSurveys: (state, action) => {
      // state.surveys = [];
    },
    addQuestion: (state, action) => {
      const { payload } = action;

      if (payload.parentId) {
        state.surveys = state.surveys.map((survey) => {
          if (survey.id === payload.parentId) {
            survey.questions = [...survey.questions, payload];
            return survey;
          } else return survey;
        });
      } else {
        state.uncategorizedQuestions.push(payload);
      }
    },
    removeQuestion: (state, action) => {
      const {
        payload: { parentId, id },
      } = action;
      if (parentId) {
        state.surveys = state.surveys.map((survey) => {
          if (survey.id === parentId) {
            survey.questions = survey.questions.filter(
              (question) => question.id !== id
            );
            return survey;
          } else return survey;
        });
      } else {
        state.uncategorizedQuestions = state.uncategorizedQuestions.filter(
          (question) => question.id !== id
        );
      }
    },
    moveQuestion: (state, action) => {
      const { payload } = action;
      const target = state.uncategorizedQuestions.find((item) => {
        return item.id === payload.originId;
      });
      state.surveys = state.surveys.map((survey) => {
        if (survey.id === payload.destinationId) {
          return {
            ...survey,
            questions: [
              ...survey.questions,
              { ...target, parentId: payload.destinationId },
            ],
          };
        } else return survey;
      });
      state.uncategorizedQuestions = state.uncategorizedQuestions.filter(
        (item) => item.id !== payload.originId
      );
    },
  },
});

export const {
  addSurvey,
  clearAllSurveys,
  addQuestion,
  moveQuestion,
  removeQuestion,
} = mainSlice.actions;
export default mainSlice.reducer;
