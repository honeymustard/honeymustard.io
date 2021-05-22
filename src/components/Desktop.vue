<template>
  <div class="desktop">
    <div class="desktop__shortcut" @click="open({ name: 'paint', args: { filename: 'smugstad.lg.jpg', label: 'you.jpg', size: '46.2kb' }})">
      <div class="desktop__icon">
        <img src="/smugstad.sm.jpg">
      </div>
      <label class="desktop__label">you.jpg</label>
    </div>
    <div class="desktop__shortcut" @click="open({ name: 'emulator' })">
      <div class="desktop__icon">
        <span class="emulator__icon"></span>
      </div>
      <label class="desktop__label">Emulator</label>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { useStore } from 'vuex';

  export default defineComponent({
    setup() {
      const store = useStore();
      const open = (args: any) => store.commit('setProgram', args);
      return { open };
    }
  })
</script>

<style lang="scss">
  .desktop {
    display: grid;
    grid-auto-columns: min-content;
    grid-auto-flow: column;
    grid-gap: 25px;
    width: 100%;
    max-width: 400px;
    justify-content: center;
    margin-top: 30px;
  }

  .desktop__shortcut {
    position: relative;
    font-family: 'Roboto Mono', monospace, sans-serif;
    font-size: 16px;
    color: #fff;
    cursor: pointer;
    display: flex;
    flex-direction: column;

    &:hover .desktop__icon {
      transform: scale(1.05);
    }

    img {
      display: block;
      height: inherit;
      border-radius: inherit;
    }
  }

  .desktop__icon {
    display: block;
    background: #222;
    width: 100%;
    height: 60px;
    width: 90px;
    border-radius: 4px;
    position: relative;
    margin: 0 0 4px;
    box-shadow: 0px 2px 6px 0 rgba(#000, .4);
    transition: transform .2s ease;
  }

  .emulator__icon {
    display: block;
    position: relative;
    height: inherit;
    border-radius: inherit;

    &:before {
      display: block;
      content: 'c:/';
      position: absolute;
      bottom: 6px;
      left: 8px;
      color: #ff5;
      font-size: 15px;
    }

    &:after {
      display: block;
      content: '';
      position: absolute;
      top: 7px;
      right: 5px;
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background-color: #ff5;
    }
  }

  .desktop__label {
    position: relative;
    z-index: 2;
    text-shadow: 1px 2px 2px rgba(#000, .2);
    text-align: center;
  }
</style>