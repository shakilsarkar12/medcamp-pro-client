import React from "react";
import { useForm } from "react-hook-form";
import Modal from "react-modal";
import useAuth from "../../Utils/Hooks/useAuth";
import axios from "axios";
import SecondaryButton from "../../Shared/SecondaryButton";
import PrimaryButton from "../../Shared/PrimaryButton";

Modal.setAppElement("#root");

const JoinCampModal = ({ isOpen, closeModal, camp, refetchCamp }) => {
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const registrationData = {
      ...data,
      campId: camp._id,
      campName: camp.campName,
      campFees: camp.fees,
      location: camp.location,
      professional: camp.healthcareProfessional,
      participantName: user?.displayName,
      participantEmail: user?.email,
      registeredAt: new Date(),
    };

    try {
      // Save participant registration
      await axios.post(
        `http://localhost:3000/camp-registrations`,
        registrationData
      );

      //   Update participant count
      await axios.patch(`http://localhost:3000/camps/increment-participants`, {
        campId: camp._id,
        email: user?.email,
      });

      refetchCamp();
      closeModal();
      reset();
    } catch (err) {
      console.error("Failed to register:", err);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Join Camp"
      className=" max-h-screen mx-auto mt-20 bg-white p-6 rounded-lg shadow-lg overflow-y-auto px-4"
      overlayClassName="fixed min-h-screen inset-0 bg-black/30 bg-opacity-40 flex justify-center items-start z-50"
    >
      <h2 className="text-2xl font-semibold mb-4 text-center text-[#2D91EF]">
        Join Camp
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="m-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="col-span-2 md:col-span-1">
            <label>Camp Name</label>
            <input
              value={camp.campName}
              readOnly
              className="border border-[#2D91EF] rounded-md px-3 py-1.5 focus:outline-[#2D91EF] w-full placeholder:text-sm"
            />
          </div>

          <div className="col-span-2 md:col-span-1">
            <label>Fees</label>
            <input
              value={`$${camp.fees}`}
              readOnly
              className="border border-[#2D91EF] rounded-md px-3 py-1.5 focus:outline-[#2D91EF] w-full placeholder:text-sm"
            />
          </div>

          <div className="col-span-2 md:col-span-1">
            <label>Loaction</label>
            <input
              value={camp.location}
              readOnly
              className="border border-[#2D91EF] rounded-md px-3 py-1.5 focus:outline-[#2D91EF] w-full placeholder:text-sm"
            />
          </div>

          <div className="col-span-2 md:col-span-1">
            <label>Healthcare Professional</label>
            <input
              value={camp.healthcareProfessional}
              readOnly
              className="border border-[#2D91EF] rounded-md px-3 py-1.5 focus:outline-[#2D91EF] w-full placeholder:text-sm"
            />
          </div>

          <div className="col-span-2 md:col-span-1">
            <label>Participant Name</label>
            <input
              value={user?.displayName || ""}
              readOnly
              className="border border-[#2D91EF] rounded-md px-3 py-1.5 focus:outline-[#2D91EF] w-full placeholder:text-sm"
            />
          </div>

          <div className="col-span-2 md:col-span-1">
            <label>Participant Email</label>
            <input
              value={user?.email || ""}
              readOnly
              className="border border-[#2D91EF] rounded-md px-3 py-1.5 focus:outline-[#2D91EF] w-full placeholder:text-sm"
            />
          </div>

          <div className="col-span-2 md:col-span-1">
            <label>Your Age</label>
            <input
              {...register("age", { required: true })}
              placeholder="Age"
              className="border border-[#2D91EF] rounded-md px-3 py-1.5 focus:outline-[#2D91EF] w-full placeholder:text-sm"
            />
            {errors.age && (
              <p className="text-red-500 text-sm mt-0.5">Age is required</p>
            )}
          </div>

          <div className="col-span-2 md:col-span-1">
            <label>Your Number</label>
            <input
              {...register("phone", { required: true })}
              placeholder="Phone Number"
              className="border border-[#2D91EF] rounded-md px-3 py-1.5 focus:outline-[#2D91EF] w-full placeholder:text-sm"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-0.5">
                Phone number is required
              </p>
            )}
          </div>

          <div className="col-span-2 md:col-span-1">
            <label>Gender</label>
            <select
              {...register("gender", { required: true })}
              className="border border-[#2D91EF] rounded-md px-3 py-1.5 focus:outline-[#2D91EF] w-full placeholder:text-sm"
            >
              <option value="">Select Gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
            {errors.gender && (
              <p className="text-red-500 text-sm mt-0.5">Gender is required</p>
            )}
          </div>

          <div className="col-span-2 md:col-span-1">
            <label>Emergency Contact</label>
            <input
              {...register("emergencyContact", { required: true })}
              placeholder="Emergency Contact"
              className="border border-[#2D91EF] rounded-md px-3 py-1.5 focus:outline-[#2D91EF] w-full placeholder:text-sm"
            />
            {errors.emergencyContact && (
              <p className="text-red-500 text-sm mt-0.5">
                Emergency contact is required
              </p>
            )}
          </div>

          <div className="col-span-2 flex justify-between mt-6 gap-2">
            <PrimaryButton
              type="button"
              onClick={closeModal}
              className="w-full bg-red-400"
            >
              Cancel
            </PrimaryButton>
            <SecondaryButton type="submit" className="w-full">
              Join
            </SecondaryButton>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default JoinCampModal;
