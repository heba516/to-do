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

  // const toDos = async () => {
  //   const user = await (
  //     await fetch("http://localhost:3000/users?userName=heba")
  //   ).json();
  //   const userToDos = user[0].toDos;
  //   return userToDos;
  // };

  // fetch("http://localhost:3000/users?userName=heba")
  //   .then((response) => {
  //     if (!response.ok) {
  //       throw new Error("Network response was not ok");
  //     }
  //     return response.json();
  //   })
  //   .then((data) => {
  //     const toDos = data[0].toDos;
  //     return toDos;
  //   })
  //   .catch((error) => {
  //     console.error("There was a problem with the fetch operation:", error);
  //   });
  // console.log(toDos);

  // const handleDelete = (todo) => {
  //   fetch("http://localhost:3000/users", {
  //     method: "PUT",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({
  //       toDos: toDos.filter((toDo) => toDo !== todo),
  //     }),
  //   });
  // };

  // Assuming you have a JSON server running on port 3000 with a 'todos' endpoint

  // const fetchTodos = async () => {
  //   try {
  //     const response = await fetch("http://localhost:3000/users?userName=heba");
  //     const todos = await response.json();
  //     return todos[0].toDos;
  //   } catch (error) {
  //     console.error("Error fetching todos:", error);
  //   }
  // };

  // fetchTodos()
  //   .then((todos) => {
  //     console.log(todos);
  //   })
  //   .catch((error) => {
  //     console.error("Error fetching todos:", error);
  //   });

  // const handleDelete = (todo: string) => {
  //   const url = `http://localhost:3000/users?userName=heba`;

  //   fetch(url, {
  //     method: "DELETE",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   })
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error("Failed to delete todo");
  //       }
  //       console.log("Todo deleted successfully");
  //     })
  //     .catch((error) => {
  //       console.error("Error deleting todo:", error);
  //     });
  // };

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
