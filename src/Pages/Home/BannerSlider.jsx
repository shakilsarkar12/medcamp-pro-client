import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import banner1 from "../../assets/banner-1.png";
import banner2 from "../../assets/banner-2.png";
import banner3 from "../../assets/banner-3.png";

const BannerSlider = () => {
  const slides = [
    {
      img: banner1,
      location: "March 2025",
      color: "#2D91EF",
    },
    {
      img: banner2,
      location: "Jan 2025",
      color: "#01BF68",
    },
    {
      img: banner3,
      location: "Jul 2025",
      color: "#2D91EF",
    },
  ];

  return (
    <div className="w-full relative mt-5">
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={30}
        pagination={{ clickable: true }}
        // autoplay={{ delay: 5000 }}
        loop={true}
        className="h-full  rounded-md overflow-hidden"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="w-full h-full rounded-md relative">
              <img
                src={slide.img}
                alt="Camp Slide"
                className="w-full h-full object-cover"
                    />
                    <span className={`absolute bg-[${slide.color}] text-white top-2 text-xs lg:text-sm lg:top-4 left-0 pl-5 pr-3 py-0.5 rounded-r-full z-30 hidden md:block`}>{slide.location}</span>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default BannerSlider;
