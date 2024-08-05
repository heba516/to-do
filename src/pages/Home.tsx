import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SquareCheckBig, Square, X, Pencil } from "lucide-react";
import { Annoyed, LayoutList, ListChecks, LogOut, Plus } from "lucide-react";
import { v4 } from "uuid";
import axios from "axios";
import "reactjs-popup/dist/index.css";

import Logo from "../components/logo";
import ToDo from "../components/home/userData";
import "../components/home/index.scss";
import PopUp from "../components/home/PopUp";

export default function Home() {
  const [todos, setTodos] = useState<ToDo[]>([]);
  const [isAddPopupOpen, setIsAddPopupOpen] = useState(false);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [currentTodo, setCurrentTodo] = useState<ToDo | null>(null);

  const navigate = useNavigate();
  const id = localStorage.getItem("id");

  useEffect(() => {
    const getUsers = async () => {
      const { data } = await axios.get(`http://localhost:3000/users/${id}`);
      setTodos(data.toDos);
    };

    getUsers();
  }, [id]);

  const handleAdd = async (values: ToDo) => {
    const newTodo = { ...values, id: v4() };
    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos);

    await axios.patch(`http://localhost:3000/users/${id}`, {
      toDos: updatedTodos,
    });
  };

  const handleDelete = async (todoID: string) => {
    const updatedToDos = todos.filter((todo: ToDo) => todo.id !== todoID);
    setTodos(updatedToDos);

    await axios.patch(`http://localhost:3000/users/${id}`, {
      toDos: updatedToDos,
    });
  };

  const handleEdit = async (todoID: string, values: ToDo) => {
    const updatedToDo = todos.map((toDo: ToDo) => {
      if (toDo.id === todoID) {
        return {
          ...toDo,
          todo: values.todo,
          date: values.date,
          completed: values.completed,
        };
      }
      return toDo;
    });

    setTodos(updatedToDo);
    await axios.patch(`http://localhost:3000/users/${id}`, {
      toDos: updatedToDo,
    });
  };

  const openAddPopup = () => setIsAddPopupOpen(true);
  const closeAddPopup = () => setIsAddPopupOpen(false);

  const openEditPopup = (toDo: ToDo) => {
    setCurrentTodo(toDo);
    setIsEditPopupOpen(true);
  };
  const closeEditPopup = () => {
    setCurrentTodo(null);
    setIsEditPopupOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("id");
    navigate("/");
  };

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
                <span className="d-none d-lg-inline">Completed</span>
              </p>
              <p onClick={openAddPopup}>
                <Plus className="me-lg-2" />
                <span className="d-none d-lg-inline">Add Task</span>
              </p>
              <PopUp
                open={isAddPopupOpen}
                onClose={closeAddPopup}
                toDo={{ todo: "", date: "", id: "", completed: false }}
                handleAdd={handleAdd}
              />
            </div>
            <div>
              <p onClick={handleLogout}>
                <LogOut className="me-lg-2" />
                <span className="d-none d-lg-inline">Logout</span>
              </p>
            </div>
          </aside>
          <section className="col-10 col-lg-9 py-5">
            <div className="todos">
              {todos.length ? (
                todos.map((toDo: ToDo) => (
                  <div
                    key={toDo.id}
                    className="todo d-flex align-items-md-center justify-content-between flex-column flex-md-row p-3 mb-4"
                  >
                    <div className="d-flex align-items-center">
                      <p
                        className="mb-0 me-4"
                        onClick={() => {
                          handleEdit(toDo.id, {
                            ...toDo,
                            completed: !toDo.completed,
                          });
                          setTodos(
                            todos.map((td) =>
                              td.id === toDo.id
                                ? {
                                    ...td,
                                    completed: !td.completed,
                                  }
                                : td
                            )
                          );
                        }}
                      >
                        {toDo.completed ? (
                          <SquareCheckBig className="me-3" />
                        ) : (
                          <Square className="me-3" />
                        )}
                        {toDo.todo}
                      </p>
                    </div>
                    <div className="my-4 my-md-0">{toDo.date}</div>
                    <div className="actions">
                      <Pencil
                        className="me-5"
                        onClick={() => openEditPopup(toDo)}
                      />
                      <X onClick={() => handleDelete(toDo.id)} />
                    </div>
                  </div>
                ))
              ) : (
                <h3 className="d-flex align-items-center">
                  <Annoyed className="me-4" />
                  No Tasks Found
                </h3>
              )}
            </div>
          </section>
        </div>
      </div>
      {currentTodo && (
        <PopUp
          open={isEditPopupOpen}
          onClose={closeEditPopup}
          toDo={currentTodo}
          handleEdit={handleEdit}
        />
      )}
    </>
  );
}
