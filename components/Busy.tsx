import React from "react";
import PuffLoader from "react-spinners/PuffLoader";
import { RootState } from "../store";
import { useSelector } from "react-redux";

const Busy = () => {
  const { busy } = useSelector((state: RootState) => state.config);
  return (
    <div style={{ float: "right", position: "absolute", top: 10, right: 10 }}>
      <PuffLoader
        color={"white"}
        loading={busy}
        size={50}
        data-testid="loader"
      />
    </div>
  );
};

export default Busy;
