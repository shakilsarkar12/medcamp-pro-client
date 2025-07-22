import React from "react";
import { useForm } from "react-hook-form";
import StarRating from "../../Components/StarRating/StarRating";
import axiosSecure from "../../Utils/axiosSecure";
import useAuth from "../../Utils/Hooks/useAuth";
import SecondaryButton from "../../Shared/SecondaryButton";
import { toast } from "sonner";
import { useLocation, useNavigate } from "react-router";

const UserFeedbackForm = ({ campId }) => {
  const { register, handleSubmit, reset, setValue } = useForm();
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  // Fetch registered camps for the logged-in user

  const onSubmit = async (data) => {
    const feedbackData = {
      ...data,
      participantEmail: user?.email,
      participantName: user?.displayName,
      campId,
    };

    try {
      const res = await axiosSecure.post("/feedback", feedbackData);
      if (res.data.insertedId) {
        toast.success("Feedback submitted successfully!");
        reset();
        navigate(location.state || "/");
      }

    } catch (err) {
      toast.error("Error submitting feedback:", err);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow rounded mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center text-[#2D91EF]">
        Give Feedback
      </h2>
      {/* Feedback Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block mb-1 font-semibold">Your Feedback</label>
          <textarea
            {...register("feedbackText", { required: true })}
            rows="4"
            className="border border-[#2D91EF] rounded-md px-3 py-1.5 focus:outline-[#2D91EF] w-full placeholder:text-sm"
            placeholder="Write your feedback..."
          ></textarea>
        </div>

        <div>
          <StarRating register={register} setValue={setValue} />
        </div>

        <SecondaryButton type="submit">Submit Feedback</SecondaryButton>
      </form>
    </div>
  );
};

export default UserFeedbackForm;
