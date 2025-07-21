import { useState } from "react";
import { MdStar } from "react-icons/md";

const StarRating = ({ register, setValue }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);

  const handleClick = (rate) => {
    setRating(rate);
    setValue("rating", rate); 
  };

  return (
    <div className="mb-4">
      <label className="block mb-1 font-semibold">Rating</label>
      <div className="flex gap-2">
        {[...Array(5)].map((_, index) => {
          const currentRating = index + 1;
          return (
            <button
              type="button"
              key={index}
              className="focus:outline-none"
              onClick={() => handleClick(currentRating)}
              onMouseEnter={() => setHover(currentRating)}
              onMouseLeave={() => setHover(null)}
            >
              <MdStar
                size={28}
                className={`cursor-pointer transition-colors duration-200 ${
                  currentRating <= (hover || rating)
                    ? "text-yellow-400"
                    : "text-gray-300"
                }`}
              />
            </button>
          );
        })}
      </div>
      {/* Hidden field for react-hook-form */}
      <input type="hidden" {...register("rating", { required: true })} />
    </div>
  );
};

export default StarRating;
