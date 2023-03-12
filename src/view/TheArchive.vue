<script setup>
import employeesArchive from "../data/employeesArchive.json";
import { mapActions } from "pinia";
import { useEmplArchive } from "../stores/ArchiveStore";
</script>

<template>
  <div>{{ emplArchive }}</div>
  <div>{{ Sidr.gender }}</div>
  <div>{{ Sidr }}</div>
</template>

<script>
export default {
  data() {
    return {
      emplArchive: {},
      length: null,
      Sidr: {},
    };
  },

  created() {
    this.emplArchive = this.setMapEmployeesArchive(employeesArchive);
    console.log(this.employeesArchive);

    this.Sidr = this.emplArchive.get("111");
    console.log(this.Sidr);
  },

  methods: {
    ...mapActions(useEmplArchive, ["setMapEmployeesArchive"]),
  },
};
</script>

<style scoped>
div {
  width: 600px;
  height: 300px;
  background: var(--vt-c-active-2);
  padding: 40px;
  margin: 0 auto;
}
</style>
