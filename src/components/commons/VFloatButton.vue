<template>
<v-btn
  class="btn"
  icon="mdi-plus"
  size="large"
/>
</template>

<style lang="scss" scoped>
.btn {
  position: absolute;
  bottom: 4%;
  right: 2%;
  background: #1867C0;
  color: #fff;
}

@media only screen and (max-width: 499px) {
  .btn {
    right: 5%;
    bottom: 3%;
  }
}
</style>