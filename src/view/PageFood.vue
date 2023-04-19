<template>
  <div class="page-food">
    <PageHeader
    :link="link"/>
  </div>
</template>

<script>
import PageHeader from "@/components/PageHeader.vue";

export default {
  name: "PageFood",
  components: { PageHeader },

  data(){
    return{
      link:"basic"
    }
  }
};
</script>

<style scoped>
.page-food {
  padding: 17px;
  margin: 0 auto;
}
</style>