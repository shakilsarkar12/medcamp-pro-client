import React, { useEffect, useState } from "react";
import axiosSecure from "../../Utils/axiosSecure";
import { FaStar } from "react-icons/fa";
import HeadingTitle from "../../Shared/HeadingTitle";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import useAuth from "../../Utils/Hooks/useAuth";

const FeedbackAndRatings = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    axiosSecure
      .get(`/feedbacks?email=${user?.email}`)
      .then((res) => {
        setFeedbacks(res.data);
      })
      .catch((err) => console.error("Error loading feedbacks", err));
  }, [user?.email]);

  return (
    <section className="pb-16">
      <HeadingTitle
        heading="What Participants Are Saying"
        title="Real feedback and ratings from our valued participants"
      />
      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={1}
        slidesPerView={1}
        breakpoints={{
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        pagination={{ clickable: true }}
        autoplay={{ delay: 2000 }}
        className="mt-10"
      >
        {feedbacks.map((item) => (
          <SwiperSlide key={item._id}>
            <div className="relative bg-white rounded-md px-3 py-6 min-h-40 shadow cursor-pointer transition duration-300 ease-in-out h-full m-0.5">
              {/* Avatar & Name */}
              <div className="flex items-center gap-4 mb-4">
                <div className="w-8 h-8 rounded-full bg-[#2D91EF] flex items-center justify-center text-white font-semibold text-lg shadow">
                  {item.participantName?.charAt(0).toUpperCase() || "U"}
                </div>
                <div>
                  <p className="md:text-lg font-semibold text-[#2D91EF]">
                    {item.participantName || "Anonymous"}
                  </p>
                  <p className="text-xs md:text-sm text-[#2D91EF]">
                    {item.campName}
                  </p>
                </div>
              </div>

              {/* Stars */}
              <div className="flex items-center text-sm md:text-base md:mb-3 text-yellow-400">
                {Array.from({ length: item.rating }).map((_, i) => (
                  <FaStar key={i} className="mb-1" />
                ))}
                <span className="ml-1 text-sm text-gray-600">
                  {item.rating}.5
                </span>
              </div>

              {/* Feedback Message */}
              <p className="text-xs md:text-sm text-gray-800 italic">
                “
                {item.feedbackText.length > 140
                  ? item.feedbackText.slice(0, 140) + "..."
                  : item.feedbackText}
                ”
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default FeedbackAndRatings;
