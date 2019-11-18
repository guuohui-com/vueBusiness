import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import home from '@/components/home'
import UserLogin from '@/pages/user/UserLogin'
import Cart from '@/pages/cart/Cart'
import ProductHome from '@/pages/home/ProductHome'
import mine from '@/pages/user/mine';
import UserCenter from '@/pages/user/UserCenter'
import MyOrder from '@/pages/order/MyOrder'
import Search from '@/pages/home/Search'
import ProductMessage from '@/pages/home/ProductMessage'
import Shipping from '@/pages/shipping/Shipping'
import CreateOrder from '@/pages/order/CreateOrder'
import ChangeShippingMessage from '@/pages/shipping/ChangeShippingMessage'
import AddShipping from '@/pages/shipping/AddShipping'
import PayQrCode from '@/pages/pay/PayQrCode'
import FinishPay from '@/pages/pay/FinishPay'
import ProductList from '@/pages/home/ProductList'
import OrderMessage from '@/pages/order/OrderMessage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/home',
      name: 'home',
      component: home
    },
    {
      path: '/login',
      name: 'UserLogin',
      component: UserLogin
    },
    {
      path: '/cart',
      name: 'Cart',
      component: Cart
    },
    {
      path: '/productHome',
      name: 'ProductHome',
      component: ProductHome
    },
    {
      path: '/mine',
      name: 'mine',
      component: mine
    },
    {
      path: '/userCenter',
      name: 'UserCenter',
      component: UserCenter
    },
    {
      path: '/order',
      name: 'MyOrder',
      component: MyOrder
    },
    {
      path: '/search',
      name: 'Search',
      component: Search
    },
    {
      path: '/productMessage',
      name: 'ProductMessage',
      component: ProductMessage
    },
    {
      path: '/shipping',
      name: 'Shipping',
      component: Shipping
    },
    {
      path: '/createOrder',
      name: 'CreateOrder',
      component: CreateOrder
    },
    {
      path: '/changeShippingMessage',
      name: 'ChangeShippingMessage',
      component: ChangeShippingMessage
    },
    {
      path: '/addShipping',
      name: 'AddShipping',
      component: AddShipping
    },
    {
      path: '/payQrCode',
      name: 'PayQrCode',
      component: PayQrCode
    },
    {
      path: '/finishPay',
      name: 'FinishPay',
      component: FinishPay
    },
    {
      path: '/productList',
      name: 'ProductList',
      component: ProductList
    },
    {
      path: '/orderMessage',
      name: 'OrderMessage',
      component: OrderMessage
    },
  ]
})
