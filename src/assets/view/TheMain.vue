<script setup>
import TheHeader from "../../components/TheHeader.vue";
import TheList from "../../components/TheList.vue";
import TheBar from "../../components/TheBar.vue";
</script>

<template>
  <template class="container">
    <TheHeader />
    <TheBar />
    <TheList />
  </template>
</template>

<script>
export default {
  components: { TheHeader, TheList, TheBar },
};
</script>

<style scope>
.container {
  display: grid;
  grid-template-rows: auto 1fr;
  grid-template-columns: auto 1fr;
  gap: 10px;
  padding: 20px;
}
</style>
