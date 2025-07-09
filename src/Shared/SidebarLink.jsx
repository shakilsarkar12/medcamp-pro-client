import React from "react";
import { NavLink } from "react-router";

const SidebarLink = ({ to, icon: Icon, label, setIsOpen }) => {
  return (
    <NavLink
      onClick={() => setIsOpen(false)}
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-2 rounded-md transition 
        ${
          isActive
            ? "bg-[#2D91EF] text-white"
            : "text-gray-700 hover:bg-primary/10 hover:text-primary"
        }`
      }
    >
      <Icon className="text-xl" />
      <span className="text-sm font-medium">{label}</span>
    </NavLink>
  );
};

export default SidebarLink;
