<script setup>
import { useEmplStore } from "../../stores/EmplStore";
const employeesData = useEmplStore();
</script>

<template>
  <form class="container_form">
    <fieldset class="container container_fullname">
      <div class="photo" width="128" height="128"></div>

      <div class="wrapper">
        <label for="last_name">ФАМИЛИЯ:</label>
        <input
          id="last_name"
          name="last_name"
          ref="last_name"
          v-model="empl.last_name"
          :disabled="disabled"
        />
      </div>

      <div class="wrapper">
        <label for="first_name">ИМЯ:</label>
        <input
          id="first_name"
          name="first_name"
          v-model="empl.first_name"
          :disabled="disabled"
        />
      </div>

      <div class="wrapper">
        <label for="middle_name">ОТЧЕСТВО :</label>
        <input
          id="middle_name"
          name="middle_name"
          v-model="empl.middle_name"
          :disabled="disabled"
        />
      </div>
    </fieldset>

    <fieldset class="container container_contacts">
      <div class="wrapper">
        <label for="id_employee">ID:</label>
        <input
          id="id_employee"
          name="id_employee"
          v-model="paramsId"
          :disabled="true"
        />
      </div>

      <div class="wrapper wrapper_phone">
        <label for="phone">ВНУТ.ТЕЛЕФОН:</label>
        <input
          id="phone"
          name="phone"
          v-model="empl.telephone"
          :disabled="disabled"
        />
      </div>

      <div class="wrapper">
        <label for="gender">ПОЛ:</label>
        <select id="gender" v-model="empl.gender" :disabled="disabled">
          <option>male</option>
          <option>female</option>
          <option>unknown</option>
        </select>
      </div>

      <div class="wrapper wrapper_email">
        <label for="email">ЭЛ. ПОЧТА:</label>
        <input
          id="email"
          name="email"
          v-model="empl.email"
          :disabled="disabled"
        />
      </div>

      <div class="wrapper">
        <label for="born">ДАТА РОЖДЕНИЯ:</label>
        <input
          id="born"
          name="born"
          v-model="empl.birthday"
          :disabled="disabled"
        />
      </div>

      <div class="wrapper" wrapper_mobile>
        <label for="mobile">МОБ.ТЕЛЕФОН:</label>
        <input
          id="mobile"
          name="mobile"
          v-model="empl.mobile"
          :disabled="disabled"
        />
      </div>
    </fieldset>

    <fieldset class="container">
      <div class="wrapper">
        <label for="company">ГОРОД:</label>
        <input id="city" name="city" v-model="empl.city" :disabled="disabled" />
      </div>

      <div class="wrapper">
        <label for="company">КОМПАНИЯ:</label>
        <input
          id="company"
          name="company"
          v-model="empl.company"
          :disabled="disabled"
        />
      </div>

      <div class="wrapper">
        <label for="department">ДЕПАРТАМЕНТ:</label>
        <input
          id="department"
          name="department"
          v-model="empl.department"
          :disabled="disabled"
        />
      </div>

      <div class="wrapper">
        <label for="position">ДОЛЖНОСТЬ:</label>
        <input
          id="position"
          type="text"
          name="position"
          v-model="empl.title"
          :disabled="disabled"
        />
      </div>
    </fieldset>

    <button type="button" class="button btn_edit">Изменить</button>
  </form>
</template>

<script>
export default {};
</script>

<style scoped>
.container_form {
  display: grid;
  gap: 20px;
  width: 80%;
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
  justify-self: end;
  margin: 10px;
}
</style>
