import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FaCheck, FaTimes } from "react-icons/fa";
import Swal from "sweetalert2";
import Pagination from "../../Shared/Pagination";
import axiosSecure from "../../Utils/axiosSecure";
import { toast } from "sonner";
import Spinner from "../../Shared/Spinner";
import useAuth from "../../Utils/Hooks/useAuth";

const ManageRegisteredCamps = () => {
  const { user } = useAuth();
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 10;
  setTimeout(() => {
    setLoading(false);
  }, 200);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["camp-registrations", currentPage],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/camp-registrations?page=${currentPage}&limit=${itemsPerPage}&?email=${user?.email}`
      );
      return res.data;
    },
    keepPreviousData: true,
  });

  const registrations = data?.registrations || [];
  const totalPages = data?.totalPages || 1;

  if (loading) {
    return <Spinner />;
  }

  // Confirm registration if payment is paid and not already confirmed
  const handleConfirm = async (registration) => {
    const { _id, pyamentStatus, confirmationStatus } = registration;
    if (pyamentStatus !== "Paid") {
      Swal.fire({
        title: "Payment Required",
        text: "You must pay the camp fees before confirming your registration.",
        icon: "warning",
        confirmButtonColor: "#2D91EF",
      });
      return;
    }
    if (confirmationStatus === "Confirmed") return;
    try {
      await axiosSecure.patch(
        `/camp-registrations/${_id}/confirm?email=${user?.email}`
      );
      toast.success("Registration confirmed successfully!");
      refetch();
    } catch (err) {
      toast.error("Confirmation error:", err);
    }
  };
  
  const handleCancel = async (registration) => {
    const { _id, pyamentStatus, confirmationStatus } = registration;
    if (pyamentStatus === "Paid" && confirmationStatus === "Confirmed") {
      return;
    }
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You want to cancel this registration?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#2D91EF",
      confirmButtonText: "Yes, cancel it!",
    });
    if (result.isConfirmed) {
      try {
        await axiosSecure.delete(
          `/delete-registrations?id=${_id}&campID=${registration.campId}&participantEmail=${registration.participantEmail}&email=${user?.email}`
        );
        Swal.fire({
          title: "Deleted!",
          text: "Camp deleted successfully!",
          icon: "success",
          confirmButtonColor: "#2D91EF",
        });
        refetch();
      } catch (err) {
        toast.error("Cancellation error:", err);
      }
    }
  };

  return (
    <div className="p-4 md:p-8">
      <h2 className="text-2xl font-semibold text-center mb-6 text-[#2D91EF]">
        Manage Registered Camps
      </h2>
      <div className="overflow-x-auto rounded-lg shadow-md">
        <table className="min-w-4xl w-full text-xs md:text-sm bg-white rounded-lg overflow-hidden">
          <thead className="bg-gradient-to-r from-blue-100 to-blue-200 text-[#2D91EF]">
            <tr>
              <th className="py-3 px-4 text-left w-5 font-semibold">
                #
              </th>
              <th className="py-3 px-4 text-left font-semibold">
                Participant Name
              </th>
              <th className="py-3 px-4 text-left font-semibold">Camp Name</th>
              <th className="py-3 px-4 text-left font-semibold w-fit">
                Camp Fees
              </th>
              <th className="py-3 px-4 text-end font-semibold w-40">
                Payment Status
              </th>
              <th className="py-3 font-semibold text-center w-40">
                Confirmation Status
              </th>
              <th className="py-3 px-4 text-center font-semibold w-12">
                Cancel
              </th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td
                  colSpan="6"
                  className="text-center py-8 text-gray-400 text-lg font-medium bg-blue-50"
                >
                  Loading...
                </td>
              </tr>
            ) : registrations.length === 0 ? (
              <tr>
                <td
                  colSpan="6"
                  className="text-center py-8 text-gray-400 text-lg font-medium bg-blue-50"
                >
                  No registrations found.
                </td>
              </tr>
            ) : (
              registrations.map((reg, index) => (
                <tr
                  key={reg._id}
                  className="border-b border-gray-200 last:border-b-0 hover:bg-blue-50 transition-colors group"
                >
                  <td className="py-3 px-4">{index + 1}</td>
                  <td className="py-3 px-4">{reg.participantName}</td>
                  <td className="py-3 px-4 font-medium text-gray-800 group-hover:text-blue-700 transition-colors">
                    {reg.campName}
                  </td>
                  <td className="py-3 px-4">${reg.campFees}</td>
                  <td className="py-3 px-4 text-center">
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold ${
                        reg.pyamentStatus === "Paid"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {reg.pyamentStatus}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    {reg.confirmationStatus === "Confirmed" ? (
                      <span className="px-2 py-1 rounded text-xs font-semibold bg-green-100 text-green-700 cursor-not-allowed">
                        Confirmed
                      </span>
                    ) : (
                      <button
                        disabled={reg.pyamentStatus !== "Paid"}
                        className="bg-yellow-400 hover:bg-yellow-500 px-2 py-1 cursor-pointer rounded text-gray-800 text-xs font-semibold transition disabled:cursor-not-allowed"
                        onClick={() => handleConfirm(reg)}
                      >
                        Pending
                      </button>
                    )}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => handleCancel(reg)}
                      disabled={
                        reg.pyamentStatus === "Paid" &&
                        reg.confirmationStatus === "Confirmed"
                      }
                      className={` $${
                        reg.pyamentStatus === "Paid" &&
                        reg.confirmationStatus === "Confirmed"
                          ? "opacity-50 cursor-not-allowed"
                          : "cursor-pointer hover:bg-red-100 p-2 rounded-full text-red-600 transition"
                      }`}
                    >
                      {reg.pyamentStatus === "Paid" &&
                      reg.confirmationStatus === "Confirmed" ? (
                        <FaCheck className="text-green-500" />
                      ) : (
                        <FaTimes className="text-red-500 cursor-pointer" />
                      )}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
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

export default ManageRegisteredCamps;
