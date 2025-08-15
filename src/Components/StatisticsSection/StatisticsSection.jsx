import React from 'react';

const StatisticsSection = () => {
  const stats = [
    { label: "Total Camps", value: 120 },
    { label: "Participants", value: 3500 },
    { label: "Doctors", value: 150 },
    { label: "Cities Covered", value: 25 },
  ];

  return (
    <section className="py-12">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-gray-50 p-12 rounded-md shadow">
            <p className="text-3xl font-bold text-primary">{stat.value}+</p>
            <p className="text-gray-600">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StatisticsSection;