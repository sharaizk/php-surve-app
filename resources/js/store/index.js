import { createStore } from "vuex";
import axiosClient from "../axios";

const tmpSurveys = [
    {
        id: 100,
        title: "Template",
        slug: "template",
        status: "draft",
        image: "https://images.unsplash.com/photo-1613963931023-5dc59437c8a6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1769&q=80",
        description: "This is just a template",
        created_at: "2021-12-20 18:00:00",
        updated_at: "2021-12-20 18:00:00",
        expire_date: "2021-12-20 18:00:00",
        questions: [
            {
                id: 1,
                type: "select",
                question: "Which country are you from?",
                description: null,
                data: {
                    options: [
                        {
                            uuid: "18341834-2131",
                            text: "USA",
                        },
                        {
                            uuid: "18341834-2431",
                            text: "Germany",
                        },
                    ],
                },
            },
            {
                id: 2,
                type: "checkbox",
                question:
                    "Which language videos do you want to see on my channel?",
                description: null,
                data: {
                    options: [
                        {
                            uuid: "18341834-2131",
                            text: "JavaScript",
                        },
                        {
                            uuid: "18341834-2431",
                            text: "HTML + CSS",
                        },
                    ],
                },
            },
            {
                id: 3,
                type: "radio",
                question: "Which framework do you like?",
                description: null,
                data: {
                    options: [
                        {
                            uuid: "18341834-2131",
                            text: "React",
                        },
                        {
                            uuid: "18341834-2431",
                            text: "Vue",
                        },
                    ],
                },
            },
            {
                id: 4,
                type: "textarea",
                question: "Which framework do you like?",
                description: null,
                data: {},
            },
        ],
    },
];
export default createStore({
    state: {
        user: {
            data: {},
            token: sessionStorage.getItem("TOKEN"),
        },
        surveys: [...tmpSurveys],
    },
    mutations: {
        logout(state) {
            state.user = {
                data: {},
                token: null,
            };
        },
        setUser(state, payload) {
            state.user = {
                ...payload,
            };

            sessionStorage.setItem("TOKEN", payload.token);
        },
    },
    getters: {},
    actions: {
        async register({ commit }, user) {
            try {
                const registerResponse = await axiosClient.post(
                    "/register",
                    JSON.stringify(user)
                );
                commit("setUser", registerResponse.data);
                return registerResponse.data;
            } catch (error) {
                throw new Error(error);
            }
        },
        async login({ commit }, user) {
            try {
                const registerResponse = await axiosClient.post(
                    "/login",
                    JSON.stringify(user)
                );

                commit("setUser", registerResponse.data);
                return registerResponse.data;
            } catch (error) {
                throw new Error(JSON.stringify(error.response.data.errors));
            }
        },
        async logout({ commit }) {
            try {
                const logoutResponse = await axiosClient.post("/logout");
                commit("logout");
                return logoutResponse;
            } catch (error) {}
        },
    },
    modules: {},
});
