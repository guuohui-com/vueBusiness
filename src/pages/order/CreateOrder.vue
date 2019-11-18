<template>
  <div style="background-color: #f1f1f1;height:100%">
    <mt-header title="创建订单">
      <router-link to="/" slot="left">
        <mt-button icon="back" @click="back">返回</mt-button>
      </router-link>
      <!--<mt-button icon="more" slot="right"></mt-button>-->
    </mt-header>
    <div id="orderShipping" style="width:95%;padding:5px;margin-top:10px;margin-bottom:10px;display:inline-block;border:2px solid red;border-radius: 20px;">
      收件人：<p style="display:inline-block">{{this.username}}</p><br>
      联系电话：<p style="display:inline-block">{{this.phone}}</p><br>
      详细地址：<p style="display:inline-block">{{this.shippingAddress}}</p><br>
      <p @click="tochangeShipping" style="display: inline-block;width: 10%;margin-right: 10%;">编辑</p>
    </div>
    <!--<div id="orderShipping">-->
      <!--<p>{{this.username}}</p>-->
      <!--<p>{{this.phone}}</p>-->
      <!--<p>{{this.shippingAddress}}</p>-->
      <!--<p @click="tochangeShipping">编辑</p>-->
    <!--</div>-->

    <div v-for="product in productList">
      <mt-cell >
        <span style="display: inline-block;margin-left: 10px;">{{product.name}}</span>
        <img slot="icon" :src="imgUrl+product.mainImage" width="80" height="80">
      </mt-cell>
      <p style="color:red;display: inline-block;">单价：￥{{product.price}}</p>
      <p style="color:red;display: inline-block;margin-left:10%">数量： {{product.buyNum}}</p>
      <p style="color:red;display: inline-block;margin-left:10%">总价：￥<span class="totalPrice">{{product.totalPrice}}</span></p>
    </div>
    <p>合计：￥{{this.AlltotalPrice}}</p>
    <div>
      <mt-button type="primary" @click="createOrder">确认订单</mt-button>
    </div>
  </div>

</template>

<script>
  import {mapActions} from 'vuex'
  import {mapGetters} from 'vuex'
    export default {
      name: "CreateOrder",
      data(){
        return{
          shippingAddress:"",
          username:"",
          phone:0,
          shippingId:0,
          shippingList:[],
          index:0,
          productList:[],
          orderNo:0,
          imgUrl:"http://img.cdn.imbession.top/",
          AlltotalPrice:this.$route.params.AlltotalPrice,
          qrCode:"",
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
        if(this.$route.params.index==null){
          this.index=0;
        }else {
          this.index=this.$route.params.index;
        }
        this.getShippings();
        //this.createOrder();
        this.searchCheckedProduct();
        // this.computerTotalPrice();
      },
      methods:{
        ...mapActions(['setIsShowFooterBar']),
        back:function(){
          this.$router.go(-1);
        },
        createOrder:function () {
          var _vm=this;
          this.axios.get("/portal/order/createOrder?shippingId="+_vm.shippingId).then(function (response) {
            console.log(response);
            _vm.AlltotalPrice=response.data.data.cartTotalPrice;
            _vm.orderNo=response.data.data.orderNo;
            if(response.data.msg=="订单创建成功"){
             _vm.pay();
            }
          }).catch(function (error) {
            console.log(error);
          })
        },
        // computerTotalPrice:function(){
        //   var totalPrice=document.getElementsByClassName("totalPrice");
        //   var totalPrice=0;
        //   for(var i=0;i<totalPrice.length;i++){
        //     totalPrice+=totalPrice[i];
        //   }
        //   this.totalPrice=totalPrice;
        // },
        pay:function(){
          var _vm=this;
          this.axios.get("portal/order/pay?orderNo="+_vm.orderNo).then(function (response) {
            console.log(response);
            _vm.qrCode=response.data.data.qrCode;
            _vm.$router.push({
              name:'PayQrCode',
              params:{
                money:_vm.$route.params.AlltotalPrice,
                qrCode:_vm.qrCode,
                orderNo:_vm.orderNo
              }
            });
          }).catch(function (error) {
            console.log(error);
          })
        },
        getShippings:function () {
          var _vm=this;
          this.axios.get("shipping/lookShippingMessageList").then(function (response) {
            _vm.shippingList=response.data.data.shippings;
            _vm.shippingAddress=response.data.data.shippings[_vm.index].receiverAddress;
            _vm.username=response.data.data.shippings[_vm.index].receiverName;
            _vm.phone=response.data.data.shippings[_vm.index].receiverPhone;
            _vm.shippingId=response.data.data.shippings[_vm.index].id;
          }).catch(function (error) {
            console.log(error);
          })
        },
        tochangeShipping:function () {
          var _vm=this;
          this.$router.push({
            name:'Shipping',
            params:{
              AlltotalPrice:_vm.AlltotalPrice,
            }
          });
        },
        searchCheckedProduct:function () {
          var _vm=this;
          this.axios.get("cart/searchCartCheckedProduct").then(function (response) {
            _vm.productList=response.data.data;
          }).catch(function (error) {
            console.log(error);
          })
        },

        /*confirmShipping:function () {
          var index=this.$route.params.index;
          alert(index);
          this.shippingAddress=shippingList[index].receiverAddress;
          this.username=shippingList[index].receiverName;
          this.phone=shippingList[index].receiverPhone;
          this.shippingId=shippingList[index].id;
          this.$router.push("/createOrder");
        }*/
      }
    }
</script>

<style>
#orderShipping{
  background-color: white;
}

</style>
