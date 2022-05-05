import { createRouter, createWebHistory } from "vue-router";
import { createApp } from "vue";
import App from "./App.vue";
import 'viewerjs/dist/viewer.css'
import VueViewer from 'v-viewer'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "Галерея",
            component: () => import("./views/CatalogView.vue"),
        },
        {
            path: "/artists",
            name: "Авторы",
            component: () => import("./views/ArtistListView.vue"),
        },
        {
            path: "/about",
            name: "О нас",
            component: () => import("./views/AboutView.vue"),
        },
        {
            path: "/contact",
            name: "Контакты",
            component: () => import("./views/ContactView.vue"),
        },
        {
            path: "/art/:id",
            name: "Картина",
            meta: { hide: true },
            component: () => import("./views/ArtView.vue")
        },
        {
            path: "/artist/:id",
            name: "Художник",
            meta: { hide: true },
            component: () => import("./views/ArtistView.vue"),
        },
    ],
});

const app = createApp(App);

app.use(router);

app.use(VueViewer)
app.mount("#app");
