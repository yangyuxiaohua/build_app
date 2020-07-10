import Vue from 'vue'
import App from './App'
import uView from "uview-ui";
import api from './api/index.js'

Vue.use(uView);

Vue.prototype.$api = api

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
