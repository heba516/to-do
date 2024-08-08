import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Mail, Lock } from "lucide-react";
import Logo from "../components/logo";
import "../components/login/index.scss";
interface UserValues {
  email: string;
  password: string;
}
const Login: React.FC = () => {
  const [submit, isSubmit] = useState(false);
  const navigate = useNavigate();

  const isEmailExist = async (email: string) => {
    const { data } = await axios.get(
      `http://localhost:3000/users?email=${email}`
    );
    return data;
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email is required"),

    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = async (values: UserValues) => {
    try {
      const emailIsFound = await isEmailExist(values.email);

      if (emailIsFound.length > 0) {
        if (emailIsFound[0].password !== values.password) {
          formik.errors.password = "Incorrect Password";
          return;
        }
        localStorage.setItem("id", emailIsFound[0].id);

        navigate("/Home");
      } else {
        formik.errors.email = "Email Not Exist";
      }
    } catch (error) {
      isSubmit(false);
      console.log(error);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: handleSubmit,
  });
  return (
    <>
      <div className="container text-center">
        <div className="reg w-50">
          <Logo />
          <div className="form">
            <form onSubmit={formik.handleSubmit}>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  placeholder=" "
                />
                <label htmlFor="email" className="d-flex align-items-center">
                  <Mail style={{ color: "#ff49b4" }} />
                  Email Address
                </label>
                {formik.touched.email && formik.errors.email && (
                  <div className="error">{formik.errors.email}</div>
                )}
              </div>
              <div className="form-floating mb-3">
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  placeholder=" "
                />
                <label htmlFor="password" className="d-flex align-items-center">
                  <Lock style={{ color: "#80be75" }} />
                  Password
                </label>
                {formik.touched.password && formik.errors.password && (
                  <div className="error">{formik.errors.password}</div>
                )}
              </div>
              <button type="submit" disabled={submit}>
                Login
              </button>
              <p className="mt-2" style={{ color: "#69665C" }}>
                <Link to={"/register"}>Sign Up For Free</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
