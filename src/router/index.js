import { createMemoryHistory, createRouter } from "vue-router";
import TheMain from "@/view/TheMain.vue";
import TheFormNewEmployee from "@/view/TheNewEmployeeCard.vue";
import TheArchive from "@/view/TheArchive.vue";

import TheEmployeeCard from "@/view/TheEmployeeCard.vue";
import TheEmployeeArchiveCard from "@/view/TheEmployeeArchiveCard.vue";
import TheNewEmployeeCard from "@/view/TheNewEmployeeCard.vue";

const router = createRouter({
  // history: createWebHistory(import.meta.env.BASE_URL),
  history: createMemoryHistory(),
  routes: [
    {
      path: "/",
      name: "main",
      component: TheMain,
    },
    {
      path: "/archive",
      name: "archive",
      component: TheArchive,
    },
    {
      path: "/TheEmployeeCard/:id",
      name: "infoCard",
      component: TheEmployeeCard,
    },
    {
      path: "/TheEmployeeArchiveCard/:id",
      name: "archiveCard",
      component: TheEmployeeArchiveCard,
    },
    {
      path: "/TheNewEmployeeCard/:id",
      name: "newCard",
      component: TheNewEmployeeCard,
    },
    // {
    //   path: "/:any(.*)",
    //   component: TheError404,
    // },
  ],
});

export default router;
