import React from "react";
import { Dispatch, RootState } from "../store";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { authLogin } from "../utils/withAuthSync";
import Busy from "./Busy";

type Logon = {
  username: string;
  password: string;
};

const LoginForm = () => {
  const dispatch = useDispatch<Dispatch>();
  const [logon, setLogon] = useState<Logon>({ username: "", password: "" });
  const { busy } = useSelector((state: RootState) => state.config);
  const doLogin = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    dispatch.config.setBusyAsync(true);
    const res = await fetch("/api/login", {
      method: "POST",
      credentials: "same-origin",
      mode: "cors",
      referrerPolicy: "no-referrer",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(logon),
    });
    const { status, token } = await res.json();
    if (status) {
      dispatch.config.setBusy(false);
      authLogin(token);
    }
    dispatch.config.setBusy(false);
  };
  return (
    <>
      <div className="w-[400px] min-h-[350px] mx-[auto] border-2 rounded-2xl mt-[10%] shadow-xl shadow-slate-500 relative">
        <Busy />
        <form action="#" onSubmit={doLogin}>
          <div className="form-group mt-5 mx-3">
            <h1 className="h1 mt-3 text-center text-white mb-0 pb-0">Login</h1>
            <label htmlFor="email" />
            <input
              type="email"
              className="form-control form-control-lg"
              aria-describedby="emailHelpId"
              autoComplete="off"
              value={logon.username}
              required={true}
              placeholder="Email Address"
              onChange={(e) => setLogon({ ...logon, username: e.target.value })}
            />
            <small id="emailHelpId" className="form-text text-muted">
              Request logon from your Commissioner
            </small>
            <label htmlFor="password" />
            <input
              type="password"
              autoComplete="off"
              required={true}
              value={logon.password}
              className="form-control form-control-lg mt-2"
              placeholder="Password"
              onChange={(e) => setLogon({ ...logon, password: e.target.value })}
            />
            <button
              type="submit"
              className="btn btn-primary btn-lg btn-block w-full mt-3"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default LoginForm;
