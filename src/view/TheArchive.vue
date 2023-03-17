<template>
  <ul>
    <li v-for="item in archive" :key="item.id">{{ item }}</li>
  </ul>
</template>

<script>
import { useEmplStore } from "@/stores/EmplStore";
import { mapState, mapActions } from "pinia";
import employeesArchive from "@/data/employeesArchive.json";

export default {
  data() {
    return {
      archive: {}
    };
  },

  created() {
    this.archive = this.getEmptyStore("archive")
      ? this.setMapEmployees(employeesArchive, "archive")
      : this.getAllEmployees("archive").sort((a, b) =>
        a.cn.localeCompare(b.cn)
      );
  },

  computed: {
    ...mapState(useEmplStore, ["getEmptyStore", "getAllEmployees"])
  },

  methods: {
    ...mapActions(useEmplStore, ["setMapEmployees"])
  }
};
</script>

<style scoped></style>
