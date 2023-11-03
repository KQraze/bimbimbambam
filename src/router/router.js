import HomeView from "@/view/HomeView/homeView.vue";
import NewsView from "@/view/NewsView/newsView.vue";
import {createRouter, createWebHistory} from "vue-router";

const routes = [
    {path: '/', component: HomeView},
    {path: '/news', component: NewsView}
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;