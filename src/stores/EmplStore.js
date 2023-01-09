import { defineStore } from "pinia";
import employeesData from "../data/employeesData.json";

export const useEmplStore = defineStore("EmplStore", {
  state: () => {
    return {
      employees: employeesData,
    };
  },
  getters: {
    getEmptyStore: (state) => {
      return state.employees.length === 0;
    },

    getEmplById: (state) => {
      return (emplId) => {
        const employee = state.employees.find((elem) => elem.id === emplId);
        return employee;
      };
    },

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

    getEmplBirthday: (state) => {
      return (emplId) => {
        const employee = state.employees.find((elem) => elem.id === emplId);

        return employee ? employee.birthday.match(/.{2}/g).join(".") : "";
      };
    },

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
    deleteEmpl(id) {
      this.employees = this.employees.filter((elem) => elem.id !== id);
    },
  },
});
