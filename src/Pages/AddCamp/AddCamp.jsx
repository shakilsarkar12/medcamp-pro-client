import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "sonner";
import SecondaryButton from "../../Shared/SecondaryButton";
import { useDropzone } from "react-dropzone";
import { FiX } from "react-icons/fi";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import HeadingTitle from "../../Shared/HeadingTitle";

const AddCamp = () => {
  const [uploading, setUploading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm();

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "image/*": [],
    },
    maxFiles: 1,
    multiple: false,
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length) {
        const file = acceptedFiles[0];
        setImageFile(file);
        setPreviewURL(URL.createObjectURL(file));
      }
    },
  });

  const onSubmit = async (data) => {
    setUploading(true);

    if (!imageFile) {
      toast.error("Please select an image first!");
      setUploading(false);
      return;
    }

    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      // Upload to imgbb
      const res = await axios.post(
        `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_IMGBB_API_KEY
        }`,
        formData
      );

      const imageURL = res.data.data.display_url;

      // Prepare final camp data
      const campData = {
        campName: data.campName,
        image: imageURL,
        fees: parseFloat(data.fees),
        dateTime: new Date(data.dateTime).toISOString(),
        location: data.location,
        doctor: data.doctor,
        participantCount: 0,
        description: data.description,
      };

      // Save to your server
      const saveRes = await axios.post(
        `${import.meta.env.VITE_API_URL}/camp`,
        campData
      );

      if (saveRes.data.insertedId) {
        toast.success("Camp added successfully!");
        setImageFile(null);
        setPreviewURL(null);
        reset();
      } else {
        toast.error("Something went wrong saving to DB");
      }
    } catch (err) {
      toast.error("Image or Camp Upload Failed");
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 bg-white rounded shadow my-10">
      <HeadingTitle heading="Add A Camp" />

      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
        {/* Camp Name */}
        <div className="flex flex-col gap-2">
          <label className="block font-medium">Camp Name</label>
          <input
            {...register("campName", { required: "Camp name is required" })}
            placeholder="Enter camp name"
            className="border border-[#2D91EF] rounded-md px-3 py-1.5 focus:outline-[#2D91EF] w-full placeholder:text-sm"
          />
          {errors.campName && (
            <p className="text-red-500 text-sm">{errors.campName.message}</p>
          )}
        </div>

        {/* Image Upload with Dropzone */}
        <div className="flex flex-col gap-2">
          <label className="block font-medium mb-1">Upload Camp Image</label>
          <div
            {...getRootProps()}
            className={`w-full p-4 border-1 border-[#2D91EF] border-dashed rounded text-center cursor-pointer transition ${
              isDragActive ? "border-[#2D91EF] border-2  bg-teal-50" : ""
            } ${previewURL && "border-[#2D91EF]"}`}
          >
            <input {...getInputProps()} />
            {previewURL ? (
              <div className="flex flex-col items-center gap-2">
                <div className="relative inline-block">
                  {/* Cancel Icon */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // prevent dropzone click
                      setImageFile(null);
                      setPreviewURL(null);
                    }}
                    className="absolute -top-2 -right-2 rounded-full bg-white text-red-500 text-2xl transition"
                    title="Remove"
                  >
                    <FiX />
                  </button>
                  <img
                    src={previewURL}
                    alt="Preview"
                    className="max-w-36 max-h-40 object-cover rounded shadow"
                  />
                </div>
                <p className="text-green-600 font-medium">{imageFile?.name}</p>
              </div>
            ) : (
              <p className="text-gray-500">
                Drag & drop image here, click to select, or paste
              </p>
            )}
          </div>
        </div>
        {/* Fees */}
        <div className="flex flex-col gap-2">
          <label className="block font-medium">Camp Fees ($)</label>
          <input
            type="number"
            {...register("fees", {
              required: "Camp fee is required",
              min: { value: 0, message: "Fee cannot be negative" },
            })}
            placeholder="Enter camp fees"
            className="border border-[#2D91EF] rounded-md px-3 py-1.5 focus:outline-[#2D91EF] w-full placeholder:text-sm"
          />
          {errors.fees && (
            <p className="text-red-500 text-sm">{errors.fees.message}</p>
          )}
        </div>

        {/* Date & Time */}
        <div className="flex flex-col gap-2">
          <label className="block font-medium mb-1">Camp Date & Time</label>
          <Controller
            control={control}
            name="dateTime"
            rules={{ required: true }}
            render={({ field }) => (
              <DatePicker
                {...field}
                selected={field.value}
                onChange={(date) => field.onChange(date)}
                showTimeSelect
                timeFormat="hh:mm aa"
                timeIntervals={15}
                dateFormat="MMMM d, yyyy h:mm aa"
                minDate={new Date()}
                placeholderText="Select date and time"
                className="border border-[#2D91EF] rounded-md px-3 py-1.5 focus:outline-[#2D91EF] w-full placeholder:text-sm"
              />
            )}
          />
          {errors.dateTime && (
            <p className="text-red-500 text-sm">Date & time is required</p>
          )}
        </div>

        {/* Location */}
        <div className="flex flex-col gap-2">
          <label className="block font-medium">Location</label>
          <input
            {...register("location", { required: "Location is required" })}
            placeholder="Enter camp location"
            className="border border-[#2D91EF] rounded-md px-3 py-1.5 focus:outline-[#2D91EF] w-full placeholder:text-sm"
          />
          {errors.location && (
            <p className="text-red-500 text-sm">{errors.location.message}</p>
          )}
        </div>

        {/* Doctor */}
        <div className="flex flex-col gap-2">
          <label className="block font-medium">Healthcare Professional</label>
          <input
            {...register("doctor", { required: "Doctor name is required" })}
            placeholder="Enter doctor name"
            className="border border-[#2D91EF] rounded-md px-3 py-1.5 focus:outline-[#2D91EF] w-full placeholder:text-sm"
          />
          {errors.doctor && (
            <p className="text-red-500 text-sm">{errors.doctor.message}</p>
          )}
        </div>

        {/* Description */}
        <div className="flex flex-col gap-2">
          <label className="block font-medium">Description</label>
          <textarea
            {...register("description", {
              required: "Description is required",
            })}
            placeholder="Write a short description about the camp"
            className="border border-[#2D91EF] rounded-md px-3 py-1.5 focus:outline-[#2D91EF] w-full placeholder:text-sm"
            rows={3}
          />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <SecondaryButton
            type="submit"
            disabled={uploading}
            text={uploading ? "Uploading..." : "Add Camp"}
          />
        </div>
      </form>
    </div>
  );
};

export default AddCamp;
