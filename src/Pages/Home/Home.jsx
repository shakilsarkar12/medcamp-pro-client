import React from "react";
import CommingSoon from "../../Shared/CommingSoon";
import BannerSlider from "./BannerSlider";
import PopularCamps from "../../Components/PopularCamps/PopularCamps";
import FeedbackAndRatings from "../../Components/FeedbackAndRatings/FeedbackAndRatings";
import MedicalTipsSection from "../../Components/MedicalTipsSection/MedicalTipsSection";

const Home = () => {
  return (
    <div>
      <BannerSlider />
      <PopularCamps />
      <FeedbackAndRatings />
      <MedicalTipsSection />
    </div>
  );
};

export default Home;
