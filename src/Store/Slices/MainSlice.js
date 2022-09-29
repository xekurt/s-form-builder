import { createSlice } from "@reduxjs/toolkit";

export const mainSlice = createSlice({
  name: "main",
  initialState: { questions: [], surveys: [] },
  reducers: {
    addSurvey: (state, action) => {
      const { payload } = action;
      state.surveys.push(payload);
    },
    removeSurvey: (state, action) => {
      const {
        payload: { id },
      } = action;
      state.surveys = state.surveys.filter((survey) => survey.id !== id);
      state.questions = state.questions.map((question) => {
        question.parents = question.parents.filter((parent) => parent !== id);
        return question;
      });
    },
    updateSurvey: (state, action) => {
      const { payload } = action;
      state.surveys = state.surveys.map((survey) => {
        if (survey.id === payload.id) {
          return payload;
        } else {
          return survey;
        }
      });
    },
    addQuestion: (state, action) => {
      const { payload } = action;
      state.questions.push({ ...payload, parents: [] });
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
        state.questions = state.questions.filter(
          (question) => question.id !== id
        );
      }
    },
    updateQuestion: (state, action) => {
      const { payload } = action;
      state.questions = state.questions.map((question) => {
        if (question.id === payload.id) {
          return payload;
        } else {
          return question;
        }
      });
    },
    moveQuestion: (state, action) => {
      const { payload } = action;

      const { questionId, destinationId } = payload;
      state.questions = state.questions.map((question) => {
        if (
          question.id === questionId &&
          !question.parents.includes(destinationId)
        ) {
          return { ...question, parents: [...question.parents, destinationId] };
        }
        return question;
      });
    },
    sortQuestions: (state, action) => {
      const { payload } = action;
      if (payload.parentId.length > 0) {
        const { parentId, origin, destination } = payload;
        state.surveys = state.surveys.map((survey) => {
          if (survey.id === parentId) {
            const orgIndex = survey.questions.findIndex(
              (item) => item.id === origin
            );
            const destIndex = survey.questions.findIndex(
              (item) => item.id === destination
            );
            const temp = survey.questions[orgIndex];
            survey.questions[orgIndex] = survey.questions[destIndex];
            survey.questions[destIndex] = temp;
            return survey;
          } else {
            return survey;
          }
        });
      } else {
        const { origin, destination } = payload;
        const orgIndex = state.questions.findIndex(
          (item) => item.id === origin
        );
        const destIndex = state.questions.findIndex(
          (item) => item.id === destination
        );
        const temp = state.questions[orgIndex];
        state.questions[orgIndex] = state.questions[destIndex];
        state.questions[destIndex] = temp;
      }
    },
  },
});

export const {
  addSurvey,
  updateSurvey,
  removeSurvey,
  clearAllSurveys,
  addQuestion,
  moveQuestion,
  removeQuestion,
  sortQuestions,
  updateQuestion,
} = mainSlice.actions;
export default mainSlice.reducer;
