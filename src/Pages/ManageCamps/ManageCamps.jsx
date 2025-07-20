import React, { useState } from "react";
import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Utils/Hooks/useAuth";
import { toast } from "sonner";
import Spinner from "../../Shared/Spinner";
import PrimaryButton from "../../Shared/PrimaryButton";
import Pagination from "../../Shared/Pagination";
import Swal from "sweetalert2";
import axiosSecure from "../../Utils/axiosSecure";

const ManageCamps = () => {
  const { user } = useAuth();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["organizer-camps", user?.email, currentPage],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `${import.meta.env.VITE_API_URL}/camps/organizer`,
        {
          params: {
            email: user?.email,
            page: currentPage,
            limit: itemsPerPage,
          },
        }
      );
      return res.data;
    },
    enabled: !!user?.email,
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be delete this Camp!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#2D91EF",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.delete(
            `${import.meta.env.VITE_API_URL}/delete-camp/${id}`
          );
          Swal.fire({
            title: "Deleted!",
            text: "Camp deleted successfully!",
            icon: "success",
          });
          refetch();
        } catch (error) {
          console.error("Delete error:", error);
          toast.error("Failed to delete camp.");
        }
      }
    });
  };

  if (isLoading) return <Spinner />;

  const { camps, totalCamps } = data || {};
  const totalPages = Math.ceil(totalCamps / itemsPerPage);

  return (
    <div className="md:px-4 mt-6">
      <h2 className="text-2xl font-medium text-center mb-6 text-blue-600">
        Manage Your Camps
      </h2>

      <div className="overflow-x-auto rounded-lg shadow-md">
        <table className="min-w-4xl w-full text-sm bg-white rounded-lg overflow-hidden">
          <thead className="bg-gradient-to-r from-blue-100 to-blue-100 text-[#2D91EF]">
            <tr>
              <th className="py-3 px-4 text-left font-semibold">#</th>
              <th className="py-3 px-4 text-left font-semibold">Camp Name</th>
              <th className="py-3 px-4 text-left font-semibold">Date & Time</th>
              <th className="py-3 px-4 text-left font-semibold">Location</th>
              <th className="py-3 px-4 text-left font-semibold">
                Healthcare Professional
              </th>
              <th className="min-w-[190px] text-center font-semibold">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {camps?.map((camp, index) => (
              <tr
                key={camp._id}
                className="border-b border-gray-200 last:border-b-0 hover:bg-blue-50 transition-colors group"
              >
                <td className="py-3 px-4">
                  {(currentPage - 1) * itemsPerPage + index + 1}
                </td>
                <td className="py-3 px-4 font-medium text-gray-800 group-hover:text-blue-700 transition-colors">
                  {camp.campName}
                </td>
                <td className="py-3 px-4">
                  {camp.scheduledDate}{" "}
                  <span className="text-xs text-gray-400">at</span>{" "}
                  {camp.scheduledTime}
                </td>
                <td className="py-3 px-4">{camp.location}</td>
                <td className="py-3 px-4">{camp.healthcareProfessional}</td>
                <td className="py-3 px-4 text-center space-x-2">
                  <Link to={`/update-camp/${camp._id}`}>
                    <PrimaryButton className="inline-block font-semibold text-xs shadow-sm transition">
                      Update
                    </PrimaryButton>
                  </Link>
                  <PrimaryButton
                    onClick={() => handleDelete(camp._id)}
                    className="inline-block bg-red-500 font-semibold text-xs shadow-sm transition"
                  >
                    Delete
                  </PrimaryButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={totalCamps}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default ManageCamps;
