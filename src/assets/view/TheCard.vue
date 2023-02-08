<script setup>
import { useEmplStore } from "../../stores/EmplStore";
import { RouterLink } from "vue-router";
import { mapState, mapActions } from "pinia";

import ThePopup from "../../components/ThePopup.vue";
import IconEdit from "../../components/icons/IconEdit.vue";
import IconClose from "../../components/icons/IconClose.vue";
</script>

<template>
  <form class="card-form" @submit.prevent>
    <fieldset class="card-form__fullname" :disabled="!isEdit">
      <div class="card-form__photo" width="128" height="128"></div>

      <div class="card-form__wrapper">
        <label for="last_name">Фамилия:</label>
        <input
          id="last_name"
          type="text"
          name="last_name"
          tabindex="2"
          ref="lastName"
          v-model="employee.last_name"
        />
      </div>

      <div class="card-form__wrapper">
        <label for="first_name">Имя:</label>
        <input
          id="first_name"
          type="text"
          name="first_name"
          tabindex="3"
          v-model="employee.first_name"
        />
      </div>

      <div class="card-form__wrapper">
        <label for="middle_name">Отчество :</label>
        <input
          id="middle_name"
          type="text"
          name="middle_name"
          tabindex="4"
          v-model="employee.middle_name"
        />
      </div>
    </fieldset>

    <fieldset class="card-form__contacts" :disabled="!isEdit">
      <fieldset>
        <div class="card-form__wrapper card-form__wrapper-min">
          <label for="id_employee">ID:</label>
          <input
            id="id_employee"
            type="text"
            name="id_employee"
            v-model="employee.id"
            disabled
          />
        </div>

        <div class="card-form__wrapper card-form__wrapper-min">
          <label for="gender">Пол:</label>
          <select
            id="gender"
            name="gender"
            tabindex="5"
            v-model="employee.gender"
          >
            <option selected disabled>Выберите вариант</option>
            <option>Мужской</option>
            <option>Женский</option>
            <option>Неизвестный</option>
          </select>
        </div>

        <div class="card-form__wrapper card-form__wrapper-min">
          <label for="born">ДР:</label>
          <input
            id="born"
            type="text"
            name="born"
            tabindex="6"
            v-model="employee.birthday"
          />
        </div>
      </fieldset>

      <fieldset>
        <div class="card-form__wrapper">
          <label for="phone">Внутренний:</label>
          <input
            id="phone"
            type="text"
            name="phone"
            tabindex="7"
            v-model="employee.telephone"
          />
        </div>

        <div class="card-form__wrapper">
          <label for="mobile">Мобильный:</label>
          <input
            id="mobile"
            type="text"
            name="mobile"
            tabindex="8"
            v-model="employee.mobile"
          />
        </div>

        <div class="card-form__wrapper">
          <label for="email">Эл. почта:</label>
          <input
            id="email"
            type="text"
            name="email"
            tabindex="9"
            v-model="employee.email"
          />
        </div>
      </fieldset>
    </fieldset>

    <fieldset :disabled="!isEdit">
      <div class="card-form__wrapper">
        <label for="company">Город:</label>
        <input
          id="city"
          type="text"
          name="city"
          tabindex="10"
          v-model="employee.city"
        />
      </div>

      <div class="card-form__wrapper">
        <label for="company">Компания:</label>
        <input
          id="company"
          type="text"
          name="company"
          tabindex="11"
          v-model="employee.company"
        />
      </div>

      <div class="card-form__wrapper">
        <label for="department">Отдел:</label>
        <input
          id="department"
          type="text"
          name="department"
          tabindex="12"
          v-model="employee.department"
        />
      </div>

      <div class="card-form__wrapper">
        <label for="position">Должность:</label>
        <input
          id="position"
          type="text"
          name="position"
          tabindex="13"
          v-model="employee.title"
        />
      </div>
    </fieldset>

    <div class="container__button">
      <button
        tabindex="0"
        type="button"
        class="button"
        aria-label="кнопка редактирования данных сотрудника"
        @click="isOpen = true"
      >
        <IconEdit />
      </button>

      <RouterLink class="link" :to="{ name: 'main' }" tabindex="-1">
        <button
          type="button"
          class="button"
          tabindex="14"
          aria-label="кнопка сохранения данных и перехода на главную страницу"
          @click="onSaveEmployee(employee.id)"
        >
         <IconClose/>
        </button>
      </RouterLink>

      <ThePopup :is-open="isOpen" @ok="popupConfirm" @close="isOpen = false"
        >Вы хотите изменить данные сотрудника?
      </ThePopup>
    </div>
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
    const paramsId = this.$route.params.id;

    this.employee = this.getEmplById(paramsId);
  },

  computed: {
    ...mapState(useEmplStore, ["getEmplById", "getAllEmployees"]),
  },

  methods: {
    ...mapActions(useEmplStore, ["delEmployee", "addEmployee"]),

    onSaveEmployee(paramsId) {
      this.isEdit = false;
      this.delEmployee(paramsId);
      this.addEmployee(this.employee);
      this.employees = this.getAllEmployees;
    },

    popupConfirm() {
      this.isOpen = false;

      this.$nextTick(() => {
        this.$refs.lastName.focus();
      });

      this.isEdit = true;
    },
  },
};
</script>

<style scoped>
.card-form {
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

.card-form__wrapper {
  display: grid;
  grid-template-columns: 83px auto;
  align-content: center;
}

.card-form__wrapper-min {
  grid-template-columns: 35px auto;
}

.card-form__fullname {
  grid-template-columns: 148px auto;
}

.card-form__photo {
  grid-row: 1/4;
  background-color: var(--vt-c-white-background);
  border-radius: 20%;
  margin-right: 10px;
}

.card-form__contacts {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 20px;
}
</style>
