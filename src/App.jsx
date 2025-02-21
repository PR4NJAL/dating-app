import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Questions from "./components/Questions";
import Results from "./components/Results";
import ProtectedRoute from "./config/ProtectedRoute";

function App() {
  return (
      <Routes>
        <Route path="/" element={<Navigate to="/auth" replace/>} />
        <Route path="/auth" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/questions" element={<Questions />} />
          <Route path="/results" element={<Results />} />
        </Route>
      </Routes>
  );
}

export default App;