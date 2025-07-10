import React from "react";

const SecondaryButton = ({
  text = "secondary",
  px = "px-4",
  py = "py-2",
  onClick = () => {},
  className = "",
}) => {
  return (
    <button
      onClick={onClick}
      className={`bg-[#2D91EF] text-white ${px} ${py} rounded-md ${className} cursor-pointer`}
    >
      {text}
    </button>
  );
};

export default SecondaryButton;
