import React from "react";
import { Link } from "react-router";
import {
  FaMapMarkerAlt,
  FaUser,
  FaCalendarAlt,
  FaClock,
  FaUserMd,
} from "react-icons/fa";
import SecondaryButton from "./SecondaryButton";
import PrimaryButton from "./PrimaryButton";
import { BsArrowUpRight } from "react-icons/bs";
import { BiDollar } from "react-icons/bi";

const CampCard = ({ camp }) => {
  const {
    _id,
    campName,
    image,
    scheduledDate,
    scheduledTime,
    location,
    description,
    professionalsAttendanceCount,
    participantCount,
    fees,
  } = camp;

  return (
    <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden flex flex-col">
      <div className="lg:h-60 md:h-36 h-48">
        <img
          className="h-full w-full object-cover"
          src={image}
          alt={campName}
        />
      </div>
      <div className="flex-1 flex flex-col justify-between p-4 space-y-2">
        <h2 className="flex items-center tracking-widest text-sm font-medium text-gray-400">
          <FaMapMarkerAlt className="mr-2" />
          {location}
        </h2>
        <h1 className="font-medium text-gray-900">{campName}</h1>
        <p className="text-sm leading-relaxed">
          {description.length > 100
            ? description.slice(0, 100) + "...."
            : description}
        </p>

        <div className="flex items-center flex-wrap gap-4 text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <FaCalendarAlt /> <span>{scheduledDate}</span>
          </div>
          <div className="flex items-center gap-1">
            <FaClock /> <span>{scheduledTime}</span>
          </div>
          <div className="flex items-center gap-1">
            <FaUser /> <span>{participantCount}</span>
          </div>
          <div className="text-gray-400 inline-flex items-center text-sm">
            <FaUserMd className="mr-2" /> {professionalsAttendanceCount}
          </div>
          <div className="text-gray-400 inline-flex items-center text-sm">
            <BiDollar className="mr-2" /> {fees}
          </div>
        </div>

        <div className="flex justify-end items-center">
          <PrimaryButton
            to={`/camp-details/${_id}`}
            className="inline-flex items-center text-sm sm:text-base"
          >
            Details
            <BsArrowUpRight className="ml-2" />
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
};

export default CampCard;
