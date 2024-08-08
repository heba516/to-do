import { useFormik } from "formik";
import * as yup from "yup";
import Popup from "reactjs-popup";
import ToDo from "./services/userData";
import "./index.scss";

interface IProps {
  open: boolean;
  onClose: () => void;
  toDo: ToDo;
  handleAdd?: (values: ToDo) => void;
  handleEdit?: (todoID: string, value: ToDo) => void;
}
export default function PopUp({
  open,
  onClose,
  toDo,
  handleAdd,
  handleEdit,
}: IProps) {
  const validationSchema = yup.object().shape({
    todo: yup.string().required("Add New Task"),
    date: yup.string().required("Add Date"),
    description: yup.string().required("Add Task Description"),
    priority: yup.string().required("what is priority of your task ?"),
  });
  const handleSubmit = (values: ToDo) => {
    if (handleAdd) {
      handleAdd(values);
    } else if (handleEdit) {
      handleEdit(toDo.id, values);
    }
    onClose();
    formik.resetForm();
  };
  const formik = useFormik({
    initialValues: {
      id: toDo.id,
      todo: toDo.todo,
      date: toDo.date,
      description: toDo.description,
      completed: toDo.completed,
      priority: toDo.priority,
    },
    validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <Popup open={open} modal nested onClose={onClose}>
      {
        <div className="popup">
          <button
            className="close"
            onClick={() => {
              onClose();
              formik.resetForm();
            }}
          >
            &times;
          </button>
          <div className="content">
            <form onSubmit={formik.handleSubmit}>
              <label htmlFor="todo">Add Task</label>
              <input
                type="text"
                id="todo"
                name="todo"
                value={formik.values.todo}
                onChange={formik.handleChange}
                placeholder="Task"
              />
              {formik.touched.todo && formik.errors.todo && (
                <div className="error">{formik.errors.todo}</div>
              )}

              <label className="mt-2" htmlFor="dec">
                Description
              </label>
              <input
                type="text"
                id="description"
                name="description"
                style={{ height: "5rem" }}
                value={formik.values.description}
                onChange={formik.handleChange}
                placeholder="Add Description"
              />
              {formik.touched.description && formik.errors.description && (
                <div className="error">{formik.errors.description}</div>
              )}

              <label className="mt-2" htmlFor="date">
                Due Date
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={formik.values.date}
                onChange={formik.handleChange}
              />
              {formik.touched.date && formik.errors.date && (
                <div className="error">{formik.errors.date}</div>
              )}
              <label className="mt-2 mb-2">Priority</label>
              <div className="priority d-flex align-items-center mb-1">
                <div
                  tabIndex={0}
                  style={
                    formik.values.priority === "high"
                      ? { outline: "2px solid #69665C" }
                      : { outline: "none" }
                  }
                  onClick={() => (formik.values.priority = "high")}
                  className="high"
                ></div>
                <div
                  tabIndex={0}
                  style={
                    formik.values.priority === "med"
                      ? { outline: "2px solid #69665C" }
                      : { outline: "none" }
                  }
                  onClick={() => (formik.values.priority = "med")}
                  className="med mx-4"
                ></div>
                <div
                  tabIndex={0}
                  style={
                    formik.values.priority === "low"
                      ? { outline: "2px solid #69665C" }
                      : { outline: "none" }
                  }
                  onClick={() => (formik.values.priority = "low")}
                  className="low"
                ></div>
              </div>
              {formik.touched.priority && formik.errors.priority && (
                <div className="error">{formik.errors.priority}</div>
              )}
              <button type="submit" className="submit mt-3">
                Submit
              </button>
            </form>
          </div>
        </div>
      }
    </Popup>
  );
}
