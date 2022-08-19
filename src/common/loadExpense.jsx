import React from "react";
import { Link, Outlet } from "react-router-dom";

export default function LoadExpense({ groupId }) {
  return (
    <div className="w-full flex flex-col">
      <div className="flex flex-row ">
        <Link
          to={`/expense/${groupId}`}
          className="decoration-inherit text-gray-500 no-underline hover:text-black focus:text-black "
        >
          <h6 className="mr-3 font-normal">Active</h6>
        </Link>
        <Link
          to={`/expense/${groupId}/expenseSettled`}
          className="decoration-inherit text-gray-500 no-underline  hover:text-black focus:text-black"
        >
          <h6 className="mr-3 font-normal">Settled</h6>
        </Link>
      </div>

      <hr className="w-full mt-0" />
      <div className="w-full h-auto">
        <Outlet />
      </div>
    </div>
  );
}
