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

    getEmplById: (state) => (emplId) => state.employees.get(emplId),
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

    createEmployee() {
      const idNext = String(Number(Math.max(...this.employees.keys())) + 1);
      // console.log(idNew); // 8

      let employee = {
        id: idNext,
        name: "",
        hide: false,
        thumbnail: false,
        gender: "",
        first_name: "",
        last_name: "",
        middle_name: "",
        birthday: "",
        email: "",
        cn: "",
        telephone: "",
        mobile: "",
        title: "",
        department: "",
        company: "",
        city: "",
      };
      this.employees.set(idNext, employee);
      // console.log(this.employees); // ok
      return idNext;
    },

    addEmployee(updatedEmpl) {
      // console.log(updatedEmpl.id);// 8
      console.log(this.employees);
      this.employees.set(updatedEmpl.id, updatedEmpl);
      console.log(this.employees);
      // console.log(updatedEmpl);
    },
  },
});
