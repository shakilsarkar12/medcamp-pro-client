import React from "react";
import { Outlet } from "react-router";
import Navbar from "../../Components/Navbar/Navbar";
import regImg from "../../assets/register2.svg";

const AuthLayout = () => {
  return (
    <div className="">
      <Navbar />
      <div className="mx-4 md:mx-8 lg:mx-14 xl:h-11/12 2xl:max-w-10/12  2xl:mx-auto w-full mt-10 bg-gray-50 shadow rounded flex items-center justify-around py-16">
        <Outlet />
        <div>
          <img className="w-md" src={regImg} alt="" />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
