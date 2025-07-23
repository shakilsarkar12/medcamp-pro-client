import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FaList, FaTh, FaSearch, FaFilter, FaTimes } from "react-icons/fa";
import { Listbox } from "@headlessui/react";
import HeadingTitle from "../../Shared/HeadingTitle";
import CampCard from "../../Shared/CampCard";
import Spinner from "../../Shared/Spinner";
import Pagination from "../../Shared/Pagination";
import { FiX } from "react-icons/fi";

const itemsPerPage = 12;

const fetchCamps = async ({ queryKey }) => {
  const [_key, { page, limit, search, sort, date }] = queryKey;
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/camps`, {
    params: { page, limit, search, sort, date },
  });
  return res.data;
};

const sortOptions = [
  { value: "", label: "Sort" },
  { value: "most-registered", label: "Most Registered" },
  { value: "fees-low-high", label: "Camp Fees (Low to High)" },
  { value: "fees-high-low", label: "Camp Fees (High to Low)" },
  { value: "alphabetical", label: "Camp Name (A-Z)" },
];

const AvailableCamps = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [gridCols, setGridCols] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [dateFilter, setDateFilter] = useState("");
  const [filterModal, setFilterModal] = useState(false);
  const [modalAnimation, setModalAnimation] = useState("animate-slideUp");

  const { data, isLoading } = useQuery({
    queryKey: [
      "camps",
      {
        page: currentPage,
        limit: itemsPerPage,
        search: searchTerm,
        sort: sortOption,
        date: dateFilter,
      },
    ],
    keepPreviousData: true,
    staleTime: 1000 * 60 * 2,
    queryFn: fetchCamps,
  });

  const camps = data?.camps || [];
  const totalPages = data?.totalPages || 1;

  // Clear all filters
  const handleClearFilters = () => {
    setSearchTerm("");
    setSortOption("");
    setDateFilter("");
    setCurrentPage(1);
  };

  const handleModalClose = () => {
    setModalAnimation("animate-slideDown");
    setTimeout(() => {
      setFilterModal(false);
      setModalAnimation("animate-slideUp");
    }, 300);
  };

  let touchStartY = null;
  const handleTouchStart = (e) => {
    touchStartY = e.touches[0].clientY;
  };
  const handleTouchMove = (e) => {
    if (!touchStartY) return;
    const touchEndY = e.touches[0].clientY;
    if (touchEndY - touchStartY > 80) {
      handleModalClose();
      touchStartY = null;
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-8">
      <HeadingTitle heading="Available Camps" />

      {/* Mobile Filter Button */}
      <div className="sm:hidden flex justify-end mb-4">
        <button
          className="flex items-center gap-2 px-4 py-2 rounded bg-[#2D91EF] text-white text-sm font-medium"
          onClick={() => setFilterModal(true)}
        >
          <FaFilter /> Filters
        </button>
      </div>

      {/* Desktop Filters */}
      <div className="hidden sm:flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        {/* Search & Date */}
        <div className="flex gap-2 w-full">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search by camp name, location, or doctor"
              className="border border-[#2D91EF] rounded-md px-3 py-1.5 focus:outline-[#2D91EF] w-full placeholder:text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaSearch className="absolute right-3 top-3 text-[#2D91EF]" />
          </div>
          <input
            type="date"
            className="border border-[#2D91EF] rounded-md px-3 py-1.5 focus:outline-[#2D91EF]"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            title="Filter by Date"
          />
        </div>

        {/* Sort & Layout */}
        <div className="flex gap-4 items-center">
          <div className="relative w-full md:w-60">
            <Listbox value={sortOption} onChange={setSortOption}>
              <Listbox.Button className="w-full border border-[#2D91EF] rounded-md h-[38px] px-4 bg-white shadow focus:outline-[#2D91EF] flex items-center justify-between cursor-pointer">
                {sortOptions.find((opt) => opt.value === sortOption)?.label || "Sort"}
              </Listbox.Button>
              <Listbox.Options className="absolute z-10 mt-2 w-full bg-white border border-[#2D91EF] rounded-lg shadow-lg">
                {sortOptions.map((option) => (
                  <Listbox.Option
                    key={option.value}
                    value={option.value}
                    className={({ active, selected }) =>
                      `px-4 py-2 cursor-pointer ${
                        active ? "bg-[#2D91EF] text-white" : "text-[#2D91EF]"
                      } ${selected ? "font-medium" : ""}`
                    }
                  >
                    {option.label}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Listbox>
          </div>

          {/* Clear Filters Button */}
          <button
            className="p-2 rounded bg-gray-100 text-[#2D91EF] border border-[#2D91EF] font-semibold"
            onClick={handleClearFilters}
          >
            <FiX size={20}/>
          </button>

          {/* layout button */}
          <button
            className="p-2.5 border border-[#2D91EF] rounded"
            onClick={() => setGridCols(!gridCols)}
            title="Toggle Layout"
          >
            {gridCols ? <FaTh color="#2D91EF" /> : <FaList color="#2D91EF" />}
          </button>
        </div>
      </div>

      {/* Mobile Filter Modal */}
      {filterModal && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/30 sm:hidden">
          <div
            className={`w-full max-w-md bg-white rounded-t-2xl shadow-2xl p-4 relative ${modalAnimation}`}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
          >
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-red-500 text-2xl"
              onClick={handleModalClose}
              aria-label="Close"
            >
              <FaTimes />
            </button>
            <h4 className="text-lg font-bold text-[#2D91EF] mb-4 text-center">
              Filters
            </h4>
            <div className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Search by camp name, location, or doctor"
                className="border border-[#2D91EF] rounded-md px-3 py-1.5 focus:outline-[#2D91EF] w-full placeholder:text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <input
                type="date"
                className="border border-[#2D91EF] rounded-md px-3 py-1.5 focus:outline-[#2D91EF]"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                title="Filter by Date"
              />
              <div className="relative w-full">
                <Listbox value={sortOption} onChange={setSortOption}>
                  <Listbox.Button className="w-full border-2 border-[#2D91EF] rounded-lg px-4 py-2 pr-10 bg-white text-[#2D91EF] font-semibold shadow focus:outline-[#2D91EF] flex items-center justify-between cursor-pointer">
                    {sortOptions.find((opt) => opt.value === sortOption)?.label || "Sort"}
                    <span className="ml-2 text-[#2D91EF]">
                      <FaFilter />
                    </span>
                  </Listbox.Button>
                  <Listbox.Options className="absolute z-10 mt-2 w-full bg-white border border-[#2D91EF] rounded-lg shadow-lg">
                    {sortOptions.map((option) => (
                      <Listbox.Option
                        key={option.value}
                        value={option.value}
                        className={({ active, selected }) =>
                          `px-4 py-2 cursor-pointer ${
                            active ? "bg-[#2D91EF] text-white" : "text-[#2D91EF]"
                          } ${selected ? "font-bold" : ""}`
                        }
                      >
                        {option.label}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Listbox>
              </div>
              <button
                className="px-4 py-2 rounded bg-gray-100 text-[#2D91EF] border border-[#2D91EF] font-semibold"
                onClick={handleClearFilters}
              >
                Clear All
              </button>
              <button
                className="px-4 py-2 rounded bg-[#2D91EF] text-white font-semibold"
                onClick={handleModalClose}
              >
                Apply & Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Camps Grid */}
      {isLoading ? (
        <Spinner />
      ) : (
        <div
          className={`grid gap-4 ${
            gridCols
              ? "grid-cols-1 sm:grid-cols-2"
              : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          }`}
        >
          {camps.length ? (
            camps.map((camp) => <CampCard key={camp._id} camp={camp} />)
          ) : (
            <div className="col-span-full text-center text-gray-400 py-10">
              No camps found.
            </div>
          )}
        </div>
      )}

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        totalItems={data?.total || 0}
        itemsPerPage={itemsPerPage}
      />
    </div>
  );
};

export default AvailableCamps;
