import React from "react";
import CommingSoon from "../../Shared/CommingSoon";
import BannerSlider from "./BannerSlider";
import PopularCamps from "../../Components/PopularCamps/PopularCamps";
import FeedbackAndRatings from "../../Components/FeedbackAndRatings/FeedbackAndRatings";

const Home = () => {
  return (
    <div>
      <BannerSlider />
      <PopularCamps />
      <FeedbackAndRatings />
    </div>
  );
};

export default Home;
