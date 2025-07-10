import React from "react";

const PrimaryButton = ({
  text = "primary",
  px = "px-4",
  py = "py-2",
  onClick = () => {},
  className = "",
  type = "button"
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`bg-[#01BF68] text-white ${px} ${py} rounded-md ${className} cursor-pointer`}
    >
      {text}
    </button>
  );
};

export default PrimaryButton;
