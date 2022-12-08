import React, { useEffect } from "react";
import Router from "next/router";
import nextCookie from "next-cookies";
import cookie from "js-cookie";

import { Dispatch } from "../store";
import { useDispatch } from "react-redux";

// Login & Create session for a given minutes time
export const authLogin = (token: string) => {
  const expire_time: any = process.env.COOKIE_TIME_IN_MINS || 10;
  const inMinutes = new Date(new Date().getTime() + expire_time * 60 * 1000);
  cookie.set("token", token as string, { expires: inMinutes });
  Router.push("/dashboard");
};

export const auth = (ctx: any) => {
  const { token } = nextCookie(ctx);
  // If there's no token, it means the user is not logged in.
  if (ctx.req && !token) {
    if (typeof window === "undefined") {
      ctx.res.writeHead(302, { Location: "/login" });
      ctx.res.end();
    } else {
      Router.push("/login");
    }
  }
  return token;
};

export const authlogout = () => {
  cookie.remove("token");
  // to support logging out from all windows
  window.localStorage.setItem("logout", `${Date.now()}`);
  Router.push("/login");
};

const getProfile = async (token: string) => {
  const res = await fetch(`/api/accounts/${token}/profile`);
  const data = await res.json();
  return data.profile;
};

export const withAuthSync = (WrappedComponent: any) => {
  const Wrapper = (props: any) => {
    const dispatch = useDispatch<Dispatch>();
    const syncLogout = (event: any) => {
      if (event.key === "logout") {
        console.log("logged out from storage!");
        Router.push("/login");
      }
    };

    useEffect(() => {
      window.addEventListener("storage", syncLogout);
      const token = cookie.get("token");
      if (token) {
        dispatch.config.setBusy(true);
        // Update Profile in state //
        getProfile(token).then((profile) => {
          dispatch.config.setProfile(profile);
        });
        // alert(JSON.stringify(profile));
        // Update Profile in state //
        dispatch.config.setBusy(false);
        return () => {
          window.removeEventListener("storage", syncLogout);
          window.localStorage.removeItem("logout");
        };
      } else {
        authlogout();
      }
    }, [dispatch.config, dispatch.config.setProfile]);

    return <WrappedComponent {...props} />;
  };
  Wrapper.getInitialProps = async (ctx: any) => {
    const { token } = nextCookie(ctx);
    const componentProps =
      WrappedComponent.getInitialProps &&
      (await WrappedComponent.getInitialProps(ctx));
    return { ...componentProps, token };
  };
  return Wrapper;
};
