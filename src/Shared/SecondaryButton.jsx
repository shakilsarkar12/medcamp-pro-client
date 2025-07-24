import React from "react";
import { Link } from "react-router";

const SecondaryButton = ({
  px = "px-4",
  py = "py-2",
  onClick = () => {},
  className = "",
  uploading,
  type = "button",
  children,
  disabled = false,
  to,
}) => {
  
  if (to) {
    return (
      <Link
        to={to}
        disabled={disabled}
        type={type}
        onClick={onClick}
        className={`bg-[#2D91EF] text-white ${px} ${py} rounded-md ${className} cursor-pointer disabled:cursor-not-allowed ${
          uploading ? "" : ""
        } disabled:bg-gray-400 disabled:cursor-not-allowed`}
      >
        {children ? children : "Secondary"}
      </Link>
    );
  }

  return (
    <button
      disabled={disabled}
      type={type}
      onClick={onClick}
      className={`bg-[#2D91EF] text-white ${px} ${py} rounded-md ${className} cursor-pointer disabled:cursor-not-allowed ${
        uploading ? "" : ""
      } disabled:bg-gray-400 disabled:cursor-not-allowed`}
    >
      {children ? children : "Secondary"}
    </button>
  );
};

export default SecondaryButton;
