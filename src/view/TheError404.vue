<template>
  <div class="error">
    <div class="error__body">
      <p class="error__text">404</p>
      <p class="error__text">Страница не найдена</p>
      <IconSmiley class="icon-smiley" />
    </div>
  </div>
</template>

<script>
import IconSmiley from "@/components/icons/IconSmiley.vue";

export default {
  components: { IconSmiley },
  name: "TheError404"
};
</script>

<style scoped>
.error {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.error__body {
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 25vh;
  height: 37vh;
  color: var(--vt-c-grey-font);
  background-color: var(--vt-c-active-2);
  box-shadow: 2px 2px 0 0 var(--vt-c-active-4);
  border-radius: 8px;
  padding: 50px 30px;
}

.error__text {
  font-size: 2.2rem;
  text-transform: uppercase;
  text-align: center;
}

.icon-smiley {
  margin: 32px;
}
</style>