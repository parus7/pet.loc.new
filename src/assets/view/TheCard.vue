<script setup>
import { useEmplStore } from "../../stores/EmplStore";
import { RouterLink } from "vue-router";
import { mapState, mapActions } from "pinia";

import ThePopup from "../../components/ThePopup.vue";

const { employees } = useEmplStore();
</script>

<template>
  <form class="container_form" @submit.prevent>
    <fieldset class="container_fullname" :disabled="!isEdit">
      <div class="photo" width="128" height="128"></div>

      <div class="wrapper">
        <label for="last_name">Фамилия:</label>
        <input id="last_name" name="last_name" v-model="employee.last_name" />
      </div>

      <div class="wrapper">
        <label for="first_name">Имя:</label>
        <input
          id="first_name"
          name="first_name"
          v-model="employee.first_name"
        />
      </div>

      <div class="wrapper">
        <label for="middle_name">Отчество :</label>
        <input
          id="middle_name"
          name="middle_name"
          v-model="employee.middle_name"
        />
      </div>
    </fieldset>

    <fieldset class="container_contacts" :disabled="!isEdit">
      <fieldset>
        <div class="wrapper wrapper_min">
          <label for="id_employee">ID:</label>
          <input
            id="id_employee"
            name="id_employee"
            v-model="employee.id"
            disabled
          />
        </div>

        <div class="wrapper wrapper_min">
          <label for="gender">Пол:</label>
          <select id="gender" name="gender" v-model="employee.gender">
            <option disabled>Выберите вариант</option>
            <option>мужской</option>
            <option>женский</option>
            <option>неизвестный</option>
          </select>
        </div>

        <div class="wrapper wrapper_min">
          <label for="born">ДР:</label>
          <input id="born" name="born" v-model="employee.birthday" />
        </div>
      </fieldset>

      <fieldset>
        <div class="wrapper">
          <label for="phone">Внутренний:</label>
          <input id="phone" name="phone" v-model="employee.telephone" />
        </div>

        <div class="wrapper">
          <label for="mobile">Мобильный:</label>
          <input id="mobile" name="mobile" v-model="employee.mobile" />
        </div>

        <div class="wrapper">
          <label for="email">Эл. почта:</label>
          <input id="email" name="email" v-model="employee.email" />
        </div>
      </fieldset>
    </fieldset>

    <fieldset :disabled="!isEdit">
      <div class="wrapper">
        <label for="company">Город:</label>
        <input id="city" name="city" v-model="employee.city" />
      </div>

      <div class="wrapper">
        <label for="company">Компания:</label>
        <input id="company" name="company" v-model="employee.company" />
      </div>

      <div class="wrapper">
        <label for="department">Отдел:</label>
        <input
          id="department"
          name="department"
          v-model="employee.department"
        />
      </div>

      <div class="wrapper">
        <label for="position">Должность:</label>
        <input
          id="position"
          type="text"
          name="position"
          v-model="employee.title"
        />
      </div>
    </fieldset>

    <div class="container-button">
      <button type="text" class="button" @click="isOpen = true">
        Записать
      </button>

      <ThePopup :is-open="isOpen" @ok="popupConfirm" @close="isOpen = false"
        >Вы хотите изменить данные сотрудника?
      </ThePopup>

      <RouterLink class="link" :to="{ name: 'main' }">
        <button type="submit" class="button">
          <!-- @click="saveEmployee(employee.id)" -->
          Закрыть
        </button>
      </RouterLink>
    </div>
    {{ employee }}
  </form>
</template>

<script>
export default {
  components: { ThePopup },

  data() {
    return {
      employee: {},
      paramsId: null,
      isEdit: false,
      isOpen: false,
    };
  },

  created() {
    const paramsId = parseInt(this.$route.params.id);
  },

  // computed: {
  //   ...mapState(useEmplStore, []),
  // },

  methods: {
    ...mapActions(useEmplStore, ["delEmployee", "addEmployee"]),

    saveEmployee(paramsId) {
      this.delEmployee(paramsId);
      this.addEmployee(this.employee);

      this.isEdit = false;
    },

    popupConfirm() {
      this.isOpen = false;
      this.isEdit = true;
    },
  },
};
</script>

<style scoped>
.container_form {
  display: grid;
  gap: 20px;
  width: 100%;
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
  grid-template-columns: 83px auto;
  align-content: center;
}

.wrapper_min {
  grid-template-columns: 35px auto;
}

.container_fullname {
  grid-template-columns: 148px auto;
}

.photo {
  grid-row: 1/4;
  background-color: var(--vt-c-white-background);
  border-radius: 20%;
  margin-right: 10px;
}

.container_contacts {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 20px;
}
.link {
  text-decoration: none;
}
</style>
