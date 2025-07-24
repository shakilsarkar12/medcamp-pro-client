import React, { useState } from "react";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaPaperPlane,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaGlobe,
} from "react-icons/fa";
import { toast } from "sonner";
import useAuth from "../../Utils/Hooks/useAuth";
import SecondaryButton from "../../Shared/SecondaryButton";
import HeadingTitle from "../../Shared/HeadingTitle";
import axios from "axios";

const ContactUS = () => {
  const { user } = useAuth();
  const [modalOpen, setModalOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/contact-messages`, {
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
    <div className="min-h-[70vh] flex flex-col items-center justify-center py-10">
      <div className="max-w-5xl w-full bg-white rounded-xl shadow border border-gray-200 p-4">
        <HeadingTitle
          heading="Contact Us"
          title="We'd love to hear from you! Reach out for any queries, feedback, or support."
        />
        {/* Contact Info & Office Hours in 2 columns */}
        <div className="mt-8 flex flex-col sm:flex-row justify-around gap-8">
          {/* Contact Info */}
          <div className="text-center sm:text-start">
            <div className="flex items-center gap-2">
              <FaEnvelope className="text-[#2D91EF] text-xl" />
              <a
                href="#"
                onClick={() => setModalOpen(true)}
                className="text-[#2D91EF] hover:underline"
              >
                support@medcamp-pro.com
              </a>
            </div>
            <div className="flex items-center gap-2">
              <FaPhoneAlt className="text-[#2D91EF] text-xl" />
              <a
                href="tel:+880123456789"
                className="text-[#2D91EF] hover:underline"
              >
                +880 1234 56789
              </a>
            </div>
            <div className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-[#2D91EF] text-xl" />
              <span className="text-gray-600">Dhaka, Bangladesh</span>
            </div>
          </div>
          {/* Office Hours */}
          <div className="text-center sm:text-start">
            <h4 className="text-lg font-bold text-[#2D91EF] mb-2">
              Office Hours
            </h4>
            <p className="text-gray-600">
              Saturday - Thursday: 9:00 AM - 6:00 PM
            </p>
            <p className="text-gray-600">Friday: Closed</p>
          </div>
        </div>

        <div className="mt-8">
          <h4 className="text-lg font-bold text-[#2D91EF] mb-2 text-center">
            Frequently Asked Questions
          </h4>
          <ul className="space-y-3">
            <li>
              <span className="font-semibold text-gray-700">
                How can I join a camp?
              </span>
              <br />
              <span className="text-gray-500 text-sm">
                Visit our Available Camps page and register for any upcoming
                event.
              </span>
            </li>
            <li>
              <span className="font-semibold text-gray-700">
                Can I volunteer?
              </span>
              <br />
              <span className="text-gray-500 text-sm">
                Yes! Contact us or fill out the volunteer form to get started.
              </span>
            </li>
            <li>
              <span className="font-semibold text-gray-700">
                How do I get support?
              </span>
              <br />
              <span className="text-gray-500 text-sm">
                Email us or call our hotline during office hours.
              </span>
            </li>
          </ul>
        </div>
        <div className="mt-8 flex justify-center">
          <iframe
            title="Medicamp Pro Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.902019417783!2d90.3910630751056!3d23.75090367869209!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b894c2b2e0b1%3A0x7e0e7e0e7e0e7e0e!2sDhaka!5e0!3m2!1sen!2sbd!4v1680000000000!5m2!1sen!2sbd"
            width="100%"
            height="200"
            style={{ borderRadius: "12px", border: "1px solid #2D91EF" }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
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
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-xl shadow-2xl px-4 py-10 max-w-md w-full relative animate-fadeIn">
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
