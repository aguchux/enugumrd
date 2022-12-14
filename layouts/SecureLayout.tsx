"use client";

import React, { useEffect } from "react";
import Head from "next/head";
import MenuBar from "../components/MenuBar";

import SideMenu from "../components/SideMenu";
import { getWindowDimensions } from "../utils/windows";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch, RootState } from "../store";
import Widget from "../components/Widget";
type BLProps = { children: React.ReactNode };

const BaseLayout = ({ children }: BLProps) => {
  const dispatch = useDispatch<Dispatch>();
  useEffect(() => {
    dispatch.config.setWebWindow(getWindowDimensions());
    const handleResize = () => {
      dispatch.config.setWebWindow(getWindowDimensions());
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [dispatch.config]);

  return (
    <>
      <Head>
        <title>Welcome the MRD Enugu</title>
      </Head>
      <MenuBar />
      <div className="container-fluid">
        <div className="row">
          <SideMenu />
          <div className="col-12 col-md-7 col-lg-7 col-xl-7 col-xxl-7 mt-3 h-screen">
            <div className="container">{children}</div>
          </div>
          <Widget />
        </div>
      </div>
    </>
  );
};

export default BaseLayout;
