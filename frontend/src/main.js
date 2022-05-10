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
            component: () => import("./views/ArtistListView.vue")
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
            name: "Автор",
            meta: { hide: true },
            component: () => import("./views/ArtistView.vue"),
        },
        {
            path: "/artist/create",
            name: "Добавить автора",
            meta: { hide: true },
            component: () => import("./views/ArtistCreateView.vue"),
        },
        {
            path: "/artwork/create",
            name: "Добавить работу",
            meta: { hide: true },
            component: () => import("./views/ArtworkCreateView.vue"),
        },
        {
            path: "/create",
            name: "Добавить",
            component: () => import("./views/CreateView.vue"),
        }
    ],
});

const app = createApp(App);

app.use(router);

app.use(VueViewer)
app.mount("#app");
