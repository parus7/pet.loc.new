<script setup>
// import TheList from "../components/TheList.vue";

import { useEmplStore } from "../stores/EmplStore";
import { mapState, mapActions } from "pinia";
import employeesArchive from "../data/employeesArchive.json";
</script>

<template>
  <div>{{ archive }}</div>
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
    this.archive = this.getEmptyStore(this.archive)
      ? this.setMapEmployees(employeesArchive).values()
      : this.getAllEmployees(this.archive);

    console.log(this.archive);
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
