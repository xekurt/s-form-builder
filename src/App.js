import Sidebar from "./Components/Sidebar/Index";
import Exams from "./Pages/Exams/Exams";
import Questionnaire from "./Pages/Questionnaire/Index";
import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
import Analytics from "./Pages/Analytics/Index";
import QuestionsBank from "./Pages/QuestionsBank/Index";

function App() {
  return (
    <div className="App">
      <Sidebar />
      <Routes>
        <Route path="/" element={<Navigate to={"/exams"} />} />
        <Route path="exams" element={<Exams />} />
        <Route path="questionnaire" element={<Questionnaire />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="questions_bank" element={<QuestionsBank />} />
      </Routes>
    </div>
  );
}

export default App;
