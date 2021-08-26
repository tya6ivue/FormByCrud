import Vue from 'vue'
// import { Store } from 'vuex'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { store } from "./store/store";

Vue.config.productionTip = false

new Vue({
  vuetify,
  store: store,
  render: h => h(App)
}).$mount('#app')
