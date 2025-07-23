import React, { useContext, useState } from "react";
import { FaUserMd, FaUsers, FaClock, FaMoneyBillWave } from "react-icons/fa";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  LabelList,
} from "recharts";
import { AuthContext } from "../../Context/AuthContext/AuthContext";
import axiosSecure from "../../Utils/axiosSecure";
import StatCard from "../../Shared/StatCard";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../../Shared/Spinner";

const OrganizerDashboardOverview = () => {
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["organizerOverview", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/dashboard/organizer-overview?email=${user.email}`
      );
      return res.data;
    },
    staleTime: 1000 * 60 * 2,
  });

  setTimeout(() => {
    setLoading(false);
  }, 200);

  const stats = {
    totalOrganizedCamps: data?.totalOrganizedCamps ?? 0,
    upcomingCamps: data?.upcomingCamps ?? 0,
    totalParticipants: data?.totalParticipants ?? 0,
    totalRevenue: data?.totalRevenue ?? 0,
  };
  const topCamps = data?.topCamps ?? [];

  if (isLoading || loading) {
    return <Spinner />;
  }
  if (isError) {
    return (
      <div className="py-16 text-center text-red-500 font-bold text-xl">
        Error: {error?.message}
      </div>
    );
  }

  return (
    <div className="text-gray-900 py-10">
      <h2 className="text-2xl font-bold text-[#2D91EF] mb-6">
        Welcome back, {user?.displayName || "Organizer"}{" "}
        <span role="img" aria-label="doctor">
          👨‍⚕️
        </span>
      </h2>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          title="Organized Camps"
          value={stats.totalOrganizedCamps}
          icon={<FaUserMd />}
        />
        <StatCard
          title="Upcoming Camps"
          value={stats.upcomingCamps}
          icon={<FaClock />}
        />
        <StatCard
          title="Participants"
          value={stats.totalParticipants}
          icon={<FaUsers />}
        />
        <StatCard
          title="Total Revenue"
          value={`$${stats.totalRevenue}`}
          icon={<FaMoneyBillWave />}
        />
      </div>

      {/* Chart for Top Camps */}
      <div className="bg-gradient-to-br from-blue-50 via-white to-teal-50 border border-blue-100 shadow rounded-lg">
        <h3 className="text-lg font-semibold text-[#2D91EF] mb-4 flex items-center gap-2 p-4">
          <FaUserMd className="text-[#2D91EF]" /> Top Performing Camps
        </h3>
        <div className="w-full h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={topCamps}
              margin={{ top: 20, right: 30, left: 0, bottom: 40 }}
              barCategoryGap={20}
            >
              {/* Remove XAxis label and ticks */}
              <XAxis
                dataKey="campName"
                stroke="#2D91EF"
                tick={false}
                axisLine={true}
                height={20}
              />
              <YAxis
                stroke="#2D91EF"
                tick={{ fontSize: 13, fill: "#0f766e", fontWeight: 500 }}
                allowDecimals={false}
              />
              <Tooltip
                contentStyle={{
                  background: "#fff",
                  borderRadius: 8,
                  border: "1px solid #2D91EF",
                }}
                labelStyle={{ color: "#2D91EF", fontWeight: 600 }}
                formatter={(value, name) =>
                  name === "Revenue ($)"
                    ? [`$${value}`, "Revenue"]
                    : [value, name]
                }
                // Show campName in tooltip only
                labelFormatter={(label, payload) =>
                  payload && payload.length > 0
                    ? payload[0].payload.campName
                    : ""
                }
              />
              <Legend
                iconType="circle"
                wrapperStyle={{ paddingTop: 10, fontSize: 14, color: "#0f766e" }}
              />
              <Bar
                dataKey="participantCount"
                fill="#2D91EF"
                radius={[8, 8, 0, 0]}
                name="Participants"
              >
                <LabelList
                  dataKey="participantCount"
                  position="top"
                  fill="#2D91EF"
                  fontSize={13}
                />
              </Bar>
              <Bar
                dataKey="revenue"
                fill="#34D399"
                name="Revenue ($)"
                radius={[8, 8, 0, 0]}
              >
                <LabelList
                  dataKey="revenue"
                  position="top"
                  fill="#34D399"
                  fontSize={13}
                  formatter={(v) => `$${v}`}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mt-8">
        <h4 className="font-semibold text-lg mb-2 text-[#2D91EF] flex items-center gap-2">
          <span className="inline-block w-2 h-2 bg-[#2D91EF] rounded-full"></span>
          Recent Activity
        </h4>
        <div className="bg-white rounded shadow p-4">
          {data?.recentActivity?.length ? (
            <ul className="divide-y divide-blue-50">
              {data.recentActivity.map((item, idx) => (
                <li
                  key={idx}
                  className="py-3 flex items-center gap-3 text-gray-700"
                >
                  <span className="inline-block w-2 h-2 bg-teal-400 rounded-full"></span>
                  <span className="font-medium">{item}</span>
                  <span className="ml-auto text-xs text-gray-400">
                    {/* If you have a date, show it here */}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-gray-400 py-6 text-center">
              <span className="inline-block w-2 h-2 bg-gray-300 rounded-full mr-2"></span>
              No recent activity.
            </div>
          )}
        </div>
      </div>

      {/* Top Participants Table */}
      <div className="mt-8">
        <h4 className="font-semibold text-lg mb-2 text-[#2D91EF]">
          Top Participants
        </h4>
        <div className="overflow-x-auto rounded-lg shadow-md bg-white">
          <table className="min-w-4xl w-full text-sm rounded-lg overflow-hidden">
            <thead className="bg-gradient-to-r from-blue-100 to-blue-200 text-[#2D91EF]">
              <tr>
                <th className="py-3 px-4 text-left font-semibold">#</th>
                <th className="py-3 px-4 text-left font-semibold">
                  Participant Name
                </th>
                <th className="py-3 px-4 text-left font-semibold">Email</th>
                <th className="py-3 px-4 text-center font-semibold">
                  Camps Joined
                </th>
              </tr>
            </thead>
            <tbody>
              {data?.topParticipants?.length ? (
                data.topParticipants.map((participant, idx) => (
                  <tr
                    key={participant.email}
                    className="border-b border-gray-200 last:border-b-0 hover:bg-blue-50 transition-colors group"
                  >
                    <td className="py-3 px-4">{idx + 1}</td>
                    <td className="py-3 px-4 font-medium text-gray-800 group-hover:text-blue-700 transition-colors">
                      {participant.name}
                    </td>
                    <td className="py-3 px-4">{participant.email}</td>
                    <td className="py-3 px-4 text-center font-bold text-[#2D91EF]">
                      {participant.campsJoined}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={4}
                    className="text-center py-8 text-gray-400 font-semibold"
                  >
                    No top participants found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrganizerDashboardOverview;
