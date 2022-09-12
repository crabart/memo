import { BrowserRouter, Routes, Route } from "react-router-dom";
import TaskIndex from "./component/TaskIndex"
import LoginIndex from "./component/LoginIndex";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={`/`} element={<TaskIndex />} />
        <Route path={`/login/`} element={<LoginIndex />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
