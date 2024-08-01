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
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [isCompeleted, setICompeleted] = useState(true);
  const [todos, setTodos] = useState([]);
  const navigate = useNavigate();

  const fetchTodos = async () => {
    const response = await fetch("http://localhost:3000/users?userName=heba");
    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }
    const toDos = await response.json();
    console.log(response);

    setTodos(toDos[0].toDos);
    return toDos;
  };

  useEffect(() => {
    fetchTodos();
    // console.log(fetchTodos());
  }, []);

  // const handelAdd = (newTask: string) => {
  //   todos.push(newTask);
  //   setTodos(todos);
  //   console.log(todos);

  //   fetch("http://localhost:3000/users?userName=heba", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     // body: JSON
  //     //   .stringify
  //     //   // toDos: todos
  //     //   (),
  //   });
  // };

  const handleDelete = async (val: string) => {
    const updatedToDos = todos.filter((todo) => todo !== val);
    setTodos(updatedToDos);

    console.log(todos);

    await fetch("http://localhost:3000/users/7c43", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ toDos: updatedToDos }),
    });
  };

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
              {todos ? (
                todos.map((toDo) => {
                  return (
                    <div className="d-flex align-items-center justify-content-between p-3 mb-4">
                      <div className="d-flex align-items-center">
                        <p
                          className="mb-0 me-4"
                          onClick={() => {
                            setICompeleted(!isCompeleted);
                          }}
                        >
                          {!isCompeleted ? <SquareCheckBig /> : <Square />}
                        </p>
                        <input value={toDo} onChange={() => {}} />
                      </div>
                      <X onClick={() => handleDelete(toDo)} />
                    </div>
                  );
                })
              ) : (
                <div>emp</div>
              )}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
