<template>
  <div >
    <mt-header title="个人中心">
      <router-link to="/" slot="left">
        <mt-button icon="back" @click="back">返回</mt-button>
      </router-link>
      <!--<mt-button icon="more" slot="right"></mt-button>-->
    </mt-header>
    <mt-swipe :auto="4000" style="height: 300px">
      <mt-swipe-item v-for="img in subImg"><img :src="imgUrl+img" style="width:100%;height: 300px"></mt-swipe-item>
    </mt-swipe>
    <div style="background-color: red;width:100%;height: 40px;line-height: 40px">
      <p style="display:inline-block;color: #fff;margin: 0;padding: 0;">￥{{product.price}}</p>
    </div>
    <div style="width:80%;height: 100px;">
      {{product.subtitle}}
    </div>
    <span @click="addNum">+</span> <span v-model="num">{{num}}</span> <span @click="minNum">-</span>
    <mt-button icon="more" @click="addToCart(product.id)">加入购物车</mt-button>
    <mt-button icon="more" @click="nowBuy(product.id)">立即购买</mt-button>
  </div>
</template>

<script>
    import {mapGetters} from 'vuex';
    import { Toast } from 'mint-ui';
    import {mapActions} from 'vuex'
    export default {
        name: "productMessage",
      data(){
          return{
            num:1,
            product:{},
            subImg:[],
            imgUrl:"http://img.cdn.imbession.top/",
            nowBuyTotalPrice:0,
          }
      },
      computed:{
        ...mapGetters(['getProductId']),
        ...mapGetters(['getUserInfo']),

      },
      mounted(){
        this.getProductMessage();
      },
      methods:{
        ...mapActions(['setIsShowFooterBar']),
        Toast:function(){
          return Toast({
            message: '请登录',
            position: 'bottom',
            duration: 2000
          });
        },
        Toast2:function(){
          return Toast({
            message: '加入购物车成功',
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
        addNum:function(){
          var flag=this.isEmptyUser();
          if(flag==false){
            this.Toast();
            this.$router.push("/login");
            return;
          }
          if(this.num<=this.product.stock){
            this.num++;
          }
        },
        minNum:function(){
          var flag=this.isEmptyUser();
          if(flag==false){
            this.Toast();
            this.$router.push("/login");
            return;
          }
          if(this.num>1){
            this.num--;
          }
        },
        getProductMessage:function () {
          var _vm=this;
          this.axios.get("portal/product/lookProductDetail?productId="+_vm.getProductId).then(function (response) {
            console.log(response);
            _vm.product=response.data.data;
            _vm.subImg=response.data.data.subImages;
            console.log(_vm.product);
          }).catch(function (error) {
            console.log(error);
          })
        },
        addToCart:function (id) {
          var flag=this.isEmptyUser();
          if(flag==false){
            this.Toast();
            this.$router.push("/login");
            return;
          }
          var _vm=this;
          this.axios.get("cart/addProductToCart?productId="+id+"&count="+_vm.num).then(function (response) {
            console.log(response);
            if(response.data.msg=="成功"){
              _vm.Toast2();
            }
          }).catch(function (error) {
            console.log(error);
          })
        },
        nowBuy:function(id){
          var flag=this.isEmptyUser();
          if(flag==false){
            this.Toast();
            this.$router.push("/login");
            return;
          }
          this.addToCart(id);
          var _vm=this;
           this.axios.get("/cart/notCheckCartAllProduct").then(function (response) {
            console.log(response);
          }).catch(function (error) {
            console.log(error);
          })
          this.$router.push({
            name:'CreateOrder',
            params:{
              status:"now",
              AlltotalPrice:_vm.product.price*_vm.num,
            }
          });
        }
      }
    }
</script>

<style>

</style>
