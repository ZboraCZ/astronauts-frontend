<template>
  <div id="app">
    <astronauts></astronauts>
  </div>
</template>

<script>
  import Vue from 'vue'
  import Astronauts from './components/Astronauts'
  import BootstrapVue from 'bootstrap-vue'

  Vue.use(BootstrapVue);

  import 'bootstrap/dist/css/bootstrap.css'
  import 'bootstrap-vue/dist/bootstrap-vue.css'

  export default {
  name: 'App',
  components:{
    Astronauts
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
