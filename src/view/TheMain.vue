<template>
  <div class="main">
    <TheHeader
      class="main_header"
      @alphabetFilter="onAlphabet($event)"
      @employeeFilter="filterData($event)"
      @employeeCreate="onCreateEmployee()"
    >
    </TheHeader>

    <TheBar class="main_bar" />

    <TheList
      class="main_list"
      :employees="[...employees]"
      :message="message"
      @deleteEmployee="onDelete($event)"
    />

  </div>
</template>

<script>
import employeesData from "@/data/employeesData.json";
import { useEmplStore } from "@/stores/EmplStore";
import { mapState, mapActions } from "pinia";

import TheHeader from "@/components/TheHeader.vue";
import TheBar from "@/components/TheBar.vue";
import TheList from "@/components/TheList.vue";

export default {
  components: { TheHeader, TheList, TheBar },

  data() {
    return {
      employees: {},
      isAlphabet: null,

      message: "",
      length: null
    };
  },

  created() {
    this.employees = this.getEmptyStore("employees")
      ? this.setMapEmployees(employeesData, "employees").values()
      : [...this.getAllEmployeesArray("employees")];

    this.isAlphabet = this.getAlphabet;
    this.onAlphabet();
  },

  computed: {
    ...mapState(useEmplStore, [
      "getEmptyStore",
      "getAllEmployeesArray",
      "delEmployee",
      "getAlphabet"
    ])
  },

  methods: {
    ...mapActions(useEmplStore, [
      "setMapEmployees",
      "createEmployee",
      "alphabetToggle",
      "saveInArchive"
    ]),

    filterData(event) {
      this.isAlphabet = this.alphabetToggle();

      this.employees = [...this.getAllEmployeesArray("employees")].filter(
        (elem) => elem[event.param] === event.value
      );

      this.message =
        this.employees.length === 0
          ? "Нет сотрудников, соответствующих вашему поиску"
          : "";
    },

    onAlphabet() {
      this.isAlphabet = this.alphabetToggle();

      this.employees =
        this.isAlphabet === false
          ? [...this.getAllEmployeesArray("employees")].sort((a, b) =>
            a.cn.localeCompare(b.cn)
          )
          : [...this.getAllEmployeesArray("employees")].sort((a, b) =>
            b.cn.localeCompare(a.cn)
          );

      return this.employees;
    },

    onDelete(event) {
      this.isAlphabet = this.alphabetToggle();

      this.saveInArchive(event.id);
      this.employees = [...this.getAllEmployeesArray("employees")];

      this.message =
        this.employees.length === 0 ? "Список сотрудников пуст" : "";

      this.onAlphabet();
    },

    onCreateEmployee() {
      this.createEmployee();
      this.onAlphabet();
    }
  }
};
</script>

<style>
.main {
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: 5.5vh  94.5vh;
  gap: 10px;
  padding: 17px;
  margin: 0 auto;
}

.main_header {
  grid-column: 1/-1;
}

.main_bar {
  grid-column: 1/2;
  grid-row: 2/4;
}

.main_list {
  grid-column: 2/3;
}

@media screen and (max-width: 991px) {
  .main {
    grid-template-rows: 5.5vh 5.5vh 89vh;
  }

  .main_list {
    grid-column: 1/-1;
  }

  .main_bar {
    grid-row: 1/2;
    grid-column: 1/-1;
  }
}

@media screen and (max-width: 729px) {
  .main {
    grid-template-rows: 5.5vh 9vh 85.5vh;
  }
}

@media screen and (max-width: 499px) {
  .main {
    grid-template-rows: 5.5vh 20vh 74.5vh;
  }
}
</style>
