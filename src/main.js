import Vue from 'vue'
import './plugins/bootstrap-vue'
import './plugins/fluid-storage'
import './plugins/php-in-js'
import './plugins/axios'
import './plugins/dayjs'
import './plugins/formatter'

import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import i18n from './plugins/i18n'
import './services'

Vue.config.productionTip = false

new Vue({
    router,
    store,
    i18n,
    render: function(h) { return h(App) }
}).$mount('#app')
