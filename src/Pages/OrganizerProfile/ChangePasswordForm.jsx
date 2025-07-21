import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";

const ChangePasswordForm = ({ user }) => {
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (!oldPass || !newPass) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/users/change-password`,
        {
          email: user.email,
          oldPassword: oldPass,
          newPassword: newPass,
        }
      );

      if (res.data.success) {
        toast.success("Password changed successfully");
        setOldPass("");
        setNewPass("");
      } else {
        toast.error(res.data.message || "Failed to change password");
      }
    } catch (error) {
      toast.error("Something went wrong", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleChangePassword} className="mt-8 space-y-4">
      <h2 className="text-xl font-semibold text-gray-800">Change Password</h2>
      <input
        type="password"
        className="w-full border px-3 py-2 rounded focus:outline-[#2D91EF]"
        placeholder="Old password"
        value={oldPass}
        onChange={(e) => setOldPass(e.target.value)}
      />
      <input
        type="password"
        className="w-full border px-3 py-2 rounded focus:outline-[#2D91EF]"
        placeholder="New password"
        value={newPass}
        onChange={(e) => setNewPass(e.target.value)}
      />
      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        disabled={loading}
      >
        {loading ? "Changing..." : "Change Password"}
      </button>
    </form>
  );
};

export default ChangePasswordForm;
