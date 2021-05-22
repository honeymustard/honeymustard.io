<template>
  <heading></heading>
  <emulator v-if="program.name === 'emulator'"></emulator>
  <paint v-else-if="program.name === 'paint'" v-bind="program.args"></paint>
  <desktop v-else></desktop>
</template>

<script lang="ts">
  import { defineComponent, computed } from 'vue';
  import { useStore } from 'vuex';
  import Heading from '@/components/Heading.vue';
  import Paint from '@/components/Paint.vue';
  import Desktop from '@/components/Desktop.vue';
  import Emulator from '@/components/Emulator.vue';

  export default defineComponent({
    components: {
      Heading,
      Paint,
      Desktop,
      Emulator,
    },
    setup() {
      const store = useStore();
      const program = computed(() => store.getters.program);
      return { program };
    }
  });
</script>

<style lang="scss">
  html {
    box-sizing: border-box;
    min-height: 100vh;
  }
  
  *,
  *:before,
  *:after {
    font-family: inherit;
    box-sizing: inherit;
  }

  body {
    min-height: inherit;
    margin: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background:#1582e0;
    background: linear-gradient(180deg, #0371cf 3%, #1582e0 13%);
  }

  #app {
    padding: 20px 10px 0;
    min-height: inherit;
    display: flex;
    flex-direction: column;
    align-items: center;

    @media (min-width: 500px) {
      padding-top: 40px;
    }
  }

  .heading {
    margin-bottom: 20px;

    @media (min-width: 500px) {
      margin-bottom: 25px;
    }
  }

  .heading,
  .emulator {
    max-width: 770px;
    width: 100%;
  }
</style>