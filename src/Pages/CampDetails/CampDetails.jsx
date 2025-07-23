import { useState } from "react";
import { useLoaderData, useNavigate } from "react-router";
import { LuCalendarDays, LuClock, LuMapPin } from "react-icons/lu";
import { MdPeopleAlt, MdOutlineHealthAndSafety } from "react-icons/md";
import { RiUser2Fill } from "react-icons/ri";
import PrimaryButton from "../../Shared/PrimaryButton";
import SecondaryButton from "../../Shared/SecondaryButton";
import { BiArrowBack } from "react-icons/bi";
import HeadingTitle from "../../Shared/HeadingTitle";
import { useQuery } from "@tanstack/react-query";
import JoinCampModal from "../../Components/JoinCampModal/JoinCampModal";
import useAuth from "../../Utils/Hooks/useAuth";
import { toast } from "sonner";
import axiosSecure from "../../Utils/axiosSecure";
import Spinner from "../../Shared/Spinner";

const CampDetails = () => {
  const [loading, setLoading] = useState(true);
  const campFromLoader = useLoaderData();
  const { user } = useAuth();
  const navigate = useNavigate();
    let [isOpen, setIsOpen] = useState(false);

  const { data: camp, refetch: refetchCamp } = useQuery({
    queryKey: ["camp", campFromLoader._id],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/camp-details/${campFromLoader._id}`
      );
      return res.data;
    },
    initialData: campFromLoader,
  });


  setTimeout(() => {
    setLoading(false);
  }, 300);

  if (loading) {
    return <Spinner />;
  }

  if (!camp) return <h1>No Data Found</h1>;

  const {
    campName,
    image,
    fees,
    scheduledDate,
    scheduledTime,
    location,
    specializedServices,
    description,
    participantCount,
    professionalsAttendanceCount,
    participantEmails,
  } = camp;

  const handleJoinCamp = () => {
    
    if (!user || !user?.email) {
      toast.error("Please log in to join the camp.");
      navigate("/login");
     }else if (user?.role === "organizer") {
      toast.info("Organizers cannot join camps.");
    } else if (user?.role === "participant") {
      if (participantEmails?.includes(user?.email)) {
        toast.info("You have already registered for this camp.");
      } else {
        setIsOpen(true);
        
      }
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <img
        src={image}
        alt={campName}
        className="w-full h-64 md:h-[500px] object-cover object-center rounded-2xl shadow-lg"
      />

      <div className="mt-6 space-y-4">
        <h2 className="text-xl md:text-2xl lg:text-4xl font-medium mb-6 text-[#2D91EF]">
          {campName}
        </h2>

        <div className="flex flex-wrap items-center gap-4 text-gray-600 text-sm md:text-base">
          <div className="flex items-center gap-2">
            <LuCalendarDays className="text-lg" />
            <span>{scheduledDate}</span>
          </div>
          <div className="flex items-center gap-2">
            <LuClock className="text-lg" />
            <span>{scheduledTime}</span>
          </div>
          <div className="flex items-center gap-2">
            <LuMapPin className="text-lg" />
            <span>{location}</span>
          </div>
          <div className="flex items-center gap-2">
            <MdPeopleAlt className="text-lg" />
            <span>Participants: {participantCount}</span>
          </div>
          <div className="flex items-center gap-2">
            <RiUser2Fill className="text-lg" />
            <span>Professionals: {professionalsAttendanceCount}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-medium">Fees:</span>
            <span className="text-emerald-600 font-bold">${fees}</span>
          </div>
        </div>

        <p className="text-gray-700 leading-relaxed text-justify">
          {description}
        </p>

        {specializedServices?.length > 0 && (
          <div>
            <h3 className="font-semibold text-lg mt-6 mb-2 text-gray-800">
              Specialized Services:
            </h3>
            <ul className="list-disc pl-5 space-y-1 text-gray-700">
              {specializedServices.map((service, idx) => (
                <li key={idx}>{service}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex justify-between mt-8">
          <PrimaryButton
            onClick={() => navigate(-1)}
            className="inline-flex items-center text-sm sm:text-base"
          >
            <BiArrowBack className="mr-2" />
            Back
          </PrimaryButton>

          <SecondaryButton
            disabled={ participantEmails?.includes(user?.email)}
            onClick={() => handleJoinCamp()}
            className="text-sm sm:text-base"
          >
            {participantEmails?.includes(user?.email)? "Aleardy Join": "Join Camp"}
          </SecondaryButton>
        </div>
      </div>
        {/* Modal */}
        <JoinCampModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          camp={camp}
          refetchCamp={refetchCamp}
        />
    </div>
  );
};

export default CampDetails;
