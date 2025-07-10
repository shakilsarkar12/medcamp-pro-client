import React from 'react';
import { FcGoogle } from 'react-icons/fc';

const GoogleLogin = () => {
  return (
    <button
      type="button"
      className="flex items-center justify-center border py-2 rounded hover:bg-gray-100 transition w-full"
    >
      <FcGoogle className="text-xl mr-2" />
      Continue with Google
    </button>
  );
};

export default GoogleLogin;