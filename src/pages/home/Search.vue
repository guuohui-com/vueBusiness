<template>
  <div>
  <mt-header title="">
    <router-link to="/" slot="left">
      <mt-button icon="back" @click.stop="back">返回</mt-button>
    </router-link>
    <!--<mt-button icon="more" slot="right"></mt-button>-->
  </mt-header>

    <mt-search v-model="value"></mt-search>
    <mt-button type="primary" @click="vagueSaerch">搜索</mt-button>
    <div ref="wrapper" :style="{height:this.wrapperHeight+'px'}">
      <mt-loadmore
        :top-method="loadTop"
        :bottom-method="loadBottom"
        :bottom-all-loaded="allLoaded"
        ref="loadmore"
        :autoFill="autoFill">
    <div v-for="product in productList" @click="getProductMessage(product.id)">
      <mt-cell >
        <span style="display: inline-block;margin-left: 10px;">{{product.name}}</span>
        <img slot="icon" :src="imgUrl+product.mainImage" width="80" height="80">
      </mt-cell>
      <p style="color:red;display: inline-block;">单价为：￥{{product.price}}</p>
    </div>
      </mt-loadmore>
    </div>
  </div>
</template>

<script>
  import {mapActions} from 'vuex'
  import {mapGetters} from 'vuex'
    export default {
        name: "Search",
      data(){
          return{
            value:"",
            imgUrl:"http://img.cdn.imbession.top/",
            productList:[],
            allLoaded:false,
            wrapperHeight:0,
            autoFill:true,
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
        ...mapActions(['setProductId']),
        ...mapActions(['setIsShowFooterBar']),
        getProductMessage:function(id){
          this.setProductId(id);
          this.$router.push("/productMessage");
        },
        back:function () {
          this.$router.go(-1);
        },
        loadTop:function(){
          // 加载更多数据
          alert("loadTop");
          // this.getProductList('top',1,10);
           this.$refs.loadmore.onTopLoaded();
          // this.allLoaded=false;
        },
        loadBottom:function(){
          alert("loadBottom");
          //this.$refs.loadmore.onBottomLoaded();
          //this.getProductList('bottom',this.pageNum+1,10);
          //this.$refs.loadmore.onBottomLoaded();
          // this.allLoaded = true;// 若数据已全部获取完毕
        },
        vagueSaerch:function () {
          var _vm=this;
          this.axios.get("manger/product/searchProduct?productName="+_vm.value).then(function (response) {
            console.log(response);
            _vm.productList=response.data.data.products;
            console.log(_vm.productList);
          }).catch(function (error) {
            console.log(error);
          })
        },
      }
    }
</script>

<style scoped>
.mint-search{
  height:10%;
  width:80%;
}
.mint-button--normal {
  display: inline-block;
  padding: 0 12px;
  width: 20%;
  margin-top: -15%;
  float: right;
}
</style>
