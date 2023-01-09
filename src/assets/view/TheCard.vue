<script setup>
import { useEmplStore } from "../../stores/EmplStore";
import { mapState, mapActions } from "pinia";

const { employees } = useEmplStore();
</script>

<template>
  <form class="container_form">
    <fieldset class="container container_fullname">
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

    <fieldset class="container container_contacts">
      <div class="wrapper">
        <label for="id_employee">ID:</label>
        <input id="id_employee" name="id_employee" v-model="employee.id" />
      </div>

      <div class="wrapper wrapper_phone">
        <label for="phone">ВНУТРЕННИЙ:</label>
        <input id="phone" name="phone" :value="getEmplTelephone(employee.id)" />
      </div>

      <div class="wrapper">
        <label for="gender">ПОЛ:</label>
        <input id="phone" name="phone" :value="getEmplGender(employee.id)" />
        <!-- <select id="gender" name="gender" :value="getEmplGender(employee.id)">
          <option>male</option>
          <option>female</option>
          <option>unknown</option>
        </select> -->
      </div>

      <div class="wrapper wrapper_email">
        <label for="email">ЭЛ. ПОЧТА:</label>
        <input id="email" name="email" v-model="employee.email" />
      </div>

      <div class="wrapper">
        <label for="born">ДР:</label>
        <input id="born" name="born" :value="getEmplBirthday(employee.id)" />
      </div>

      <div class="wrapper" wrapper_mobile>
        <label for="mobile">МОБИЛЬНЫЙ:</label>
        <input id="mobile" name="mobile" :value="getEmplMobile(employee.id)" />
      </div>
    </fieldset>

    <fieldset class="container">
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

    <button type="button" class="button btn_edit">Изменить</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      employee: {},
      isEdit: false,
    };
  },
  created() {
    const paramsId = Number(this.$route.params.id);
    this.employee = this.getEmplById(paramsId);
  },

  computed: {
    ...mapState(useEmplStore, [
      "getEmplById",
      "getEmplTelephone",
      "getEmplMobile",
      "getEmplBirthday",
      "getEmplGender",
    ]),
  },
};
</script>

<style scoped>
.container_form {
  display: grid;
  gap: 20px;
  width: 90%;
  background-color: var(--vt-c-white-mute);
  padding: 40px;
  margin: 0 auto;
}

.container {
  display: grid;
  border: none;
  gap: 10px;
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

textarea {
  resize: none;
  white-space: pre-line;
}

.btn_edit {
  width: auto;
  justify-self: end;
  padding: 10px;
  margin: 10px;
}
</style>
