import Vue from 'vue'
import Router from 'vue-router'
import Register from "../components/Register"
import Index from "../components/Index"
import Notfound from "../components/Notfound"
import Profile from "../components/Profile"
import Home from "../components/detail/Home"
import Info from "../components/detail/Info"
import Fundflow from "../components/detail/Fundflow"
import Echart from '../components/detail/Echart'



Vue.use(Router)

const router = new Router({
  mode:"history",
  routes: [
    {
      path: '/',
      redirect: 'index'
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '*',
      name: '/404',
      component: Notfound
    },
    {
      path: '/index',
      name: 'index',
      component: Index
    },
    {
      path: '/profile',
      children:[{path: "/profile/home", component:Home, name: 'home'},
      {path: "/profile/info",component: Info,name:'info'},
      {path: "/profile/fundflow", component: Fundflow, name: 'fundflow'},
      {path: '/profile/echart', component: Echart,name: 'echart'}  
    ],
      name: 'profile',
      component: Profile
    }

  ]
})
 router.beforeEach((to,from,next)=> {
  const islogin = localStorage.eleToken? true:false
  if (to.path == '/index' || to.path == '/register') {
    next()
   }
   else{
    islogin? next():next('/index')
  }
 })
export default router