<template>
  <div class="page-food">

    <PageHeader
      class="page-food_header"
      :link="link"
    />
    <PageCarousel />

    <PageFooter
      class="page-food_footer"
      :isMain="isMain"
    />

  </div>
</template>

<script>
import PageHeader from "@/components/PageHeader.vue";
import PageCarousel from "@/components/PageCarousel.vue";
import PageFooter from "@/components/PageFooter.vue";

export default {
  name: "PageFood",
  components: { PageHeader, PageCarousel, PageFooter },

  data() {
    return {
      link: "basic",
      isMain: false
    };
  }
};
</script>

<style scoped>
.page-food {
  padding: 30px;
}

.page-food_header {
  margin-bottom: 20px;
}

.page-food_footer {
  margin-top: 20px;
}
</style>