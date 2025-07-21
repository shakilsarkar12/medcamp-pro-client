import React, { useState } from "react";
import useAuth from "../../Utils/Hooks/useAuth";
import axiosSecure from "../../Utils/axiosSecure";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../../Shared/Spinner";
import Pagination from "../../Shared/Pagination";

const PaymentHistory = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const { user } = useAuth();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["camp-registrations", currentPage],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/payment-history?email=${user?.email}&page=${currentPage}&limit=${itemsPerPage}`
      );
      return res.data;
    },
    keepPreviousData: true,
  });

  const payments = data?.payments || [];
  const totalPages = data?.totalPages || 1;

  if (isLoading) {
    return <Spinner />;
  }
  if (isError) {
    return (
      <div className="text-red-500 text-center py-8">
        Failed to load registrations
      </div>
    );
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
              <th className="py-3 px-4 text-left">#</th>
              <th className="py-3 px-4 text-left">Camp Name</th>
              <th className="py-3 px-4 text-left">Fees</th>
              <th className="py-3 px-4 text-left">Payment Status</th>
              <th className="py-3 px-4 text-left">Transaction ID</th>
              <th className="py-3 px-4 text-left">Confirmation</th>
              <th className="py-3 px-4 text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            {payments.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="text-center py-8 text-gray-400 font-semibold"
                >
                  No registrations found.
                </td>
              </tr>
            ) : (
              payments.map((item, index) => (
                <tr
                  key={item._id}
                  className="border-b border-gray-200 hover:bg-blue-50 transition"
                >
                  <td className="py-2 px-4">{index + 1}</td>
                  <td className="py-2 px-4">{item.campName}</td>
                  <td className="py-2 px-4">${item.amount}</td>
                  <td className="py-2 px-4 text-green-600">{item.status}</td>
                  <td className="py-2 px-4 text-gray-800">
                    {item.transactionId}
                  </td>
                  <td className="py-3 px-4">
                    {item.confirmationStatus === "Confirmed" ? (
                      <span className="px-2 py-1 rounded text-xs font-semibold bg-green-100 text-green-700 cursor-not-allowed">
                        Confirmed
                      </span>
                    ) : (
                      <button
                        disabled={item.pyamentStatus !== "Paid"}
                        className="bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded text-gray-900 text-xs font-semibold transition"
                      >
                        Pending
                      </button>
                    )}
                  </td>
                  <td className="py-2 px-4">
                    {new Date(item.date).toLocaleDateString()}
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

export default PaymentHistory;
