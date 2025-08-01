import React, { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { Outlet } from "react-router";
import Sidebar from "../../Components/Sidebar/Sidebar";
import MainLogo from "../../Shared/MainLogo";
import Spinner from "../../Shared/Spinner";

const DashboardLayout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  setTimeout(() => {
    setLoading(false);
  }, 300);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="flex h-screen bg-accent text-darkText gap-4">
      {/* Sidebar */}
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      {/* Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar for small device */}
        <header className="md:hidden flex items-center justify-between bg-white px-4 py-3 shadow">
          <MainLogo />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-2xl text-primary focus:outline-none"
          >
            {isOpen ? <FiX /> : <FiMenu />}
          </button>
        </header>

        {/* Main content */}
        <div className="bg-gray-50 overflow-y-auto h-full px-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
