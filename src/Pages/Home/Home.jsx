import React, { useState } from "react";
import CommingSoon from "../../Shared/CommingSoon";
import BannerSlider from "./BannerSlider";
import PopularCamps from "../../Components/PopularCamps/PopularCamps";
import FeedbackAndRatings from "../../Components/FeedbackAndRatings/FeedbackAndRatings";
import MedicalTipsSection from "../../Components/MedicalTipsSection/MedicalTipsSection";
import Spinner from "../../Shared/Spinner";
import StatisticsSection from "../../Components/StatisticsSection/StatisticsSection";
import Newsletter from "../../Components/Newsletter/Newsletter";

const Home = () => {
    const [loading, setLoading] = useState(true);

    setTimeout(() => {
      setLoading(false);
    }, 300);

    if (loading) {
      return <Spinner />;
    }
  return (
    <div>
      <BannerSlider />
      <PopularCamps />
      <FeedbackAndRatings />
      <MedicalTipsSection />
      <StatisticsSection />
      <Newsletter/>
    </div>
  );
};

export default Home;
