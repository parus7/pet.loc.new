import { defineStore } from "pinia";
import employeesData from "../data/employeesData.json";

export const useEmplStore = defineStore("EmplStore", {
  state: () => {
    return {
      employees: {},
    };
  },
  getters: {},

  actions: {
    setMapEmployees(data) {
      this.employees = new Map();
      data.forEach((elem) => this.employees.set("0" + elem.id, elem));

      console.log(this.employees); // ok
      return this.employees;
    },

    delEmployee(id) {
      console.log(id);
      this.employees.delete(id);
    },
  },
});
