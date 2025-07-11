import React from "react";

const Divider = ({ children }) => {
  return (
    <div className="my-4 text-center flex items-center justify-center gap-1">
      <span className="w-full h-0.5 bg-gray-200"></span>
      <span className="w-fit text-gray-400">{children}</span>
      <span className="w-full h-0.5 bg-gray-200"></span>
    </div>
  );
};

export default Divider;
