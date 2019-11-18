<template>
  <div style="display:flex;align-items:center;background-color: rgba(0,0,0,0.8);width:100%;height:600px;text-align: center;vertical-align: center" >
    <img :src="qrCode" style="margin:0 auto;">
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
    export default {
        name: "PayQrCode",
        data(){
          return{
            qrCode:this.$route.params.qrCode,
            orderNo:this.$route.params.orderNo,
            AlltotalPrice:this.$route.params.money,
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
        this. finishPay();
      },
      methods:{
          finishPay:function () {
            var _vm=this;
            var time=setInterval(function () {
              _vm.axios.get("portal/order/searPayStatus?orderNo="+_vm.orderNo).then(function (response) {
                console.log(response);
                if(response.data.data==true){
                  window.clearInterval(time);
                  _vm.$router.push({
                    name:'FinishPay',
                    params:{
                      money:_vm.AlltotalPrice,
                    }
                  });
                }
              }).catch(function (error) {
                console.log(error);
              })
            },3000)
          }
        }
    }
</script>

<style scoped>

</style>
