import React from "react";
import { BarLoader, BeatLoader } from "react-spinners";

function Loader() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "60vh",
      }}
    >
      <BeatLoader color="#d49644" />
    </div>
  );
}

export default Loader;
