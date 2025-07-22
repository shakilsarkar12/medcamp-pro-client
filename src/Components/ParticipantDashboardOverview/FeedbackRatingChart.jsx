import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
} from "recharts";

const FeedbackRatingChart = ({ feedbacks }) => {
  // Count ratings from 1 to 5
  const ratingCount = [1, 2, 3, 4, 5].map((rating) => ({
    rating,
    count: feedbacks.filter((fb) => fb.rating === rating).length,
  }));

  const COLORS = ["#FF4C4C", "#FF914D", "#FFD93D", "#6FCF97", "#2D91EF"];

  return (
    <div className="bg-white rounded-xl shadow py-4 pl-2">
      <h2 className="text-xl font-semibold mb-4 text-[#2D91EF] px-4">
        Feedback Rating Distribution
      </h2>
      {feedbacks.length > 0 ? (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={ratingCount}
            margin={{ top: 20, right: 30, left: 0, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="rating"
              label={{ value: "Rating", position: "insideBottom", offset: -5 }}
            />
            <YAxis
              allowDecimals={false}
              label={{ value: "Count", angle: -90, position: "insideLeft" }}
            />
            <Tooltip />
            <Bar dataKey="count" radius={[4, 4, 0, 0]}>
              {ratingCount.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[entry.rating - 1]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <p className="text-sm text-gray-400">No feedback given yet.</p>
      )}
    </div>
  );
};

export default FeedbackRatingChart;
