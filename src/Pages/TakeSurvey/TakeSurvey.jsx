import React from "react";
import { useLocation } from "react-router-dom";

const TakeSurvey = () => {
  const location = useLocation();
  console.info(location);
  return <div>TakeSurvey</div>;
};

export default TakeSurvey;
