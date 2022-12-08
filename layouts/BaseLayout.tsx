import React from "react";
import Head from "next/head";
type BLProps = { children: React.ReactNode };

const BaseLayout = ({ children }: BLProps) => {
  return (
    <>
      <Head>
        <title>Welcome the MRD Enugu</title>
      </Head>
      <div className="bg-gradient-to-b from-[#576a88] to-black">{children}</div>
    </>
  );
};

export default BaseLayout;
