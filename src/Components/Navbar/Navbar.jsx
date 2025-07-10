import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { FiMenu } from "react-icons/fi";
import MainLogo from "../../Shared/MainLogo";
import PrimaryButton from "../../Shared/PrimaryButton";
import SecondaryButton from "../../Shared/SecondaryButton";
import SideNavbar from "./SideNavbar";
import useAuth from "../../Utils/Hooks/useAuth";

const Navbar = () => {
  const navigate = useNavigate();
  const {user} = useAuth();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);

  return (
    <header className="bg-gray-100 py-3 sticky top-0 z-[10000] shadow-sm">
      <div className="mx-4 md:mx-8 lg:mx-14 2xl:max-w-10/12 2xl:mx-auto flex items-center justify-between">
        {/* Logo */}
        <MainLogo />

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/available-camps">Available Camps</NavLink>
          <NavLink to="/join-us">Join Us</NavLink>
          <NavLink to="/overview">Dashboard</NavLink>
        </nav>

        {/* Desktop Auth Buttons */}
        {!user && (
          <div className="hidden lg:flex items-center gap-4">
            <PrimaryButton
              text="Log in"
              onClick={() =>navigate("/login")}
            />
            <SecondaryButton
              text="Register"
              onClick={() => navigate("/register")}
            />
          </div>
        )}
        {user && (
          <div className="hidden lg:flex items-center gap-4">
            <PrimaryButton text="Log Out" onClick={() => setUser(null)} />
            <img
              className="w-10 h-10 rounded-full"
              src="https://i.ibb.co/ccZtvg4B/Portrait-Placeholder.png"
              alt="User"
            />
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
        onLogout={() => setUser(null)}
      />
    </header>
  );
};

export default Navbar;
