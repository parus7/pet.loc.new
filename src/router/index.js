import { createMemoryHistory, createRouter } from "vue-router";
// import TheMain from "@/view/TheMain.vue";
import TheArchive from "@/view/TheArchive.vue";
// import PageArchive from "@/view/PageArchive.vue";
import PageBasic from "@/view/PageBasic.vue";

import TheEmployeeCard from "@/view/TheEmployeeCard.vue";
import TheEmployeeArchiveCard from "@/view/TheEmployeeArchiveCard.vue";
import TheNewEmployeeCard from "@/view/TheNewEmployeeCard.vue";
import TheBirthday from "@/view/TheBirthday.vue";

const router = createRouter({
  // history: createWebHistory(import.meta.env.BASE_URL),
  history: createMemoryHistory(),
  routes: [
    // {
    //   path: "/",
    //   name: "main",
    //   component: TheMain,
    // },
    {
      path: "/",
      name: "basic",
      component: PageBasic,
    },
    // {
    //   path: "/archive",
    //   name: "archive",
    //   component: PageArchive,
    // },
    {
      path: "/archive",
      name: "archive",
      component: TheArchive,
    },
    {
      path: "/birthday",
      name: "birthday",
      component: TheBirthday,
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
