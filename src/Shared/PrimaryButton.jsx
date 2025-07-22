import React from "react";
import { Link } from "react-router";

const PrimaryButton = ({
  px = "px-3",
  py = "py-1.5",
  onClick = () => {},
  to,
  className = "",
  type = "button",
  children,
}) => {
  if (!to) {
    return (
      <button
        onClick={onClick}
        type={type}
        className={`bg-[#01BF68] text-white ${px} ${py} rounded-md ${className} cursor-pointer`}
      >
        {children ? children : "Primary"}
      </button>
    );
  }
  return (
    <Link
      to={to}
      onClick={onClick}
      type={type}
      className={`bg-[#01BF68] text-white ${px} ${py} rounded-md ${className} cursor-pointer`}
    >
      {children ? children : "Primary"}
    </Link>
  );
};

export default PrimaryButton;
