// Plugins
import { createPinia } from 'pinia';
import Notifications from '@kyvg/vue3-notification';
import { VueQueryPlugin } from '@tanstack/vue-query';
// Types
import type { App } from 'vue';
import router from '@/router';
import vuetify from './vuetify';

const pinia = createPinia();

export function registerPlugins(app: App) {
  app
    .use(vuetify)
    .use(Notifications)
    .use(router)
    .use(pinia)
    .use(VueQueryPlugin);
}
