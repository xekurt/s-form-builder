import Sidebar from "./Components/Sidebar/Index";
import Exams from "./Pages/Exams/Exams";
import Questionnaire from "./Pages/Questionnaire/Index";
import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
import Analytics from "./Pages/Analytics/Index";
import QuestionsBank from "./Pages/QuestionsBank/Index";
import Landing from "./Pages/Landing/Landing";

function App() {
  return (
    <div className="App">
      <Sidebar />
      <Routes>
        <Route path="/" element={<Navigate to={"/landing"} />} />
        <Route path="exams" element={<Exams />} />
        <Route path="questionnaire" element={<Questionnaire />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="questions_bank" element={<QuestionsBank />} />
        <Route path="landing" element={<Landing />} />
      </Routes>
    </div>
  );
}

export default App;
