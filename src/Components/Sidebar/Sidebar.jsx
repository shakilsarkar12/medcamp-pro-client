import {
  FiHome,
  FiUser,
  FiClipboard,
  FiLogOut,
  FiBarChart2,
  FiCreditCard,
  FiCalendar,
  FiList,
  FiUsers,
} from "react-icons/fi";
import SidebarLink from "../../Shared/SidebarLink";
import MainLogo from "../../Shared/MainLogo";
import { useNavigate } from "react-router";

const Sidebar = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // your logout logic here
    console.log("Logging out...");
    navigate("/"); // or login page
  };

    return (
    <aside
      className={`fixed z-40 inset-y-0 left-0 w-64 bg-gray-50 shadow-lg transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0 md:static md:shadow-none flex flex-col`}
    >
      {/* Logo */}
      <div className="p-4 border-b border-gray-200">
        <MainLogo />
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-4 py-6 space-y-3">
        <SidebarLink
          setIsOpen={setIsOpen}
          to="/overview"
          icon={FiHome}
          label="Overview"
        />
        <SidebarLink
          setIsOpen={setIsOpen}
          to="/analytics"
          icon={FiBarChart2}
          label="Analytics"
        />
        <SidebarLink
          setIsOpen={setIsOpen}
          to="/registered-camps"
          icon={FiClipboard}
          label="Registered Camps"
        />
        <SidebarLink
          setIsOpen={setIsOpen}
          to="/payment-history"
          icon={FiCreditCard}
          label="Payment History"
        />
        <SidebarLink
          setIsOpen={setIsOpen}
          to="/add-camp"
          icon={FiCalendar}
          label="Add A Camp"
        />
        <SidebarLink
          setIsOpen={setIsOpen}
          to="/manage-camps"
          icon={FiList}
          label="Manage Camps"
        />
        <SidebarLink
          setIsOpen={setIsOpen}
          to="/manage-registered"
          icon={FiUsers}
          label="Manage Registered Camps"
        />
      </nav>

      {/* Logout */}
      <div className="px-4 py-4 border-t border-gray-200">
        <SidebarLink
          setIsOpen={setIsOpen}
          to="/participant-profile"
          icon={FiUser}
          label="Participant Profile"
        />

        <SidebarLink
          setIsOpen={setIsOpen}
          to="/organizer-profile"
          icon={FiUser}
          label="Organizer Profile"
        />
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2 justify-center px-4 py-2 text-white rounded bg-red-600 transition mt-4"
        >
          <FiLogOut />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
