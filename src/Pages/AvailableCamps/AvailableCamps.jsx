import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaList, FaTh } from "react-icons/fa";
import HeadingTitle from "../../Shared/HeadingTitle";
import CampCard from "../../Shared/CampCard";
import Spinner from "../../Shared/Spinner";

const AvailableCamps = () => {
  const [camps, setCamps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [gridCols, setGridCols] = useState(3);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/camps`).then((res) => {
      setCamps(res.data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <Spinner />;
  }

  const filteredCamps = camps
    .filter((camp) => {
      const term = searchTerm.toLowerCase();
      return (
        camp.campName.toLowerCase().includes(term) ||
        camp.location.toLowerCase().includes(term) ||
        camp.doctor.toLowerCase().includes(term)
      );
    })
    .sort((a, b) => {
      if (sortOption === "most-registered") {
        return b.participantCount - a.participantCount;
      } else if (sortOption === "fees") {
        return a.fees - b.fees;
      } else if (sortOption === "alphabetical") {
        return a.campName.localeCompare(b.campName);
      } else {
        return 0;
      }
    });

  return (
    <div className="max-w-7xl mx-auto py-8">
      <HeadingTitle heading="Available Camps" />
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        {/* Search */}
        <input
          type="text"
          placeholder="Search by camp name, location, or doctor"
          className="border border-[#2D91EF] rounded-md px-3 py-1.5 focus:outline-[#2D91EF] w-full placeholder:text-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* Sort & Layout */}
        <div className="flex gap-4 items-center">
          <select
            className="border border-[#2D91EF] rounded-md px-3 py-1.5 focus:outline-[#2D91EF] w-full placeholder:text-sm"
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="">Sort</option>
            <option value="most-registered">Most Registered</option>
            <option value="fees">Camp Fees</option>
            <option value="alphabetical">Camp Name (A-Z)</option>
          </select>

          <button
            className="p-2 border border-[#2D91EF] rounded"
            onClick={() => setGridCols(2)}
            title="Toggle Layout"
          >
            {gridCols === 3 ? (
              <FaList color="#2D91EF" />
            ) : (
              <FaTh color="#2D91EF" />
            )}
          </button>
        </div>
      </div>

      {/* Grid of Camps */}
      <div className={`grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4`}>
        {filteredCamps.map((camp) => (
          <CampCard key={camp._id} camp={camp} />
        ))}
      </div>
    </div>
  );
};

export default AvailableCamps;
