import { defineStore } from "pinia";
import employeesData from "../data/employeesData.json";

export const useEmplStore = defineStore("EmplStore", {
  state: () => {
    return {
      employees: {},
    };
  },
  getters: {
    getEmptyStore: (state) => state.employees.size === 0,
  },

  actions: {
    setMapEmployees(data) {
      this.employees = new Map();
      data.forEach((elem) => this.employees.set(elem.id, elem));

      // console.log(this.employees);
      return this.employees;
    },

    delEmployee(id) {
      this.employees.delete(id);
      return this.employees;
    },
  },
});
