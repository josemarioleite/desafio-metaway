import './registerServiceWorker'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createVuetify } from 'vuetify'
import { VText } from './components/index'

import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import *  as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'

import App from './App.vue'
import router from './router'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
const vuetify = createVuetify({ components, directives })

createApp(App)
  .use(pinia)
  .use(vuetify)
  .use(router)
  .component('c-text', VText)
  .mount('#app')
  

