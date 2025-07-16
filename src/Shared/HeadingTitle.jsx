import React from "react";

const HeadingTitle = ({ heading, title }) => {
  return (
    <>
      {heading && (
        <h2 className="text-xl md:text-2xl lg:text-3xl font-medium mb-6 text-center text-[#2D91EF]">
          {heading}
        </h2>
      )}

      {title && (
        <p className="text-base text-neutral text-center mb-8">{title}</p>
      )}
    </>
  );
};

export default HeadingTitle;
