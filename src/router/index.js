import { createMemoryHistory, createRouter } from "vue-router";
import TheMain from "@/view/TheMain.vue";
import TheCard from "@/view/TheCardEmployee.vue";
import TheArchive from "@/view/TheArchive.vue";
import TheFormNewEmployee from "@/view/TheFCardNewEmployee.vue";

const router = createRouter({
  // history: createWebHistory(import.meta.env.BASE_URL),
  history: createMemoryHistory(),
  routes: [
    {
      path: "/",
      name: "main",
      component: TheMain
    },
    {
      path: "/archive",
      name: "archive",
      component: TheArchive
    },
    {
      path: "/card/:id",
      name: "card",
      component: TheCard
    },
    {
      path: "/form/:id",
      name: "form",
      component: TheFormNewEmployee
    }
    // {
    //   path: "/:any(.*)",
    //   component: TheError404,
    // },
  ]
});

export default router;
