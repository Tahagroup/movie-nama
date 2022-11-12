import React from "react";

function Loading() {
  const flexWrapper = {
    marginTop: "200px",
  };
  return (
    <div style={flexWrapper}>
      <img src="./loading.gif" alt="loading" />
    </div>
  );
}

export default Loading;
