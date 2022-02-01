import Vue from 'vue'
import App from './App.vue'
import BackEnd from "@/BackEnd";

Vue.config.productionTip = false

BackEnd.loadData().then(() => {
  new Vue({
    render: h => h(App),
  }).$mount('#app')
})