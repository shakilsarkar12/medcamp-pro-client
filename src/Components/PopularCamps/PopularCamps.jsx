import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import axiosSecure from "../../Utils/axiosSecure";
import CampCard from "../../Shared/CampCard";
import HeadingTitle from "../../Shared/HeadingTitle";
import SecondaryButton from "../../Shared/SecondaryButton";

const PopularCamps = () => {
  const [popularCamps, setPopularCamps] = useState([]);

  useEffect(() => {
    axiosSecure
      .get("/popular-camps")
      .then((res) => {
        setPopularCamps(res.data);
      })
      .catch((err) => console.error("Failed to load camps", err));
  }, []);

  return (
    <section className="py-16">
      <HeadingTitle
        heading="Popular Medical Camps"
        title="Top 8 most joined and highly engaging medical camps"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 my-10">
        {popularCamps.map((camp) => (
          <CampCard key={camp._id} camp={camp} />
        ))}
      </div>

      <div className="text-center mt-8">
        <Link to="/available-camps">
          <SecondaryButton>See All Camps</SecondaryButton>
        </Link>
      </div>
    </section>
  );
};

export default PopularCamps;
