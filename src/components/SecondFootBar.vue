<template>
  <div>
      <router-view/>
      <mt-tabbar v-model="selected" fixed>
        <mt-tab-item id="productHome">
          <img slot="icon" :src="productHome_img">
          店铺
        </mt-tab-item>
        <mt-tab-item id="cart">
          <img slot="icon" :src="cart_img">
          客服
        </mt-tab-item>
        <mt-tab-item id="mine">
          <img slot="icon" :src="mine_img">
          收藏
        </mt-tab-item>
        <mt-tab-item id="mine">
          <img slot="icon" :src="mine_img">
          加入购物车
        </mt-tab-item>
      </mt-tabbar>
  </div>
</template>

<script>
    export default {
        name: "FootBar",
      data() {
          return{
            selected:'',
            productHome_img:'../../static/img/homepage-unchecked.png',
            cart_img:'../../static/img/cart-unchecked.png',
            mine_img:'../../static/img/my-unchecked.png'
          }
      },
      watch:{
          selected:function () {
            if(this.selected=='productHome'){
              this.$router.push('/productHome');
              this.productHome_img='../../static/img/homepage-checked.png';
            }else{
              this.productHome_img='../../static/img/homepage-unchecked.png';
            }
            if(this.selected=='cart'){
              this.$router.push('/cart');
              this.cart_img='../../static/img/cart-checked.png';
            }else{
              this.cart_img='../../static/img/cart-unchecked.png';
            }
            if(this.selected=='mine'){
              this.$router.push('/mine');
              this.mine_img='../../static/img/my-checked.png';
            }else{
              this.mine_img='../../static/img/my-unchecked.png';
            }
          }
      }
    }
</script>

<style scoped>

</style>
