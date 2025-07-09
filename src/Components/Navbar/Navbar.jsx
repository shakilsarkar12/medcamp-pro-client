import React, { useState } from "react";
import { useNavigate } from "react-router";
import { FiMenu } from "react-icons/fi";
import MainLogo from "../../Shared/MainLogo";
import PrimaryButton from "../../Shared/PrimaryButton";
import SecondaryButton from "../../Shared/SecondaryButton";
import SideNavbar from "./SideNavbar";

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);

  return (
    <header className="bg-gray-100 py-3 sticky top-0 z-[10000] shadow-sm">
      <div className="mx-4 md:mx-8 lg:mx-14 2xl:max-w-10/12 2xl:mx-auto flex items-center justify-between">
        {/* Logo */}
        <MainLogo />

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          <a href="/">Home</a>
          <a href="/available-camps">Available Camps</a>
          <a href="/join-us">Join Us</a>
          <a href="/overview">Dashboard</a>
        </nav>

        {/* Desktop Auth Buttons */}
        {!user && (
          <div className="hidden lg:flex items-center gap-4">
            <PrimaryButton
              text="Log in"
              onClick={() =>
                setUser({ name: "shakil", email: "shakil@gmail.com" })
              }
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
