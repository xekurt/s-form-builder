import { useSelector } from "react-redux";

export const useData = () => {
  const surveys = useSelector((state) => state.main.surveys);
  const questions = useSelector((state) => state.main.uncategorizedQuestions);
  return {
    surveys,
    questions,
  };
};
