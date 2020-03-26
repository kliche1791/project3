import React from "react";

function Jumbotron({ children }) {
  return (
    <div
      style={{
        height: 180,
        clear: "both",
        paddingTop: 70,
        color: "#1dc8cd",
        textAlign: "center"
      }}
      className="jumbotron"
    >
      {children}
    </div>
  );
}

export default Jumbotron;
