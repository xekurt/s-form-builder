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
      const {
        payload: { id },
      } = action;
      state.surveys = state.surveys.filter((survey) => survey.id !== id);
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
    updateQuestion: (state, action) => {
      const { payload } = action;

      if (payload.parentId) {
        state.surveys = state.surveys.map((survey) => {
          if (survey.id === payload.parentId) {
            survey.questions = survey.questions.map((question) => {
              if (question.id === payload.id) {
                return payload;
              } else return question;
            });
          }
          return survey;
        });
      } else {
        state.uncategorizedQuestions = state.uncategorizedQuestions.map(
          (question) => {
            if (question.id === payload.id) {
              return payload;
            } else {
              return question;
            }
          }
        );
      }
    },
    moveQuestion: (state, action) => {
      const { payload } = action;

      const { parentId, questionId, destinationId } = payload;
      const targetParent = state.surveys.find(
        (survey) => survey.id === parentId
      );
      const targetQuestion = targetParent.questions.find(
        (question) => question.id === questionId
      );
      state.surveys = state.surveys.map((survey) => {
        if (survey.id === parentId) {
          survey.questions = survey.questions.filter(
            (item) => item.id !== questionId
          );
          return survey;
        } else if (survey.id === destinationId) {
          survey.questions = [
            ...survey.questions,
            { ...targetQuestion, parentId: destinationId },
          ];
          return survey;
        } else return survey;
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
        const orgIndex = state.uncategorizedQuestions.findIndex(
          (item) => item.id === origin
        );
        const destIndex = state.uncategorizedQuestions.findIndex(
          (item) => item.id === destination
        );
        const temp = state.uncategorizedQuestions[orgIndex];
        state.uncategorizedQuestions[orgIndex] =
          state.uncategorizedQuestions[destIndex];
        state.uncategorizedQuestions[destIndex] = temp;
      }
    },
  },
});

export const {
  addSurvey,
  removeSurvey,
  clearAllSurveys,
  addQuestion,
  moveQuestion,
  removeQuestion,
  sortQuestions,
  updateQuestion,
} = mainSlice.actions;
export default mainSlice.reducer;
