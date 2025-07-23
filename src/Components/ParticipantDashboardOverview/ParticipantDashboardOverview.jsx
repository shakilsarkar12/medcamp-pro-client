import React, { useContext } from "react";
import {
  FaCalendarCheck,
  FaMoneyCheckAlt,
  FaCommentDots,
  FaClock,
  FaCalendarAlt,
} from "react-icons/fa";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../Context/AuthContext/AuthContext";
import axiosSecure from "../../Utils/axiosSecure";
import StatCard from "../../Shared/StatCard";
import FeedbackRatingChart from "./FeedbackRatingChart";
import Spinner from "../../Shared/Spinner";

const ParticipantDashboardOverview = () => {
  const { user } = useContext(AuthContext);

  // Fetching with React Query
  const { data, isLoading } = useQuery({
    queryKey: ["participantStats", user?.email],
    queryFn: async () => {
      const res = await axiosSecure(
        `/dashboard/participant-overview?email=${user.email}`
      );
      return res.data;
    },
    enabled: !!user?.email,
  });

  if (isLoading) {
    return <Spinner/>;
  }

  const {
    totalRegisterCamps = 0,
    payments = [],
    feedbacks = [],
    upcomingCamps = [],
  } = data || {};

  return (
    <div className="text-white mt-8">
      {/* Welcome */}
      <h2 className="text-2xl font-semibold text-[#2D91EF] mb-4">
        Welcome back, {user?.displayName || "Participant"} 👋
      </h2>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          title="Registered Camps"
          value={totalRegisterCamps}
          icon={<FaCalendarCheck />}
        />
        <StatCard
          title="Payments Made"
          value={payments.length}
          icon={<FaMoneyCheckAlt />}
        />
        <StatCard
          title="Feedback Given"
          value={feedbacks.length}
          icon={<FaCommentDots />}
        />
        <StatCard
          title="Upcoming Camps"
          value={upcomingCamps.length}
          icon={<FaClock />}
        />
      </div>

      {/* Recently Registered Camps Section */}
      <div className="bg-white/10 backdrop-blur-md border border-white/20 shadow rounded-lg mb-6">
        <h3 className="text-xl font-semibold text-[#2D91EF] mb-5 flex items-center p-4 gap-2">
          <FaCalendarAlt className="text-[#2D91EF]" />
          Recently Registered Camps
        </h3>

        {upcomingCamps.length === 0 ? (
          <p className="text-sm text-gray-400 p-3">
            No camps registered recently.
          </p>
        ) : (
          <ul className="space-y-4">
            {upcomingCamps.map((camp) => (
              <li
                key={camp._id}
                className="flex items-center justify-between hover:bg-black/10 transition-all p-4 rounded-md border border-white/10"
              >
                <div>
                  <h4 className="text-sm sm:text-md font-medium text-gray-500">
                    {camp?.campName}
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-400">
                    Scheduled on: {camp?.scheduledDate}
                    {console.log(camp.scheduledDate)}
                  </p>
                </div>
                <div className="text-xs bg-[#2D91EF]/20 text-[#2D91EF] px-3 py-1 rounded-full font-semibold">
                  Upcoming
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Feedback Rating Chart */}

      <FeedbackRatingChart feedbacks={feedbacks} />
    </div>
  );
};

export default ParticipantDashboardOverview;
