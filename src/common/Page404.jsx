import React from "react";
import { Link } from "react-router-dom";

export default function Page404() {
  return (
    <div className="flex flex-col justify-center items-center w-full h-screen">
      <p className="text-slate-500 capitalize font-semibold text-xl">
        PAGE NOT FOUND
      </p>
      <div className="text-9xl text-red-700 font-extrabold mb-10">404</div>
      <Link
        to="/"
        className="no-underline flex justify-center h-auto w-auto bg-blue-600 hover:bg-blue-800 text-white text-center px-5 py-2 rounded-lg cursor-pointer font-semibold"
      >
        GO TO HOME
      </Link>
    </div>
  );
}
