<template>
  <header class="heading">
    <img src="/honeymustard.svg">
  </header>
</template>

<style scoped lang="scss">
  .heading {
    display: flex;
    justify-content: center;

    img {
      display: block;
      width: 100%;
      max-width: 90%;

      @media (min-width: 500px) {
        max-width: 80%;
      }
    }
  }
</style>