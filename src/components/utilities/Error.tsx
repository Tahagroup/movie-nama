import React from "react";
interface ErrorPropsType {
  error: Error;
}
function Error(props: ErrorPropsType) {
  return (
    <div className="error-container">
      <img src="./error.png" alt="Error!" className="error-pic" />
      <div className="error-message">{props.error.message}</div>
    </div>
  );
}

export default Error;

// function ErrorSnackbar() {
//   return (
//     <div className={`snackbar-container ${"props.isShown " ? "active" : ""}`}>
//       <div className="error-message">This is an error massage</div>
//     </div>
//   );
// }
