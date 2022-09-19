import Vue from 'vue'

import './assets/js/vendor'

import './plugins/bootstrap-vue'
import './plugins/fluid-storage'
import './plugins/php-in-js'
import './plugins/axios'
import './plugins/dayjs'
import './plugins/formatter'

import './services'
import './reusables'
import './registerServiceWorker'


import App from './App.vue'
import router from './router'
import store from './store'
import i18n from './plugins/i18n'

Vue.config.productionTip = false

new Vue({
    router,
    store,
    i18n,
    render: (h) => h(App)
}).$mount('#app')
