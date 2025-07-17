import React from 'react';
import Logo from "../assets/logo.png";
import { Link } from 'react-router';

const MainLogo = ({className}) => {
    return (
        <Link to="/" className={`flex items-center justify-center ${className}`}>
          <img className="w-10 h-10" src={Logo} alt="MedCamp" />
          <h2 className="text-xl md:text-2xl font-medium text-[#01BF68]">
            MedCamp <span className="text-[#2D91EF]">Pro</span>
          </h2>
        </Link>
    );
};

export default MainLogo;