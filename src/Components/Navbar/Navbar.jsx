import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { FiMenu } from "react-icons/fi";
import MainLogo from "../../Shared/MainLogo";
import PrimaryButton from "../../Shared/PrimaryButton";
import SecondaryButton from "../../Shared/SecondaryButton";
import SideNavbar from "./SideNavbar";
import useAuth from "../../Utils/Hooks/useAuth";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, setUser, setLoading, logOutUser } = useAuth();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);

  const handleLogOut = () => {
    logOutUser()
      .then(() => {
        setUser(null);
        setLoading(false);
        alert("Your Account logout Success");
        localStorage.removeItem("access-token");
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
          <NavLink to="/join-us">Join Us</NavLink>
          <NavLink to="/overview">Dashboard</NavLink>
        </nav>

        {/* Desktop Auth Buttons */}
        {!user && (
          <div className="hidden lg:flex items-center gap-4">
            <PrimaryButton onClick={() => navigate("/login")}>
              Log in
            </PrimaryButton>
            <SecondaryButton onClick={() => navigate("/register")}>
              Register
            </SecondaryButton>
          </div>
        )}
        {user && (
          <div className="hidden lg:flex items-center gap-4">
            <PrimaryButton onClick={() => handleLogOut()}>
              Log Out
            </PrimaryButton>
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
        onLogout={() => handleLogOut()}
      />
    </header>
  );
};

export default Navbar;
