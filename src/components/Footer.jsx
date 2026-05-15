import React from "react";
import useDisableInspect from "../hooks/useDisableInspect"; 

export default function Footer() {
  useDisableInspect(); 

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 transition-colors duration-300 py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center gap-2 text-center">
        <p className="text-gray-600 dark:text-gray-400 font-medium">
          © {new Date().getFullYear()} Pranaw Gautam. All rights reserved.
        </p>
        <p className="text-gray-500 dark:text-gray-500 text-sm">
          Satna, Madhya Pradesh | +91 8109260602
        </p>
      </div>
    </footer>
  );
}