<template>
  <p>123</p>
</template>

<script>
  import {mapGetters} from 'vuex'
    export default {
    name: "UserCenter",
    methods:{
      back:function () {
        this.$router.go(-1);
      }
    },
      computed:{
      ...mapGetters(['getUserInfo'])
      }
    }
</script>

<style scoped>

</style>
