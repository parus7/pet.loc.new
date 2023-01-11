<script setup>
import { useEmplStore } from "../../stores/EmplStore";
import { mapState, mapActions } from "pinia";

const { employees } = useEmplStore();
</script>

<template>
  <form class="container_form" @submit.prevent>
    <fieldset class="container_fullname" :disabled="!isEdit">
      <div class="photo" width="128" height="128"></div>

      <div class="wrapper">
        <label for="last_name">ФАМИЛИЯ:</label>
        <input id="last_name" name="last_name" v-model="employee.last_name" />
      </div>

      <div class="wrapper">
        <label for="first_name">ИМЯ:</label>
        <input
          id="first_name"
          name="first_name"
          v-model="employee.first_name"
        />
      </div>

      <div class="wrapper">
        <label for="middle_name">ОТЧЕСТВО :</label>
        <input
          id="middle_name"
          name="middle_name"
          v-model="employee.middle_name"
        />
      </div>
    </fieldset>

    <fieldset class="container_contacts" :disabled="!isEdit">
      <div class="wrapper">
        <label for="id_employee">ID:</label>
        <input
          id="id_employee"
          name="id_employee"
          v-model="employee.id"
          disabled
        />
      </div>

      <div class="wrapper wrapper_phone">
        <label for="phone">ВНУТРЕННИЙ:</label>
        <input id="phone" name="phone" v-model="employee.telephone" />
      </div>

      <div class="wrapper">
        <label for="gender">ПОЛ:</label>
        <select id="gender" name="gender" v-model="employee.gender">
          <option disabled>Выберите вариант</option>
          <option>мужской</option>
          <option>женский</option>
          <option>неизвестный</option>
        </select>
      </div>

      <div class="wrapper wrapper_email">
        <label for="email">ЭЛ. ПОЧТА:</label>
        <input id="email" name="email" v-model="employee.email" />
      </div>

      <div class="wrapper">
        <label for="born">ДР:</label>
        <input id="born" name="born" v-model="employee.birthday" />
      </div>

      <div class="wrapper">
        <label for="mobile">МОБИЛЬНЫЙ:</label>
        <input id="mobile" name="mobile" v-model="employee.mobile" />
      </div>
    </fieldset>

    <fieldset :disabled="!isEdit">
      <div class="wrapper">
        <label for="company">ГОРОД:</label>
        <input id="city" name="city" v-model="employee.city" />
      </div>

      <div class="wrapper">
        <label for="company">КОМПАНИЯ:</label>
        <input id="company" name="company" v-model="employee.company" />
      </div>

      <div class="wrapper">
        <label for="department">ДЕПАРТАМЕНТ:</label>
        <input
          id="department"
          name="department"
          v-model="employee.department"
        />
      </div>

      <div class="wrapper">
        <label for="position">ДОЛЖНОСТЬ:</label>
        <input
          id="position"
          type="text"
          name="position"
          v-model="employee.title"
        />
      </div>
    </fieldset>

    <fieldset class="container-button">
      <button type="button" class="button btn_edit" @click="editEmployee()">
        Редактировать
      </button>

      <button
        type="submit"
        class="button btn_submit"
        @click="saveEmployee(employee.id)"
      >
        Сохранить
      </button>
    </fieldset>
  </form>

  <!-- {{ getEmplIndex(employee.id) }} -->
</template>

<script>
export default {
  data() {
    return {
      employee: {},
      isEdit: false,
      paramsId: null,
    };
  },

  created() {
    const paramsId = Number(this.$route.params.id);

    // break object reference from state
    this.employee = { ...this.getEmplById(paramsId) };

    this.employee.telephone = this.getEmplTelephone(paramsId);
    this.employee.mobile = this.getEmplMobile(paramsId);
    this.employee.birthday = this.getEmplBirthday(paramsId);
    this.employee.gender = this.getEmplGender(paramsId);
  },

  computed: {
    ...mapState(useEmplStore, [
      "getEmplById",
      "getEmplTelephone",
      "getEmplMobile",
      "getEmplBirthday",
      "getEmplGender",
      "getEmplIndex",
    ]),
  },

  methods: {
    editEmployee() {
      this.isEdit = true;
    },

    saveEmployee(paramsId) {
      this.index = this.getEmplIndex(paramsId);
      // console.log(this.index);

      this.isEdit = false;
      // console.log(this.isEdit);

      useEmplStore[this.index] = this.employee;
      // console.log(useEmplStore[this.index]);
      // console.log(this.employee);
    },
  },
};
</script>

<style scoped>
.container_form {
  display: grid;
  gap: 20px;
  width: 90%;
  background-color: var(--vt-c-white-mute);
  padding: 35px;
  margin: 0 auto;
}

fieldset {
  display: grid;
  border: none;
  gap: 10px;
  margin: 0;
}

.wrapper {
  display: grid;
  grid-template-columns: 88px auto;
  align-content: center;
}

.container_fullname {
  grid-template-columns: 148px auto;
}

.photo {
  grid-row: 1/4;
  background-color: var(--vt-c-white-background);
  border-radius: 20%;
  margin-right: 20px;
}

.container_contacts {
  display: grid;
  grid-template-columns: 280px 1fr;
}

select {
  appearance: none;
}

.container-button {
  display: flex;
  justify-content: end;
  border: none;
  padding: 0;
}

.btn_edit,
.btn_submit {
  width: 130px;
  justify-self: end;
  padding: 10px;
  margin: 5px;
}
</style>
