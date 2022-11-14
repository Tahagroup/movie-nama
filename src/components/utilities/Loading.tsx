import React from "react";

function Loading() {
  const flexWrapper = {
    display: "flex",
    marginTop: "170px",
    marginLeft: "auto",
    marginRight: "auto",
    height: "100px",
    width: "100px",
  };
  return (
    <div style={flexWrapper}>
      <img src="./loading.gif" alt="loading" />
    </div>
  );
}

export default Loading;
