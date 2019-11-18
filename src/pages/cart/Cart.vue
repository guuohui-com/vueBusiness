<template>
  <div style="" class="cart">
    <mt-header title="购物车">
      <router-link to="/" slot="left">
        <mt-button icon="back" @click="back">返回</mt-button>
      </router-link>
      <!--<mt-button icon="more" slot="right"></mt-button>-->
    </mt-header>
    <div v-for="product in cartProduct" @click="getProductMessage(product.productId)">
      <input type="checkbox" @click.stop="chooseOrNot(product.productId,product.productChecked,product.productTotalPrice)" :checked="product.productChecked" style="display: inline-block">
      <mt-cell >
        <span style="display: inline-block;margin-left: 10px;">{{product.productName}}</span>
        <img slot="icon" :src="imgUrl+product.productMainImage" width="80" height="80">
      </mt-cell>
      <p style="color:red;display: inline-block;">单价：￥{{product.productPrice}}</p>
      <p style="color:red;display: inline-block;margin-left:10%">数量： {{product.quantity}}</p>
      <p style="color:red;display: inline-block;margin-left:10%">总价：￥{{product.productTotalPrice}}</p>
      <mt-button size="small" @click.stop="deleteProduct(product.productId,this)" >删除</mt-button>
    </div>
    <h3 style="float: right; color:orangered">共计  ￥{{this.totalPrice}}</h3>
    <mt-button type="primary" @click="pay" style="width: 100%">结算</mt-button>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import {mapActions} from 'vuex'
  import { Toast } from 'mint-ui';
   export default {
        name: "Cart",
      data(){
          return {
            status:-100,
            cartProduct:[],
            totalPrice:0,
            imgUrl:"http://img.cdn.imbession.top/",
          }
      },
      mounted(){
        var flag=this.isEmptyUser();
        if(flag==false){
          this.Toast();
          this.$router.push("/login");
        }else {
          this.getCarts();
          this.$router.push("/cart");
        }
      },
     computed:{
       ...mapGetters(['getUserInfo']),
     },
      methods:{
        ...mapActions(['setProductId']),
        ...mapActions(['setIsShowFooterBar']),
        Toast:function(){
          return Toast({
            message: '请登录',
            position: 'bottom',
            duration: 2000
          });
        },
        isEmptyUser:function(){
          if(JSON.stringify(this.getUserInfo)=='{}'){
            //未登录10
            return false;
          }else{
            //已经登录
            return true;
          }
        },
          back:function () {
            this.$router.go(-1);
          },
          getCarts:function () {
            var _vm=this;
            this.axios.get("cart/searchCartProductList").then(function (response) {
            console.log(response);
            _vm.cartProduct=response.data.data.cartproductViewObjectList;
            _vm.totalPrice=response.data.data.cartTotalPrice;
            }).catch(function (error) {
              console.log(error);
            })
          },
        getProductMessage:function (id) {
          this.setProductId(id);
          this.$router.push("/productMessage");
        },
        pay:function () {
          this.$router.push({
            name:'CreateOrder',
            params:{
              AlltotalPrice:this.totalPrice
            }
          });
        },
        deleteProduct:function (id,element) {
          var _vm=this;
          this.axios.get("cart/deleteCartProductList?productIds="+id).then(function (response) {
            if(response.data.data=="删除成功"){
              console.log("=========")
              _vm.getCarts();
              _vm.$router.push("/cart");
            }
            console.log(response);
          }).catch(function (error) {
            console.log(error);
          })
        },
        chooseOrNot:function(id,checked,price){
          var _vm=this;
          if(checked==1){
            this.axios.get("cart/notCheckCartProduct?productId="+id).then(function (response) {
              console.log(response);
              _vm.totalPrice-=price;
              _vm.getCarts();
              _vm.$router.push("/cart");
            }).catch(function (error) {
              console.log(error);
            })
          }
          if(checked==0){
            this.axios.get("cart/checkCartProduct?productId="+id).then(function (response) {
              console.log(response);
              _vm.totalPrice+=price;
              _vm.getCarts();
              _vm.$router.push("/cart");
            }).catch(function (error) {
              console.log(error);
            })
          }
        }
      },
     created(){
       var _vm=this;
       this.setIsShowFooterBar(true);
       window.onscroll=function () {
         var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
         var windowHeight=document.documentElement.clientHeight||document.clientHeight;
         var scrollHeight=document.documentElement.scrollHeight||document.body.scrollHeight;
         if((scrollTop+windowHeight+60)>=scrollHeight){
           _vm.setIsShowFooterBar(false);
         }else{
           _vm.setIsShowFooterBar(true);
         }
       }
     },

    }
</script>

<style>
  @import "../../assets/css/base.css";
  @import "../../assets/css/checkout.css";
  @import "../../assets/css/reset.css";
</style>
