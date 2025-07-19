import React, { useRef, useState } from "react";
import { set, useForm } from "react-hook-form";
import axios from "axios";
import { FiEdit2 } from "react-icons/fi";
import useAuth from "../Utils/Hooks/useAuth";
import Spinner from "../Shared/Spinner";
import { toast } from "sonner";

const OrganizerProfileUpdateModal = ({ isOpen, onClose, loading, setLoading }) => {
  const {user, setUser} = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      displayName: user?.displayName || "",
      phoneNumber: user?.phoneNumber || "",
    },
  });

  const [preview, setPreview] = useState(user?.photoURL || "");
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const triggerImageUpload = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };



  const onSubmit = async (data) => {
    setLoading(true);
    let imageURL = user?.photoURL;

    if (image) {
      const formData = new FormData();
      formData.append("image", image);
      try {
        setUploading(true);
        const res = await axios.post(
          `https://api.imgbb.com/1/upload?key=${
            import.meta.env.VITE_IMGBB_API_KEY
          }`,
          formData
        );
        imageURL = res.data.data.url;
      } catch (error) {
        console.error("Image upload failed", error);
      } finally {
        setUploading(false);
      }
    }

    const updatedUser = {
      displayName: data.displayName,
      phoneNumber: data.phoneNumber,
      photoURL: imageURL,
    };

    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/user?email=${user.email}`,
        updatedUser
      );
      setUser((prev) => ({ ...prev, ...updatedUser }));
      onClose();
      setLoading(false);
      toast.success("Profile updated successfully!");
    } catch (error) {
      setLoading(false);
      toast.error("Failed to update profile. Please try again.");
      console.error("Update failed", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4">
      <div className="bg-white rounded-xl w-full max-w-lg p-6 shadow-xl relative">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-4">
          Update Profile
        </h2>

        {/* Profile Preview */}
        <div className="relative w-28 h-28 mx-auto mb-4">
          <img
            src={preview}
            alt="Profile"
            className="w-full h-full rounded-full object-cover border-4 border-blue-300"
          />
          <button
            onClick={triggerImageUpload}
            type="button"
            className="absolute bottom-1 right-1 bg-white p-1 rounded-full shadow-md hover:bg-gray-100"
          >
            <FiEdit2 className="text-blue-600" />
          </button>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            className="hidden"
            onChange={handleImageChange}
          />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Full Name
            </label>
            <input
              {...register("displayName", { required: true })}
              type="text"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-blue-500"
            />
            {errors.displayName && (
              <p className="text-sm text-red-500 mt-1">Name is required</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Contact Number
            </label>
            <input
              {...register("phoneNumber")}
              type="text"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-blue-500"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={uploading}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md transition font-medium"
            >
              {uploading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OrganizerProfileUpdateModal;
