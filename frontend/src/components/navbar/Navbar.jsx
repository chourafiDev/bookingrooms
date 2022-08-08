import React from "react";
import { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout, reset } from "../../redux/features/auth/authSlice";
import { BsList } from "react-icons/bs";

import { Menu, Transition } from "@headlessui/react";
import { FiChevronDown, FiUser, FiCalendar, FiShieldOff } from "react-icons/fi";
import { BiBookmark } from "react-icons/bi";
import logo from "../../assets/logo.svg";

const Navbar = () => {
  const [nav, setNav] = useState(false);

  const handelNav = () => {
    setNav(!nav);
  };

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(reset());
  };

  return (
    <div className="w-full h-20 z-[100]">
      <div className="flex justify-between items-center w-full h-full px-4 lg:px-12">
        <p className="text-dark font-bold text-2xl">
          <Link to="/">
            <img src={logo} alt="logo" className="w-36" />
          </Link>
        </p>
        <div className="hidden md:flex items-center gap-10">
          <ul className="flex items-center font-roboto-mono">
            <Link to="/">
              <li className="ml-12 text-[15px] text-dark font-bold text-lightest-slate tracking-wide hover:text-blue duration-300 ease-in">
                Home
              </li>
            </Link>
            <Link to="/rooms">
              <li className="ml-12 text-[15px] text-dark font-bold text-lightest-slate tracking-wide hover:text-green duration-300 ease-in">
                Rooms
              </li>
            </Link>
            <Link to="/about">
              <li className="ml-12 text-[15px] text-dark font-bold text-lightest-slate tracking-wide hover:text-green duration-300 ease-in">
                About
              </li>
            </Link>
            <Link to="/services">
              <li className="ml-12 text-[15px] text-dark font-bold text-lightest-slate tracking-wide hover:text-green duration-300 ease-in">
                Services
              </li>
            </Link>
            <Link to="/contact">
              <li className="ml-12 text-[15px] text-dark font-bold text-lightest-slate tracking-wide hover:text-green duration-300 ease-in">
                Contact
              </li>
            </Link>
          </ul>
          {user ? (
            <Menu as="div" className="relative inline-block text-left z-10">
              <div>
                <Menu.Button className="inline-flex w-full justify-center rounded-md bg-blue px-4 py-2 text-sm font-medium text-white hover:bg-opacity-80">
                  {user.username}
                  <FiChevronDown
                    className="ml-2 -mr-1 h-5 w-5"
                    aria-hidden="true"
                  />
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg focus:outline-none">
                  <div className="px-1 py-1 ">
                    <Menu.Item>
                      {({ active }) => (
                        <div
                          className={`${
                            active
                              ? "bg-blue/20 text-dark font-semibold"
                              : "text-dark font-semibold"
                          } group flex gap-2 w-full items-center rounded-md px-2 py-2 text-sm cursor-pointer hover:text-blue`}
                        >
                          <FiUser className="font-semibold" />
                          <p>Profile</p>
                        </div>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          to="/bookings"
                          className={`${
                            active
                              ? "bg-blue/20 text-dark font-semibold"
                              : "text-dark font-semibold"
                          } group flex gap-2 w-full items-center rounded-md px-2 py-2 text-sm cursor-pointer hover:text-blue`}
                        >
                          <FiCalendar className="font-semibold" />
                          <p>My Bookings</p>
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          to="/rooms-saved"
                          className={`${
                            active
                              ? "bg-blue/20 text-dark font-semibold"
                              : "text-dark font-semibold"
                          } group flex gap-2 w-full items-center rounded-md px-2 py-2 text-sm cursor-pointer hover:text-blue`}
                        >
                          <BiBookmark className="font-semibold" />
                          <p>Saved</p>
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <div
                          onClick={handleLogout}
                          className={`${
                            active
                              ? "bg-blue/20 text-dark font-semibold"
                              : "text-dark font-semibold"
                          } group flex gap-2 w-full items-center rounded-md px-2 py-2 text-sm cursor-pointer hover:text-blue`}
                        >
                          <FiShieldOff className="font-semibold" />
                          <p>Logout</p>
                        </div>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          ) : (
            <Link to="/login">
              <button className="btn btn-primary">Login</button>
            </Link>
          )}
        </div>

        <div onClick={handelNav} className="md:hidden cursor-pointer">
          <BsList className="text-dark text-2xl" />
        </div>
      </div>

      {/* responsive menu */}
      <div
        className={
          nav
            ? "md:hidden fixed left-0 top-0 w-full h-full bg-dark/30 backdrop-blur-sm z-10"
            : ""
        }
      >
        <div
          className={
            nav
              ? "fixed left-0 top-0 w-[75%] sm:w-[60%] h-full md:w-[45%] bg-white p-6 ease-in duration-500"
              : "fixed left-[-100%] top-0  p-10 ease-in duration-500"
          }
        >
          <div className="border-b border-dark/10 pb-4">
            <div className="flex justify-between w-full items-center">
              <p className="text-dark font-bold text-xl">
                <Link to="/">
                  <img src={logo} alt="logo" className="w-36" />
                </Link>
              </p>
              <div
                onClick={handelNav}
                className="rounded-full cursor-pointer shadow-md w-10 h-10 flex items-center justify-center"
              >
                <span className="text-green">x</span>
              </div>
            </div>
          </div>
          <div className="py-4 flex flex-col justify-between h-full">
            <ul className="uppercase">
              <Link to="/">
                <li className="py-4 text-sm text-lightest-slate tracking-wide">
                  Home
                </li>
              </Link>
              <Link to="/rooms">
                <li className="py-4 text-sm text-lightest-slate tracking-wide">
                  Rooms
                </li>
              </Link>
              <Link to="/about">
                <li className="py-4 text-sm text-lightest-slate tracking-wide">
                  About
                </li>
              </Link>
              <Link to="/services">
                <li className="py-4 text-sm text-lightest-slate tracking-wide">
                  Services
                </li>
              </Link>
              <Link to="/contact">
                <li className="py-4 text-sm text-lightest-slate tracking-wide">
                  Contact
                </li>
              </Link>
            </ul>
            {user ? (
              <div className="flex flex-col gap-6 mt-10 ">
                <p className="bg-blue/20 rounded-md py-3 px-4">
                  Welcome{" "}
                  <span className="text-blue font-semibold">
                    {user.username}
                  </span>
                </p>
                <button className="btn btn-primary" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            ) : (
              <Link to="login" className="btn-primary">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
