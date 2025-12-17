import React from "react";

export const LoadingSpinner = ({ size = "md", text = "Loading..." }) => {
  const sizes = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div
        className={`${sizes[size]} border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin`}
      />
      {text && <p className="text-gray-600">{text}</p>}
    </div>
  );
};
