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
    deleteQuestion: (state, action) => {
      const { payload } = action;
      const { id } = payload;

      const parents = state.questions.find(
        (question) => question.id === id
      )?.parents;
      state.surveys = state.surveys.map((survey) => {
        if (parents.includes(survey.id)) {
          return {
            ...survey,
            questionIds: survey.questionIds.filter((q) => q !== id),
          };
        } else {
          return survey;
        }
      });
      state.questions = state.questions.filter(
        (question) => question.id !== id
      );
    },
    removeQuestion: (state, action) => {
      const { payload } = action;
      const { id, parentId } = payload;
      state.questions = state.questions.map((question) => {
        if (question.id === id) {
          question.parents = question.parents.filter(
            (parent) => parent !== parentId
          );
          return question;
        } else {
          return question;
        }
      });
      // state.questions = state.questions.filter(
      //   (question) => question.id !== id
      // );
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
      state.surveys = state.surveys.map((survey) => {
        if (
          survey.id === destinationId &&
          !survey.questionIds.includes(questionId)
        ) {
          return {
            ...survey,
            questionIds: [...survey.questionIds, questionId],
          };
        } else {
          return survey;
        }
      });
    },
    sortQuestions: (state, action) => {
      const { payload } = action;
      const { origin, destination } = payload;
      const orgIndex = state.questions.findIndex((item) => item.id === origin);
      const destIndex = state.questions.findIndex(
        (item) => item.id === destination
      );
      const temp = state.questions[orgIndex];
      state.questions[orgIndex] = state.questions[destIndex];
      state.questions[destIndex] = temp;
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
  deleteQuestion,
  removeQuestion,
  sortQuestions,
  updateQuestion,
} = mainSlice.actions;
export default mainSlice.reducer;
