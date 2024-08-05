import Popup from "reactjs-popup";
import "./index.scss";
import { useFormik } from "formik";
import * as yup from "yup";
import ToDo from "./userData";

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
    date: yup.string().required("Due Date"),
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
      todo: toDo.todo,
      date: toDo.date,
      id: toDo.id,
    },
    validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <Popup open={open} modal nested onClose={onClose}>
      {
        <div className="popup">
          <button className="close" onClick={onClose}>
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
              <label className="mt-4" htmlFor="date">
                Date
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
              <button type="submit" className="submit">
                Submit
              </button>
            </form>
          </div>
        </div>
      }
    </Popup>
  );
}
