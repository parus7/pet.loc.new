<template>
  <form class="card-form" id="add-employee" @submit.prevent>
    <img
      class="card-form__photo"
      :class="{ status: employee.hide }"
      :alt="`id: ${employee.id}`"
      :src="employee.src"
      width="110"
      height="110"
    />

    <fieldset class="card-form__fullname" :disabled="!isEdit">
      <div class="card-form__wrapper">
        <label for="last_name">Фамилия</label>
        <input
          id="last_name"
          type="text"
          aria-label="фамилия сотрудника"
          tabindex="2"
          ref="lastName"
          v-model="employee.last_name"
          required
        />
      </div>

      <div class="card-form__wrapper">
        <label for="first_name">Имя</label>
        <input
          id="first_name"
          type="text"
          aria-label="имя сотрудника"
          tabindex="3"
          v-model="employee.first_name"
          required
        />
      </div>

      <div class="card-form__wrapper">
        <label for="middle_name">Отчество</label>
        <input
          id="middle_name"
          type="text"
          aria-label="отчество сотрудника"
          tabindex="4"
          v-model="employee.middle_name"
        />
      </div>
    </fieldset>

    <fieldset class="card-form__personal" :disabled="!isEdit">
      <div class="card-form__wrapper">
        <label for="id_employee">ID</label>
        <input
          id="id_employee"
          type="text"
          aria-label="id сотрудника"
          v-model="employee.id"
          disabled
        />
      </div>

      <div class="card-form__wrapper">
        <label for="gender">Пол</label>
        <select
          id="gender"
          aria-label="пол сотрудника"
          tabindex="5"
          v-model="employee.gender"
        >
          <option selected disabled>Выберите вариант</option>
          <option>Мужской</option>
          <option>Женский</option>
          <option>Неизвестный</option>
        </select>
      </div>

      <div class="card-form__wrapper">
        <label for="born">ДР</label>
        <input
          id="born"
          type="text"
          aria-label="день рождения сотрудника"
          tabindex="6"
          v-model="employee.birthday"
          v-maska="maskaBirthday"
          data-maska="##.##"
        />
      </div>
    </fieldset>

    <fieldset class="card-form__contacts" :disabled="!isEdit">
      <div class="card-form__wrapper">
        <label for="phone">Вн. тел.</label>
        <input
          id="phone"
          type="text"
          aria-label="phone"
          tabindex="7"
          v-model="employee.telephone"
          v-maska="maskaTelephone"
          data-maska="##-##"
        />
      </div>

      <div class="card-form__wrapper">
        <label for="mobile">Моб. тел.</label>
        <input
          id="mobile"
          type="text"
          aria-label="мобильный номер сотрудника"
          tabindex="8"
          v-model="employee.mobile"
          v-maska="maskaMobile"
          data-maska="### ###-##-##"
        />
      </div>

      <div class="card-form__wrapper">
        <label for="email">Email</label>
        <input
          id="email"
          type="text"
          aria-label="email сотрудника"
          tabindex="9"
          v-model="employee.email"
        />
      </div>
    </fieldset>

    <fieldset class="card-form__address" :disabled="!isEdit">
      <div class="card-form__wrapper">
        <label for="company">Город</label>
        <input
          id="city"
          type="text"
          aria-label="город проживания сотрудника"
          tabindex="10"
          v-model="employee.city"
        />
      </div>

      <div class="card-form__wrapper">
        <label for="company">Компания</label>
        <input
          id="company"
          type="text"
          aria-label="город, в котором работает сотрудник"
          tabindex="11"
          v-model="employee.company"
        />
      </div>

      <div class="card-form__wrapper">
        <label for="department">Отдел</label>
        <input
          id="department"
          type="text"
          aria-label="департамент, в котором работает сотрудник"
          tabindex="12"
          v-model="employee.department"
        />
      </div>

      <div class="card-form__wrapper">
        <label for="position">Должность</label>
        <input
          id="position"
          type="text"
          aria-label="должность сотрудника"
          tabindex="13"
          v-model="employee.title"
        />
      </div>
    </fieldset>

    <div class="container__button card-form__buttons">
      <TheButton
        tabindex="0"
        aria-label="кнопка редактирования данных сотрудника"
        @click="isOpen = true"
      >
        <IconEdit />
      </TheButton>

      <RouterLink class="link" :to="{ name: 'main' }" tabindex="-1">
        <TheButton
          type="submit"
          tabindex="14"
          aria-label="кнопка сохранения данных и перехода на главную страницу"
          @click="onSaveEmployee(employee.id)"
        >
          <IconClose />
        </TheButton>
      </RouterLink>

      <ThePopup :is-open="isOpen" @ok="popupConfirm" @close="isOpen = false"
      >Вы хотите изменить данные сотрудника?
      </ThePopup>
    </div>
  </form>
</template>

<script>
import { useEmplStore } from "@/stores/EmplStore";
import { mapState, mapActions } from "pinia";
import { vMaska } from "maska";

import ThePopup from "@/components/ThePopup.vue";
import TheButton from "@/components/TheButton.vue";

import IconEdit from "@/components/icons/IconEdit.vue";
import IconClose from "@/components/icons/IconClose.vue";

export default {
  components: { ThePopup, TheButton, IconEdit, IconClose },
  directives: { maska: vMaska },

  data() {
    return {
      employee: {},
      paramsId: null,
      isEdit: false,
      isOpen: false,
      isAlphabet: null,

      maskaBirthday: {
        masked: "",
        unmasked: "",
        completed: false
      },

      maskaTelephone: {
        masked: "",
        unmasked: "",
        completed: false
      },

      maskaMobile: {
        masked: "",
        unmasked: "",
        completed: false
      }
    };
  },

  created() {
    const paramsId = this.$route.params.id;
    this.employee = { ...this.getEmplById(paramsId) };
  },

  computed: {
    ...mapState(useEmplStore, ["getEmplById", "getAlphabet"])
  },

  methods: {
    ...mapActions(useEmplStore, [
      "delEmployee",
      "addEmployee",
      "alphabetToggle"
    ]),

    onSaveEmployee(paramsId) {
      this.isAlphabet = this.alphabetToggle();

      this.isEdit = false;
      this.delEmployee(paramsId);

      const unmaskedEmployee = { ...this.employee };
      unmaskedEmployee.birthday = this.maskaBirthday.unmasked;
      unmaskedEmployee.telephone = this.maskaTelephone.unmasked;
      unmaskedEmployee.mobile = this.maskaMobile.unmasked;

      this.addEmployee(unmaskedEmployee);
    },

    popupConfirm() {
      this.isOpen = false;

      this.$nextTick(() => {
        this.$refs.lastName.focus();
      });

      this.isEdit = true;
    }
  }
};
</script>

<style scoped>
.card-form {
  display: grid;
  grid-template-columns: min-content min-content auto;
  grid-template-rows: repeat(5, auto);
  gap: 20px;

  max-width: 768px;
  background-color: var(--vt-c-white-mute);
  box-shadow: 4px 4px 4px 0 var(--vt-c-active-4);
  border-radius: 20px;
  padding: 30px;
  margin: 30px auto;
}

fieldset {
  border: none;
}

.card-form__wrapper {
  display: grid;
  grid-template-columns: 90px 1fr;
  align-items: center;
  margin-bottom: 15px;
}

.card-form__photo {
  background-color: var(--vt-c-white-background);
  border-radius: 20%;
  border: 3px solid var(--vt-c-active-2);
  box-shadow: 2px 3px 4px 1px var(--vt-c-active-4);
  margin: 0 auto;
}

.card-form__fullname {
  grid-column: 2 / 4;
}

.card-form__personal {
  grid-column: 1 / 3;
}

.card-form__address {
  grid-column: 1 / -1;
}

.card-form__buttons {
  grid-column: 3 / 4;
  padding: 0 15px;
}

@media (max-width: 767px) {
  .card-form {
    display: flex;
    flex-direction: column;
    border-radius: 0;
    margin: 0;
  }
}

@media (max-width: 425px) {
  .card-form {
    padding: 15px;
  }

  .card-form__buttons {
    margin: 0 auto;
  }
}
</style>
