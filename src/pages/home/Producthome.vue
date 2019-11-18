<template>
<!--
  <script type="text/javascript" src="https://cvd.xiaoduoai.com/c/sdk/sdk.min.js?src=6196&key=aeioovghaxuanxqlrnvigtsnbratmqdaeguqhtdmwfouqwiikatfdtqxzhwbzwsc&channel_id=7626" defer async ></script>
-->
  <div id="hello">
    <div id="corder_loadmore" ref="wrapper" :style="{height:this.wrapperHeight+'px'}">
        <mt-loadmore
        :top-method="loadTop"
        :bottom-method="loadBottom"
        :bottom-all-loaded="allLoaded"
        ref="loadmore"
        :autoFill="autoFill">
      <mt-header title="">
        <router-link to="/" slot="left">
          <mt-button icon="back" @click.stop="back">返回</mt-button>
          <div style="background-color:#ffffff;padding:2px;display: inline-block;width: 200%;height: 14px; color:#ccc;border: 1px solid #ccc;border-radius: 20px"
          @click.prevent="toSearchProduct">
            搜索商品
          </div>
        </router-link>

        <!--<mt-button icon="more" slot="right"></mt-button>-->
      </mt-header>
      <!--<mt-search v-model="value"></mt-search>-->
      <mt-swipe :auto="4000" style="height: 200px">
        <mt-swipe-item  v-for="product in hotProduct" >
          <img @click="getProductMessage(product.id)" :src="imgUrl+product.mainImage" style="width:100%;height: 200px">
        </mt-swipe-item>
      </mt-swipe>

      <mt-swipe :auto="4000" style="height: 200px">
        <mt-swipe-item v-for="n in 2">
          <span v-for="category in rootCategory" style="width:20%;height: 40%;display: inline-block" @click="toSearch(category.name)">
            <img src="../../../static/img/pc.png" style="width:80%;height: 80%" >
            <p style="margin: 0;font-size: 12px">{{category.name}}</p>
          </span>
        </mt-swipe-item>
      </mt-swipe>
       <div style="text-align: center;border: #EE7A23;margin-top:20px;" >
          <div class="border" @click="getProductMessage(product.id)" v-for="product in this.productList" style="display:inline-block;width: 40%;height:166px;text-align: left;" >
            <mt-cell style="background-color: #f5f5f5;">
              <img slot="icon" :src="imgUrl+product.mainImage" style="width: 100%; height:120px">
            </mt-cell>
            <p style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;margin: 0;">{{product.subtitle}}</p>
            <span style="color: red;">￥{{product.price}}</span>
          </div>
        </div>
      </mt-loadmore>
    </div>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import {mapActions} from 'vuex'
  //import kefu from 'https://cvd.xiaoduoai.com/c/sdk/sdk.min.js?src=6196&key=aeioovghaxuanxqlrnvigtsnbratmqdaeguqhtdmwfouqwiikatfdtqxzhwbzwsc&channel_id=7626'
    export default {
      name: "Producthome",
      data(){
        return{
          value:"",
          isActive:false,
          hotProduct:[],
          productList:[],
          rootCategory:[],
          imgUrl:"http://img.cdn.imbession.top/",
          getProductUrl:"/manger/product/getProductMessage",
          allLoaded:false,
          wrapperHeight:0,
          autoFill:true,
          pageSize:10,
          pageNum:0
        }
      },
      computed:{
        ...mapGetters(['getUserInfo']),
      },
      mounted(){
        //this.getProductList();
        this.getHotProduct();
        this.getCategory();
        this.wrapperHeight=document.documentElement.clientHeight
          -this.$refs.wrapper.getBoundingClientRect().top;
        console.log(this.$refs.wrapper.getBoundingClientRect().top);
      },
      methods:{
        ...mapActions(['setProductId']),
        ...mapActions(['setIsShowFooterBar']),
        getProductMessage:function(id){
          this.setProductId(id);
          this.$router.push("/productMessage");
        },
        toSearchProduct:function(){
          this.$router.push("/search");
        },
        back:function () {
          this.$router.go(-1);
        },
        getHotProduct:function () {
          var _vm=this;
          this.axios.get("manger/product/hotProduct").then(function (response) {
            _vm.hotProduct=response.data.data;
            console.log(_vm.hotProduct);
          }).catch(function (error) {
            console.log(error);
          })
        },
        getProductList:function (flag,pageNum,pageSize) {
          if(flag=='top'){
            var _vm=this;
            this.axios.get("manger/product/searchProductList?pageSize="+pageSize+"&pageNum="+pageNum).then(function (response) {
              _vm.productList=response.data.data.products;
              console.log(_vm.productList);
            }).catch(function (error) {
              console.log(error);
            })
          }
          if(flag=='bottom'){
            var _vm=this;
            this.axios.get("manger/product/searchProductList?pageSize="+pageSize+"&pageNum="+pageNum).then(function (response) {
              if(response.data.data.products.length>0){
                const oldList=_vm.productList;
                var newArrayList=oldList.concat(response.data.data.products);
                response.data.data.products=newArrayList;

              }else{
                _vm.allLoaded=true;
              }
              _vm.productList=response.data.data.products;
              console.log(_vm.productList);
            }).catch(function (error) {
              console.log(error);
            })
          }

        },
        getCategory:function () {
          var _vm=this;
          this.axios.get("manger/category/getRootCategory").then(function (response) {
            _vm.rootCategory=response.data.data;
            console.log(_vm.rootCategory);
          }).catch(function (error) {
            console.log(error);
          })
        },
        loadTop:function(){
        // 加载更多数据
          //alert("loadTop");
          this.getProductList('top',1,10);
          this.$refs.loadmore.onTopLoaded();
          this.allLoaded=false;
        },
        loadBottom:function(){
          //alert("loadBottom");
          // alert( this.allLoaded);
          this.getProductList('bottom',this.pageNum+1,10);
          //this.allLoaded = false;
          //this.$refs.loadmore.onBottomLoaded();
          // 若数据已全部获取完毕*/
        },
        toSearch:function (name) {
          this.$router.push({
            name: 'ProductList',
            params: {
              cateGoryName: name
            }
          })
        }
      },
      created(){
        var _vm=this;
        this.setIsShowFooterBar(true);
        window.onscroll=function () {
          var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
          var windownHeight=document.documentElement.clientHeight||document.clientHeight;
          var scrollHeight=document.documentElement.scrollHeight||document.body.scrollHeight;
          if((scrollTop+windownHeight+60)>=scrollHeight){
            /*_vm.setIsShowFooterBar(true);*/
            _vm.setIsShowFooterBar(true);
          }else{
            _vm.setIsShowFooterBar(true);
          }
        }
      }
    }
</script>

<style lang="stylus" scoped>
  @import '../../../static/mixins.styl'
#hello
  #corder_loadmore
    overflow-y: auto
    -webkit-overflow-scrolling: touch // 解决ios滑动不流畅的问题
  .item
    overflow :hidden
    height:1.9rem
    display :flex
    .item-img
      width :1.7rem
      height :1.7rem
      padding :.1rem
    .item-info
      flex:1
      padding .1rem
      min-width:0
      .item-title
        line-height: .54rem
        font-size :.32rem
        ellipsis()
      .item-desc
        line-height :.4rem
        color:#ccc
        ellipsis()
      .item-price
        margin-top:.16rem
        line-height :.32rem
        font-size :.32rem
        color:red
</style>

