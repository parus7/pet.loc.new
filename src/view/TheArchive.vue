<template>
  <div class="list">
    <TheHeader
      :link="link"
    />

    <template v-if="aEmployees.length > 0">
      <TheArchiveElem
        v-for="aEmployee in aEmployees"
        :key="aEmployee.id"
        :aEmployee="{ ...aEmployee }"
      />
    </template>

    <template v-else>
      <h2 class="list__message">Архивный список сотрудников пуст</h2>
    </template>
  </div>
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
      aEmployees: {},
      link: "main"
    };
  },

  created() {
    this.aEmployees = this.getEmptyStore("archive")
      ? this.setMapEmployees(employeesArchive, "archive")
      : this.getAllEmployeesMap("archive");

    this.aEmployees = [...this.aEmployees.values()].sort((a, b) => a.cn.localeCompare(b.cn));
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

