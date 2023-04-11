<template>
  <Page
    :employees="employees"
    :message="message"
    :length="length"
    :isMain="isMain"
  />
</template>

<script>
import { useEmplStore } from "@/stores/EmplStore";
import { mapState, mapActions } from "pinia";
import employeesArchive from "@/data/employeesArchive.json";

import TheArchiveElem from "@/components/TheArchiveElem.vue";
import TheHeader from "@/components/TheHeader.vue";

export default {
  components: { TheArchiveElem, TheHeader },

  data() {
    return {
      employees: {},
      isAlphabet: null,

      message: "",
      length: null,

      isMain: false
    };
  },


  created() {
    this.employees = this.getEmptyStore("archive")
      ? this.setMapEmployees(employeesArchive, "archive")
      : this.getAllEmployeesMap("archive");

    this.employees = [...this.employees.values()].sort((a, b) => a.cn.localeCompare(b.cn));
  },

  computed: {
    ...mapState(useEmplStore, ["getEmptyStore", "getAllEmployeesMap"])
  },

  methods: {
    ...mapActions(useEmplStore, ["setMapEmployees"]),

    leavePage() {
      this.$router.push({
        name: "main"
      });
    }
  }
};
</script>

<style scoped>
.list {
  padding: 17px;
}

.list__message {
  color: var(--vt-c-grey-font);
  text-align: center;
  margin: 40px 0;
}
</style>

