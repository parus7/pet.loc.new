<template>
  <div class="login">
    <div class="login-field">
      <h1
        :title="title"
        class="login-field__title">
        {{ title }}
      </h1>

      <form
        class="login-form"
        @submit.prevent>

        <input
          name="login"
          type="email"
          aria-label="E-mail"
          placeholder="Логин / E-mail"
          v-model="login"
        />

        <template v-if="isRecovery">
          <div class="login-form__message">
            Введите e-mail, на него будет выслан проверочный код
          </div>
        </template>

        <template v-else>
          <input
            name="password"
            type="text"
            aria-label="Пароль"
            placeholder="Пароль"
            v-model="password"
            @keyup.enter="getEntrance"
          />
        </template>

        <div class="login-form__error-message">{{ errorMessage }}</div>

        <PageColorButton
          class="login-form__button"
          @click="getEntrance"
        >
          {{ buttonTitle }}
        </PageColorButton>

      </form>

      <slot name="linkRecovery"></slot>

      <slot name="toPageBasic"></slot>

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
    isRecovery: Boolean,
    buttonTitle: String,
    errorMessage: String,
    recoveryLogin: String
  },

  data() {
    return {
      login: "",
      password: ""
    };
  },

  methods: {
    getEntrance() {
      this.isRecovery
        ? this.$emit("getRecovery", { login: this.login || this.recoveryLogin })
        : this.$emit("getEntrance", { login: this.login, password: this.password });
    }
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
  width: 250px;
  height: 450px;
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
  gap: 20px;
  width: 100%;
}

.login-form__button {
  padding: 20px;
}

.login-form__error-message {
  height: 30px;
  align-self: center;
  color: var(--vt-c-alert-7);
}

.login-form__message {
  text-align: center;
}
</style>
