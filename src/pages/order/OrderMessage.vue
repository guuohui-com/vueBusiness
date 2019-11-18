<template>
  <div>
    <mt-header title="我的订单">
      <router-link to="/" slot="left">
        <mt-button icon="back" @click="back">返回</mt-button>
      </router-link>
      <!--<mt-button icon="more" slot="right"></mt-button>-->
    </mt-header>
    <div id="orderShipping" style="width:95%;padding:5px;margin-top:10px;margin-bottom:10px;display:inline-block;border:2px solid red;border-radius: 20px;">
      收件人：<p style="display:inline-block">{{this.shippingVo.receiverName}}</p><br>
      联系电话：<p style="display:inline-block">{{this.shippingVo.receiverPhone}}</p><br>
      详细地址：<p style="display:inline-block">{{this.shippingVo.receiverAddress}}</p><br>
    </div>

    <div style=" padding: 10px;margin-top: 10px;border:2px solid #ccc;border-radius: 20px">
      <div v-for="productItem in order.orderItemVoList" @click="getProductMessage(productItem.productId)">
        <mt-cell >
          <span style="display: inline-block;margin-left: 10px;">{{productItem.productName}}</span>
          <img slot="icon" :src="imgUrl+productItem.productImage" width="80" height="80">
        </mt-cell>
        <p style="color:red;display: inline-block;">单价：￥{{productItem.currentUnitPrice}}</p>
        <p style="color:red;display: inline-block;margin-left:8%">数量： {{productItem.quantity}}</p>
        <p style="color:red;display: inline-block;margin-left:6%">总价：￥{{productItem.totalPrice}}</p>
      </div>
    </div>

    <div style="margin-top:20px;">
      <div><span style="display: inline-block;width:100px;margin-top: 10px;">实际付款</span><span>{{this.order.payment}}</span></div>
      <div><span style="display: inline-block;width:100px;margin-top: 10px;">付款方式</span><span>{{this.order.paymentTypeDesc}}</span></div>
      <div><span style="display: inline-block;width:100px;margin-top: 10px;">订单编号</span><span>{{this.order.orderNo}}</span></div>
      <div><span style="display: inline-block;width:100px;margin-top: 10px;">创建时间</span><span>{{this.order.orderItemVoList[0].createTime}}</span></div>
      <div><span style="display: inline-block;width:100px;margin-top: 10px;">订单状态</span><span>{{this.order.statusDesc}}</span></div>
    </div>

  </div>
</template>

<script>
import {mapActions} from 'vuex'
    export default {
        name: "OrderMessage",
      data(){
          return{
            imgUrl:"http://img.cdn.imbession.top/",
            orderId:-1,
            order:{},
            id:this.$route.params.id,
            shippingVo:{},
            orderItemVoList:[],
          }
      },
      mounted(){
        this.getOrder();
      },
      methods:{
        ...mapActions(['setProductId']),
        back:function () {
          this.$router.go(-1);
        },
        getProductMessage:function (id) {
          this.setProductId(id);
          this.$router.push("/productMessage");

        },
          getOrder:function () {
            var id=this.id;
            var _vm=this;
            this.axios.get("portal/order/searchOrderMessage?orderNo="+id).then(function (response) {
              console.log(response);
              _vm.order=response.data.data;
              _vm.shippingVo=response.data.data.shippingVo;
              _vm.orderItemVoList=response.data.data.orderItemVoList;
            }).catch(function (error) {
              console.log(error);
            })
          }
      }
    }
</script>

<style scoped>

</style>
