<template>
  <PageEntrance
    :title="title"
    :isRecovery="isRecovery"
    :buttonTitle="buttonTitle"
  >

  </PageEntrance>
</template>

<script>
import PageEntrance from "@/components/PageEntrance.vue";
import PageColorButton from "@/components/UI/PageColorButton.vue";

export default {
  components: { PageColorButton, PageEntrance },
  name: "passwordRecovery",

  data() {
    return {
      title: "Восстановить пароль",
      isRecovery: true,
      buttonTitle: "Отправить код"
    };
  },

  methods:{

  }
};
</script>

<style scoped>

</style>