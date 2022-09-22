import { useSelector } from "react-redux";

export const useData = () => {
  const { surveys } = useSelector((state) => state.main);
  const { uncategorizedQuestions } = useSelector((state) => state.main);
  return {
    surveys,
    uncategorizedQuestions,
  };
};
