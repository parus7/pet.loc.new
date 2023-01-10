import { defineStore } from "pinia";
import employeesData from "../data/employeesData.json";

export const useEmplStore = defineStore("EmplStore", {
  state: () => {
    return {
      employees: employeesData,
    };
  },
  getters: {
    getEmptyStore: (state) => state.employees.length === 0,

    getEmplById: (state) => (emplId) =>
      state.employees.find((elem) => elem.id === emplId),

    getEmplTelephone: (state) => (emplId) =>
      state.employees
        .find((elem) => elem.id === emplId)
        .telephone.split("")
        .reduce((accum, elem) => accum.replace("x", elem), "xx-xx"),

    getEmplMobile: (state) => (emplId) =>
      state.employees
        .find((elem) => elem.id === emplId)
        .mobile.split("")
        .reduce((accum, elem) => accum.replace("x", elem), "+7 xxx xxx-xx-xx"),

    getEmplBirthday: (state) => (emplId) =>
      state.employees
        .find((elem) => elem.id === emplId)
        .birthday.split("")
        .reduce((accum, elem) => accum.replace("x", elem), "xx.xx"),

    getEmplGender: (state) => {
      return (emplId) => {
        const employee = state.employees.find((elem) => elem.id === emplId);
        return employee.gender == "m"
          ? "мужской"
          : employee.gender == "f"
          ? "женский"
          : "неизвестный";
      };
    },
  },

  actions: {
    delEmployee(id) {
      this.employees = this.employees.filter((elem) => elem.id !== id);
    },
  },
});
