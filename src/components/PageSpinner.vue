<template>
  <div class="spinner">
    <div class="spinner__body" />
  </div>
</template>

<script>
export default {
  name: "PageLoader"
};
</script>

<style scoped>
.spinner {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--vt-c-white-background-confirm);
  z-index: 112;
}

.spinner__body {
  position: absolute;
  bottom: 30%;
  right: 50%;
  width: 16px;
  height: 16px;
  border-radius: 4px;
  box-shadow: 0 30px, 0 -30px;
  transform: translateY(30px);
  animation: cube 2s ease infinite;
  margin: auto;
}

.spinner__body::after,
.spinner__body::before {
  position: absolute;
  left: 30px;
  top: 0;
  content: "";
  width: 16px;
  height: 16px;
  border-radius: 4px;
  box-shadow: 0 30px, 0 -30px;
  animation: cube 2s 0.2s ease infinite;
}

.spinner__body::before {
  left: 60px;
  animation-delay: 0.4s;
}

@keyframes cube {
  0% {
    top: 0;
    color: var(--vt-c-active-2);
    background: var(--vt-c-active-2);
  }
  50% {
    top: 30px;
    color: var(--vt-c-active-4);
    background: var(--vt-c-active-4);
  }
  100% {
    top: 0;
    color: var(--vt-c-active-6);
    background: var(--vt-c-active-6);
  }
}
</style>