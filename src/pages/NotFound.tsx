import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="container text-center my-4">
      <div className="row align-items-center">
        <video
          className="col"
          playsInline
          muted
          loop
          autoPlay
          src="https://cdn.dribbble.com/users/992274/screenshots/16236452/media/4a7c40c66508b1cf3242bf404dcc113d.mp4"
          style={{ width: "60%", height: "auto" }}
        />
        <div className="col">
          <p style={{ fontSize: "3em", color: "#a8d2f8" }}>Page Not Found</p>
          <button
            style={{ padding: ".6rem 2rem" }}
            onClick={() => navigate(-1)}
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}
