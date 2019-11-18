<template>
  <div>
    <mt-header title="用户登录">
      <router-link to="/" slot="left">
        <mt-button icon="back" @click="back">返回</mt-button>
      </router-link>
      <!--<mt-button icon="more" slot="right"></mt-button>-->
    </mt-header>
      <mt-field name="username" label="用户名" placeholder="请输入用户名" v-model="username"></mt-field>
      <mt-field name="password" label="密码" placeholder="请输入密码" type="password" v-model="password"></mt-field>
      <mt-button type="primary" size="large" @click="userLogin">登录</mt-button>
    <mt-button type="primary" size="large" @click="toRegister">去注册</mt-button>
  </div>

</template>

<script>
  import {mapActions} from 'vuex'
  import {mapGetters} from 'vuex'
    export default {
        name: "UserLogin",
      data(){
          return {
            username:"",
            password:""
          }
      },
      methods:{
        ...mapActions(['setUserInfo']),
        ...mapGetters(['getUserInfo']),
        userLogin:function () {
          //向接口发请求
          var _vm=this;
          this.axios.post("/user/login.do",{
            //params:{
              "username":this.username,
              "password":this.password
            //}
          }).then(function (response) {
            console.log(response);
            //当登陆成功后，将用户信息保存到vuex
            if(response.data.status==0){
              //登陆成工
              _vm.setUserInfo(response.data.data);
              //当前组件后退上次操作
              _vm.$router.go(-1);
            }
          })
            .catch(function (error) {
              console.log(error);
            })
        },
        back:function () {
          this.$router.go(-1);
        },
        toRegister:function(){

        }
        
      }
    }
</script>

<style>

</style>
