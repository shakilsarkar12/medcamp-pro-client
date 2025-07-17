import React from "react";
import { Link } from "react-router";
import {
  FaMapMarkerAlt,
  FaUser,
  FaMoneyBillAlt,
  FaCalendarAlt,
  FaClock,
  FaUserMd,
  FaCheckCircle,
} from "react-icons/fa";
import SecondaryButton from "./SecondaryButton";
import PrimaryButton from "./PrimaryButton";
import { BsArrowUpRight } from "react-icons/bs";

const CampCard = ({ camp }) => {
  const {
    _id,
    campName,
    image,
    scheduledDate,
    scheduledTime,
    venueLocation,
    targetAudience,
    description,
    professionalsAttendanceCount,
    participantCount,
  } = camp;

  return (
    <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden flex flex-col">
      <img
        className="lg:h-60 md:h-36 w-full object-cover object-center"
        src={image}
        alt={campName}
      />
      <div className="flex-1 p-3 flex flex-col justify-between">
        <h2 className="flex items-center tracking-widest text-sm font-medium text-gray-400 mb-1">
          <FaMapMarkerAlt className="mr-2" />
          {venueLocation}
        </h2>
        <h1 className="font-medium text-gray-900 mb-3">{campName}</h1>
        <p className="text-sm leading-relaxed mb-3">
          {description.length > 100
            ? description.slice(0, 100) + "...."
            : description}
        </p>

        <div className="flex justify-between items-center py-2">
          <div>
            <FaCheckCircle className="mr-2 inline" />
            <span className="text-gray-400 text-sm">{targetAudience}</span>
          </div>
          <div className="text-gray-400 inline-flex items-center text-sm">
            <FaUserMd className="mr-2" /> {professionalsAttendanceCount}
          </div>
        </div>

        <div className="flex items-center flex-wrap gap-4 text-xs text-gray-500 pt-3">
          <div className="flex items-center gap-1">
            <FaCalendarAlt /> <span>{scheduledDate}</span>
          </div>
          <div className="flex items-center gap-1">
            <FaClock /> <span>{scheduledTime}</span>
          </div>
          <div className="flex items-center gap-1">
            <FaUser /> <span>{participantCount}</span>
          </div>
        </div>

        <div className="flex justify-between items-center pt-5">
          <PrimaryButton
            to={`/camp-details/${_id}`}
            className="inline-flex items-center text-sm sm:text-base"
          >
            Details
            <BsArrowUpRight
              className="ml-2"/>

</PrimaryButton>
          <SecondaryButton className="text-sm sm:text-base">
            Join Camp
          </SecondaryButton>
        </div>
      </div>
    </div>
  );
};

export default CampCard;
