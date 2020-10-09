<template>
  <div class="app">
    <heading></heading>
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
    background:#1582e0;
    background: linear-gradient(180deg, #0371cf 3%, #1582e0 13%);
    padding-top: 20px;

    @media (min-width: 500px) {
      padding-top: 40px;
    }
  }

  $width: 800px;

  .heading {
    max-width: $width;
    margin: 0 auto;
    padding: 0 15px;
  }

  .main {
    max-width: $width;
    margin: 20px auto;
    padding: 0 10px;

    @media (min-width: 500px) {
      margin: 25px auto;
    }
  }
</style>