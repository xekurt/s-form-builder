import { useSelector } from "react-redux";

export const useData = () => {
  const { surveys, questions } = useSelector((state) => {
    return state.main;
  });
  console.info(surveys);
  return {
    surveys,
    questions,
  };
};
