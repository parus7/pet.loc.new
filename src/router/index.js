import { createMemoryHistory, createRouter } from "vue-router";
import PageBasic from "@/view/PageBasic.vue";
import PageArchive from "@/view/PageArchive.vue";
import PageFood from "@/view/PageFood.vue";

import PageCard from "@/components/PageCard.vue";
import PageBasicCard from "@/view/PageBasicCard.vue";
import PageNewCard from "@/view/PageNewCard.vue";
import PageArchiveCard from "@/view/PageArchiveCard.vue";

const router = createRouter({
  // history: createWebHistory(import.meta.env.BASE_URL),
  history: createMemoryHistory(),
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
      props: true,
    },
    {
      path: "/food",
      name: "food",
      component: PageFood,
      props: true,
    },
    {
      path: "/card/:id",
      name: "card",
      component: PageCard,
      props: true,
    },
    {
      path: "/basicCard/:id",
      name: "basicCard",
      component: PageBasicCard,
      props: true,
    },
    {
      path: "/archiveCard/:id",
      name: "archiveCard",
      component: PageArchiveCard,
      props: true,
    },
    {
      path: "/newCard/:id",
      name: "newCard",
      component: PageNewCard,
      props: true,
    },
    // {
    //   path: "/:any(.*)",
    //   component: TheError404,
    // },
  ],
});

export default router;
