import React from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { FiX, FiLogOut } from "react-icons/fi";
import MainLogo from "../../Shared/MainLogo";
import useAuth from "../../Utils/Hooks/useAuth";
import PrimaryButton from "../../Shared/PrimaryButton";
import SecondaryButton from "../../Shared/SecondaryButton";

const SideNavbar = ({ isOpen, onClose, onLogout }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/20 z-[9998] transition-opacity duration-300 ${
          isOpen
            ? "opacity-100 visible lg:opacity-0 lg:invisible"
            : "opacity-0 invisible"
        }`}
        onClick={onClose}
      ></div>

      {/* Sidebar Drawer */}
      <aside
        className={`fixed top-0 left-0 w-64 md:w-[280px] h-full bg-white z-[9999] shadow-md transform transition-transform duration-300 ease-in-out lg:-translate-x-full ${
          isOpen ? "translate-x-0 lg:-translate-x-full" : "-translate-x-full"
        } flex flex-col justify-between`}
      >
        {/* Top: Logo + Close */}
        <div>
          <div className="p-4 flex items-center justify-between border-b border-gray-300">
            <MainLogo />
            <button onClick={onClose}>
              <FiX className="text-2xl" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-4 p-4">
            <NavLink to="/" onClick={onClose} className="hover:text-primary">
              Home
            </NavLink>
            <NavLink
              to="/available-camps"
              onClick={onClose}
              className="hover:text-primary"
            >
              Available Camps
            </NavLink>
            <NavLink
              to="/join-us"
              onClick={onClose}
              className="hover:text-primary"
            >
              Join Us
            </NavLink>
            <NavLink
              to="/overview"
              onClick={onClose}
              className="hover:text-primary"
            >
              Dashboard
            </NavLink>
          </nav>
        </div>

        {/* Bottom: User Info + Logout */}
        <div className="p-4 border-t border-gray-200">
          {user && (
            <>
              <div className="flex items-center gap-3 mb-3">
                <Link to="/participant-profile">
                  <img
                    referrerPolicy="no-referrer"
                    src={
                      user.photoURL ||
                      "https://i.ibb.co/ccZtvg4B/Portrait-Placeholder.png"
                    }
                    alt="profile"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </Link>
                <div>
                  <Link to="/participant-profile" className="font-semibold">
                    {user.displayName || "User Name"}
                  </Link>
                </div>
              </div>
              <button
                onClick={() => {
                  onLogout();
                  onClose();
                }}
                className="w-full flex items-center gap-2 justify-center px-4 py-2 text-white rounded bg-red-600 transition"
              >
                <FiLogOut />
                Logout
              </button>
            </>
          )}
          {!user && (
            <div className="flex flex-col items-center gap-4">
              <PrimaryButton
                className="w-full"
                text="Log in"
                onClick={() => navigate("/login")}
              />
              <SecondaryButton
                className="w-full"
                text="Register"
                onClick={() => navigate("/register")}
              />
            </div>
          )}
        </div>
      </aside>
    </>
  );
};

export default SideNavbar;
