import { defineStore } from "pinia";

export const useEmplStore = defineStore("EmplStore", {
  state: () => {
    return {
      employees: new Map(),
      archive: new Map(),
      slidersCarousel: [],
      imageUrl: "https://saa.44321.ru/assets/img/",
      serverUrl: "https://saa.44321.ru/",
      getBasicUrl: "get.php",
      putBasicUrl: "put.php",
      getArchiveUrl: "get_arch.php",
      putArchiveUrl: "put_arch.php",
    };
  },

  getters: {
    getEmptyStore: (state) => (key) =>
      !state[key] ? true : state[key].size === 0,

    getAllEmployeesArray: (state) => (key) => state[key].values(),

    getKeyInStore: (state) => (key) => state[key],

    getEmployeeById: (state) => (key, id) => state[key].get(id),
  },

  actions: {
    giveTodayDate() {
      let day = String(new Date().getDate());
      day.length === 1 ? (day = "0" + day) : day;

      let month = String(new Date().getMonth() + 1);
      month.length === 1 ? (month = "0" + month) : month;

      return day + month;
    },

    // взять с сервера
    async dataGetBackend(key, url) {
      try {
        let response = await fetch(
          this.getKeyInStore("serverUrl") + this.getKeyInStore(url),
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        let data = await response.json();

        for (let elem of data) {
          elem.gender === "m"
            ? (elem.gender = "мужской")
            : elem.gender === "f"
            ? (elem.gender = "женский")
            : (elem.gender = "неизвестный");

          if (key === "employees") {
            elem.thumbnail =
              elem.thumbnail === false
                ? (await this.getKeyInStore("imageUrl")) + `defaultPhoto.jpg`
                : (await this.getKeyInStore("imageUrl")) + `${elem.id}.jpg`;
          }
        }
        this[key] = new Map();
        data.forEach((elem) => this[key].set(elem.id, elem));
      } catch (error) {
        console.error(error);
      }
    },

    // отправить на сервер
    async dataPutBackend(key, url) {
      // тяну из  state массив сотрудников
      let arr = [...(await this.getKeyInStore(key).values())];

      // возвращаю в нужный формат поле "пол" сотрудника
      for (let elem of arr) {
        elem.gender === "мужской"
          ? (elem.gender = "m")
          : elem.gender === "женский"
          ? (elem.gender = "f")
          : (elem.gender = "u");

        // возвращаю в нужный формат поле "миниатюра(фото)" сотрудника
        if (key === "employees") {
          elem.thumbnail =
            elem.thumbnail !==
            this.getKeyInStore("imageUrl") + `defaultPhoto.jpg`;
        }
      }

      try {
        let promise = await fetch(
          this.getKeyInStore("serverUrl") + this.getKeyInStore(url),
          {
            method: "POST",
            headers: {
              "Content-Type": "multipart/form-data",
            },
            body: JSON.stringify(arr),
          }
        );
      } catch (error) {
        console.error(error);
      }
    },

    // для получения отформатированных данных из стора и их алфавитная сортировка А - Я
    formatStoreData(key) {
      return this.alphabetSortStart([...this.getKeyInStore(key).values()]);
    },

    setMessage(key) {
      return (this.message =
        this.getKeyInStore(key).size === 0
          ? "Список сотрудников пуст"
          : "Нет сотрудников, соответствующих вашему поиску");
    },

    // сохранить уволенного в архиве
    async saveInArchive(id) {
      try {
        if (this.getEmptyStore("archive")) {
          await this.dataGetBackend("archive", "getArchiveUrl");
        }
        this.message = this.setMessage("archive");
      } catch (error) {
        this.message = `Ошибка  ${error}`;
      }

      let delEmployee = this.getEmployeeById("employees", id);
      await this.getKeyInStore("archive").set(id, delEmployee);

      await this.dataPutBackend("archive", "putArchiveUrl");
    },

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
