<template>
  <div>
    <mt-header title="增加地址">
      <router-link to="/" slot="left">
        <mt-button icon="back" @click="back">返回</mt-button>
      </router-link>
      <!--<mt-button icon="more" slot="right"></mt-button>-->
    </mt-header>
    <mt-field label="收件人" placeholder="请输入用户名" v-model="username"></mt-field>
    <mt-field label="手机号" placeholder="请输入手机号" type="tel" v-model="phone"></mt-field>
    <mt-field label="详细地址" placeholder="请输入收件地址" type="tel" v-model="shippingAddress"></mt-field>
    <p @click="addShippingMessage(username,phone,shippingAddress)">保存</p>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
    export default {
        name: "addShipping",
        data(){
          return{
            username:"",
            phone:"",
            shippingAddress:""
          }
        },
      computed:{
        ...mapGetters(['getUserInfo']),
      },
      mounted() {
        if(JSON.stringify(this.getUserInfo)=='{}'){
          //未登录10
          this.$router.push("/login");
        }
        //已经登录
      },
    methods:{
      addShippingMessage:function(username,phone,shippingAddress) {
        var _vm=this;
        this.axios.get("/shipping/addShipping?receiverName="+username+"&receiverPhone="+phone+"&receiverAddress="+shippingAddress).then(function (response) {
          console.log(response);
          _vm.$router.go(-1);
        }).catch(function (error) {
          console.log(error);
        })
      }
    }
    }
</script>

<style scoped>

</style>
