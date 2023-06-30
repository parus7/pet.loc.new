<template>
  <div class="login">
    <div class="login-field">
      <h1
        :title="title"
        class="login-field__title">
        {{ title }}
      </h1>

      <template v-if="!isRegistration">

        <form class="login-form">
          <input
            name="login"
            type="email"
            aria-label="E-mail"
            placeholder="Логин / E-mail"
          />

          <template v-if="!isRecovery">
            <input
              name="password"
              type="text"
              aria-label="Пароль"
              placeholder="Пароль"
            />
          </template>

          <PageColorButton
            type="submit"
            class="login-form__button">
            {{ buttonTitle }}
          </PageColorButton>

        </form>
      </template>

      <template v-else>
        <slot name="formRegistration"></slot>
      </template>

      <slot name="linkRecoveryAndRegistration"></slot>

    </div>
  </div>
</template>

<script>
import PageColorButton from "@/components/UI/PageColorButton.vue";

export default {
  components: { PageColorButton },
  name: "PageEntrance",

  props: {
    title: String,
    isRegistration: Boolean,
    isRecovery: Boolean,
    buttonTitle: String
  }
};
</script>

<style scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.login-field {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 20vw;
  height: 37vh;
  color: var(--vt-c-grey-font);
  background-color: var(--vt-c-active-2);
  box-shadow: 2px 2px 0 0 var(--vt-c-active-4);
  border-radius: 8px;
  padding: 50px 30px;
}

.login-field__title {
  text-align: center;
  margin: 0;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.login-form__button {
  padding: 20px;
  margin-top: 20px;
}
</style>