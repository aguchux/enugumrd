import React from "react";
import Head from "next/head";
type BLProps = { children: React.ReactNode };

const BaseLayout = ({ children }: BLProps) => {
  return (
    <>
      <Head>
        <title>Welcome the MRD Enugu</title>
      </Head>
      <div className="absolute top-0 left-0 bg-gradient-to-b from-[#1e293b] to-black h-full w-full overflow-hidden">
        {children}
      </div>
    </>
  );
};

export default BaseLayout;
