import { createRouter, createWebHistory } from "vue-router";
import { createApp } from "vue";
import App from "./App.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "Каталог",
            component: () => import("./views/CatalogView.vue"),
        },
        {
            path: "/about",
            name: "О нас",
            component: () => import("./views/AboutView.vue"),
        },
        {
            path: "/contact",
            name: "Контакты",
            component: () => import("./views/AboutView.vue"),
        },
        {
            path: "/product/:id",
            name: "Информация",
            meta: { hide: true },
            component: () => import("./views/ProductView.vue"),
        },
    ],
});

const app = createApp(App);

app.use(router);

app.mount("#app");
