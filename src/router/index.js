import { createWebHistory, createRouter } from "vue-router";
// import PageLogin from "@/view/PageLogin.vue";
// import PageRegistration from "@/view/PageRegistration.vue";
// import PagePasswordRecovery from "@/view/PagePasswordRecovery.vue";
// import TheError404 from "@/view/TheError404.vue";

import PageBasic from "@/view/PageBasic.vue";
import PageArchive from "@/view/PageArchive.vue";
import PageFood from "@/view/PageFood.vue";

import PageCard from "@/components/PageCard.vue";
import PageBasicCard from "@/view/PageBasicCard.vue";
import PageNewCard from "@/view/PageNewCard.vue";
import PageArchiveCard from "@/view/PageArchiveCard.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    // {
    //   path: "/",
    //   name: "login",
    //   component: PageLogin,
    // },
    // {
    //   path: "/registration",
    //   name: "registration",
    //   component: PageRegistration,
    // },
    // {
    //   path: "/recovery",
    //   name: "recovery",
    //   component: PagePasswordRecovery,
    // },
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
