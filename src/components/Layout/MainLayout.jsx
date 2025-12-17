import React from "react";
import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";

export const MainLayout = ({ children, currentPage, onNavigate }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <Sidebar currentPage={currentPage} onNavigate={onNavigate} />
          <main className="flex-1">{children}</main>
        </div>
      </div>
    </div>
  );
};
