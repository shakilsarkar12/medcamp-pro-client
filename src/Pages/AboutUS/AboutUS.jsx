import React from "react";
import HeadingTitle from "../../Shared/HeadingTitle";
import SecondaryButton from "../../Shared/SecondaryButton";

const AboutUS = () => {
  return (
    <div className="min-h-screen flex flex-col items-center py-10">
      <div className="max-w-6xl w-full">
        <HeadingTitle
          heading="About Medicamp Pro"
          title="Medicamp Pro is dedicated to organizing and managing medical camps for communities in need. Our mission is to connect healthcare professionals, volunteers, and organizers to deliver essential medical services and awareness across Bangladesh."
        />
      </div>

      {/* Vision, Collaboration, Events */}
      <div className="flex flex-col gap-6 mt-6">
        <div className="flex items-center gap-3">
          <span className="text-2xl font-bold text-[#2D91EF]">🌟</span>
          <span className="font-medium text-gray-700">
            <span className="text-[#2D91EF] font-bold">Our Vision:</span>{" "}
            Healthy communities, accessible healthcare for all.
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-2xl font-bold text-[#2D91EF]">🤝</span>
          <span className="font-medium text-gray-700">
            <span className="text-[#2D91EF] font-bold">Collaboration:</span> We
            work with doctors, volunteers, and local organizers to make every
            camp impactful.
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-2xl font-bold text-[#2D91EF]">📅</span>
          <span className="font-medium text-gray-700">
            <span className="text-[#2D91EF] font-bold">Events:</span> Hundreds
            of successful camps, thousands of lives touched.
          </span>
        </div>
      </div>

      {/* New Section: Our Services */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold text-[#2D91EF] mb-3 text-center">
          Our Services
        </h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <li className="bg-blue-50 rounded-xl p-5 shadow flex flex-col items-center">
            <span className="text-3xl mb-2">🩺</span>
            <span className="font-semibold text-gray-700">
              Free Health Checkups
            </span>
            <span className="text-gray-500 text-sm mt-1 text-center">
              Basic health screening and doctor consultations for all ages.
            </span>
          </li>
          <li className="bg-blue-50 rounded-xl p-5 shadow flex flex-col items-center">
            <span className="text-3xl mb-2">💊</span>
            <span className="font-semibold text-gray-700">
              Medicine Distribution
            </span>
            <span className="text-gray-500 text-sm mt-1 text-center">
              Essential medicines provided to those in need during camps.
            </span>
          </li>
          <li className="bg-blue-50 rounded-xl p-5 shadow flex flex-col items-center">
            <span className="text-3xl mb-2">🧑‍🏫</span>
            <span className="font-semibold text-gray-700">
              Health Awareness
            </span>
            <span className="text-gray-500 text-sm mt-1 text-center">
              Workshops and seminars to educate communities about health.
            </span>
          </li>
          <li className="bg-blue-50 rounded-xl p-5 shadow flex flex-col items-center">
            <span className="text-3xl mb-2">🚑</span>
            <span className="font-semibold text-gray-700">
              Emergency Support
            </span>
            <span className="text-gray-500 text-sm mt-1 text-center">
              Quick response and support for urgent medical needs.
            </span>
          </li>
        </ul>
      </div>

      {/* New Section: Why Choose Us */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold text-[#2D91EF] mb-3 text-center">
          Why Choose Medicamp Pro?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-teal-50 rounded-xl p-5 shadow flex flex-col items-center">
            <span className="text-3xl mb-2">✅</span>
            <span className="font-semibold text-gray-700">Trusted Team</span>
            <span className="text-gray-500 text-sm mt-1 text-center">
              Experienced doctors, organizers, and volunteers.
            </span>
          </div>
          <div className="bg-teal-50 rounded-xl p-5 shadow flex flex-col items-center">
            <span className="text-3xl mb-2">🌍</span>
            <span className="font-semibold text-gray-700">
              Nationwide Reach
            </span>
            <span className="text-gray-500 text-sm mt-1 text-center">
              Camps organized in cities and villages across Bangladesh.
            </span>
          </div>
          <div className="bg-teal-50 rounded-xl p-5 shadow flex flex-col items-center">
            <span className="text-3xl mb-2">💡</span>
            <span className="font-semibold text-gray-700">
              Innovative Approach
            </span>
            <span className="text-gray-500 text-sm mt-1 text-center">
              Modern technology for camp management and registration.
            </span>
          </div>
          <div className="bg-teal-50 rounded-xl p-5 shadow flex flex-col items-center">
            <span className="text-3xl mb-2">❤️</span>
            <span className="font-semibold text-gray-700">
              Community Focused
            </span>
            <span className="text-gray-500 text-sm mt-1 text-center">
              We care about every individual and every community.
            </span>
          </div>
        </div>
      </div>

      {/* Contact Button */}
      <div className="mt-12 text-center">
        <SecondaryButton
          to="/contact-us"
        >
          Contact Us
        </SecondaryButton>
      </div>
    </div>
  );
};

export default AboutUS;
