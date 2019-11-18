<template>
  <div>
  <mt-header title="购物车">
    <router-link to="/" slot="left">
      <mt-button icon="back" @click="back">返回</mt-button>
    </router-link>
  </mt-header>
    <mt-button type="primary" @click="addShipping" style="width:100%;background-color:#ccc;">添加新地址</mt-button>
    <div v-for="(shipping,index) in shippingList" @click="chooseShipping(index)" style="width:90%;padding:10px;margin-top:20px;display:inline-block;border:2px solid red;border-radius: 20px;">
      收件人：<p style="display:inline-block">{{shipping.receiverName}}</p><br>
      联系电话：<p style="display:inline-block">{{shipping.receiverPhone}}</p><br>
      详细地址：<p style="display:inline-block">{{shipping.receiverAddress}}</p><br>
      <p @click.stop="changeShipping(shipping.id)" style="display: inline-block;width: 10%;margin-right: 10%;">编辑</p>
      <p @click.stop="deleteShipping(shipping.id)" style="display: inline-block;width: 10%;margin-right: 10%;">删除</p>
    </div>
  </div>

</template>

<script>
  import {mapActions} from 'vuex'
  import {mapGetters} from 'vuex'
    export default {
      name: "shipping",

      computed:{
        ...mapGetters(['getUserInfo']),
      },
      mounted() {
        if(JSON.stringify(this.getUserInfo)=='{}'){
          //未登录10
          this.$router.push("/login");
        }
        //已经登录
        this.getShippings();
      },
      data(){
        return{
          options:"",
          shippingList:[],
        }
      },
      created(){
        var _vm=this;
        window.onscroll=function () {
          var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
          var windownHeight=document.documentElement.clientHeight||documnet.clientHeight;
          var scrollHeight=document.documentElement.scrollHeight||document.body.scrollHeight;
          if((scrollTop+windownHeight+60)>=scrollHeight){
            _vm.setIsShowFooterBar(false);
          }else{
            _vm.setIsShowFooterBar(true);
          }
        }
      },
      methods:{
        ...mapActions(['setIsShowFooterBar']),
        back:function(){
          this.$router.go(-1);
        },
        getShippings:function () {
          var _vm=this;
          this.axios.get("shipping/lookShippingMessageList").then(function (response) {
            console.log(response);
            _vm.shippingList=response.data.data.shippings;
          }).catch(function (error) {
            console.log(error);
          })
        },
        changeShipping:function(id){
          this.$router.push({
            name:'ChangeShippingMessage',
            params:{
              id:id,
            }
          })
        },
        addShipping:function () {
          this.$router.push("/addShipping");
        },
        deleteShipping:function(id){
          var _vm=this;
          this.axios.get("shipping/deleteShipping?id="+id).then(function (response) {
            console.log(response);
            _vm.$router.go(0);
          }).catch(function (error) {
            console.log(error);
          })
        },
        chooseShipping:function(index){
          this.$router.push({
            name:'CreateOrder',
            params:{
              index:index,
              AlltotalPrice:this.$route.params.AlltotalPrice,
            }
          })
        }
      }
      
    }
</script>

<style scoped>

</style>
