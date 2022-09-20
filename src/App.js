import Sidebar from "./Components/Sidebar/Index";
import Home from "./Pages/Home/Home";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Analytics from "./Pages/Analytics/Index";

function App() {
  return (
    <div className="App">
      <Sidebar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="analytics" element={<Analytics />} />
      </Routes>
    </div>
  );
}

export default App;
