import createPersistedState from "vuex-persistedstate";

export const plugins = [createPersistedState()];

export const actions = {
  nuxtServerInit({ dispatch }, context) {
    return Promise.all([dispatch("user/nuxtServerInit", context)]);
  },
  nuxtClientInit({ dispatch }, context) {
    return Promise.all([dispatch("user/nuxtClientInit", context)]);
  }
};
