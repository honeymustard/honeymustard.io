<template>
  <header class="heading">
    <img src="/honeymustard.svg">
  </header>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';

  @Component
  export default class Heading extends Vue {
  }
</script>

<style scoped lang="scss">
  .heading {
    img {
      width: 100%;
      max-width: 100%;
    }
  }
</style>