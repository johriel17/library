import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';

import Toast, { POSITION } from "vue-toastification";
import "vue-toastification/dist/index.css";

import { formatDate } from './utils/utilities.js';

const options = {
  position: POSITION.TOP_RIGHT,
  timeout: 5000,
};

const app = createApp(App);
app.use(router);
app.use(Toast, options)

app.config.globalProperties.$filters = {
  formatDate,
};

app.mount('#app')
