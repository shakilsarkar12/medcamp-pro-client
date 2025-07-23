import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";
import axiosSecure from "../../Utils/axiosSecure";
import Spinner from "../../Shared/Spinner";
import useAuth from "../../Utils/Hooks/useAuth";
import dayjs from "dayjs";
import HeadingTitle from "../../Shared/HeadingTitle";

const Analytics = () => {
  const { user } = useAuth();
  const [analyticsData, setAnalyticsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loading, setLoading] = useState(true);

  setTimeout(() => {
    setLoading(false);
  }, 200);

  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/participant-analytics?email=${user.email}`)
        .then((res) => {
          const formatted = res.data.map((item) => ({
            name: item.campName,
            fees: item.campFees,
            date: dayjs(item.registrationDate).format("MMM D, YYYY"),
          }));
          setAnalyticsData(formatted);
          setIsLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    }
  }, [user]);

  if (isLoading || loading) return <Spinner />;

  return (
    <div className="w-full max-w-4xl mx-auto mt-10 p-4 rounded-xl shadow-md bg-gradient-to-br from-blue-50 via-white to-teal-50">
      <HeadingTitle heading="Your Camp Registration Trend" />

      {analyticsData.length === 0 ? (
        <p className="text-center text-gray-500">No registrations found.</p>
      ) : (
        <ResponsiveContainer width="100%" height={370}>
          <LineChart
            data={analyticsData}
            margin={{ top: 20, right: 30, left: 0, bottom: 40 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="date"
              angle={-20}
              textAnchor="end"
              interval={0}
              height={70}
              tick={{ fontSize: 13, fill: "#0f766e", fontWeight: 500 }}
            />
            <YAxis
              tick={{ fontSize: 13, fill: "#0f766e", fontWeight: 500 }}
              allowDecimals={false}
            />
            <Tooltip
              contentStyle={{
                background: "#fff",
                borderRadius: 8,
              }}
              labelStyle={{ color: "#2D91EF", fontWeight: 600 }}
              formatter={(value) => [`$${value}`, "Fees"]}
            />
            <Legend
              iconType="circle"
              wrapperStyle={{ paddingTop: 10, fontSize: 14, color: "#0f766e" }}
            />
            <Line
              type="monotone"
              dataKey="fees"
              name="Camp Fees"
              stroke="#2D91EF"
              strokeWidth={3}
              activeDot={{ r: 8 }}
              dot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default Analytics;
