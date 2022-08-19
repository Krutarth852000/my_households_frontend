import React from "react";
import { GiMushroomHouse } from "react-icons/gi";
import Link from "react-scroll/modules/components/Link";
import { Link as Linker } from "react-router-dom";

export default function Header() {
  return (
    <div className="relative flex  flex-col bg-white">
      <nav className=" bg-white sticky top-0 z-50 lg:px-7">
        <div className="flex lg:justify-between flex-col lg:flex-row lg:p-2.5 p-1 max-w-full lg:py-6 py-1 font-extrabold">
          <div className="flex px-4 p-2 gap-2 text-2xl justify-center lg:text-3xl ">
            <div>
              <GiMushroomHouse />
            </div>
            <div className="font-sans">Households</div>
            <button className="lg:hidden inline-flex items-center justify-center h-10 w-10 rounded-md focus:outline-none ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={3}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>

          <div className="flex space-y-1 text-1xl lg:text-2xl place-items-center lg:flex-row flex-col p-1 lg:gap-10 font-extrabold">
            <Link
              className="text-black"
              activeClass="active"
              to="home"
              spy={true}
            >
              <button className="rounded-md p-1 px-2 hover:bg-black hover:text-white">
                Home
              </button>
            </Link>
            <Link className="text-black" to="features" spy={true}>
              <button className="rounded-md p-1 px-2 hover:bg-black hover:text-white">
                Features
              </button>
            </Link>
            <Link className="text-black" to="about" spy={true}>
              <button className="rounded-md p-1 px-2 hover:bg-black hover:text-white">
                About
              </button>
            </Link>
          </div>

          <hr className="lg:hidden" />
          <div className="flex  text-1xl lg:text-2xl lg:place-items-center lg:flex-row flex-col p-1 lg:gap-6 font-extrabold ">
            <Linker to="signup" className="text-black text-center">
              <button className="rounded-md p-2  hover:bg-black hover:text-white ">
                Sign Up
              </button>
            </Linker>
            <Linker to="login" className="text-black text-center">
              <button className="rounded-md p-2  hover:bg-black hover:text-white">
                Login
              </button>
            </Linker>
          </div>
        </div>
      </nav>
      <div
        id="home"
        className="flex flex-col  align-middle justify-center  text-center lg:py-20  h-screen"
      >
        <h1 className="text-yellow-900 text-5xl md:text-6xl md:px-20 lg:px-44 px-9 lg:text-8xl ">
          Manage your <span className="capitalize text-black">"groceries"</span>
          and <span className="capitalize text-black">"households"</span>
          easily.
        </h1>
        <h1 className="lg:text-3xl text-xl lg:px-24 lg:py-5 py-3 text-gray-600 font-normal">
          Notify yourself and your roomates to purchase the required households
          with just a <u>single click</u>.
        </h1>
        <div className="py-10">
          <Linker to="/signup" className="text-black">
            <button className="bg-gray-700 p-2 w-56  text-white rounded-lg hover:bg-black">
              Get started
            </button>
          </Linker>
        </div>
      </div>
      <div
        id="features"
        className="flex flex-col  align-middle justify-center  text-center lg:py-20 py-10 h-screen"
      >
        <h1 className="text-yellow-900 text-5xl md:text-6xl md:px-20 lg:px-44 px-9 lg:text-8xl ">
          Manage your <span className="capitalize text-black">"groceries"</span>
          and <span className="capitalize text-black">"households"</span>
          easily.
        </h1>
        <h1 className="lg:text-3xl text-xl lg:px-24 lg:py-5 py-3 text-gray-600 font-normal">
          Notify yourself and your roomates to purchase the required households
          with just a <u>single click</u>.
        </h1>
        <div className="py-10">
          <Linker to="/login" className="text-black">
            <button className="bg-gray-700 p-2 w-56  text-white rounded-lg hover:bg-black">
              Get started
            </button>
          </Linker>
        </div>
      </div>
      <div
        id="about"
        className="flex flex-col  align-middle justify-center  text-center lg:py-20 py-10 h-screen"
      >
        <h1 className="text-yellow-900 text-5xl md:text-6xl md:px-20 lg:px-44 px-9 lg:text-8xl ">
          Manage your <span className="capitalize text-black">"groceries"</span>
          and <span className="capitalize text-black">"households"</span>
          easily.
        </h1>
        <h1 className="lg:text-3xl text-xl lg:px-24 lg:py-5 py-3 text-gray-600 font-normal">
          Notify yourself and your roomates to purchase the required households
          with just a <u>single click</u>.
        </h1>
        <div className="py-10">
          <button className="bg-gray-700 p-2 w-56  text-white rounded-lg hover:bg-black">
            Get started
          </button>
        </div>
      </div>
    </div>
  );
}
