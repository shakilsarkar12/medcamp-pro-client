import React, { useEffect } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import { Link, useNavigate } from "react-router";
import PrimaryButton from "../../Shared/PrimaryButton";

const Error = () => {
const navigate = useNavigate()
      useEffect(() => {
          document.title = "Page Not Found | project name";
      }, []);
  return (
    <div>
      <div className="">
        <Navbar />
        <div className="mx-4 md:mx-8 lg:mx-14 xl:mx-20 2xl:max-w-10/12  2xl:mx-auto min-h-[calc(100vh-128px)] flex-col items-center flex justify-center">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSl-BraBWVGZSIUOFvGUTJUuPQXTLeNEyWYEg&s"
            alt=""
          />
          <h1 className="w-fit mx-auto text-2xl md:text-3xl lg:text-5xl font-bold mb-6 text-center">
            404 - Page Not Found
          </h1>
          <p className="fw-fit md:w-11/12 lg:w-10/12 xl:w-9/12 mx-auto text-sm md:text-base lg:text-lg font-medium opacity-70 text-center mb-6">
            Opps! The page you'r looking for dosen't exist
          </p>
          <PrimaryButton onClick={() => navigate("/")} text="Back to Home" />
        </div>
      </div>
    </div>
  );
};

export default Error;
