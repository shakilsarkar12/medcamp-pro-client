import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../Utils/Hooks/useAuth";
import axios from "axios";
import SecondaryButton from "../../Shared/SecondaryButton";
import PrimaryButton from "../../Shared/PrimaryButton";
import { Dialog, DialogPanel,  } from "@headlessui/react";
import { toast } from "sonner";


const JoinCampModal = ({ isOpen, setIsOpen, camp, refetchCamp }) => {
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();


  const onSubmit = async (data) => {
    setLoading(true);
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
        `${import.meta.env.VITE_API_URL}/camp-registrations`,
        registrationData
      );

      //   Update participant count
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/camps/increment-participants`,
        {
          campId: camp._id,
          email: user?.email,
        }
      );

      setLoading(false);
      toast.success("Successfully registered for the camp!");
      refetchCamp();
      setIsOpen(false);
      reset();
    } catch (err) {
      setLoading(false);
      toast.error("Failed to register for the camp. Please try again.",err.message);
    }
  };

  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-10 focus:outline-none"
      onClose={close}
    >
      <div className="fixed bg-black/30 inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center pt-20 p-4">
          <DialogPanel
            transition
            className="w-full max-w-2xl rounded-md bg-white p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
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
                    <p className="text-red-500 text-sm mt-0.5">
                      Age is required
                    </p>
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
                    <p className="text-red-500 text-sm mt-0.5">
                      Gender is required
                    </p>
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
                    onClick={()=>setIsOpen(false)}
                    className="w-full bg-red-400"
                  >
                    Cancel
                  </PrimaryButton>
                  <SecondaryButton type="submit" className="w-full">
                    {loading ? "Joining..." : "Join Camp"}
                  </SecondaryButton>
                </div>
              </div>
            </form>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default JoinCampModal;
