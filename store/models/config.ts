import { createModel } from "@rematch/core";
import { RootModel } from ".";
import { WebWindow, Profile } from "../../interfaces";

export const config = createModel<RootModel>()({
  state: {
    sidemenu: false,
    windows: { width: 0, height: 0, size: "xl" } as WebWindow,
    busy: false,
    worker: true,
    profile: {} as Profile,
  },
  reducers: {
    setBusy: (state, payload: boolean) => {
      return { ...state, busy: payload };
    },
    setWebWindow: (state, payload: WebWindow) => {
      return { ...state, windows: payload };
    },
    setProfile: (state, payload: Profile) => {
      return { ...state, profile: payload };
    },
    toggleSideMenu: (state) => {
      return { ...state, sidemenu: !state.sidemenu };
    },
  },
  effects: (dispatch) => ({
    async setBusyAsync(payload: boolean, rootState) {
      await this.setBusy(payload);
    },
  }),
});
