<template>
  <div>
    <mt-header title="修改地址">
      <router-link to="/" slot="left">
        <mt-button icon="back" @click="back">返回</mt-button>
      </router-link>
      <!--<mt-button icon="more" slot="right"></mt-button>-->
    </mt-header>
    <mt-field label="收件人" placeholder="请输入用户名" v-model="username"></mt-field>
    <mt-field label="手机号" placeholder="请输入手机号" type="tel" v-model="phone"></mt-field>
    <mt-field label="详细地址" placeholder="请输入收件地址" type="tel" v-model="shippingAddress"></mt-field>
    <p @click="updateShippingMessage(username,phone,shippingAddress)">保存</p>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
    export default {
        name: "changeShippingMessage",
        data(){
          return{
            shippingAddress:"",
            username:"",
            phone:0,
            shippingId:0
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
        this.searchShipping(this.$route.params.id);
      },
      methods:{
          back:function(){
            this.$router.go(-1);
          },
          searchShipping:function (id) {
            var _vm=this;
            this.axios.get("shipping/lookShippingMessage?shippingId="+id).then(function (response) {
              _vm.shippingAddress=response.data.data.receiverAddress;
              _vm.username=response.data.data.receiverName;
              _vm.phone=response.data.data.receiverPhone;
              _vm.shippingId=response.data.data.id;
              console.log(response);
            }).catch(function (error) {
              console.log(error);
            })
          },
        updateShippingMessage:function (username,phone,address) {
            if(username==""||phone==0||address==0){
              alert("参数空");
              return;
            }
          var _vm=this;
          this.axios.get("shipping/loginUpdateShipping?id="+_vm.shippingId+"&receiverPhone="+phone+"&receiverAddress="+_vm.shippingAddress+"&receiverName="+username).then(function (response) {
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
