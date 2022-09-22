import React from "react";
import Questions from "../../Components/Questions/Index";
import { useData } from "../../hooks/useData";
import "./styles.css";
const Index = () => {
  const { uncategorizedQuestions } = useData();
  return (
    <section className="page">
      <Questions uncategorizedQuestions={uncategorizedQuestions} />
    </section>
  );
};

export default Index;
