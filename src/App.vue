<template>
  <!-- <div><img src="../../" alt=""></div> -->
  <div id="app" :style="style">
    <!-- <keep-alive>
		    <router-view v-if="$route.meta.keepalive" v-wechat-title='$route.meta.title'></router-view>
    </keep-alive> v-if="!$route.meta.keepalive"  :key='$route.fillPath'-->
    <router-view v-wechat-title="settitle"></router-view>

    <!-- 评价弹框 -->

    <!-- <mt-popup v-model="showModel" :close-on-click-overlay='false'>
      <div class="goodAppraise">
          <div class="app_01">
              <div class="app-img"><img :src="appraiseModel.onepic" alt=""></div>
               <div class="app-right">
                 <h3>{{appraiseModel.project_name}}</h3>
                 <p>预约看房时间:{{appraiseModel.book_time}}</p>
               </div>
          </div>
          <div class="app_02">  
            您已预约过了,请给我们留下宝贵的意见吧!
          </div>
           <button @click="toAppraise(appraiseModel.id)">立即评价</button>
          <img src="@/assets/images/remove.png" alt="" class='img_remove'  @click="hideClose(appraiseModel.id)">
      </div>
    </mt-popup>-->

    <div class="goodStar" @touchmove="touchForbidden" v-show="showModel" v-if="appraiseModel!=null">
      <div class="goodAppraise">
        <div class="app_01">
          <div class="app-img">
            <img :src="appraiseModel.onepic" alt />
          </div>
          <div class="app-right">
            <h3>{{appraiseModel.project_name}}</h3>
            <p>{{$t('m.models1')}}:{{appraiseModel.book_time}}</p>
          </div>
        </div>
        <div class="app_02">{{$t('m.hotelxq7')}}</div>
        <button @click="toAppraise(appraiseModel.id)">{{$t('m.watch6')}}</button>
        <img
          src="@/assets/images/remove.png"
          alt
          class="img_remove"
          @click="hideClose(appraiseModel.id)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import config from '@/config/config.js'
import apitest from '@/config/apitest.js'
import { WXsdk } from "@/utils/wxShare"
import interfaces from "@/utils/api.js";

export default {
  data() {
    return {
      appraiseModel: {
      },
      showModel: false,
      ids: '',
      // iswx:''
    }
  },

  created() {
    this.getUserInfo()  //获取个人信息
    // apitest.te st() 
    // 通过url中是否含有shareId来判断是否是分享出去的详情页，再由路由推向对应详情页

    // this.judgeShare()
    // 评价弹框123
  },
  computed: {
    settitle() {
      return this.$route.meta[this.$i18n.locale]
    },
    style() {
      if (this.iswx) return '';
      return "width:750px;margin:0 auto;position:relative;background-color: #fff;"
    }

  },
  mounted() {
    console.log('NODE_ENV')
    console.log(process.env.NODE_ENV)
    console.log('VUE_APP_BUILD_TYPE')
    console.log(process.env.VUE_APP_BUILD_TYPE)
    console.log('config')
    console.log(config)
    console.log('accessToken')
    console.log(localStorage.getItem('accessToken'))
    WXsdk.getShare(config.shareTitle, config.shareContent, config.shareIcon, config.shareLink)

    let accessToken = localStorage.getItem('accessToken')
    let userinfo = JSON.parse(localStorage.getItem('userinfo'))
    if (accessToken || userinfo) {
      interfaces.appraiseModel().then((res) => {
        if (res.data == null || res.data == '') {
          this.showModel = false
        } else {
          this.appraiseModel = res.data
          this.ids = res.data.id
          let id = localStorage.getItem('appraiseId')
          if (res.data.id == id) {
            this.showModel = false
          } else {
            this.showModel = true
          }
        }
      })
    }



  },
  methods: {
    touchForbidden(e) {
      e.preventDefault()
    },
    judgeShare() {
      // if (location.href.includes("shareId")) {
      //   // 用是否有shareId 来判断是不是分享出去的链接
      //   var id = this.getshareId(location.href)
      //   this.$router.replace({ path: "detail", query: { detailId: id } });
      // } else {
      // }
    },
    getshareId(str) {
      var arr = str.split("?");
      var newArr = arr[1].split("&");

      var id = null;
      newArr.forEach(ele => {
        if (ele.includes("shareId")) {
          id = ele.match(/\d+/g)[0];
        }
      });

      return id;
    },
    hideClose(id) {
      this.showModel = false
      localStorage.setItem('appraiseId', id)
    },
    toAppraise(id) {
      this.showModel = false
      this.$router.push({ name: 'appraise', params: { id: id } })
      localStorage.setItem('appraiseId', id)
    },
    getUserInfo() {
      interfaces.getuserInfo().then(res => {
        console.log(res)
        this.userinfo = res
        localStorage.setItem('userinfo', JSON.stringify(res))
      });
    },
  }
}
</script>

<style>
html,
body {
  height: 100%;
}

#app {
  height: 100%;
}

.goodStar {
  width: 100%;
  height: 100%;
  position: fixed;
  background: rgba(0, 0, 0, 0.8);
  top: 0;
  left: 0;
  z-index: 9999;
  overflow-y: hidden;
}
.goodAppraise {
  width: 9.05rem;
  height: 6.72rem;
  background-color: #e5e5e5;
  margin: 0 auto;
  padding: 0.25rem 0.25rem 0;
  position: relative;
  top: 30%;
  left: 0;
}
.goodAppraise .app_01 {
  background-color: #fff;
  padding: 0.5rem 0.58rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.goodAppraise .app_01 .app-img {
  width: 2.55rem;
  height: 2.4rem;
}
.goodAppraise .app_01 .app-img img {
  width: 2.55rem;
  height: 2.4rem;
}
.goodAppraise .app_01 .app-right {
  width: auto;
  height: 2.4rem;
  padding-left: 0.58rem;
}
.goodAppraise .app_01 .app-right h3 {
  font-size: 0.45rem;
  color: #000;
  font-weight: bold;
}
.goodAppraise .app_01 .app-right p {
  font-size: 0.35rem;
  color: #999999;
  line-height: 0.6rem;
  margin-top: 0.2rem;
}
.goodAppraise .app_02 {
  font-size: 0.4rem;
  color: #373737;
  margin: 0.5rem 0 0.76rem;
  text-align: center;
}
.goodAppraise button {
  font-size: 0.35rem;
  color: #fff;
  width: 7.8rem;
  height: 1.2rem;
  line-height: 1.2rem;
  background-color: #5975a9;
  display: block;
  border: 1px solid transparent;
  margin: 0 auto;
  border-radius: 5px;
}
#app .van-popup {
  overflow: visible;
}
.img_remove {
  width: 0.82rem;
  height: 0.82rem;
  position: absolute;
  bottom: -53px;
  left: 47%;
}
</style>
