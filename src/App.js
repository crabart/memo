import { BrowserRouter, Routes, Route } from "react-router-dom";
import TaskIndex from "./component/TaskIndex";
import LoginIndex from "./component/LoginIndex";
import SignupIndex from "./component/SignupIndex";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={`/`} element={<TaskIndex />} />
        <Route path={`/login/`} element={<LoginIndex />} />
        <Route path={`/signup/`} element={<SignupIndex />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
