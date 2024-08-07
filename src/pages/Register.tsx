import "../components/login/index.scss";
import Logo from "../components/logo";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { Mail, UserRound, Lock } from "lucide-react";
import axios from "axios";

interface UserValues {
  userName: string;
  email: string;
  password: string;
  confirmPassword?: string;
  toDos?: string[];
  id?: string;
}
const Register: React.FC = () => {
  const [submit, isSubmit] = useState(false);
  const navigate = useNavigate();

  const isuserNameExist = async (usrName: string) => {
    const res = await axios.get(
      `http://localhost:3000/users?userName=${usrName}`
    );
    return res.data.length > 0;
  };
  const isEmailExist = async (email: string) => {
    const res = await axios.get(`http://localhost:3000/users?email=${email}`);
    return res.data.length > 0;
  };
  const validationSchema = Yup.object().shape({
    userName: Yup.string()
      .min(3, "Name must be minimum 3")
      .max(10, "Name must not be more than 10 characters")
      .required("Name is required"),

    email: Yup.string()
      .email("Invalid email")
      .required("Email is required")
      .matches(/^[a-zA-Z\d]+@gmail.com$/g, "example@gmail.com"),

    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d).+$/g,
        "Must containes at least one number"
      )
      .required("Password is required"),

    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const handleSubmit = async (values: UserValues) => {
    try {
      const nameIsFound = await isuserNameExist(values.userName);
      const emailIsFound = await isEmailExist(values.email);

      if (nameIsFound) {
        formik.errors.userName = "UserName Already Exists";
      }

      if (emailIsFound) {
        formik.errors.email = "This Email has an Account";
      }

      if (!nameIsFound && !emailIsFound) {
        await axios.post("http://localhost:3000/users", values).then((res) => {
          localStorage.setItem("id", res.data.id);
          navigate(`/Home`);
        });
      }
    } catch (error) {
      console.log("Error: ", error);
    } finally {
      isSubmit(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      userName: "",
      email: "",
      password: "",
      confirmPassword: "",
      toDos: [],
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
                  id="userName"
                  name="userName"
                  value={formik.values.userName}
                  onChange={formik.handleChange}
                  placeholder=" "
                />
                <label htmlFor="userName" className="d-flex align-items-center">
                  <UserRound style={{ color: "#a8d2f8" }} />
                  User Name
                </label>
                {formik.touched.userName && formik.errors.userName && (
                  <div className="error">{formik.errors.userName}</div>
                )}
              </div>
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
              <div className="form-floating mb-3">
                <input
                  type="password"
                  className="form-control"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  placeholder=" "
                />
                <label
                  htmlFor="confirmPassword"
                  className="d-flex align-items-center"
                >
                  <Lock style={{ color: "#b4aef6" }} />
                  Confirm Password
                </label>
                {formik.touched.confirmPassword &&
                  formik.errors.confirmPassword && (
                    <div className="error">{formik.errors.confirmPassword}</div>
                  )}
              </div>
              <button type="submit" disabled={submit}>
                Signup
              </button>
              <p className="mt-2" style={{ color: "#69665C" }}>
                Have an account already? <Link to={"/login"}>Sign In</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
