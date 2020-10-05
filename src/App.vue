<template>
  <div class="app">
    <!-- <heading></heading> -->
    <main class="main">
      <emulator></emulator>
    </main>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import Heading from '@/components/Heading.vue';
  import Emulator from '@/components/Emulator.vue';

  @Component({
    components: {
      Heading,
      Emulator,
    }
  })

  export default class App extends Vue {}
</script>

<style lang="scss">
  html {
    box-sizing: border-box;
  }
  
  *,
  *:before,
  *:after {
    font-family: inherit;
    box-sizing: inherit;
  }

  body {
    margin: 0;
  }

  .app {
    font-family: 'Source Sans Pro', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  $width: 800px;

  .heading {
    max-width: $width;
    margin: 20px auto 0;
    padding: 0 15px;
  }

  .main {
    max-width: $width;
    margin: 60px auto;
    padding: 0 10px;
  }
</style>