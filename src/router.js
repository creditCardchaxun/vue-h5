import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../src/views/Home.vue'
// import About from '@/views/About.vue'
import newsList from '@/views/news/news_list.vue'
import newsDetail from '@/views/news/news_detail.vue'
import activeList from '@/views/activity/active_list.vue'
import activeDetail from '@/views/activity/active_detail.vue'
import contactUs from '@/views/contactUs/contactus.vue'
import orderFloor from '@/views/order/order-floor.vue'
import myOrder from '@/views/order/myOrder.vue'
import hotelStar from '@/views/hotel/hotel-star.vue'
import hotelDetail from '@/views/hotel/hotelDetail.vue'
import bookingIndex from '@/views/Booking-Management/booking-index.vue'
import myReserve from '@/views/hotel/myReserve.vue'
import bookingDetail from '@/views/Booking-Management/booking-detail.vue'

import bookingfeedback from '@/views/Booking-Management/booking-feedback.vue'
import feedbackDetail from '@/views/Booking-Management/feedback-detail.vue'

import orderForm from '@/views/order/orderForm.vue'
import orderDetail from '@/views/order/myOrderDetail.vue'

import appraise from '@/views/order/appraise.vue'

Vue.use(VueRouter)
console.log(Home)
const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      keepalive: false,// 组件是否需要被保存
      title: '首页'
    }
  },

  // // 关于我们
  // {
  //   path: '/about',
  //   name: 'about',
  //   component:About,
  //   meta: {
  //     keepalive: false, // 组件是否需要被保存
  //     title:'关于我们'
  //    }
  // },
  // 新闻列表
  {
    path: '/news',
    name: 'newslist',
    component: newsList,
    meta: {
      keepalive: false, // 组件是否需要被保存
      title: '新闻'
    }
  },
  // 新闻详情
  {
    path: '/newsdetail/:id',
    name: 'newsdetail',
    component: newsDetail,
    meta: {
      keepalive: false, // 组件是否需要被保存
      title: '新闻详情'
    }
  },
  // 活动列表
  {
    path: '/activity',
    name: 'activity',
    component: activeList,
    meta: {
      keepalive: false, // 组件是否需要被保存
      title: '活动'
    }
  },
  // 活动详情
  {
    path: '/activitydetail/:id',
    name: 'activitydetail',
    component: activeDetail,
    meta: {
      keepalive: false, // 组件是否需要被保存
      title: '活动详情'
    }
  },
  // 联系我们
  {
    path: '/contact',
    name: 'contact',
    component: contactUs,
    meta: {
      keepalive: false, // 组件是否需要被保存
      title: '联系我们'
    }
  },

  // 个人中心
  {
    path: '/order',
    name: 'order',
    component: orderFloor,
    meta: {
      keepalive: false, // 组件是否需要被保存
      title: '个人中心'
    }

  },
  // 我的预约
  {
    path: '/myOrder',
    name: 'myOrder',
    component: myOrder,
    meta: {
      keepalive: false, // 组件是否需要被保存
      title: '我的预约'
    }
  },

  // 预约信息填写
  {
    path: '/orderForm',
    name: 'orderForm',
    component: orderForm,
    meta: {
      keepalive: false, // 组件是否需要被保存
      title: '预约看房'
    }
  },

  // 预约信息详情客户
  {
    path: '/orderDetail/:id',
    name: 'orderDetail',
    component: orderDetail,
    meta: {
      keepalive: false, // 组件是否需要被保存
      title: '预约详情'
    }
  },
  // 评价
  {
    path: '/appraise/:id',
    name: 'appraise',
    component: appraise,
    meta: {
      keepalive: false, // 组件是否需要被保存
      title: '填写评价'
    }
  },

  // 精品旅社

  {
    path: '/hotel',
    name: 'hotel',
    component: hotelStar,
    meta: {
      keepalive: false, // 组件是否需要被保存
      title: '精品居舍'
    },
  },
  // 精品旅社详情
  {
    path: `hotelDetail/:id`,
    name: 'hotelDetail',
    component: hotelDetail,
    meta: {
      keepalive: false, // 组件是否需要被保存
      title: '精品居舍详情'
    }
  },

  // 我的预订
  {
    path: '/myReserve',
    name: 'myReserve',
    component: myReserve,
    meta: {
      keepalive: false, // 组件是否需要被保存
      title: '预订入住'
    }
  },


  // 预约管理
  {
    path: '/booking',
    name: 'booking',
    component: bookingIndex,
    meta: {
      keepalive: false, // 组件是否需要被保存
      title: '预约管理'
    }
  },

  // 预约详情销售
  {
    path: '/bookingDetail/:id',
    name: 'bookingDetail',
    component: bookingDetail,
    meta: {
      keepalive: false, // 组件是否需要被保存
      title: '预约详情'
    }
  },
  // 看房反馈
  {
    path: '/bookingfeedback/:id',
    name: 'bookingfeedback',
    component: bookingfeedback,
    meta: {
      keepalive: false, // 组件是否需要被保存
      title: '看房反馈'
    }
  },
  //看房反馈信息 
  {
    path: '/feedbackdetail/:id',
    name: 'feedbackdetail',
    component: feedbackDetail,
    meta: {
      keepalive: false, // 组件是否需要被保存
      title: '反馈详情'
    }
  },

]

const router = new VueRouter({
  mode: 'hash',
  // base: process.env.BASE_URL,
  routes
})




export default router
