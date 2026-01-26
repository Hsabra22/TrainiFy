"use client";

import React from "react";

const Loading = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4">
        
        <div className="relative h-14 w-14">
          <span className="absolute inset-0 rounded-full border-4 border-gray-200"></span>
          <span className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin"></span>
        </div>

        <p className="text-sm font-medium text-gray-600 tracking-wide">
          Activating your experience…
        </p>
      </div>
    </div>
  );
};

export default Loading;
