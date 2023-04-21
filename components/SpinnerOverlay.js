import React from "react";

const SpinnerOverlay = ({ active, imageRef }) => {
  return (
    <div
      className={`absolute inset-0 bg-white bg-opacity-75 flex justify-center items-center ${
        active ? "" : "hidden"
      }`}
    >
      <svg className="animate-spin h-12 w-12 text-gray-500" viewBox="0 0 24 24">
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
          d="M18.295 5.705a10 10 0 00-14.142 0l1.415 1.414a8 8 0 0111.314 0l1.414-1.414zM5.705 18.295a10 10 0 0014.142 0l-1.415-1.414a8 8 0 01-11.314 0l-1.414 1.414z"
        />
      </svg>
    </div>
  );
};

export default SpinnerOverlay;
