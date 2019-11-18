<template>
  <div>
    <mt-header title="创建订单">
      <router-link to="/" slot="left">
        <mt-button icon="back" @click="back">返回</mt-button>
      </router-link>
      <!--<mt-button icon="more" slot="right"></mt-button>-->
    </mt-header>
    <p>付款成功</p>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
    export default {
        name: "FinishPay",
        data(){
          return{
            money:this.$route.params.money,
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
        var _vm=this;
        this.checkedBack();
        this.sendMessage();
      },

      methods:{
        back:function () {
          this.$router.go(-1);
        },
        checkedBack:function(){
          var _vm=this;
          this.axios.get("cart/CheckCartAllProduct").then(function (response) {
            console.log(_vm.productList);
          }).catch(function (error) {
            console.log(error);
          })
        },
        sendMessage:function(){
          var _vm=this;
          this.axios.get("portal/order/sendMessage?money="+_vm.money).then(function (response) {
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
