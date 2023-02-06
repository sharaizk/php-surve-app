import { createWebHistory, createRouter } from "vue-router";
import Dashboard from "./views/Dashboard.vue";
import Login from "./views/Login.vue";
import Register from "./views/Register.vue";
import DashboardLayout from "./layouts/DashboardLayout.vue";
import AuthLayout from "./layouts/AuthLayout.vue";
import Surveys from "./views/Surveys.vue";
import store from "./store";

export const routes = [
    {
        path: "/",
        redirect: "/dashboard",
        name: "dashboard-layout",
        component: DashboardLayout,
        children: [
            {
                path: "dashboard",
                name: "dashboard",
                component: Dashboard,
            },
            {
                path: "surveys",
                name: "surveys",
                component: Surveys,
            },
        ],
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: "/auth",
        redirect: "/loign",
        name: "auth-layout",
        component: AuthLayout,
        meta: {
            isGuest: true,
        },
        children: [
            {
                path: "/login",
                component: Login,
                name: "login",
            },
            {
                path: "/register",
                component: Register,
                name: "register",
            },
        ],
    },
];

const router = createRouter({
    routes,
    history: createWebHistory("/"),
});

router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth && !store.state.user.token) {
        next({ name: "login" });
    } else if (store.state.user.token && to.meta.isGuest) {
        next({ name: "dashboard" });
    } else {
        next();
    }
});

export default router;
