import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import IsProtected from "./components/IsProtected";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" Component={Landing} />
          <Route
            path="/register"
            element={
              <IsProtected isAuth={false} path="/Home">
                <Register />
              </IsProtected>
            }
          />
          <Route
            path="/login"
            element={
              <IsProtected isAuth={false} path="/Home">
                <Login />
              </IsProtected>
            }
          />
          <Route
            path="/Home"
            element={
              <IsProtected isAuth={true} path="/login">
                <Home />
              </IsProtected>
            }
          />
          <Route path="*" Component={NotFound} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
