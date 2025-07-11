import React from "react";
import { Outlet } from "react-router";
import Navbar from "../../Components/Navbar/Navbar";
import regImg from "../../assets/register2.svg";

const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="max-w-11/12 mx-auto mt-8 py-8">
        <div className="bg-white shadow rounded flex flex-col-reverse md:flex-row items-center justify-center md:justify-around gap-8 p-4 py-10 md:p-10">
          <div className="w-full md:w-1/2">
            <Outlet />
          </div>

          {/* Image */}
          <div className="w-full md:w-1/2 hidden md:flex justify-center">
            <img
              className="max-w-xs md:max-w-sm lg:max-w-md w-full"
              src={regImg}
              alt="Registration"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
