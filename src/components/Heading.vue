<template>
  <header class="heading">
    <img alt="honeymustard.io" src="/honeymustard.svg">
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
      height: 35px;

      @media (min-width: 500px) {
        max-width: 80%;
        height: auto;
      }
    }
  }
</style>