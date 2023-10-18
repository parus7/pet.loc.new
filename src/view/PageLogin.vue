<template>
  <PageEntrance
    :title="title"
    :isRecovery="isRecovery"
    :buttonTitle="buttonTitle"
    :errorMessage="errorMessage"
  >

    <!--     @getEntrance="requestEntry($event)"-->

    <template v-slot:linkRecovery>
      <RouterLink
        class="login-field__prompt"
        :to="{
        name: 'recovery',
      }"
      >Забыли пароль?
      </RouterLink>

    </template>

  </PageEntrance>
</template>

<script>
import PageEntrance from "@/components/PageEntrance.vue";
import PageColorButton from "@/components/UI/PageColorButton.vue";
import axios from "axios";

export default {
  components: { PageColorButton, PageEntrance },
  name: "PageLogin",

  data() {
    return {
      title: "Вход",
      isRegistration: false,
      isRecovery: false,
      buttonTitle: "Войти",
      errorMessage: ""
    };
  },

  methods: {
    // requestEntry(event) {
    //   axios.post("http://saa.44321.ru/", {
    //     login: event.login,
    //     password: event.password
    //   })
    //     .then(response => this.$router.push({ name: "basic" }))
    //     .catch(error => (this.errorMessage = "Неверный логин  или пароль"));
    // }
  }
};
</script>

<style scoped>
.login-field__prompt {
  color: var(--vt-c-grey-font);
  font-size: 1rem;
  text-decoration: none;
  border-bottom: 1px dashed var(--vt-c-active-10);
}

.login-field__prompt:hover {
  color: var(--vt-c-active-4);
  font-size: 0.97rem;
}
</style>