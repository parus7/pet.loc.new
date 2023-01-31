import { defineStore } from "pinia";
export const useEmplStore = defineStore("EmplStore", {
  state: () => {
    return {
      employees: null,
    };
  },
  getters: {
    getEmptyStore: (state) =>
      !state.employees ? true : state.employees.size === 0,

    getAllEmployees: (state) => state.employees,

    getEmplById: (state) => (emplId) => state.employees.get(emplId),
  },

  actions: {
    setMapEmployees(data) {
      data.forEach((elem) =>
        elem.gender === "m"
          ? (elem.gender = "Мужской")
          : elem.gender === "f"
          ? (elem.gender = "Женский")
          : (elem.gender = "Неизвестный")
      );

      this.employees = new Map();
      data.forEach((elem) => this.employees.set(elem.id, elem));
      return this.employees;
    },

    delEmployee(id) {
      return this.employees.delete(id);
    },

    addEmployee(updatedEmpl) {
      updatedEmpl.cn =
        updatedEmpl.last_name +
        " " +
        updatedEmpl.first_name +
        " " +
        updatedEmpl.middle_name;

      this.employees.set(updatedEmpl.id, updatedEmpl);
      return updatedEmpl;
    },

    createEmployee() {
      const idNext = this.getEmptyStore
        ? "1"
        : String(Number(Math.max(...this.employees.keys())) + 1);

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
      return idNext;
    },
    // console.log(this.employees);
  },
});
