import { defineStore } from "pinia";

export const useEmplStore = defineStore("EmplStore", {
  state: () => {
    return {
      employees: new Map(),
    };
    // archive: new Map(),
  },

  getters: {
    getEmptyStore: (state) => (key) =>
      !state[key] ? true : state[key].size === 0,

    getAllEmployeesArray: (state) => (key) => state[key].values(),

    getAllEmployeesMap: (state) => (key) => state[key],

    getEmployeeById: (state) => (key, employeeId) => state[key].get(employeeId),
  },

  actions: {
    async setEmployeesBackend(key) {
      let response = await fetch("https://44321.ru/get.php", {
        headers: {
          "Content-Type": "application/json",
        },
      });

      // проверяла при   data = [] (если придет пустой массив),
      // то в функции getEmplFromStore на странице PageBasic
      // this.message = "Список сотрудников пуст" работает
      // let data = [];

      let data = await response.json();
      // console.log(data);

      data.forEach((elem) =>
        elem.gender === "m"
          ? (elem.gender = "мужской")
          : elem.gender === "f"
          ? (elem.gender = "женский")
          : (elem.gender = "неизвестный")
      );
      // console.log(data);

      //  !!! тут нужно подумать откуда тянуть картинки,
      // решили из облака типа Google диска
      //  пока  тяну картинки из папки img в проекте
      data.forEach((elem) =>
        elem.thumbnail === false
          ? (elem.src = `/src/assets/img/defaultPhoto.jpg`)
          : (elem.src = `/src/assets/img/${elem.id}.jpg`)
      );
      // console.log(data);

      this[key] = new Map();
      data.forEach((elem) => this[key].set(elem.id, elem));
      // console.log(this[key]);
    },

    setMessage(key) {
      return (this.message =
        this.getAllEmployeesMap(key).size === 0
          ? "Список сотрудников пуст"
          : "Нет сотрудников, соответствующих вашему поиску");
    },

    // !!! тут нужно подумать как будет храниться второй json
    // с архивными сотрудниками
    // saveInArchive(id) {
    //   this.archive = this.getEmptyStore("archive")
    //     ? this.setMapEmployees(employeesArchive, "archive")
    //     : this.getAllEmployeesMap("archive");
    //
    //   let delEmployee = this.getEmployeeById("employees", id);
    //   this.archive.set(id, delEmployee);
    // },

    delEmployee(id) {
      this.employees.delete(id);
    },

    // !!! тут нужно подумать как буде формироваться ID сотрудника
    createNextId() {
      return this.getEmptyStore("employees")
        ? "1"
        : String(Number(Math.max(...this.employees.keys())) + 200); // пока +200 к последнему  ID
    },

    createEmployee: function () {
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
        src: `/src/assets/img/defaultPhoto.jpg`,
      };

      this.employees.set(idEmployee, employee);
    },

    addEmployee(updatedEmpl) {
      updatedEmpl.cn =
        updatedEmpl.last_name +
        " " +
        updatedEmpl.first_name +
        " " +
        updatedEmpl.middle_name;

      this.employees.set(updatedEmpl.id, updatedEmpl);
    },

    alphabetToggle() {
      return (this.isAlphabet = !this.isAlphabet);
    },

    alphabetSortStart(obj) {
      return obj.sort((a, b) => a.cn.localeCompare(b.cn));
    },

    alphabetSortEnd(obj) {
      return obj.sort((a, b) => b.cn.localeCompare(a.cn));
    },
  },
});
