import { createModel } from "@rematch/core";
import { RootModel } from ".";

export const communities = createModel<RootModel>()({
  state: {
    communities: [],
    selectedCommunity: 0,
  },
  reducers: {
    setBusy: (state, payload: boolean) => {
      return { ...state, busy: payload };
    },
    selectCommunity: (state, payload: number) => {
      return { ...state, selectedCommunity: payload };
    },
  },
  effects: (dispatch) => ({
    async setBusyAsync(payload: boolean, rootState) {
      await this.setBusy(payload);
    },
  }),
});
