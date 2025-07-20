import React, { useState, useEffect } from "react";
import useAuth from "../../Utils/Hooks/useAuth";
import OrganizerProfileUpdateModal from "../../Components/OrganizerProfileUpdateModal";
import { FaEdit, FaLock, FaCalendarAlt } from "react-icons/fa";
import { MdEmail, MdPhone } from "react-icons/md";
import axios from "axios";
import SecondaryButton from "../../Shared/SecondaryButton";
import PrimaryButton from "../../Shared/PrimaryButton";
import Spinner from "../../Shared/Spinner";

const OrganizerProfile = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const [campCount, setCampCount] = useState(0);

  useEffect(() => {
    const fetchCampCount = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/camps/count?email=${user?.email}&role=${user?.role}`
        );
        setLoading(false);
        setCampCount(res.data.count || 0);
      } catch (err) {
        console.error("Failed to fetch camp count", err);
      }
    };

    if (user?.email) fetchCampCount();
  }, [user]);

  if (loading) {
    return <Spinner />;
  }

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="max-w-3xl mx-auto p-4 bg-white rounded-xl shadow mt-12">
      <div className="flex items-center gap-6 mb-6">
        <img
          referrerPolicy="no-referrer"
          src={user?.photoURL || "https://i.ibb.co/ZYW3VTp/default-avatar.png"}
          alt="User"
          className="w-24 h-24 rounded-full object-cover border-2 border-blue-400"
        />
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">
            {user?.displayName}
          </h2>
          <p className="text-sm text-gray-600 flex items-center gap-2">
            <MdEmail /> {user?.email}
          </p>
          {user?.phoneNumber && (
            <p className="text-sm text-gray-600 flex items-center gap-2">
              <MdPhone /> {user.phoneNumber}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div className="bg-gray-100 p-4 rounded-lg text-center">
          <p className="text-gray-600 mb-1">Total Camps Organized</p>
          <p className="text-xl font-bold text-[#2D91EF]">{campCount}</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg text-center">
          <p className="text-gray-600 mb-1 flex items-center justify-center gap-1">
            <FaCalendarAlt /> Joined On
          </p>
          <p className="text-xl font-medium text-[#2D91EF]">
            {user?.creationTime ? formatDate(user.creationTime) : "N/A"}
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <SecondaryButton
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 rounded shadow transition"
        >
          <FaEdit /> Update Profile
        </SecondaryButton>

        <PrimaryButton
          onClick={() => alert("Change Password Modal Coming Soon")}
          className="flex items-center gap-2 px-4 py-2 rounded shadow transition"
        >
          <FaLock /> Change Password
        </PrimaryButton>
      </div>

      {modalOpen && (
        <OrganizerProfileUpdateModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          loading={loading}
          setLoading={setLoading}
        />
      )}
    </div>
  );
};

export default OrganizerProfile;
