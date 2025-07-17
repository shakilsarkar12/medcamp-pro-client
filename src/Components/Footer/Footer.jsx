import { Link } from "react-router";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import MainLogo from "../../Shared/MainLogo";

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-16 mt-16">
      <div className="max-w-10/12 mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo + About */}
        <div>
          <MainLogo className="justify-start mb-4"/>
          <p className="text-sm">
            Empowering communities through accessible healthcare. We organize
            impactful medical camps for those in need.
          </p>
        </div>

        {/* Quick Links */}
        <div className="self-center">
          <h3 className="font-semibold text-lg mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:underline">
                Home
              </Link>
            </li>
            <li>
              <Link to="/available-camps" className="hover:underline">
                Available Camps
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:underline">
                Contact
              </Link>
            </li>
            <li>
              <Link to="/overview" className="hover:underline">
                Dashboard
              </Link>
            </li>
          </ul>
        </div>

        {/* Services */}
        <div className="justify-center">
          <h3 className="font-semibold text-lg mb-3">Services</h3>
          <ul className="space-y-2 text-sm">
            <li>Health Checkups</li>
            <li>Specialist Consultations</li>
            <li>Mental Health Support</li>
            <li>Community Awareness</li>
          </ul>
        </div>

        {/* Social + Contact */}
        <div>
          <h3 className="font-semibold text-lg mb-3">Connect With Us</h3>
          <div className="flex space-x-4 text-xl mb-4">
            <a href="#" className="hover:text-gray-300">
              <FaFacebook />
            </a>
            <a href="#" className="hover:text-gray-300">
              <FaTwitter />
            </a>
            <a href="#" className="hover:text-gray-300">
              <FaInstagram />
            </a>
            <a href="#" className="hover:text-gray-300">
              <FaLinkedin />
            </a>
          </div>
          <p className="text-sm">Email: support@medcamp-pro.com</p>
          <p className="text-sm">Phone: +880 1234-567890</p>
        </div>
      </div>

      <div className="text-center text-sm mt-8 border-t border-white/30 pt-4">
        © {new Date().getFullYear()} MedCamp Pro. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
