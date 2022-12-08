import React from "react";
import Image from "next/image";
import Link from "next/link";
import Worker from "./Worker";
import { Dispatch } from "../store";
import { useDispatch } from "react-redux";
const MenuBar = () => {
  const dispatch = useDispatch<Dispatch>();
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-light bg-gradient-to-t from-[#3c4b62] to-[#5a739b] w-full relative">
        <div className="container">
          <Link className="navbar-brand text-white my-0" href={"/"}>
            <Image
              src={"/enugu.jpg"}
              alt={"Logo"}
              width={35}
              height={35}
              className="d-inline-block align-text-top imaged rounded float-left mr-3 shadow-black"
            />{" "}
            <h2 className="h3">Rural Development, Enugu</h2>
          </Link>

          <button
            className="navbar-toggler text-white z-50"
            type="button"
            onClick={dispatch.config.toggleSideMenu}
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div
            className="collapse navbar-collapse "
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Link
                </a>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Dropdown
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item" href="#">
                      Action
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Another action
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Something else here
                    </a>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <a className="nav-link disabled">Disabled</a>
              </li>
            </ul>
            <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>{" "}
      <Worker />
    </>
  );
};

export default MenuBar;
