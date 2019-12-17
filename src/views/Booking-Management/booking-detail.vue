<template>
  <div class="bookingdetail">
    <aheaders status="3" @toback="toreplace" :showLan="true"></aheaders>
    <div class="detail">
      <ul>
        <li>
          <span class="detail-name">{{$t('m.bookName')}}</span>
          <span>{{listInfo.project_name}}</span>
        </li>
        <li>
          <span class="detail-name">{{$t('m.feedback8')}}</span>
          <span>{{listInfo.name}}</span>
        </li>
        <li>
          <span class="detail-name">{{$t('m.feedback9')}}</span>
          <span>{{listInfo.mobile}}</span>
        </li>
        <li>
          <span class="detail-name">{{$t('m.feedback10')}}</span>
          <span>{{listInfo.book_time}}</span>
        </li>
        <li>
          <span class="detail-name">{{$t('m.feedback11')}}</span>
          <span>{{listInfo.intention}}{{listInfo.comment?'，':''}}{{listInfo.comment}}</span>
        </li>
        <li class="detail-li">
          <span class="detail-name">{{$t('m.feedback12')}}</span>
          <span>{{listInfo.book_number}}</span>
        </li>
        <li>
          <span class="detail-name">{{$t('m.feedback13')}}</span>
          <span>{{listInfo.inputtime}}</span>
        </li>
      </ul>

      <div class="detail-button">
        <van-button
          plain
          hairline
          type="info"
          color="#5975a9"
          @click="showPopup"
        >{{$t('m.feedback15')}}</van-button>
        <van-popup v-model="show">
          <div class="box">
            <!-- <input type="text" placeholder="请填写拒绝受理此单的原因" /> -->
            <textarea cols="15" rows="5" v-model="desc" :placeholder="$t('m.feedback16')"></textarea>
            <van-button class="box-btn" :disabled="isclick" @click="closePopup">{{$t('m.s4')}}</van-button>
            <img src="../../assets/images/remove.png" alt class="img_remove" @click="tohideModel" />
            <!-- <van-icon name="close" /> -->
          </div>
          <!-- <textarea cols="15" rows="5" placeholder="请填写拒绝受理此单的原因"></textarea> -->
        </van-popup>
        <van-button type="info" color="#5975a9" @click="showRight">{{$t('m.others11')}}</van-button>
        <van-popup v-model="show_right">
          <div class="good">
            <img src="../../assets/images/checkmark.png" alt style="width:1.05rem;height:0.95rem;" />
            <p style="color:#000;font-size:0.4rem;">{{$t('m.others12')}}</p>
          </div>
        </van-popup>
      </div>

      <div class="bottom">
        <p>{{$t('m.feedback17')}}</p>
      </div>
    </div>

    <footers></footers>
  </div>
</template>

<script scoped>
import Vue from "vue";
import aheaders from "@/components/Header";
import footers from "@/components/Footer";
import interfaces from "@/utils/api.js";
import { Tab, Tabs, NavBar, Search, Toast, Icon } from "vant";

Vue.use(Tab).use(Tabs);
Vue.use(NavBar).use(NavBar);
Vue.use(Search);
Vue.use(Toast);
Vue.use(Icon);

export default {
  name: "bookingDetail",
  data() {
    return {
      show: false,
      show_right: false,
      ids: '',
      desc: '',
      listInfo: {},
      getHeight: {
        minHeight: ''
      },
      disabled: false
    };
  },
  components: {
    aheaders,
    footers
  },
  computed: {
    isclick() {
      if (!this.desc) return true
      else return false;
    },
    //  this.getHeight.minHeight = (window.outerHeight/window.outerWidth * 10.8 - 5.96)+'rem'
    //  minHeight(){
    //   return (window.outerHeight/window.outerWidth * 10.8 - 5.96)+'rem'
    // }
  },
  created() {
    this.getHeight.minHeight = (window.outerHeight / window.outerWidth * 10.8 - 5.96) + 'rem'
    this.ids = this.$route.params.id
    localStorage.setItem('bookId', this.ids)
    this.getdetailbook(this.ids)
  },
  mounted() {
    $eventbus.$on("changeLang", (res) => {
      this.ids = this.$route.params.id
      localStorage.setItem('bookId', this.ids)
      this.getdetailbook(this.ids)
    })
  },
  methods: {
    toreplace() {
      this.$router.go(-1)
    },
    getdetailbook(id) {
      interfaces.NObookdetail(id).then(res => {
        this.listInfo = res
      })
    },
    showPopup() {
      this.show = true;
    },
    closePopup() {
      if (this.desc == '') {
        this.$toast(this.$i18n.t('m.show1'))
        return;
      } else {
        let id = this.ids
        let status = 3
        let desc = this.desc
        let data = { id, status, desc }
        console.log(data);
        interfaces.jieshou(data).then(res => {
          // console.log('res');
          // console.log( res );
          // this.$toast(res)
          this.show = false;
          setTimeout(() => {
            this.$router.go(-1);
          },1000);
        }).catch((err) => {
          console.log(err);
          this.show = false;
        })
      }
    },
    showRight() {
      let id = this.ids
      let status = 2
      let data = { id, status }
      interfaces.jieshou(data).then(res => {
        this.show_right = true;
        setTimeout(() => {
          this.show_right = false;
          this.$router.replace({ name: 'booking', params: { active: 1, num: 2 } })
        }, 1000)
      })

    },
    tohideModel() {
      this.show = false;
    }
  }
};
</script>

<style scoped>
.bookingdetail {
  width: 100%;
  margin: 0 auto;
  min-height: 100%;
  padding-bottom: 5.96rem;
  box-sizing: border-box;
  position: relative;
}

.top {
  width: 9.55rem;
  height: 1.72rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 0 0 0.55rem;
}
.top .logo {
  width: 0.54rem;
  height: 0.65rem;
  text-align: center;
}
.top .logo img {
  /* display: inline-block; */
  width: 75%;
  height: auto;
}
.top .nav-lan {
  width: 2.37rem;
  height: 0.59rem;
}
.detail {
  width: auto;
  height: auto;
  border-top: 1px solid #f1f1f1;
}
.detail ul {
  width: 100%;
  height: auto;
  margin: 0 auto;
  padding-top: 0.88rem;
}
.detail ul li {
  padding: 0 0.6rem;
  height: 1.3rem;
  margin: 0 auto;
  display: flex;
  align-items: center;
  box-sizing: content-box;
  /* justify-content: space-between; */
}
.detail ul li:nth-child(5) {
  border-bottom: 0.3rem solid #f1f1f1;
  padding-bottom: 1.1rem;
}
.detail ul li span {
  font-size: 0.42rem;
}
.detail ul li .detail-name {
  color: #bfbfbf;
  font-size: 0.35rem;
  display: inline-block;
  width: 2.5rem;
}
.detail ul .detail-li {
  margin-top: 0.8rem;
}
.detail-button {
  width: 9.59rem;
  height: auto;
  margin: 0.85rem auto 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.detail-button .van-button {
  width: 4rem;
}
.bottom {
  width: auto;
  height: 2rem;
  line-height: 2rem;
}
.bottom p {
  font-size: 0.4rem;
  color: #929292;
  text-align: center;
}
.box {
  width: 9.6rem;
  height: 6rem;
  margin: 0 auto;
  position: relative;
}
.box textarea {
  width: 8rem;
  height: auto;
  margin: 1rem 0.75rem;
  font-size: 0.4rem;
  border: none;
}
.box .box-btn {
  width: 90%;
  height: auto;
  margin: 0.2rem auto 0.4rem;
  display: block;
  background: rgb(89, 117, 169);
  color: #fff;
}

.box .box-btn[disabled] {
  width: 90%;
  height: auto;
  margin: 0.2rem auto 0.4rem;
  display: block;
  color: #333;
  background-color: #dddddd;
}

/* .box .van-button .van-button__text {
      color:#000;
} */

.good {
  width: 7.7rem;
  height: 4rem;
  margin: 0 auto;
  overflow: hidden;
  /* padding-top:1.5rem; */
}
.good img {
  display: block;
  margin: 0 auto;
  margin-top: 1rem;
}
.good p {
  font-size: 0.45rem;
  text-align: center;
  margin-top: 0.5rem;
}
.van-popup {
  border-radius: 10px;
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
