import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { Mail, Lock } from "lucide-react";
import "./index.scss";
import users from "../../../data/db.json";
import Logo from "../logo";
import { Link, useNavigate } from "react-router-dom";
interface UserValues {
  email: string;
  password: string;
}
const Register: React.FC = () => {
  const [submit, isSubmit] = useState(false);
  const navigate = useNavigate();

  const isPasswordCorrect = (email: string, password: string) => {
    const user = users.users.find((user) => user.email === email);
    return user && user.password === password;
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email is required")
      .test("Found", "Incorrect Email", (value) =>
        users.users.some((user) => user.email === value)
      ),

    password: Yup.string()
      .required("Password is required")
      .test("Correct Password", "Incorrect Password", function (value: string) {
        const { email } = this.parent;
        return isPasswordCorrect(email, value);
      }),
  });

  const handleSubmit = async (values: UserValues) => {
    try {
      isSubmit(true);
      console.log(values);
      navigate("/Home");
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

export default Register;
