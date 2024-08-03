import { Annoyed, LayoutList, ListChecks, LogOut, Plus } from "lucide-react";
import Logo from "../logo";
import "./index.scss";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import User from "./user";
import ToDo from "./userData";

export default function Home() {
  const [todos, setTodos] = useState<ToDo[]>([]);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getUsers = async () => {
      const { data } = await axios.get("http://localhost:3000/users/" + id);
      setTodos(data.toDos);
    };
    getUsers();
  }, []);

  const handleDelete = async (todoID: string) => {
    const updatedToDos = todos.filter((todo: ToDo) => todo.id !== todoID);
    setTodos(updatedToDos);
    await axios.patch(`http://localhost:3000/users/${id}`, {
      toDos: updatedToDos,
    });
  };

  const handleEdit = async (todoID: string, value: string) => {
    console.log(todos);

    const updatedToDo = todos.map((toDo: ToDo) => {
      if (toDo.id === todoID) {
        return { ...toDo, todo: value };
      }
      return { ...toDo };
    });

    console.log(updatedToDo);

    // setTodos(updatedToDo);
    await axios.patch(`http://localhost:3000/users/${id}`, {
      toDos: updatedToDo,
    });
  };

  // const handleAdd = () => {};

  return (
    <>
      <div className="container-fluid body">
        <header className="mx-md-5">
          <Logo />
        </header>

        <div className="row p-1">
          <aside className="col-2 col-lg-3 py-5 px-0 px-lg-5 d-flex justify-content-between flex-column">
            <div>
              <p>
                <LayoutList className="me-lg-2" />
                <span className="d-none d-lg-inline">All Tasks</span>
              </p>
              <p>
                <ListChecks className="me-lg-2" />
                Compeleted
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
                todos.map((toDo: ToDo) => {
                  return (
                    <User
                      key={toDo.id}
                      toDo={toDo}
                      handleDelete={() => handleDelete(toDo.id)}
                      handleEdit={handleEdit}
                    />
                  );
                })
              ) : (
                <Annoyed />
              )}
            </div>
          </section>
        </div>
        {/* <Outlet /> */}
      </div>
    </>
  );
}
