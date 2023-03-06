import { defineStore } from "pinia";
export const useEmplStore = defineStore("EmplStore", {
  state: () => {
    return {
      employees: new Map(),
      isAlphabet: false,
    };
  },
  getters: {
    getEmptyStore: (state) =>
      !state.employees ? true : state.employees.size === 0,

    getAlphabet: (state) => state.isAlphabet,

    getAllEmployees: (state) => [...state.employees.values()],

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

    // onAlphabetToggle() {
    //   console.log(this.isAlphabet);
    //   console.log(this.getAllEmployees);

    //   this.employees =
    //     this.isAlphabet === false
    //       ? [...this.getAllEmployees].sort((a, b) => b.cn.localeCompare(a.cn))
    //       : [...this.getAllEmployees].sort((a, b) => a.cn.localeCompare(b.cn));

    //   this.isAlphabet = !this.isAlphabet;
    //   console.log(this.employees);
    //   return this.employees;
    // },

    setMapEmployees(data) {
      this.setGender(data);
      this.setImage(data);

      this.employees = data.sort((a, b) => a.cn.localeCompare(b.cn));

      this.employees = new Map();
      data.forEach((elem) => this.employees.set(elem.id, elem));

      console.log(this.employees);
      return this.employees;
    },

    delEmployee(id) {
      this.employees.delete(id);
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
        src: `./src/assets/img/defaultPhoto.jpg`,
      };
      this.employees.set(idNext, employee);
      return idNext;
    },
  },
});
