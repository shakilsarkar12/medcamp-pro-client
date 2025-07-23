import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { FiMenu } from "react-icons/fi";
import { FaChevronDown } from "react-icons/fa";
import MainLogo from "../../Shared/MainLogo";
import PrimaryButton from "../../Shared/PrimaryButton";
import SecondaryButton from "../../Shared/SecondaryButton";
import SideNavbar from "./SideNavbar";
import useAuth from "../../Utils/Hooks/useAuth";
import { toast } from "sonner";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, setUser, setLoading, logOutUser } = useAuth();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);

  const handleLogOut = () => {
    logOutUser()
      .then(() => {
        setUser(null);
        setLoading(false);
        toast.success("Your Account logout Success");
        localStorage.removeItem("access-token");
        setDropdownOpen(false);
        navigate("/");
      })
      .catch((err) => {
        alert("logout error", err);
      });
  };

  return (
    <header className="bg-gray-100 py-3 sticky top-0 z-[10000] shadow-sm">
      <div className="mx-4 md:mx-8 lg:mx-14 2xl:max-w-10/12 2xl:mx-auto flex items-center justify-between">
        {/* Logo */}
        <MainLogo />

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/available-camps">Available Camps</NavLink>
          {!user && <NavLink to="/join-us">Join Us</NavLink>}
          <NavLink to="/contact-us">Contact Us</NavLink>
          <NavLink to="/about-us">About Us</NavLink>
        </nav>

        {/* Desktop Auth/Profile */}
        {!user ? (
          <div className="hidden lg:flex items-center gap-4">
            <PrimaryButton onClick={() => navigate("/login")}>
              Log in
            </PrimaryButton>
            <SecondaryButton onClick={() => navigate("/register")}>
              Register
            </SecondaryButton>
          </div>
        ) : (
          <div className="hidden lg:flex items-center gap-4 relative">
            {/* Profile Picture with Dropdown */}
            <button
              className="flex items-center gap-2 focus:outline-none"
              onClick={() => setDropdownOpen((prev) => !prev)}
            >
              <img
                referrerPolicy="no-referrer"
                src={
                  user.photoURL ||
                  "https://i.ibb.co/ccZtvg4B/Portrait-Placeholder.png"
                }
                alt="profile"
                className="w-10 h-10 rounded-full object-cover border-2 border-blue-400"
              />
              <FaChevronDown className="text-gray-500" />
            </button>
            {/* Dropdown */}
            {dropdownOpen && (
              <div className="absolute right-0 top-12 bg-white shadow-lg rounded-lg min-w-[180px] py-2 z-50 border">
                <div className="px-4 py-2 text-gray-700 font-semibold border-b">
                  {user.displayName}
                </div>
                <button
                  className="w-full text-left px-4 py-2 hover:bg-blue-50 text-[#2D91EF] font-medium"
                  onClick={() => {
                    setDropdownOpen(false);
                    navigate("/overview");
                  }}
                >
                  Dashboard
                </button>
                <button
                  className="w-full text-left px-4 py-2 hover:bg-red-50 text-red-500 font-medium"
                  onClick={handleLogOut}
                >
                  Log Out
                </button>
              </div>
            )}
          </div>
        )}

        {/* Mobile Menu Icon */}
        <button onClick={toggleDrawer} className="lg:hidden">
          <FiMenu size={25} />
        </button>
      </div>

      {/* Small Device Drawer */}
      <SideNavbar
        isOpen={isDrawerOpen}
        onClose={toggleDrawer}
        user={user}
        onLogout={handleLogOut}
      />
    </header>
  );
};

export default Navbar;
