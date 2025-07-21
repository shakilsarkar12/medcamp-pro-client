import { useState } from "react";
import { Link, useLocation } from "react-router";
import { toast } from "sonner";
import useAuth from "../../Utils/Hooks/useAuth";
import axiosSecure from "../../Utils/axiosSecure";
import { useQuery, useMutation } from '@tanstack/react-query';
import Spinner from "../../Shared/Spinner";
import Pagination from "../../Shared/Pagination";

const RegisteredCamps = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const { user } = useAuth();
  const location = useLocation();


  const {
    data,
    isLoading,
    refetch,
    isError,
    error
  } = useQuery({
    queryKey: ["participantRegistrations", user?.email, currentPage],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/participant-registrations?email=${user?.email}&page=${currentPage}&limit=${itemsPerPage}`
      );
      return res.data;
    },
  });

  const registrations = data?.registrations || [];
  const totalPages = data?.totalPages || 1;

  const cancelMutation = useMutation({
    mutationFn: async ({ _id, campID, email }) => {
      return axiosSecure.delete(
        `/delete-registrations?id=${_id}&campID=${campID}&email=${email}`
      );
    },
    onSuccess: () => {
      toast.success("Registration canceled!");
      refetch();
    },
    onError: () => {
      toast.error("Cancel failed");
    },
  });

  const handleCancel = (_id, campID, email, paid) => {
    if (paid) {
      toast.error("You cannot cancel after payment.");
      return;
    }
    cancelMutation.mutate({ _id, campID, email });
  };

  if (isLoading) {
    return <Spinner />;
  }
  if (isError) {
    return <div className="text-red-500 text-center py-8">Failed to load registrations: {error?.message}</div>;
  }

  return (
    <div className="w-full mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-6 text-teal-600 tracking-tight">
        Registered Camps
      </h2>
      <div className="overflow-x-auto rounded-xl shadow-md ">
        <table className="min-w-40 w-full text-gray-800">
          <thead>
            <tr className="bg-gradient-to-r from-blue-100 to-blue-200 text-[#2D91EF]">
              <th className="py-3 px-4 text-left">Camp Name</th>
              <th className="py-3 px-4 text-left">Camp Fees</th>
              <th className="py-3 px-4 text-left">Participant Name</th>
              <th className="py-3 px-4 text-left">Payment Status</th>
              <th className="py-3 px-4 text-left">Confirmation Status</th>
              <th className="py-3 px-4 text-left">Cancel</th>
              <th className="py-3 px-4 text-left">Feedback</th>
            </tr>
          </thead>
          <tbody>
            {registrations.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="text-center py-8 text-gray-400 font-semibold"
                >
                  No registrations found.
                </td>
              </tr>
            ) : (
              registrations.map((camp) => (
                <tr
                  key={camp._id}
                  className="border-b border-gray-200 hover:bg-blue-50 transition"
                >
                  <td className="py-2 px-4 font-medium">{camp.campName}</td>
                  <td className="py-2 px-4">${camp.campFees}</td>
                  <td className="py-2 px-4">{camp.participantName}</td>
                  <td className="py-2 px-4">
                    {camp.pyamentStatus === "Paid" ? (
                      <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-semibold">
                        Paid
                      </span>
                    ) : (
                      <Link to={`/payment/${camp._id}`}>
                        <button className="bg-yellow-400 text-yellow-700 px-2 py-1 rounded text-xs font-semibold cursor-pointer">
                          Pay
                        </button>
                      </Link>
                    )}
                  </td>
                  <td className="py-2 px-4">
                    {camp.confirmationStatus ? (
                      <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-semibold">
                        {camp.confirmationStatus}
                      </span>
                    ) : (
                      <span className="bg-gray-100 text-gray-500 px-2 py-1 rounded text-xs font-semibold">
                        Pending
                      </span>
                    )}
                  </td>
                  <td className="py-2 px-4">
                    <button
                      onClick={() =>
                        handleCancel(
                          camp._id,
                          camp.campId,
                          camp.participantEmail,
                          camp.pyamentStatus === "Paid"
                        )
                      }
                      className={`px-3 py-1 rounded font-semibold transition cursor-pointer ${
                        camp.pyamentStatus === "Paid"
                          ? "bg-gray-300 text-gray-400 cursor-not-allowed"
                          : "bg-red-500 text-white hover:bg-red-600"
                      }`}
                      disabled={
                        camp.pyamentStatus === "Paid" ||
                        cancelMutation.isLoading
                      }
                    >
                      Cancel
                    </button>
                  </td>
                  <td className="py-2 px-4">
                    {camp.pyamentStatus === "Paid" ? (
                      <Link state={location.pathname} to={`/feedback/${camp._id}`}>
                        <button className="bg-[#2D91EF] text-white px-3 py-1 rounded font-semibold transition hover:bg-blue-500 cursor-pointer">
                          Feedback
                        </button>
                      </Link>
                    ) : (
                      <button
                        className="bg-gray-300 text-gray-400 px-3 py-1 rounded font-semibold transition cursor-not-allowed"
                        disabled
                      >
                        Feedback
                      </button>
                    )}
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

export default RegisteredCamps;
