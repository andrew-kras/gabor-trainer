import { createApp } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia';
import { createRouter, createWebHistory } from 'vue-router';
import i18n from './i18n';

import home from './pages/home.vue';
import gaborExercise from './pages/gaborExercise.vue';

const pinia = createPinia();

const routes = [
    { path: '/', component: home },
    { path: '/exercise', component: gaborExercise }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

createApp(App)
    .use(router)
    .use(pinia)
    .use(i18n)
    .mount('#app');
