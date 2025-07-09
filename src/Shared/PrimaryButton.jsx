import React from "react";

const PrimaryButton = ({
  text = "primary",
  px = "px-4",
  py = "py-2",
  onClick = () => {},
  className = "",
}) => {
  return (
    <button
      onClick={onClick}
      className={`bg-[#01BF68] text-white ${px} ${py} rounded-md ${className}`}
    >
      {text}
    </button>
  );
};

export default PrimaryButton;
