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
import { useNavigate, useParams } from "react-router-dom";

interface toDo {
  id: string;
  todo: string;
  date: string;
}
export default function Home() {
  const [isCompeleted, setICompeleted] = useState(true);
  const [todos, setTodos] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  const fetchTodos = async () => {
    const response = await fetch("http://localhost:3000/users/" + id);
    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }
    const toDos = await response.json();
    setTodos(toDos.toDos);
    return toDos.toDos;
    // await fetch("http://localhost:3000/users/" + id),
    //   {
    //     method: "GET",
    //     headers: {
    //       headers: { "Content-Type": "application/json" },
    //     },
    //   };
  };

  useEffect(() => {
    fetchTodos();
  }, []);
  console.log(fetchTodos);

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

  // const handleDelete = async (todoID: string) => {
  //   const updatedToDos = todos.filter(
  //     (todo: { id: string }) => todo.id !== todoID
  //   );

  //   // console.log(setTodos(updatedToDos));

  //   console.log({ todos }, { updatedToDos });

  //   // console.log([updatedToDos[0]]);

  //   await fetchTodos(),
  //     {
  //       method: "PATCH",
  //       headers: {
  //         headers: { "Content-Type": "application/json" },
  //       },
  //       body: JSON.stringify({ toDos: updatedToDos }),
  //     };
  // };

  const handleDelete = async (todoID: string) => {
    // Filter out the todo item with the specified ID
    const updatedToDos = todos.filter(
      (todo: { id: string }) => todo.id !== todoID
    );

    // Update the state with the new list of todos
    setTodos(updatedToDos);

    console.log({ todos }, { updatedToDos });

    // Send a PATCH request to update the todos on the server
    const response = await fetch("http://localhost:3000/users/" + id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ toDos: updatedToDos }),
    });
  };

  // Handle the response as need

  // Handle the response as need
  // const handleUpdate = (val: string, id:string)=> {
  //   fetchTodos(),
  //     {
  //       method: "PUT",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ toDos[id]: val }),
  //     };
  // }

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
                todos.map((toDo: toDo) => {
                  return (
                    <div
                      className="d-flex align-items-center justify-content-between p-3 mb-4"
                      key={toDo.id}
                    >
                      <div className="d-flex align-items-center">
                        <p
                          className="mb-0 me-4"
                          onClick={() => {
                            setICompeleted(!isCompeleted);
                          }}
                        >
                          {!isCompeleted ? <SquareCheckBig /> : <Square />}
                        </p>
                        <input
                          value={toDo.todo}
                          onChange={(e) => (e.target.value = "hjkh")}
                        />
                      </div>
                      <input
                        type="date"
                        name="date"
                        id="date"
                        value={toDo.date}
                        onChange={() => console.log("hello")}
                      />
                      <X onClick={() => handleDelete(toDo.id)} />
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
