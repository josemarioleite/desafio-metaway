import './registerServiceWorker'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createVuetify } from 'vuetify'
import { VText, VTable, VFloatButton, VSelect } from './components/index'

import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import *  as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import 'vuetify/styles'
import './styles/app.variables.scss'
import '@mdi/font/css/materialdesignicons.css'

import App from './App.vue'
import router from './router'
import { vMaska } from 'maska'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
const vuetify = createVuetify({ components, directives })

createApp(App)
  .use(vuetify)
  .use(router)
  .use(pinia)
  .directive('maska', vMaska)
  .component('c-float-button', VFloatButton)
  .component('c-text', VText)
  .component('c-table', VTable)
  .component('c-select', VSelect)
  .mount('#app')
  

