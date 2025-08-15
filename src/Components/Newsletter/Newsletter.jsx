import React, { useState } from "react";
import Spinner from "../../Shared/Spinner";
import { MdAlignHorizontalCenter } from "react-icons/md";
import SecondaryButton from "../../Shared/SecondaryButton";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Reset message states
    setMessage("");
    setMessageType("");

    // Simple validation check for a non-empty email
    if (!email) {
      setMessage("Please enter your email address.");
      setMessageType("error");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      const isSuccess = Math.random() > 0.2;

      if (isSuccess) {
        setMessage("Thank you! You're all set to receive our updates.");
        setMessageType("success");
        setEmail("");
      } else {
        setMessage("Oops! Something went wrong. Please try again later.");
        setMessageType("error");
      }

      // Reset loading state
      setIsLoading(false);
    }, 1500); // 1.5 second delay
  };

  return (
    <div className="bg-white p-4 md:p-6 rounded-md shadow w-full text-center transform transition-transform duration-500 ease-in-out">
      {/* Newsletter Header */}
      <div className="flex flex-col items-center">
        <div className="mb-6 p-4 rounded-full bg-blue-50 dark:bg-blue-950 text-[#2D91EF]">
          <MdAlignHorizontalCenter size={36} strokeWidth={2} />
        </div>
        <h2 className="text-3xl sm:text-4xl font-semibold text-[#2D91EF] dark:text-white mb-2 leading-tight">
          Stay Connected
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-3xl mx-auto">
          Join our mailing list to get the latest news and updates delivered to
          your inbox.
        </p>
      </div>

      {/* Newsletter Form */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto"
      >
        <input
          type="email"
          placeholder="Enter your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-[#2D91EF] rounded-md px-3 py-1.5 focus:outline-[#2D91EF] w-full placeholder:text-sm"
          required
          disabled={isLoading}
        />
        <SecondaryButton type="submit">
          {isLoading ? "Subscribing..." : "Subscribe"}
        </SecondaryButton>
      </form>

      {/* Dynamic feedback message section */}
      {message && (
        <div
          className={`mt-6 p-4 rounded-xl font-medium text-center max-w-2xl mx-auto ${
            messageType === "success"
              ? "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300"
              : "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300"
          }`}
        >
          {message}
        </div>
      )}
    </div>
  );
};

export default Newsletter;
