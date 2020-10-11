import { createApp } from 'vue';
import App from '@/App.vue';
import store from '@/store';

createApp(App as any)
  .use(store)
  .mount('#app');