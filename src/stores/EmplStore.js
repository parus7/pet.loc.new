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

    getAllEmployees: (state) => state.employees,

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
        .reduce((accum, elem) => accum.replace("x", elem), "xxx xxx-xx-xx"),

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

    addEmployee(updatedEmpl) {
      updatedEmpl.telephone = updatedEmpl.telephone.replace("-", "");
      updatedEmpl.mobile = updatedEmpl.mobile.replace(/\D/g, "");
      updatedEmpl.birthday = updatedEmpl.birthday.replace(".", "");

      updatedEmpl.cn =
        updatedEmpl.last_name +
        " " +
        updatedEmpl.first_name +
        " " +
        updatedEmpl.middle_name;

      updatedEmpl.gender =
        updatedEmpl.gender == "мужской"
          ? "m"
          : updatedEmpl.gender == "женский"
          ? "f"
          : "u";

      this.employees.push(updatedEmpl);
    },

    createEmployee() {
      let employee = {
        id: this.employees.length + 1,
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

      this.employees.push(employee);
      return employee;
    },

    getFilterData(event) {
      return this.employees.filter(
        (elem) => elem[event.parame] === event.value
      );
    },
  },
});
