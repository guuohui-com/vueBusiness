<template>
  <div>
  <!--{{this.getUserInfo}}-->
  <foot-bar></foot-bar>
  </div>
</template>
<script>
  import FootBar from '@/components/FootBar'
  export default {
    name: 'home',
    components: {FootBar},
    data () {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    },

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }
</style>
