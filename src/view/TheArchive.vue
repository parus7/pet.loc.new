<script setup>
// import TheList from "../components/TheList.vue";

import { useEmplStore } from "../stores/EmplStore";
import { mapState, mapActions } from "pinia";
import employeesArchive from "../data/employeesArchive.json";
</script>

<template>
  <ul>
    <li v-for="item in archive" :key="item.id">{{ item }}</li>
  </ul>
</template>

<script>
export default {
  data() {
    return {
      archive: {},
      aLength: null,

      aMessage: "",
    };
  },

  created() {
    this.archive = this.getEmptyStore("archive")
      ? this.setMapEmployees(employeesArchive)
      : this.getAllEmployees("archive");
  },

  computed: {
    ...mapState(useEmplStore, ["getEmptyStore", "getAllEmployees"]),
  },

  methods: {
    ...mapActions(useEmplStore, ["setMapEmployees"]),
  },
};
</script>

<style scoped></style>
