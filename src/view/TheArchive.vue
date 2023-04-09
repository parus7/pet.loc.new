<template>
  <div class="list">
    <div class="list__header">

      <div class="help relative" data-name="на главную страницу">
        <TheButton
          area-label="на главную страницу"
          tabindex="0"
          @click="leavePage">
          <IconGoTo />
        </TheButton>
      </div>

    </div>

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
import TheButton from "@/components/UI/TheButton.vue";
import IconGoTo from "@/components/icons/IconGoTo.vue";

export default {
  components: { TheArchiveElem, TheButton, IconGoTo },

  data() {
    return {
      aEmployees: {}
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

.list__header {

  display: flex;
  justify-content: end;
  gap: 20px;

  background-color: var(--vt-c-archive-2);
  box-shadow: 2px 2px 0 0 var(--vt-c-active-5);
  border-radius: 8px;
  padding: 13px;
  margin-bottom: 10px;
}

.list__message {
  color: var(--vt-c-grey-font);
  text-align: center;
  margin: 40px 0;
}
</style>
