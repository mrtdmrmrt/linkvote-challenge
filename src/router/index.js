import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

//PAGES
import Home from '../views/Home.vue'
const router = new VueRouter({
  base: process.env.BASE_URL,
  routes:[
    {
      path: '/',
      component: Home,
      name: '/',
      meta: {
        requiresAuth: true,
  
      }
    },
    {
      path: '/addlink',
      component: ()=> import(/* webpackChunkName: "AddLink" */ '../views/AddLink.vue'),
      name: 'addlink'
    }
  ],
  mode:"hash"
});
export default router;
