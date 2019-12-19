import Vue from 'vue'
// import VueI18n from 'vue-i18n'
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

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      keepalive: false,// 组件是否需要被保存
      title:'base',
      'en-US': 'base',
      'zh-CN': 'base',
    }
  },


  // 新闻列表
  {
    path: '/news',
    name: 'newslist',
    component: newsList,
    meta: {
      keepalive: false, // 组件是否需要被保存
      title: '新闻列表',
      'en-US': 'News',
      'zh-CN': '新闻列表',
    }
  },
  // 新闻详情
  {
    path: '/newsdetail/:id',
    name: 'newsdetail',
    component: newsDetail,
    meta: {
      keepalive: false, // 组件是否需要被保存
      title: '新闻详情',
      'en-US': 'News',
      'zh-CN': 'base新闻',
    }
  },
  // 活动列表
  {
    path: '/activity',
    name: 'activity',
    component: activeList,
    meta: {
      keepalive: false, // 组件是否需要被保存
      title: '活动列表',
      'en-US': 'Events',
      'zh-CN': '活动列表',

    }
  },
  // 活动详情
  {
    path: '/activitydetail/:id',
    name: 'activitydetail',
    component: activeDetail,
    meta: {
      keepalive: false, // 组件是否需要被保存
      title: '活动详情',
      'en-US': 'Active',
      'zh-CN': '活动详情',
    }
  },
  // 联系我们
  {
    path: '/contact',
    name: 'contact',
    component: contactUs,
    meta: {
      keepalive: false, // 组件是否需要被保存
      title: '联系我们',
      'en-US': 'About base',
      'zh-CN': '联系我们',
    }
  },

  // 个人中心
  {
    path: '/order',
    name: 'order',
    component: orderFloor,
    meta: {
      keepalive: false, // 组件是否需要被保存
      title: '个人中心',
      'en-US': 'User center',
      'zh-CN': '个人中心',
    }

  },
  // 我的预约
  {
    path: '/myOrder',
    name: 'myOrder',
    component: myOrder,
    meta: {
      keepalive: false, // 组件是否需要被保存
      title: '我的预约',
      'en-US': 'my appointment',
      'zh-CN': '我的预约',
    }
  },

  // 预约信息填写
  {
    path: '/orderForm',
    name: 'orderForm',
    component: orderForm,
    meta: {
      keepalive: false, // 组件是否需要被保存
      title: '预约看房',
      'en-US': 'appointment',
      'zh-CN': '预约看房',
    }
  },

  // 预约信息详情客户
  {
    path: '/orderDetail/:id',
    name: 'orderDetail',
    component: orderDetail,
    meta: {
      keepalive: false, // 组件是否需要被保存
      title: '预约详情',
      'en-US': 'Appointment details',
      'zh-CN': '预约详情',

    }
  },
  // 评价
  {
    path: '/appraise/:id',
    name: 'appraise',
    component: appraise,
    meta: {
      keepalive: false, // 组件是否需要被保存
      title: '评价详情',
      'en-US': 'Evaluation details',
      'zh-CN': '评价详情',
      // this.$i18n.t('m.news9')
    }
  },

  // 精品居舍

  {
    path: '/hotel',
    name: 'hotel',
    component: hotelStar,
    meta: {
      keepalive: false, // 组件是否需要被保存
      title: '精品居舍',
      'en-US': 'baseLIVING',
      'zh-CN': '精品居舍',
      // this.$i18n.t('m.news10')
    },
  },
  // 精品居舍详情
  {
    path: `/hotelDetail/:id`,
    name: 'hotelDetail',
    component: hotelDetail,
    meta: {
      keepalive: false, // 组件是否需要被保存
      title: '',
      'en-US': '',
      'zh-CN': '',
      // this.$i18n.t('m.news11')
    }
  },

  // 我的预订
  {
    path: '/myReserve',
    name: 'myReserve',
    component: myReserve,
    meta: {
      keepalive: false, // 组件是否需要被保存
      title: '我的预订',
      'en-US': 'My Bookings',
      'zh-CN': '我的预订',
      // this.$i18n.t('m.news12')
    }
  },


  // 预约管理
  {
    path: '/booking',
    name: 'booking',
    component: bookingIndex,
    meta: {
      keepalive: false, // 组件是否需要被保存
      title: '预约管理',
      'en-US': 'Management',
      'zh-CN': '预约管理',
      // this.$i18n.t('m.news13')
    }
  },

  // 预约详情销售
  {
    path: '/bookingDetail/:id',
    name: 'bookingDetail',
    component: bookingDetail,
    meta: {
      keepalive: false, // 组件是否需要被保存
      title:'预约详情',
      'en-US': 'booking',
      'zh-CN': '预约详情',
      //  this.$i18n.t('m.news8')
    }
  },
  // 看房反馈
  {
    path: '/bookingfeedback/:id',
    name: 'bookingfeedback',
    component: bookingfeedback,
    meta: {
      keepalive: false, // 组件是否需要被保存
      title: '看房反馈',
      'en-US': 'Feedback',
      'zh-CN': '看房反馈',
      // this.$i18n.t('m.news14')
    }
  },
  //看房反馈信息 
  {
    path: '/feedbackdetail/:id',
    name: 'feedbackdetail',
    component: feedbackDetail,
    meta: {
      keepalive: false, // 组件是否需要被保存
      title: '看房反馈详情',
      'en-US': 'Feedback details',
      'zh-CN': '看房反馈',
      // this.$i18n.t('m.news15')
    }
  },

]

const router = new VueRouter({
  mode: 'hash',
  // base: process.env.BASE_URL,
  routes
})


export default router
