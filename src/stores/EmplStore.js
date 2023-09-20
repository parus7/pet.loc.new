import { defineStore } from "pinia";

export const imageUrl = `/src/assets/img`;
export const serverUrl = `https://saa.44321.ru`;

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

    getEmployeeById: (state) => (key, id) => state[key].get(id),
  },

  actions: {
    async setEmployeesBackend(key) {
      let response = await fetch(serverUrl + `/get.php`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      let data = await response.json();

      for (let elem of data) {
        elem.gender === "m"
          ? (elem.gender = "мужской")
          : elem.gender === "f"
          ? (elem.gender = "женский")
          : (elem.gender = "неизвестный");

        elem.thumbnail === false
          ? (elem.thumbnail = imageUrl + `/defaultPhoto.jpg`)
          : (elem.thumbnail = imageUrl + `/${elem.id}.jpg`);
      }

      this[key] = new Map();
      data.forEach((elem) => this[key].set(elem.id, elem));
      console.log(this[key]);
    },

    async sendEmployeesBackend(key) {
      let arr = [...(await this.getAllEmployeesArray(key))];

      for (let elem of arr) {
        elem.gender === "мужской"
          ? (elem.gender = "m")
          : elem.gender === "женский"
          ? (elem.gender = "f")
          : (elem.gender = "u");

        elem.thumbnail = elem.thumbnail !== imageUrl + "/defaultPhoto.jpg ";
      }

      // let promise = await fetch(serverUrl + `/put.php`, {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   credentials: "include",
      //   body: JSON.stringify(arr),
      // });
    },

    // для получения отформатированных данных из стора и их алфавитная сортировка А - Я
    formattingEmplData(key) {
      return this.alphabetSortStart([...this.getAllEmployeesArray(key)]);
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
        thumbnail: imageUrl + `/defaultPhoto.jpg`,
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
