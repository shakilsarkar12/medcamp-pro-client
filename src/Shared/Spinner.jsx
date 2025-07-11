import React from "react";
import { BarLoader } from "react-spinners";

const Spinner = () => {
  return (
    <div className="h-screen flex items-center justify-center">
      <BarLoader
        color="#2D91EF"
        cssOverride={{}}
        height={4}
        loading
        speedMultiplier={2}
        width={100}
      />
    </div>
  );
};

export default Spinner;
