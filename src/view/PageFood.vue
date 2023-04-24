<template>
  <div class="page-food">
    <PageHeader
      :link="link" />

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
  margin: 0 auto;
}
</style>