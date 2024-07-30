import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./components/landing/landing";
import Login from "./components/login/login";
import Register from "./components/login/register";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" Component={Landing} />
          <Route path="/register" Component={Register}></Route>
          <Route path="/login" Component={Login} />
          <Route path="/Home" Component={Login} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
