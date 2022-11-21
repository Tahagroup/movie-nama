import React from "react";
interface ErrorPropsType {
  error: Error;
}
function Error(props: ErrorPropsType) {
  const errMessage =
    props.error.message === "Failed to fetch" ? (
      <div>
        <div>There seems to be a problem with your internet connection.</div>
        <button
          className="again-btn"
          onClick={() => {
            document.location.reload();
          }}
        >
          Try Again
        </button>
      </div>
    ) : (
      props.error.message
    );
  return (
    <div className="error-container">
      <img src="./error.png" alt="Error!" className="error-pic" />
      <div className="error-message">{errMessage}</div>
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
