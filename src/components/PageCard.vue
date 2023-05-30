<template>
  <form class="card-form" id="add-employee" @submit.prevent>
    <!-- class "status " for the field  "hide" in employee (employeeData.json)-->
    <img
      class="card-form__photo"
      :class="{ status: employee['hide'] }"
      :alt="`id: ${employee['id']}`"
      :src="employee['src']"
      width="110"
      height="110"
    />

    <fieldset class="card-form__full-name" :disabled="!isEdit">
      <label class="card-form__label">Фамилия*
        <input
          id="last_name"
          type="text"
          aria-label="фамилия сотрудника"
          tabindex="2"
          ref="lastName"
          v-model.trim="employee['last_name']"
          required
        />
      </label>

      <label class="card-form__label">Имя
        <input
          id="first_name"
          type="text"
          aria-label="имя сотрудника"
          tabindex="3"
          v-model.trim="employee['first_name']"
        />
      </label>

      <label class="card-form__label">Отчество
        <input
          id="middle_name"
          type="text"
          aria-label="отчество сотрудника"
          tabindex="4"
          v-model.trim="employee['middle_name']"
        />
      </label>
    </fieldset>

    <fieldset class="card-form__personal" :disabled="!isEdit">
      <label class="card-form__label">ID
        <input
          id="id_employee"
          type="text"
          aria-label="id сотрудника"
          tabindex="-1"
          v-model.trim="employee['id']"
          disabled
        />
      </label>

      <label class="card-form__label">Пол
        <select
          id="gender"
          aria-label="пол сотрудника"
          tabindex="5"
          v-model.trim="employee['gender']"
        >
          <option selected disabled>Выберите вариант</option>
          <option>мужской</option>
          <option>женский</option>
          <option>неизвестный</option>
        </select>
      </label>

      <label class="card-form__label">ДР
        <input
          id="birthday"
          type="text"
          aria-label="день рождения сотрудника"
          tabindex="6"
          v-model.trim="employee['birthday']"
          v-maska="maskaBirthday"
          data-maska="##.##"
        />
      </label>
    </fieldset>

    <fieldset class="card-form__contacts" :disabled="!isEdit">
      <label class="card-form__label">Вн. тел.
        <input
          id="telephone"
          type="text"
          aria-label="внутренний номер сотрудника"
          tabindex="7"
          v-model.trim="employee['telephone']"
          v-maska="maskaTelephone"
          data-maska="##-##"
        />
      </label>

      <label class="card-form__label">Моб. тел.
        <input
          id="mobile"
          type="text"
          aria-label="мобильный номер сотрудника"
          tabindex="8"
          v-model.trim="employee['mobile']"
          v-maska="maskaMobile"
          data-maska="### ###-##-##"
        />
      </label>

      <label class="card-form__label">Email
        <input
          id="email"
          type="email"
          aria-label="email сотрудника"
          tabindex="9"
          v-model.trim="employee['email']"
        />
      </label>
    </fieldset>

    <fieldset class="card-form__address" :disabled="!isEdit">
      <label class="card-form__label">Город
        <input
          id="city"
          type="text"
          aria-label="город проживания сотрудника"
          tabindex="10"
          v-model.trim="employee['city']"
        />
      </label>

      <label class="card-form__label">Компания
        <input
          id="company"
          type="text"
          aria-label="компания, в которой работает сотрудник"
          tabindex="11"
          v-model.trim="employee['company']"
        />
      </label>

      <label class="card-form__label">Отдел
        <input
          id="department"
          type="text"
          aria-label="департамент, в котором работает сотрудник"
          tabindex="12"
          v-model.trim="employee['department']"
        />
      </label>

      <label class="card-form__label">Должность
        <input
          id="title"
          type="text"
          aria-label="должность сотрудника"
          tabindex="13"
          v-model.trim="employee['title']"
        />
      </label>
    </fieldset>

    <template v-if="!isMain">
      <p class="card-form__explanations">* обязательное поле для ввода</p>
    </template>

    <div class=" card-form__buttons">

      <template v-if="!isMain">
        <span class="tooltip tooltip-position" data-name="редактировать">
          <PageColorButton
            tabindex="0"
            aria-label="кнопка редактирования данных сотрудника"
            @click="isOpen = true"
          >
            <IconEdit />
          </PageColorButton>
        </span>

        <span class="tooltip tooltip-position" data-name="сохранить">
          <PageColorButton
            tabindex="14"
            aria-label="кнопка сохранения данных сотрудника"
            @click="onSaveEmployee(employee['id'])"
          >
            <IconSave />
          </PageColorButton>
        </span>

        <PagePopup
          :is-open="isOpen"
          @ok="popupConfirm"
          @close="isOpen = false"
        >
          <template #popupText>
            Вы хотите изменить данные сотрудника?
          </template>

        </PagePopup>
      </template>

      <span class="tooltip tooltip-position" data-name="выйти">
        <PageColorButton
          tabindex="isMain ? '15': '1'"
          aria-label="кнопка выхода"
          @click=" this.$router.go(-1)"
        >
          <IconGoTo />
        </PageColorButton>
      </span>
    </div>
  </form>
</template>

<script>
import { useEmplStore } from "@/stores/EmplStore";
import { mapActions } from "pinia";
import { vMaska } from "maska";

import PagePopup from "@/components/PagePopup.vue";
import PageColorButton from "@/components/UI/PageColorButton.vue";

import IconEdit from "@/components/icons/IconEdit.vue";
import IconSave from "@/components/icons/IconSave.vue";
import IconGoTo from "@/components/icons/IconGoTo.vue";

export default {
  components: { PagePopup, PageColorButton, IconEdit, IconSave, IconGoTo },
  directives: { maska: vMaska },

  props: {
    employee: Object,
    isEdit: Boolean,
    isMain: Boolean
  },

  data() {
    return {
      paramsId: null,
      isOpen: false,
      tabindex: 1,

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

  mounted() {
    this.$refs.lastName.focus();
  },

  methods: {
    ...mapActions(useEmplStore, [
      "delEmployee",
      "addEmployee"
    ]),

    onSaveEmployee(paramsId) {
      this.$emit("editNo");
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

      this.$emit("editOk");
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
  box-shadow: 4px 4px 4px 0 var(--vt-c-active-2);
  border-radius: 20px;
  padding: 30px;
  margin: 30px auto;
}

.card-form__label {
  display: grid;
  grid-template-columns: 90px 1fr;
  align-items: center;
  margin-bottom: 15px;
}

.card-form__photo {
  background-color: var(--vt-c-white-background-confirm);
  border-radius: 20%;
  border: 3px solid var(--vt-c-active-2);
  box-shadow: 2px 3px 4px 1px var(--vt-c-active-9);
  margin: 0 auto;
}

.card-form__full-name {
  grid-column: 2 / 4;
}

.card-form__personal {
  grid-column: 1 / 3;
}

.card-form__address {
  grid-column: 1 / -1;
}

.card-form__explanations {
  grid-area: 4/1/5/3;
  font-weight: bold;
  margin: 10px;
}

.card-form__full-name label:first-child {
  font-weight: bold;
}

.card-form__buttons {
  grid-area: 4/3/5/4;

  display: flex;
  justify-content: end;
  gap: 40px;
  max-width: 500px;
  padding: 0 15px;
}

.tooltip-position:hover::after {
  left: 0;
}

@media (max-width: 767px) {
  .card-form {
    display: flex;
    flex-direction: column;
    border-radius: 0;
    margin: 0;
  }

  .card-form__buttons {
    width: 360px;
    justify-content: space-around;
    margin: 0 auto;
  }
}

@media (max-width: 425px) {
  .card-form {
    padding: 15px;
  }

  .card-form__buttons {
    width: 250px;
  }
}
</style>
