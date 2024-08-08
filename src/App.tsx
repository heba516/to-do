import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import IsProtected from "./components/IsProtected";

function App() {
  return (
    <>
      <BrowserRouter>
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
      </BrowserRouter>
    </>
  );
}

export default App;
