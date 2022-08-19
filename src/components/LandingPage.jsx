import React from "react";
import { GiMushroomHouse } from "react-icons/gi";
import { MdDashboard, MdGroups } from "react-icons/md";
import { FaBalanceScaleRight } from "react-icons/fa";
import { AiOutlineLogout } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { useContext } from "react";
import { AuthContext } from "../hooks/context";
import { Link, Outlet } from "react-router-dom";

export default function LandingPage() {
  const { logout, user } = useContext(AuthContext);
  var getInitials = function (string) {
    if (string) {
      var names = string.split(" "),
        initials = names[0].substring(0, 1).toUpperCase();

      if (names.length > 1) {
        initials += names[names.length - 1].substring(0, 1).toUpperCase();
      }
      return initials;
    }
    return "";
  };

  return (
    <div className="flex flex-row w-full h-screen">
      <div className="flex flex-col  w-1/5 bg-slate-200 h-screen  ">
        <div className="flex flex-row px-4 py-2 gap-2 text-2xl md:justify-center sm:justify-center lg:text-3xl  ">
          <div className="">
            <GiMushroomHouse />
          </div>
          <div className="font-sans font-extrabold md:hidden lg:flex">
            Households
          </div>
        </div>
        <div className="flex flex-col justify-between  h-full">
          <div className="text-2xl py-6 w-full ">
            <Link
              to="/"
              className="decoration-inherit text-black no-underline "
            >
              <button className="px-8 py-1  lg:justify-start md:justify-center sm:justify-center rounded-md hover:bg-slate-400 mb-1 hover:text-white  focus:bg-slate-600 focus:text-white w-full flex text-center">
                <span className="mr-1 p-1 text-center">
                  <MdDashboard />
                </span>
                <div className="sm:hidden md:hidden lg:flex ">Dashboard</div>
              </button>
            </Link>
            <Link
              to="/profile"
              className="decoration-inherit text-black no-underline "
            >
              <button className="px-8 py-1 lg:justify-start md:justify-center sm:justify-center rounded-md hover:bg-slate-400 mb-1 hover:text-white  focus:bg-slate-600 focus:text-white w-full flex text-center ">
                <span className="mr-1 p-1 text-center">
                  <CgProfile />
                </span>
                <div className="sm:hidden md:hidden lg:flex ">My Profile</div>
              </button>
            </Link>
            <Link
              to="/newGroup"
              className="decoration-inherit text-black no-underline "
            >
              <button className="px-8 py-1 lg:justify-start md:justify-center sm:justify-center rounded-md hover:bg-slate-400 mb-1 hover:text-white  focus:bg-slate-600 focus:text-white w-full flex text-center">
                <span className="mr-1 p-1 text-center">
                  <MdGroups />
                </span>
                <div className="sm:hidden md:hidden lg:flex ">New Group</div>
              </button>
            </Link>
            <Link
              to="/expense"
              className="decoration-inherit text-black no-underline"
            >
              <button className="px-8 py-1 lg:justify-start md:justify-center sm:justify-center rounded-md hover:bg-slate-400 mb-1 hover:text-white  focus:bg-slate-600 focus:text-white w-full flex text-center">
                <span className="mr-1 p-1 text-center">
                  <FaBalanceScaleRight />
                </span>
                <div className="sm:hidden md:hidden lg:flex ">Expenses</div>
              </button>
            </Link>
          </div>
          <div className=" flex justify-center text-3xl">
            <button
              onClick={logout}
              className="flex bg-slate-400 p-3 w-full justify-center hover:bg-slate-600 hover:text-white items-center"
            >
              <div className="mr-2">Log Out</div>
              <div>
                <AiOutlineLogout />
              </div>
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-right mr-0 w-4/5 scroll-smooth  overflow-scroll">
        <div className=" flex h-16 w-full shadow justify-end px-4 py-2  ">
          <Link
            to="/profile"
            className="decoration-inherit text-black no-underline "
          >
            <div className=" flex justify-center h-12 w-12 bg-slate-300 rounded-full place-items-center font-bold">
              {getInitials(user.FirstName)}
            </div>
          </Link>
        </div>

        <Outlet />
      </div>
    </div>
  );
}
