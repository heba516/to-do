import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import "./index.scss";
import { Mail, UserRound, Lock } from "lucide-react";
import { Link } from "react-router-dom";

interface UserValues {
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
}
const Register: React.FC = () => {
  const [submit, isSubmit] = useState(false);

  const validationSchema = Yup.object().shape({
    userName: Yup.string()
      .min(3, "Name must be minimum 3")
      .max(10, "Name must not be more than 10 characters")
      .required("Name is required"),

    email: Yup.string().email("Invalid email").required("Email is required"),

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
      console.log(values);
      isSubmit(false);
    } catch (error) {
      isSubmit(false);
      console.log(error);
    }
  };

  const formik = useFormik({
    initialValues: {
      userName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: handleSubmit,
  });
  return (
    <>
      <div className="container text-center">
        <div className="reg w-50">
          <h2 className="my-5">
            <span style={{ color: "#a8d2f8" }}>t</span>
            <span style={{ color: "#ff49b4" }}>o</span>
            <span style={{ color: "#80be75" }}>d</span>
            <span style={{ color: "#b4aef6" }}>o</span>
          </h2>
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

              <Link to={"Home"}>
                <button type="submit" disabled={submit}>
                  Signup
                </button>
              </Link>

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
