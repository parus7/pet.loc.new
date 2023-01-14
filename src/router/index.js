import { createWebHistory, createRouter } from "vue-router";
import TheMain from "../assets/view/TheMain.vue";
import TheCard from "../assets/view/TheCard.vue";
import TheFormNewEmpl from "../assets/view/TheFormNewEmpl.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "main",
      component: TheMain,
    },
    {
      path: "/card/:id",
      name: "card",
      component: TheCard,
    },
    {
      path: "/form/:id",
      name: "form",
      component: TheFormNewEmpl,
    },
    // {
    //   path: "/:any(.*)",
    //   component: TheError404,
    // },
  ],
});

export default router;
