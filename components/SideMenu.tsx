import React from "react";
import Link from "next/link";
import { authlogout } from "../utils/withAuthSync";
import { useSelector } from "react-redux";
import { RootState } from "../store";

const SideMenu = () => {
  const { windows, sidemenu } = useSelector((state: RootState) => state.config);
  const smallWindow =
    windows.size === "sm" || windows.size === "ms" || windows.size === "xs";
  return (
    <>
      <div
        className={`bg-black pt-10 text-white ${
          smallWindow
            ? sidemenu
              ? "absolute top-0 left-0 w-[50%] z-10 h-screen"
              : "hidden"
            : "col-2 col-md-2 col-lg-2 col-xl-2 col-xxl-2"
        }`}
      >
        <h1 className="h6">
          Dashboard
          <hr className="mt-2" />
        </h1>
        <div className="my-3 min-h-[50px]">
          <ul>
            <li>
              <Link
                className="text-[#7ba3df] hover:text-[#a4b2c7]"
                href="/dashboard/"
              >
                My Account
              </Link>
            </li>
            <li>
              <Link
                className="text-[#7ba3df] hover:text-[#a4b2c7]"
                href="/dashboard/"
              >
                Office Visitations
              </Link>
            </li>
            <li>
              <Link
                className="text-[#7ba3df] hover:text-[#a4b2c7]"
                href="/dashboard/"
              >
                Settings
              </Link>
            </li>
            <li>
              <Link
                className="text-danger hover:text-danger"
                href="#"
                onClick={authlogout}
              >
                Logout
              </Link>
            </li>
          </ul>
        </div>
        <h1 className="h6">
          Communities
          <hr className="mt-2" />
        </h1>
        <div className="my-3 min-h-[50px]">
          <ul>
            <li>
              <Link
                className="text-[#7ba3df] hover:text-[#a4b2c7]"
                href="/dashboard/"
              >
                All Communities
              </Link>
            </li>
            <li>
              <Link
                className="text-[#7ba3df] hover:text-[#a4b2c7]"
                href="/dashboard/"
              >
                Add Community
              </Link>
            </li>
          </ul>
        </div>
        <h1 className="h6">
          Appointments
          <hr className="mt-2" />
        </h1>
        <div className="my-3 min-h-[50px]">
          <ul>
            <li>
              <Link
                className="text-[#7ba3df] hover:text-[#a4b2c7]"
                href="/dashboard/"
              >
                Appointments
              </Link>
            </li>
            <li>
              <Link
                className="text-[#7ba3df] hover:text-[#a4b2c7]"
                href="/dashboard/"
              >
                Our Calender
              </Link>
            </li>
          </ul>
        </div>
        <h1 className="h6">
          History & Logs
          <hr className="mt-2" />
        </h1>
        <div className="my-3 min-h-[50px]">
          <ul>
            <li>
              <span className="text-[#fffff]">SIZE:</span>
              <span className="badge badge-primary">{windows.size}</span>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default SideMenu;
