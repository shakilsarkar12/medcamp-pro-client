import React from "react";
import CommingSoon from "../../Shared/CommingSoon";
import BannerSlider from "./BannerSlider";
import PopularCamps from "../../Components/PopularCamps/PopularCamps";

const Home = () => {
  return (
    <div>
      <BannerSlider />
      <PopularCamps />
    </div>
  );
};

export default Home;
