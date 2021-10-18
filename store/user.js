export const state = () => {
	return {
		token: {},
		user: {}
	};
};

export const getters = {
	getToken: (state) => {
		const token = localStorage.getItem('auth_token') || state.token
		let t = JSON.parse(token)
    return t 
	}
}

export const mutations = {
	setUser(state, value) {
		state.token = value.token;
		state.user = value.user;
		let token = JSON.stringify(state.token)

		localStorage.setItem("auth_token", token);
	},

	updateToken(state, value) {
		state.token = value.token;
	},

	clearUser(state, value) {
		state.token = {
			access_token: "",
			refresh_token: ""
		};
		state.user = {};

		localStorage.clear();
	}
};

export const actions = {
	// setUser({ commit }, value) {
	// 	commit("SET_USER", value);
	// },
	// updateToken({ commit }, value) {
	// 	commit("UPDATE_TOKET", value);
	// },
};

