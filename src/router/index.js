import Vue from 'vue'
import Router from 'vue-router'
import Astronauts from "../components/Astronauts";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Astronauts',
      component: Astronauts
    }
  ]
})
