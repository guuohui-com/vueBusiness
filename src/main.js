// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import home from '@/components/home'
import router from './router'
import axios from 'axios'
import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'

Vue.use(Mint);

Vue.config.productionTip = false
//将axios注册成为全局变量
Vue.prototype.axios=axios.create({
  baseURL:"http://localhost:8014/",
  //cookie携带cookie的参数
  withCredentials:true,
  transformRequest:[data =>{
    //data 是post请求传的值
    //把数据凭借成类似get亲球的形式
    let params=''
    for (var index in data){
      params+=index+'='+data[index]+'&'
    }
    return params
  }]
})



/* eslint-disable no-new */
import {store} from './store/index'
new Vue({
  el: '#app',
  router,
  store,
  components: {home},
  template: '<home/>'
})
