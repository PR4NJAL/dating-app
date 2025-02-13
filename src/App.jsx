import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Questions from "./components/Questions";

function App() {
  return (
      <Routes>
        <Route path="/" element={<Navigate to="/auth" replace/>} />
        <Route path="/questions" element={<Questions />} />
        <Route path="/auth" element={<Login />} />
      </Routes>
  );
}

export default App;