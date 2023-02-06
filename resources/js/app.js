import { createApp } from "vue";
import store from "./store";
import router from "./routes";
import AppLayout from './layouts/AppLayout.vue'

createApp(AppLayout).use(store).use(router).mount("#app");
