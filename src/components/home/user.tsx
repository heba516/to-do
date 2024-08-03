import { SquareCheckBig, Square, X } from "lucide-react";
import { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";

interface toDo {
  id: string;
  todo: string;
  date: string;
}
interface IProps {
  toDo: toDo;
  handleDelete: (id: string) => void;
  handleEdit: (todoID: string, value: string) => void;
}
export default function User({ toDo, handleDelete, handleEdit }: IProps) {
  const [isCompeleted, setICompeleted] = useState<boolean>(true);
  const validationSchema = yup.object().shape({
    todo: yup.string().required("todo is required"),
    date: yup.string().required("Date is req"),
  });
  const formik = useFormik({
    initialValues: {
      todo: toDo.todo,
      date: toDo.date,
    },
    validationSchema,
    onSubmit: async (values) => {
      console.log(toDo.id);

      try {
        handleEdit(`${toDo.id}`, values.todo);
      } catch (e) {
        console.log(e);
      }
    },
  });
  return (
    <div className="d-flex align-items-center justify-content-between p-3 mb-4">
      <form
        onSubmit={formik.handleSubmit}
        className="d-flex align-items-center"
      >
        <p
          className="mb-0 me-4"
          onClick={() => {
            setICompeleted(!isCompeleted);
          }}
        >
          {!isCompeleted ? <SquareCheckBig /> : <Square />}
        </p>
        <input
          name="todo"
          value={formik.values.todo}
          onChange={formik.handleChange}
        />
      </form>
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
}
