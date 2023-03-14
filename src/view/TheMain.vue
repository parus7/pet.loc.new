<script setup>
import TheHeader from "../components/TheHeader.vue";
import TheBar from "../components/TheBar.vue";
import TheList from "../components/TheList.vue";

import { useEmplStore } from "../stores/EmplStore";
import { mapState, mapActions } from "pinia";
import employeesData from "../data/employeesData.json";
import employeesArchive from "../data/employeesArchive.json";
</script>

<template>
  <div class="main">
    <TheHeader
      class="main_header"
      @alphabetFilter="onAlphabet($event)"
      @emplFilter="filterData($event)"
      @emplCreate="onCreateEmployee()"
    >
    </TheHeader>
    <TheBar class="main_bar" />
    <TheList
      class="main_list"
      :employees="[...employees]"
      :message="message"
      @deleteEmoployee="onDeletete($event)"
    />
  </div>
</template>

<script>
export default {
  components: { TheHeader, TheList, TheBar },

  data() {
    return {
      employees: {},
      archive: null,
      isAlphabet: null,

      message: "",
      length: null,
    };
  },

  created() {
    this.employees = this.getEmptyStore("employees")
      ? this.setMapEmployees(employeesData).values()
      : this.getAllEmployees("employees");

    // console.log(this.employees);

    this.isAlphabet = this.getAlphabet;
    this.onAlphabet();
  },

  computed: {
    ...mapState(useEmplStore, [
      "getEmptyStore",
      "getAllEmployees",
      "delEmployee",
      "getAlphabet",
      "getEmplById",
    ]),
  },

  methods: {
    ...mapActions(useEmplStore, [
      "setMapEmployees",
      "onFilterData",
      "createEmployee",
      "alphabetToggle",
    ]),

    filterData(event) {
      this.isAlphabet = this.alphabetToggle();

      this.employees = [...this.getAllEmployees("employees")].filter(
        (elem) => elem[event.param] == event.value
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
          ? [...this.getAllEmployees("employees")].sort((a, b) =>
              a.cn.localeCompare(b.cn)
            )
          : [...this.getAllEmployees("employees")].sort((a, b) =>
              b.cn.localeCompare(a.cn)
            );

      return this.employees;
    },

    onDeletete(event) {
      this.isAlphabet = this.alphabetToggle();

      this.delEmployee(event.id);
      this.employees = [...this.getAllEmployees("employees")];

      this.message =
        this.employees.length === 0 ? "Список сотрудников пуст" : "";

      this.onAlphabet();
    },

    onCreateEmployee() {
      this.createEmployee();
      this.onAlphabet();
    },
  },
};
</script>

<style scope>
.main {
  display: grid;
  gap: 10px;
  grid-template-columns: min-content 1fr;
  grid-template-rows: auto 85vh auto;
  padding: 17px;
  margin: 0 auto;
}

.main_header,
.main_pagination {
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
    grid-template-rows: repeat(3, auto);
  }

  .main_bar,
  .main_list {
    grid-column: 1/-1;
  }

  .main_bar {
    grid-row: 2/3;
  }
}

@media screen and (max-width: 767px) {
  .main_pagination {
    display: none;
  }
}
</style>
