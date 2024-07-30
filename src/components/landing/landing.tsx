import { Link } from "react-router-dom";
import "./index.scss";
import { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Landing() {
  useEffect(() => {
    setTimeout(() => {
      window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
    }, 1000);
  });
  return (
    <>
      <div className="start">
        <h1>todo</h1>
      </div>
      <div className="landing container">
        <div className="row">
          <div className="col">
            <h2>
              <span style={{ color: "#a8d2f8" }}>t</span>
              <span style={{ color: "#ff49b4" }}>o</span>
              <span style={{ color: "#80be75" }}>d</span>
              <span style={{ color: "#b4aef6" }}>o</span>
            </h2>

            <p>
              Join to capture ideas, organize life, and do something creative
              everyday.
            </p>

            <Link to={"register"}>
              <button>Get Started</button>
            </Link>
          </div>

          <img
            className="col d-none d-md-block"
            src="https://d107mjio2rjf74.cloudfront.net/sites/res/home/common/header.png"
            alt=""
          />
        </div>
      </div>
    </>
  );
}
