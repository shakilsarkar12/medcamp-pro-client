import React from 'react';
import Navbar from '../../Components/Navbar/Navbar';
import { Outlet } from 'react-router';

const RootLayout = () => {
    return (
      <div className="bg-[#E1E6ED]">
        <Navbar />
        <div className="min-h-[calc(90vh-64px)] mx-4 md:mx-8 lg:mx-14 xl:h-11/12 2xl:max-w-10/12  2xl:mx-auto">
          <Outlet />
        </div>
      </div>
    );
};

export default RootLayout;