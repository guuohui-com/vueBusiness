<template>
 <div>
   <mt-header title="我的订单">
     <router-link to="/" slot="left">
       <mt-button icon="back" @click="back">返回</mt-button>
     </router-link>
     <!--<mt-button icon="more" slot="right"></mt-button>-->
   </mt-header>
   <!--//0,已取消，10 未支付 20 已付款 40 已经发货 50 交易成功  60 交易关闭-->
   <mt-navbar v-model="selected">
     <mt-tab-item id="1">全部订单</mt-tab-item>
     <mt-tab-item id="2">待付款</mt-tab-item>
     <mt-tab-item id="3">待收货</mt-tab-item>
   </mt-navbar>
   <!-- tab-container -->
   <mt-tab-container v-model="selected">
     <mt-tab-container-item id="1">
       <div v-for="product in productList" @click="getProductMessage(product.orderItemVoList[0].orderNo)" style="margin-top: 10px;border:2px solid #ccc;border-radius: 20px">
         <p>订单号为： {{product.orderItemVoList[0].orderNo}}</p>
         <div v-for="productItem in product.orderItemVoList">
           <mt-cell >
             <span style="display: inline-block;margin-left: 10px;">{{productItem.productName}}</span>
             <img slot="icon" :src="imgUrl+productItem.productImage" width="80" height="80">
           </mt-cell>
           <p style="color:red;display: inline-block;">单价：￥{{productItem.currentUnitPrice}}</p>
           <p style="color:red;display: inline-block;margin-left:8%">数量： {{productItem.quantity}}</p>
           <p style="color:red;display: inline-block;margin-left:6%">总价：￥{{productItem.totalPrice}}</p>
         </div>
       </div>
     </mt-tab-container-item>
     <mt-tab-container-item id="2">
       <div v-for="product in WaitPayOrderList" @click="getProductMessage(product.orderItemVoList[0].orderNo)" style="margin-top: 10px;border:2px solid #ccc;border-radius: 20px">
         <p>订单号为： {{product.orderItemVoList[0].orderNo}}</p>
         <div v-for="productItem in product.orderItemVoList">
           <mt-cell >
             <span style="display: inline-block;margin-left: 10px;">{{productItem.productName}}</span>
             <img slot="icon" :src="imgUrl+productItem.productImage" width="80" height="80">
           </mt-cell>
           <p style="color:red;display: inline-block;">单价：￥{{productItem.currentUnitPrice}}</p>
           <p style="color:red;display: inline-block;margin-left:8%">数量： {{productItem.quantity}}</p>
           <p style="color:red;display: inline-block;margin-left:6%">总价：￥{{productItem.totalPrice}}</p>
         </div>
       </div>
     </mt-tab-container-item>
     <mt-tab-container-item id="3">
       <div v-for="product in WaitReceiveOrder" @click="getProductMessage(product.orderItemVoList[0].orderNo)" style="margin-top: 10px;border:2px solid #ccc;border-radius: 20px">
         <p>订单号为： {{product.orderItemVoList[0].orderNo}}</p>
         <div v-for="productItem in product.orderItemVoList">
           <mt-cell >
             <span style="display: inline-block;margin-left: 10px;">{{productItem.productName}}</span>
             <img slot="icon" :src="imgUrl+productItem.productImage" width="80" height="80">
           </mt-cell>
           <p style="color:red;display: inline-block;">单价：￥{{productItem.currentUnitPrice}}</p>
           <p style="color:red;display: inline-block;margin-left:8%">数量： {{productItem.quantity}}</p>
           <p style="color:red;display: inline-block;margin-left:6%">总价：￥{{productItem.totalPrice}}</p>
         </div>
       </div>
     </mt-tab-container-item>
   </mt-tab-container>

   <!-- tab-container -->
 </div>
</template>

<script>
  import {mapActions} from 'vuex'
  import {mapGetters} from 'vuex'
    export default {
        name: "MyOrder",
      data(){
          return{
            selected:"",
            productList:[],
            WaitPayOrderList:[],
            WaitReceiveOrder:[],
            imgUrl:"http://img.cdn.imbession.top/",
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
        this.getAllOrders();
        this.getWaitPayOrders();
        this.getWaitReceiveOrders();
      },
      methods:{
        ...mapActions(['setIsShowFooterBar']),
          back:function () {
            this.$router.go(-1);
          },
         getAllOrders:function () {
            var _vm=this;
            this.axios.get("portal/order/searchOrderList").then(function (response) {
              _vm.productList=response.data.data.orderViewObjectList;
              console.log(response);
          }).catch(function (error) {
            console.log(error);
          })
        },
       getWaitPayOrders:function () {
         var _vm=this;
         this.axios.get("portal/order/searchWaitPayOrder").then(function (response) {
           _vm.WaitPayOrderList=response.data.data.orderViewObjectList;
           console.log(response);
         }).catch(function (error) {
           console.log(error);
         })
       },
        getWaitReceiveOrders:function () {
          var _vm=this;
          this.axios.get("portal/order/findWaitReceiveOrderBuyUserId").then(function (response) {
            _vm.WaitReceiveOrder=response.data.data.orderViewObjectList;
            console.log(response);
          }).catch(function (error) {
            console.log(error);
          })
        },
        getProductMessage:function (id) {
          this.$router.push({
            name:'OrderMessage',
            params:{
              id:id,
            }
          });
        }
      },
      created(){
        var _vm=this;
        window.onscroll=function () {
          var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
          var windownHeight=document.documentElement.clientHeight||document.clientHeight;
          var scrollHeight=document.documentElement.scrollHeight||document.body.scrollHeight;
          if((scrollTop+windownHeight+60)>=scrollHeight){
            _vm.setIsShowFooterBar(false);
          }else{
            _vm.setIsShowFooterBar(true);
          }
        }
      }
    }
</script>

<style scoped>

</style>
