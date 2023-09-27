import { defineStore } from "pinia";

export const useEmplStore = defineStore("EmplStore", {
  state: () => {
    return {
      employees: new Map(),
      slidersCarousel: [],
      imageUrl: ` https://saa.44321.ru/assets/img/`,
      serverUrl: "https://saa.44321.ru/",
    };
    // archive: new Map(),
  },

  getters: {
    getEmptyStore: (state) => (key) =>
      !state[key] ? true : state[key].size === 0,

    getAllEmployeesArray: (state) => (key) => state[key].values(),

    getKeyInStore: (state) => (key) => state[key],

    getEmployeeById: (state) => (key, id) => state[key].get(id),
  },

  actions: {
    // для выяснения сегодняшней даты в опреденном формате
    giveTodayDate() {
      let day = String(new Date().getDate());
      day.length === 1 ? (day = "0" + day) : day;

      let month = String(new Date().getMonth() + 1);
      month.length === 1 ? (month = "0" + month) : month;

      return day + month;
      // this.todayDate = day + month;
      // console.log(this.todayDate);
    },

    // взять с сервера
    async dataGetBackend(key) {
      try {
        let response = await fetch(
          this.getKeyInStore("serverUrl") + `get.php`,
          {
            headers: {
              "Content-Type": "application/json",
              // "Content-Type": "multipart/form-data",
            },
          }
        );

        console.log(response);
        let data = await response.json();

        for (let elem of data) {
          elem.gender === "m"
            ? (elem.gender = "мужской")
            : elem.gender === "f"
            ? (elem.gender = "женский")
            : (elem.gender = "неизвестный");

          elem.thumbnail =
            elem.thumbnail === false
              ? (await this.getKeyInStore("imageUrl")) + `defaultPhoto.jpg`
              : (await this.getKeyInStore("imageUrl")) + `${elem.id}.jpg`;

          // console.log(elem.thumbnail);
        }
        console.log(data);

        this[key] = new Map();
        data.forEach((elem) => this[key].set(elem.id, elem));
        // console.log(this[key]);
      } catch (error) {
        console.error(error);
      }
    },

    // отправить на сервер
    async dataPutBackend(key) {
      // тяну из  state массив сотрудников
      let arr = [...(await this.getAllEmployeesArray(key))];
      console.log(arr);

      // возвращаю в нужный формат поле "пол" сотрудника
      for (let elem of arr) {
        elem.gender === "мужской"
          ? (elem.gender = "m")
          : elem.gender === "женский"
          ? (elem.gender = "f")
          : (elem.gender = "u");

        // возвращаю в нужный формат поле "миниатюра(фото)" сотрудника
        //ЕСЛИ ТУТ ЗАКОММЕНТИРОВАТЬ - ГРУЗИТСЯ ПРИ УДАЛЕНИИ СОТРУДНИКА ВСЁ КАРТИНКАМИ
        elem.thumbnail =
          elem.thumbnail !==
          this.getKeyInStore("imageUrl") + `defaultPhoto.jpg`;
        // console.log(elem.thumbnail);
      }

      // массив в json
      let data = JSON.stringify(arr);
      console.log(data);

      try {
        let promise = await fetch(this.getKeyInStore("serverUrl") + `put.php`, {
          method: "POST",
          headers: {
            "Content-Type": "multipart/form-data",
          },
          body: data,
        });
      } catch (error) {
        console.error(error);
      }
    },

    // для получения отформатированных данных из стора и их алфавитная сортировка А - Я
    formatStoreData(key) {
      return this.alphabetSortStart([...this.getAllEmployeesArray(key)]);
    },

    setMessage(key) {
      return (this.message =
        this.getKeyInStore(key).size === 0
          ? "Список сотрудников пуст"
          : "Нет сотрудников, соответствующих вашему поиску");
    },

    // !!! тут нужно подумать как будет храниться второй json
    // с архивными сотрудниками
    // saveInArchive(id) {
    //   this.archive = this.getEmptyStore("archive")
    //     ? this.setMapEmployees(employeesArchive, "archive")
    //     : this.getKeyInStore("archive");
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
        thumbnail: this.getKeyInStore("imageUrl") + `defaultPhoto.jpg`,
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
