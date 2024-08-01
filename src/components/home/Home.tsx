import { House, LogOut, Plus } from "lucide-react";
import Logo from "../logo";
import "./index.scss";

export default function Home() {
  return (
    <>
      <div className="container-fluid body">
        <Logo />

        <div className="row">
          <aside className="col-2 col-lg-3 py-4 px-lg-5 d-flex justify-content-between flex-column">
            <div>
              <p className="mt-4">
                <House />
                <span className="d-none d-lg-inline">Tasks</span>
              </p>
              <p>
                <Plus />
                <span className="d-none d-lg-inline">Add Task</span>
              </p>
            </div>
            <div className="">
              <p>
                <LogOut />
                <span className="d-none d-lg-inline">Logout</span>
              </p>
            </div>
          </aside>
          <section className="col-11 col-md-9"></section>
        </div>
      </div>
    </>
  );
}
