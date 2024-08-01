import {
  LayoutList,
  LogOut,
  Plus,
  Square,
  SquareCheckBig,
  X,
} from "lucide-react";
import Logo from "../logo";
import "./index.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [isCompeleted, setICompeleted] = useState(true);
  const navigate = useNavigate();

  return (
    <>
      <div className="container-fluid body">
        <header className="mx-md-5">
          <Logo />
          <p className="mb-0">Hello, Heba</p>
        </header>

        <div className="row p-1">
          <aside className="col-2 col-lg-3 py-5 px-0 px-lg-5 d-flex justify-content-between flex-column">
            <div>
              <p className="">
                <LayoutList className="me-lg-2" />
                <span className="d-none d-lg-inline">Tasks</span>
              </p>
              <p>
                <Plus className="me-lg-2" />
                <span className="d-none d-lg-inline">Add Task</span>
              </p>
            </div>
            <div>
              <p onClick={() => navigate("/")}>
                <LogOut className="me-lg-2" />
                <span className="d-none d-lg-inline">Logout</span>
              </p>
            </div>
          </aside>
          <section className="col-10 col-lg-9 py-5">
            <div className="todos">
              <div className="d-flex align-items-center justify-content-between p-3">
                {}
                <div className="d-flex align-items-center">
                  <p
                    className="mb-0 me-4"
                    onClick={() => {
                      setICompeleted(!isCompeleted);
                    }}
                  >
                    {!isCompeleted ? <SquareCheckBig /> : <Square />}
                  </p>
                  <input />
                </div>
                <X />
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
