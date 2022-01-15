import Vue from 'vue'
import VueRouter from 'vue-router'

const Login = () => import('views/login/Login.vue')
const Index = () => import('views/Index.vue')
const Home = () => import('views/home/Home.vue')
const Order = () => import('views/order/Order.vue')
const Profile = () => import('views/profile/Profile.vue')
const Address = () => import('views/address/Address.vue')
const City = () => import('views/city/City.vue')
const Search = () => import('views/search/Search.vue')
const Shop = () => import('views/shop/Shop.vue')
const Goods = () => import('views/shop/Goods.vue')
const Comments = () => import('views/shop/Comments.vue')
const Seller = () => import('views/shop/Seller.vue')


Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    // name: 'index',
    component: Index,
    children: [
      {
        path: "",
        redirect: "/home"
      },
      {
        path: "/home",
        name: "home",
        component: Home
      },
      {
        path: "/order",
        name: "order",
        component: Order
      },
      {
        path: "/profile",
        name: "profile",
        component: Profile
      }
    ]
  },
  {
    path: "/login",
    name: "login",
    component: Login
  },
  {
    path: "/address",
    name: "address",
    component: Address
  },
  {
    path: "/city",
    name: "city",
    component: City
  },
  {
    path: "/search",
    name: "search",
    component: Search
  },
  {
    path: "/shop",
    name: "shop",
    component: Shop,
    redirect: '/goods',
    children: [
      {
        path: "/goods",
        name: "goods",
        component: Goods
      },
      {
        path: "/comments",
        name: "comments",
        component: Comments
      },
      {
        path: "/seller",
        name: "seller",
        component: Seller
      },
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  linkActiveClass: 'active',//商品页面中给选中的标签加下划线的样式
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})



router.beforeEach((to, from, next) => {
  const isLogin = localStorage.ele_login ? true : false;
  if (to.path == '/login') {
    next()
  } else {
    isLogin ? next() : next('/login')
  }
})

export default router
