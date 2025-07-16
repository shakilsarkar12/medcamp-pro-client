import React from "react";

const SecondaryButton = ({
  px = "px-4",
  py = "py-2",
  onClick = () => {},
  className = "",
  uploading,
  type = "button",
  children,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={uploading}
      className={`bg-[#2D91EF] text-white ${px} ${py} rounded-md ${className} cursor-pointer ${
        uploading ? "" : ""
      } disabled:bg-gray-400 disabled:cursor-not-allowed`}
    >
      {children ? children : "Secondary"}
    </button>
  );
};

export default SecondaryButton;
