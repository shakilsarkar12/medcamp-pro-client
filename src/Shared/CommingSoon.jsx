import React from "react";
import { useNavigate } from "react-router";
import PrimaryButton from "./PrimaryButton";

const CommingSoon = ({ btn }) => {
  const navogate = useNavigate();
  return (
    <div className="w-full h-screen text-center text-2xl">
      <h2 className="pt-32">Comming soon</h2>
      {btn && <PrimaryButton text="Back" onClick={() => navogate(-1)} className="mt-4" />}
    </div>
  );
};

export default CommingSoon;
