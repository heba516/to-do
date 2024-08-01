import "./index.scss";
import Logo from "../logo";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { Mail, UserRound, Lock } from "lucide-react";

interface UserValues {
  userName: string;
  email: string;
  password: string;
  confirmPassword?: string;
  toDos?: string[];
}
const Register: React.FC = () => {
  const [submit, isSubmit] = useState(false);
  const navigate = useNavigate();

  const fetchUsers = async () => {
    const response = await fetch("http://localhost:3000/users");
    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }
    return response.json();
  };

  const validationSchema = Yup.object().shape({
    userName: Yup.string()
      .min(3, "Name must be minimum 3")
      .max(10, "Name must not be more than 10 characters")
      .required("Name is required")
      .test("Not Found", "User Name Exist", async (value) => {
        const users = await fetchUsers();
        return !users.some(
          (user: { userName: string }) => user.userName === value
        );
      }),

    email: Yup.string()
      .email("Invalid email")
      .required("Email is required")
      .test("Found", "This Email Already Have Account", async (value) => {
        const users = await fetchUsers();
        return !users.some((user: { email: string }) => user.email === value);
      }),

    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),

    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const handleSubmit = async (values: UserValues) => {
    try {
      isSubmit(true);
      fetch("http://localhost:3000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      navigate("/Home");
      isSubmit(false);
    } catch (error) {
      console.log("err" + error);
    }
    isSubmit(false);
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
