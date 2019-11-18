<template>
  <div>
    <mt-header title="">
      <router-link to="/" slot="left">
        <mt-button icon="back" @click.stop="back">返回</mt-button>
      </router-link>
      <!--<mt-button icon="more" slot="right"></mt-button>-->
    </mt-header>

    <div v-for="product in productList" @click="getProductMessage(product.id)">
      <mt-cell >
        <span style="display: inline-block;margin-left: 10px;">{{product.name}}</span>
        <img slot="icon" :src="imgUrl+product.mainImage" width="80" height="80">
      </mt-cell>
      <p style="color:red;display: inline-block;">单价为：￥{{product.price}}</p>
    </div>
  </div>
</template>

<script>
  import {mapActions} from 'vuex'
  import {mapGetters} from 'vuex'
    export default {
        name: "ProductList",
      data(){
          return{
            productList:[],
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
          this.searchBuyCateGory(this.$route.params.cateGoryName);
      },

      methods:{
        ...mapActions(['setIsShowFooterBar']),
        ...mapActions(['setProductId']),
        getProductMessage:function(id){
          this.setProductId(id);
          this.$router.push("/productMessage");
        },
        back:function () {
          this.$router.go(-1);
        },
          searchBuyCateGory:function(name){
            var _vm=this;
            this.setIsShowFooterBar(true);
          this.axios.get("manger/product/searchProduct?productName="+name).then(function (response) {
            _vm.productList=response.data.data.products;
            console.log(_vm.productList);
          }).catch(function (error) {
            console.log(error);
          })
          }
      }
    }
</script>

<style scoped>

</style>
