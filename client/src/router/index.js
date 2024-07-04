import { createRouter, createWebHistory } from "vue-router";
import Home from "../components/Home.vue";
import Login from "../components/Login.vue";
import Dashboard from "../components/Dashboard.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/login", component: Login },
  { path: "/dashboard", component: Dashboard },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
