import React from "react";

export default function Loading() {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-slate bg-opacity-50 z-50">
      <p className="text-black text-2xl font-semibold">Loading...</p>
    </div>
  );
}
