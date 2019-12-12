<template>
  <div class="footer">
    <div class="foot-nav">
      <div class="foot">
        <router-link :to="{path:'/hotel'}" replace>{{$t('m.homebottom')}}</router-link>|
        <router-link :to="{path:'/news'}" replace>{{$t('m.homebottom2')}}</router-link>|
        <router-link :to="{path:'/activity'}" replace>{{$t('m.homebottom3')}}</router-link>|
        <router-link :to="{name:'contact',params:{active:0}}" replace>{{$t('m.home5')}}</router-link>
      </div>
      <div class="foot_01">
        <ul>
          <li @click="toCallPhone">
            <img src="../assets/images/phone.png" alt style="width:0.24rem;height:0.24rem" />
            <span>
              {{contact.tel}}
              <!-- <em style='font-size:0.22rem;'>(8:00-22:00)</em>  -->
            </span>
          </li>
          <li>
            <img src="../assets/images/map.png" alt style="width:0.20rem;height:0.24rem" />
            <span>{{contact.address}}</span>
          </li>
          <li>
            <img src="../assets/images/mail.png" alt style="width:0.24rem;height:0.20rem" />
            <span>{{contact.keywords}}</span>
          </li>
        </ul>
      </div>
    </div>

    <div class="foot-bottom">
      {{ms2}}
      <br />
      {{ms5}}
    </div>

    <div class="scrolltop" v-show="gotop" @click="toTop">
      <img src="../assets/images/top.png" alt />
    </div>
    <div class="kefu">
      <div class="kefu_01">
        <img src="../assets/images/kefu.png" alt />
        <div class="kefu-04" @click="openServe">
          <span>{{$t('m.server')}}</span>
          <span class="kefu_time">8:00-22:00</span>
        </div>
      </div>
      <!-- <img src="../assets/images/index-kefu.png" alt=""> -->
    </div>
  </div>
</template>
<script>
import interfaces from "@/utils/api.js";
export default {
  name: 'footers',
  data() {
    return {
      gotop: false,
      contact: {},
      ms2: '',
      ms5: ''

    }
  },
  methods: {
    toCallPhone() {
      window.location.href = 'tel://400 700 6608'
    },
    handleScroll() {
      let scrolltop = document.documentElement.scrollTop || document.body.scrollTop;
      scrolltop > 500 ? (this.gotop = true) : (this.gotop = false);
    },
    toTop() {
      let top = document.documentElement.scrollTop || document.body.scrollTop;
      // 实现滚动效果 
      const timeTop = setInterval(() => {
        document.body.scrollTop = document.documentElement.scrollTop = top -= 50;
        if (top <= 0) {
          clearInterval(timeTop);
        }
      }, 10);

    },
    contacts() {
      interfaces.contactus().then((res) => {
        if (res != undefined) {
          this.contact = res
          let main = res.content
          let ms = main.split('</p>')
          let ms4 = ms[0].split('<p>')
          let ms3 = ms[1].split('<p>')
          this.ms2 = ms4[1]
          this.ms5 = ms3[1]
        }
      })
    },
    openServe() {
      console.log('测试客服');
      // http://wxapi.itaojin.cn/weixin/action/toggle/transfer/${appId}/${userId}?checkToken=e8ae0f7dc2254090b618665340ec6dcd2ebf3d99d5ee4062a035e6c91003d0ef&flag=true
      var info = null
      if (localStorage.getItem('userinfo')) {
        info = JSON.parse(localStorage.getItem('userinfo'))
        console.log('info');
        console.log(info);
      }
      if (info) {
        window.location.replace(`http://wxapi.itaojin.cn/weixin/action/toggle/transfer/${info.appid}/${info.openid}?checkToken=e8ae0f7dc2254090b618665340ec6dcd2ebf3d99d5ee4062a035e6c91003d0ef&flag=true`)
        // window.$axios.get(`http://wxapi.itaojin.cn/weixin/action/toggle/transfer/${info.appid}/${info.openid}?checkToken=e8ae0f7dc2254090b618665340ec6dcd2ebf3d99d5ee4062a035e6c91003d0ef&flag=true`).then((res) => {
        //   console.log('客服的回调');
        //   console.log(res);
        // })
      }
    }
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll, true);
    $eventbus.$on("changeLang", (res) => {
      this.contacts()
    });
  },
  created() {
    this.contacts()
  },

}

</script>

<style scoped>
.footer {
  height: 5.96rem;
  position: absolute;
  bottom: 0;
  width: 100%;
}
.foot-nav {
  width: 100%;
  background-color: #3c5896;
  color: #fff;
  height: 4.45rem;
}
.foot-nav .foot {
  width: 9.63rem;
  height: auto;
  color: #fff;
  padding: 0.84rem 0 0.85rem;
  margin: 0 auto;
  font-size: 0.4rem;
}
.foot-nav .foot a {
  color: #fff;
  font-size: 0.34rem;
  padding: 0 0.35rem;
}
.foot_01 {
  width: auto;
  height: auto;
  margin: 0 1.05rem;
}
.foot_01 ul {
  display: flex;
  align-items: left;
  flex-direction: column;
}
.foot_01 ul li {
  font-size: 0.28rem;
  color: #fff;
  padding: 0.15rem 0 0.15rem 0rem;
}
.foot_01 ul li img {
  width: 0.28rem;
  height: 0.28rem;
  margin-right: 0.48rem;
}
.foot_01 ul li span {
  font-size: 0.3rem;
  color: rgba(255, 255, 255, 0.6);
}

.foot-bottom {
  width: 100%;
  background-color: #313131;
  color: rgba(255, 255, 255, 0.2);
  font-size: 0.3rem;
  line-height: 0.43rem;
  text-align: center;
  padding: 0.34rem 0 0;
  height: 1.5rem;
  box-sizing: border-box;
}
.scrolltop {
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  position: fixed;
  bottom: 10%;
  right: 3%;
  z-index: 120;
}
.scrolltop img {
  width: 100%;
  height: auto;
}
.kefu {
  width: auto;
  height: 1.18em;
  position: fixed;
  bottom: 4rem;
  right: 0px;
  background: rgba(0, 0, 0, 1);
  border-top-left-radius: 24px;
  border-bottom-left-radius: 24px;
  z-index: 90;
}
/* .kefu img{width:2.5rem;height:1.35rem;} */
.kefu .kefu_01 {
  width: auto;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
}
.kefu .kefu_01 img {
  width: 0.55rem;
  height: 0.55rem;
  margin: 0 0.2rem;
}
.kefu .kefu_01 .kefu-04 {
  width: 1.8rem;
  height: 1.18rem;
  display: flex;
  align-items: left;
  font-size: 0.35rem;
  flex-direction: column;
  justify-content: center;
}
.kefu .kefu_01 .kefu-04 span {
  color: #fff;
  font-size: 0.34rem;
  line-height: 0.4rem;
}
.kefu .kefu_01 .kefu-04 .kefu_time {
  color: #fff;
  font-size: 0.28rem;
}
</style>