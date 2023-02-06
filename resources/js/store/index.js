import { createStore } from "vuex";

export default createStore({
    state: {
        user: {
            data: {},
            token: null,
        },
    },
    mutations: {
        logout(state) {
            state.user = {
                data: {},
                token: null,
            };
        },
    },
    getters: {},
    actions: {},
    modules: {},
});
