import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./components/landing/landing";
import Login from "./components/login/login";
import Register from "./components/login/register";
import Home from "./components/home/Home";
import NotFound from "./components/notFound";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" Component={Landing} />
          <Route path="/register" Component={Register}></Route>
          <Route path="Home" Component={Home} />
          <Route path="/login" Component={Login} />
          {/* <Route path="/login" Component={Login}>
            <Route path="Home" Component={Home} />
          </Route> */}
          <Route path="*" Component={NotFound} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
