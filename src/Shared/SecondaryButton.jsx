import React from "react";

const SecondaryButton = ({
  text = "secondary",
  px = "px-4",
  py = "py-2",
  onClick = () => {},
  className = "",
  uploading
}) => {
  return (
    <button
      onClick={onClick}
      disabled={uploading}
      className={`bg-[#2D91EF] text-white ${px} ${py} rounded-md ${className} cursor-pointer ${uploading? "":""} disabled:bg-gray-400 disabled:cursor-not-allowed`}
    >
      {text}
    </button>
  );
};

export default SecondaryButton;
