import HomeView from "@/view/HomeView/homeView.vue";
import PostView from "@/view/PostsView/postsView.vue";
import {createRouter, createWebHistory} from "vue-router";

const routes = [
    {
        path: '/',
        component: HomeView
    },
    {
        name: "post",
        path: '/post/:id',
        component: PostView,
        params: true
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;