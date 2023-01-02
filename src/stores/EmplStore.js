import { defineStore } from "pinia";
import employeesData from "../data/employeesData.json";

export const useEmplStore = defineStore("EmplStore", {
  state: () => {
    return {
      employees: employeesData,
    };
  },
  getters: {
    getEmplTelephone: (state) => {
      return (emplId) => {
        const employee = state.employees.find((elem) => elem.id === emplId);

        return employee ? employee.telephone.match(/.{2}/g).join("-") : "";
      };
    },
    getEmplMobile: (state) => {
      return (emplId) => {
        const employee = state.employees.find((elem) => elem.id === emplId);

        return employee
          ? employee.mobile
              .split("")
              .reduce(
                (accumulator, elem) => accumulator.replace("x", elem),
                "xxx xxx-xx-xx"
              )
          : "";
      };
    },
  },
  actions: {
    deleteEmpl(id) {
      this.employees = this.employees.filter((elem) => elem.id !== id);
    },
  },
});
