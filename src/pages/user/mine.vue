<template>
  <div>
    <div>
      <mt-header title="个人中心">
        <router-link to="/" slot="left">
          <mt-button icon="back" @click="back">返回</mt-button>
        </router-link>
        <!--<mt-button icon="more" slot="right"></mt-button>-->
      </mt-header>
      <mt-field label="用户名" placeholder="请输入用户名" v-model="this.getUserInfo.username" :readonly="readonly"></mt-field>
      <mt-field label="邮箱" placeholder="请输入邮箱" type="email" v-model="this.getUserInfo.email" :readonly="readonly"></mt-field>
      <mt-field label="手机号" placeholder="请输入手机号" type="tel" v-model="this.getUserInfo.phone" :readonly="readonly"></mt-field>
      <mt-field label="自我介绍" placeholder="" v-model="this.getUserInfo.answer" :readonly="readonly"></mt-field>
    </div>
    <p v-text="order" @click="searchMyOrder"></p>
    <p @click="outLogin">退出登录</p>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import { Toast } from 'mint-ui';
    export default {
      name: "mine",
      data(){
          return{
            order:"我的订单",
            optext:"去登陆",
            isLogin:false,
            readonly:true
          }
      },
      computed:{
        ...mapGetters(['getUserInfo'])
      },
      mounted() {
        //Object.keys(xxx).length==0
        if(JSON.stringify(this.getUserInfo)=='{}'){
          this.optext="去登陆";
          this.isLogin=false;
          this.Toast();
          this.$router.push("/login");
        }else{
          this.isLogin=true;
        }
      },
      methods:{
        Toast:function(){
          return Toast({
            message: '请登录',
            position: 'bottom',
            duration: 2000
          })
        },
        checkedLogin: function() {
          if(this.isLogin==true){
            //已经登陆
            this.$router.push("/userCenter");
          }else{
            //未登录
            this.$router.push("/login");
          }
        },
       back:function () {
         this.$router.go(-1);
       },
        searchMyOrder:function () {
          this.$router.push("/order");
        },
        outLogin:function(){
          var _vm=this;
          this.axios.get("/user/loginOut").then(function (response) {
            console.log(response);
          }).catch(function (error) {
            console.log(error);
          })
        },
        myLookedproduct:function () {
          var _vm=this;
          this.axios.get("/manger/product/lookedProduct").then(function (response) {
            console.log(response);
          }).catch(function (error) {
            console.log(error);
          })
        }
      }
    }
</script>

<style scoped>

</style>
