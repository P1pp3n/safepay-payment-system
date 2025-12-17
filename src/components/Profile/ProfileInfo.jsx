import React from "react";
import { getInitials } from "../../utils/helpers";

export const ProfileInfo = ({ user }) => {
  return (
    <div className="flex items-center space-x-6 mb-8">
      <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-3xl font-bold">
        {getInitials(user.name)}
      </div>
      <div>
        <h3 className="text-2xl font-bold text-gray-900">{user.name}</h3>
        <p className="text-gray-600">{user.email}</p>
        <p className="text-gray-600">{user.phone}</p>
      </div>
    </div>
  );
};
