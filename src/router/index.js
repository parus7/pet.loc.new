import { createWebHistory, createRouter } from "vue-router";
import PageBasic from "@/view/PageBasic.vue";
import PageArchive from "@/view/PageArchive.vue";
import PageFood from "@/view/PageFood.vue";

import PageCard from "@/components/PageCard.vue";
import PageBasicCard from "@/view/PageBasicCard.vue";
import PageNewCard from "@/view/PageNewCard.vue";
import PageArchiveCard from "@/view/PageArchiveCard.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  // сокращённая запись для `routes: routes`
  routes: [
    {
      path: "/",
      name: "basic",
      component: PageBasic,
    },
    {
      path: "/archive",
      name: "archive",
      component: PageArchive,
    },
    {
      path: "/food",
      name: "food",
      component: PageFood,
    },
    {
      path: "/card/:id",
      name: "card",
      component: PageCard,
    },
    {
      path: "/basicCard/:id",
      name: "basicCard",
      component: PageBasicCard,
    },
    {
      path: "/archiveCard/:id",
      name: "archiveCard",
      component: PageArchiveCard,
    },
    {
      path: "/newCard/:id",
      name: "newCard",
      component: PageNewCard,
    },
    // {
    //   path: "/:any(.*)",
    //   component: TheError404,
    //   props: true
    // },
  ],
});

export default router;
