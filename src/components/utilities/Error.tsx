import React from "react";
import "./Error.css";
interface ErrorPropsType {
  isShown: boolean;
}
function Error(props: ErrorPropsType) {
  return <div className="error-pic">Error pic should be here</div>;
}

export default Error;

function ErrorSnackbar() {
  return (
    <div className={`snackbar-container ${"props.isShown " ? "active" : ""}`}>
      <div className="error-message">This is an error massage</div>
    </div>
  );
}
