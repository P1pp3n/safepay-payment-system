import React from "react";

export const Card = ({
  children,
  title,
  subtitle,
  action,
  className = "",
  padding = "p-6",
  hover = false,
}) => {
  return (
    <div
      className={`bg-white rounded-xl shadow-lg border border-gray-200 ${padding} ${
        hover ? "hover:shadow-xl transition-shadow" : ""
      } ${className}`}
    >
      {(title || action) && (
        <div className="flex items-center justify-between mb-4">
          <div>
            {title && (
              <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            )}
            {subtitle && (
              <p className="text-sm text-gray-600 mt-1">{subtitle}</p>
            )}
          </div>
          {action && <div>{action}</div>}
        </div>
      )}
      {children}
    </div>
  );
};
