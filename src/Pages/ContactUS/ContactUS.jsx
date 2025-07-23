import React, { useState } from "react";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaPaperPlane,
} from "react-icons/fa";
import { toast } from "sonner";
import useAuth from "../../Utils/Hooks/useAuth";
import axiosSecure from "../../Utils/axiosSecure";
import SecondaryButton from "../../Shared/SecondaryButton";
import HeadingTitle from "../../Shared/HeadingTitle";

const ContactUS = () => {
  const { user } = useAuth();
  const [modalOpen, setModalOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axiosSecure.post("/contact-messages", {
        name: user?.displayName || "",
        email: user?.email || "",
        message,
      });
      toast.success("Message sent successfully!");
      setMessage("");
      setModalOpen(false);
    } catch {
      toast.error("Failed to send message.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-10">
      <div className="max-w-xl w-full bg-white rounded-xl shadow border border-gray-200 p-8">
        <HeadingTitle
          heading="Contact Us"
          title="We'd love to hear from you! Reach out for any queries, feedback, or
          support."
        />
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <FaEnvelope className="text-[#2D91EF] text-xl" />
            <span className="font-medium text-gray-700">Email:</span>
            <a
              href="#"
              onClick={() => setModalOpen(true)}
              className="text-[#2D91EF] hover:underline"
            >
              support@medcamp-pro.com
            </a>
          </div>
          <div className="flex items-center gap-3">
            <FaPhoneAlt className="text-[#2D91EF] text-xl" />
            <span className="font-medium text-gray-700">Phone:</span>
            <a
              href="tel:+880123456789"
              className="text-[#2D91EF] hover:underline"
            >
              +880 1234 56789
            </a>
          </div>
          <div className="flex items-center gap-3">
            <FaMapMarkerAlt className="text-[#2D91EF] text-xl" />
            <span className="font-medium text-gray-700">Address:</span>
            <span className="text-gray-600">Dhaka, Bangladesh</span>
          </div>
        </div>
        <div className="mt-8 text-center">
          <SecondaryButton
            onClick={() => setModalOpen(true)}
            className="flex items-center justify-center gap-2 w-fit mx-auto"
          >
            <FaPaperPlane /> Send Email
          </SecondaryButton>
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full relative animate-fadeIn">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-2xl md:text-3xl"
              onClick={() => setModalOpen(false)}
              aria-label="Close"
            >
              &times;
            </button>
            <h3 className="text-xl font-bold text-[#2D91EF] mb-4 text-center flex items-center justify-center gap-2">
              <FaPaperPlane className="text-[#2D91EF]" /> Send a Message
            </h3>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="text"
                value={user?.displayName || ""}
                readOnly
                className="border rounded px-4 py-2 bg-gray-100 text-gray-700 focus:outline-[#2D91EF]"
                placeholder="Your Name"
              />
              <input
                type="email"
                value={user?.email || ""}
                readOnly
                className="border rounded px-4 py-2 bg-gray-100 text-gray-700 focus:outline-[#2D91EF]"
                placeholder="Your Email"
              />
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                rows={5}
                className="border rounded px-4 py-2 resize-none focus:outline-[#2D91EF] text-gray-700"
                placeholder="Type your message here..."
              />
              <SecondaryButton
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 mr-2 text-white"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8z"
                      />
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>
                    <FaPaperPlane /> Send
                  </>
                )}
              </SecondaryButton>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactUS;
