import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  SquareCheckBig,
  Square,
  ListChecks,
  Trash,
  Pencil,
  ArrowUpDown,
  ListTodo,
} from "lucide-react";
import { Annoyed, LayoutList, LogOut, Plus } from "lucide-react";
import { v4 } from "uuid";
import axios from "axios";
import { Tooltip } from "react-tooltip";

import Logo from "../components/logo";
import ToDo from "../components/home/services/userData";
import "../components/home/index.scss";
import PopUp from "../components/home/PopUp";
import "reactjs-popup/dist/index.css";

export default function Home() {
  const [orgTodos, setOrgTodos] = useState<ToDo[]>([]);
  const [todos, setTodos] = useState<ToDo[]>([]);
  const [isAddPopupOpen, setIsAddPopupOpen] = useState<boolean>(false);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState<boolean>(false);
  const [currentTodo, setCurrentTodo] = useState<ToDo | null>(null);
  const [isSortedByDate, setIsSortedByDate] = useState<boolean>(false);

  const navigate = useNavigate();
  const id = localStorage.getItem("id");

  useEffect(() => {
    const getUsers = async () => {
      const { data } = await axios.get(`http://localhost:3000/users/${id}`);
      setOrgTodos(data.toDos);
      setTodos(data.toDos);
    };

    getUsers();
  }, [id]);

  const completedTasks = () => {
    const completed = orgTodos.filter((todo) => todo.completed === true);
    setTodos(completed);
  };
  const pendingTasks = () => {
    const pending = orgTodos.filter((todo) => todo.completed !== true);
    setTodos(pending);
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(isSortedByDate);
    const { value } = event.target;
    if (value === "date") {
      const sorted = todos.sort((a, b) => (a.date > b.date ? 1 : -1));
      setTodos(sorted);
      setIsSortedByDate(true);
    } else if (value === "priority") {
      const priorityLevels = ["high", "med", "low"];
      const sorted = todos.sort((a, b) => {
        const indexA = priorityLevels.indexOf(a.priority);
        const indexB = priorityLevels.indexOf(b.priority);

        return indexA - indexB;
      });
      setTodos(sorted);
      setIsSortedByDate(false);
    }
  };

  const handleAdd = async (values: ToDo) => {
    const newTodo = { ...values, id: v4() };
    const updatedTodos = [...orgTodos, newTodo];
    await axios.patch(`http://localhost:3000/users/${id}`, {
      toDos: updatedTodos,
    });
    setTodos(updatedTodos);
    setOrgTodos(updatedTodos);
  };

  const handleDelete = async (todoID: string) => {
    const updatedToDos = orgTodos.filter((todo: ToDo) => todo.id !== todoID);

    await axios.patch(`http://localhost:3000/users/${id}`, {
      toDos: updatedToDos,
    });
    setTodos(updatedToDos);
    setOrgTodos(updatedToDos);
  };

  const handleEdit = async (todoID: string, values: ToDo) => {
    const updatedToDo = orgTodos.map((toDo: ToDo) => {
      if (toDo.id === todoID) {
        return {
          ...toDo,
          todo: values.todo,
          date: values.date,
          completed: values.completed,
          priority: values.priority,
          description: values.description,
        };
      }

      return toDo;
    });

    await axios.patch(`http://localhost:3000/users/${id}`, {
      toDos: updatedToDo,
    });
    setTodos(updatedToDo);
    setOrgTodos(updatedToDo);
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
          <aside className="col-2 col-lg-3 pt-5 px-0 px-lg-5 d-flex justify-content-between flex-column">
            <div>
              <p
                onClick={() => {
                  setTodos(orgTodos);
                  console.log(orgTodos);
                }}
              >
                <ListTodo className="me-lg-2" />
                <span className="d-none d-lg-inline">All Tasks</span>
              </p>
              <p onClick={pendingTasks}>
                <LayoutList className="me-lg-2" />
                <span className="d-none d-lg-inline">Pending Tasks</span>
              </p>
              <p onClick={completedTasks}>
                <ListChecks className="me-lg-2" />
                <span className="d-none d-lg-inline">Completed Tasks</span>
              </p>
              <p>
                <label htmlFor="sort" className="d-block d-lg-inline">
                  <ArrowUpDown className="me-lg-2" />
                </label>
                <select name="sort" id="sort" onChange={handleSortChange}>
                  <option value="sort">Sort</option>
                  <option value="date">Date</option>
                  <option value="priority">Priority</option>
                </select>
              </p>

              <p onClick={openAddPopup}>
                <Plus className="me-lg-2" />
                <span className="d-none d-lg-inline">Add Task</span>
              </p>
              <PopUp
                open={isAddPopupOpen}
                onClose={closeAddPopup}
                toDo={{
                  id: "",
                  todo: "",
                  date: "",
                  description: "",
                  priority: "",
                  completed: false,
                }}
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
          <section className="col-10 col-lg-9 py-5 pe-lg-5">
            <div className="todos">
              {todos.length ? (
                todos.map((toDo: ToDo) => (
                  <div key={toDo.id}>
                    <div
                      style={
                        toDo.priority === "high"
                          ? { border: "2px solid rgb(224, 57, 57)" }
                          : toDo.priority === "med"
                          ? { border: "2px solid rgb(249, 228, 0)" }
                          : { border: "2px solid #80bc75" }
                      }
                      className="todo d-flex align-items-md-center justify-content-between flex-column flex-md-row p-3 mb-4"
                    >
                      <div
                        data-tooltip-id="my-tooltip"
                        data-tooltip-content={toDo.description}
                        className="d-flex align-items-center mb-0 me-4"
                        onClick={() => {
                          handleEdit(toDo.id, {
                            ...toDo,
                            completed: !toDo.completed,
                          });
                        }}
                      >
                        {toDo.completed ? (
                          <SquareCheckBig className="me-3" />
                        ) : (
                          <Square className="me-3" />
                        )}
                        {toDo.todo}
                      </div>
                      <div className="my-4 my-md-0">{toDo.date}</div>
                      <div className="actions">
                        <Pencil
                          className="me-5"
                          onClick={() => openEditPopup(toDo)}
                        />
                        <Trash onClick={() => handleDelete(toDo.id)} />
                      </div>
                    </div>
                    <Tooltip id="my-tooltip" place="bottom" />
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
