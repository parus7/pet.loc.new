<template>
  <div class="page-food">

    <PageHeader
      class="page-food_header"
      :link="link"
    />
    <PageCarousel />

  </div>
</template>

<script>
import PageHeader from "@/components/PageHeader.vue";
import PageCarousel from "@/components/PageCarousel.vue";

export default {
  name: "PageFood",
  components: { PageHeader, PageCarousel },

  data() {
    return {
      link: "basic"
    };
  }
};
</script>

<style scoped>
.page-food {
  padding: 17px;
}

.page-food_header {
  margin-bottom: 10px;
}
</style>