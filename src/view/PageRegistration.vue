<template>
  <PageEntrance
    :title="title"
    :isRegistration="isRegistration"
    :isRecovery="isRecovery"
    :buttonTitle="buttonTitle"
  >
    <template v-slot:formRegistration>
      <form class="registration-form">
        <input
          name="last_name"
          type="text"
          aria-label="Фамилия"
          placeholder="Фамилия"
        />

        <input
          name="first_name"
          type="text"
          aria-label="Имя"
          placeholder="Имя"
        />

        <input
          name="middle_name"
          type="text"
          aria-label="Отчество"
          placeholder="Отчество"
        />

        <input
          name="login"
          type="email"
          aria-label="Логин"
          placeholder="Логин / E-mail"
        />

        <input
          name="password"
          type="text"
          aria-label="Пароль"
          placeholder="Пароль"
        />

        <PageColorButton
          type="submit"
          class="registration-form__button">
          {{ buttonTitle }}
        </PageColorButton>

      </form>
    </template>

  </PageEntrance>
</template>

<script>
import PageEntrance from "@/components/PageEntrance.vue";
import PageColorButton from "@/components/UI/PageColorButton.vue";

export default {
  components: { PageColorButton, PageEntrance },
  name: "PageRegistration",

  data() {
    return {
      title: "Регистрация",
      isRegistration: true,
      isRecovery: false,
      buttonTitle: "Получить код"
    };
  }
};
</script>

<style scoped>
.registration-form {
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.registration-form__button {
  padding: 20px;
}
</style>

