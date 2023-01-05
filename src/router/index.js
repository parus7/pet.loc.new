import { createWebHistory, createRouter } from "vue-router";
import TheCard from "../assets/view/TheCard.vue";
import TheMain from "../assets/view/TheMain.vue";

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
    // {
    //   path: "/:any(.*)",
    //   component: TheError404,
    // },
  ],
});

export default router;
