import { defineStore } from "pinia";
import { useEmplStore } from "./EmplStore";

export const useEmplArchive = defineStore("EmplArchive", {
  state: () => {
    return {
      employeesArchive: new Map(),
    };
  },

  actions: {
    setMapEmployeesArchive(data) {
      const emplStore = useEmplStore();
      const genderArchive = emplStore.setGender;
      const imageArchive = emplStore.setImage;

      genderArchive(data);
      imageArchive(data);

      data.sort((a, b) => a.cn.localeCompare(b.cn));

      this.employeesArchive = new Map();
      data.forEach((elem) => this.employeesArchive.set(elem.id, elem));

      console.log(this.employeesArchive);
      return this.employeesArchive;
    },
  },
});
