import { defineStore } from "pinia";
export const useEmplStore = defineStore("EmplStore", {
  state: () => {
    return {
      employees: new Map(),
      archive: new Map(),
      isAlphabet: true,
    };
  },
  getters: {
    getEmptyStore: (state) => (key) =>
      !state[key] ? true : state[key].size === 0,

    getAlphabet: (state) => state.isAlphabet,

    getAll: (state) => (key) => [...state[key]],

    getAllEmployees: (state) => (key) => [...state[key].values()],

    getEmplById: (state) => (emplId) => state.employees.get(emplId),

    getAlertBirthday:
      (state) =>
      (date, sum = 0) => {
        [...state.employees.values()].forEach((elem) =>
          elem.birthday === date ? sum++ : sum
        );
        return sum;
      },
  },

  actions: {
    setGender(data) {
      data.forEach((elem) =>
        elem.gender === "m"
          ? (elem.gender = "Мужской")
          : elem.gender === "f"
          ? (elem.gender = "Женский")
          : (elem.gender = "Неизвестный")
      );
    },

    setImage(data) {
      data.forEach((elem) =>
        elem.thumbnail == false
          ? (elem.src = `./src/assets/img/defaultPhoto.jpg`)
          : (elem.src = `./src/assets/img/${elem.id}.jpg`)
      );
    },

    setMapEmployees(data) {
      this.setGender(data);
      this.setImage(data);

      this.employees = data.sort((a, b) => a.cn.localeCompare(b.cn));

      this.employees = new Map();
      data.forEach((elem) => this.employees.set(elem.id, elem));

      // console.log(this.employees);
      return this.employees;
    },

    delEmployee(id) {
      this.employees.delete(id);
    },

    createNextId() {
      const idNext = this.getEmptyStore("employees")
        ? "1"
        : String(Number(Math.max(...this.employees.keys())) + 1);
      return idNext;
    },

    createEmployee() {
      const idEmployee = this.createNextId();

      let employee = {
        id: idEmployee,
        name: "",
        hide: true,
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
        src: `./src/assets/img/defaultPhoto.jpg`,
      };
      this.employees.set(idEmployee, employee);

      // console.log(this.employees);
      return idEmployee;
    },

    addEmployee(updatedEmpl) {
      updatedEmpl.cn =
        updatedEmpl.last_name +
        " " +
        updatedEmpl.first_name +
        " " +
        updatedEmpl.middle_name;

      updatedEmpl.gender == "Мужской"
        ? "m"
        : updatedEmpl.gender == "Женский"
        ? "f"
        : "u";

      this.employees.set(updatedEmpl.id, updatedEmpl);
      console.log(this.employees);
      console.log(this.isAlphabet);
      // return updatedEmpl;
    },

    alphabetToggle() {
      return (this.isAlphabet = !this.isAlphabet);
    },
  },
});
