import { Link } from "react-router-dom";
import { useEffect } from "react";
import Logo from "../components/logo";
import "../components/landing/index.scss";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Landing() {
  useEffect(() => {
    setTimeout(() => {
      window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
    }, 1000);
  });
  localStorage.removeItem("id");
  return (
    <>
      <div className="start">
        <h1>todo</h1>
      </div>
      <div className="landing container">
        <div className="row align-items-center">
          <div className="col">
            <Logo />

            <p className="px-lg-5">
              Join to capture ideas, organize life, and do something creative
              everyday.
            </p>

            <Link to={"register"}>
              <button>Get Started</button>
            </Link>
          </div>

          <img
            className="col d-none d-lg-block"
            src="https://d107mjio2rjf74.cloudfront.net/sites/res/home/common/header.png"
            alt=""
          />
        </div>
      </div>
    </>
  );
}
