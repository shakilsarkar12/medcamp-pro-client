import React from 'react';

const StatCard = ({ title, value, icon }) => (
  <div className="bg-white border border-white/20 shadow p-5 rounded-lg flex items-center gap-4">
    <div className="text-3xl text-[#2D91EF]">{icon}</div>
    <div>
      <p className="text-xl font-semibold text-[#2D91EF]">{title}</p>
      <p className="text-xl font-bold text-gray-700">{value || 0}</p>
    </div>
  </div>
);

export default StatCard;
