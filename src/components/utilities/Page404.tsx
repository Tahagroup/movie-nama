import React from "react";
import { useNavigate } from "react-router";

function Page404() {
  const navigate = useNavigate();
  return (
    <div className="page-404">
      <img className="404-img" src="../404.png" alt="404" />
      <div className="404-text">
        The requested URL was not found on this server
      </div>
      <button
        onClick={() => {
          navigate("/");
        }}
      >
        Go to Home Page
      </button>
    </div>
  );
}

export default Page404;
