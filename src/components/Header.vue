<template>
  <div class="header-nav">
    <div class="header" :class="{showbgs:showbg}">
      <!-- 2代表2级页面  3代表3级页面 -->
      <div class="logo" v-if="status==2">
        <router-link :to="{path:'/'}">
          <img src="@/assets/images/logo.png" alt />
        </router-link>
      </div>
      <div class="left" v-if="status==3" @click="goBack">
        <van-icon name="arrow-left" />
      </div>
      <!-- toback(where) -->
      <div class="nav-lan" v-show="showNav">
        <!-- <span value="zh-CN">EN</span> -->
        <!-- <select id="sex" v-model="lang" @change="changeLangEvent">
          <option value="zh-CN">中文</option>
          <option value="en-US">英文</option>
        </select>-->
        <span @click="changeLangEvent" v-show="showLan">
          <!-- {{lang ==='zh-CN'?'EN':'ZH'}} -->
          {{lanBase}}
        </span>
        <div class="nav-menu" @click="toorder">
          <router-link :to="{path:'/order'}">
            <img src="@/assets/images/right-menu.png" alt />
          </router-link>
        </div>
      </div>
    </div>
    <div class="empty" v-show="showEmpty"></div>
  </div>
</template>
<script>
import Vue from 'vue';

import store from '../store'
import config from '@/config/config.js'

export default {
  name: 'aheaders',
  props: {
    status: String,
    where: String,
    showLan: Boolean,
    showNav: {
      default: true,
      type: Boolean
    },
    showEmpty: {
      default: true,
      type: Boolean
    }
  },
  data() {
    return {
      showbg: false,
      lang: store.state.lang,
      lanBase: 'EN'
    }
  },
  // computed: {
  //   nav() {
  //     if (this.iswx) return '';
  //     return "width: 750px;transform: translate3d(0%, -4px, 10px);left: 22.21%;margin: 0px auto;padding: 0 5%;box-sizing: border-box;"
  //   }
  // },
  // computed: {
  //   nav() {
  //     if (this.iswx) return '';
  //     return "width: 750px;transform: translate3d(0%, -4px, 10px);left: 22%;margin: 0px auto;padding: 0 5%;box-sizing: border-box;"
  //   }
  // },
  methods: {
    toorder() {
      this.$router.push({ path: '/order' })
    },
    goBack() {
      if (location.href.includes("shareId")) {
        location.href = config.shareLink
      }else{
        this.$emit('toback')
      }
      
    },
    //  handleScrolls() {
    //        let scrolltop = document.documentElement.scrollTop || document.body.scrollTop;
    //          scrolltop >55? (this.showbg = true) : (this.showbg = false);
    //        },
    changeLangEvent() {
      console.log(11111);
      if (this.lang == 'zh-CN') {
        this.lang = 'en-US'
      } else {
        this.lang = 'zh-CN'
      }
      this.$i18n.locale = this.lang; //关键语句
      this.$store.commit("changeLang", this.lang);
      $eventbus.$emit("changeLang", this.lang);
      localStorage.setItem('lanBase', this.lang == 'zh-CN' ? 1 : 4)
      let lanBase = localStorage.getItem('lanBase')

      if (lanBase == 1) {
        this.lanBase = 'EN'
      } else {
        this.lanBase = '中'
      }

      $eventbus.$emit("changeStyle", this.lanBase);
    }

  },
  mounted() {
    // window.addEventListener("scroll", this.handleScrolls, true);
    $eventbus.$on('changeLang', this.reload)
  },
  created() {
    let lanBase = localStorage.getItem('lanBase')

    if (lanBase == 1) {
      this.lanBase = 'EN'
    } else {
      this.lanBase = '中'
    }

    if (!lanBase) this.lanBase = 'EN'
  }

}

</script>

<style lang="less" scoped>
/* .header {width:100%;height:auto;display:flex;align-items: center;position:absolute;top:0;left:0;justify-content:space-around}
.header .logo{width:20%;height:auto;margin-top:10px;}
.header .nav-lan{width:37%;height:auto;}
.nav-lan{display:flex;align-items: center;justify-content: space-around}
.nav-lan span{font-size:18px;border-bottom:1px solid #000;}
.nav-lan .nav-menu{width:25%;height:auto;} */

.header {
  width: 100%;
  height: 1.3rem;
  display: flex;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  justify-content: space-between;
  padding: 0 0.6rem;
  box-sizing: border-box;
  padding: 0 0.6rem;
  padding-top: 0.15rem;
  padding-bottom: 0.15rem;

  // width: 100%;
  // padding: 0 0.6rem;
  // height: 1.3rem;
  // display: flex;
  // box-sizing: border-box;
  // align-items: center;
  // justify-content: space-between;
  // position: fixed;
  // top: 0;
  // left: 0;
  background: rgba(255, 255, 255, 0.8);
  z-index: 99;
  /* margin:0 0 0 0.55rem; */
}
.empty {
  height: 1.3rem;
}
.header .logo {
  width: 1.54rem;
  height: 0.9rem;

  /* margin-top: 10px; */
  img {
    width: auto;
    height: 100%;
  }
}

.left {
  width: auto;
  height: auto;
}
.left .van-icon {
  font-size: 0.7rem;
}
.header .nav-lan {
  width: auto;
  height: 0.59rem;
}
.nav-lan {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.nav-lan > span {
  font-size: 0.44rem;
  border-bottom: 1px solid #000;
}
.nav-lan .nav-menu {
  width: 0.85rem;
  height: 0.6rem;
  margin-left: 0.7rem;
}
.nav-lan .nav-menu img {
  width: 0.85rem;
  height: 0.6rem;
}
.nav-lan .nav-menu a {
  font-size: 0.4rem;
  width: 0.85rem;
  height: 0.6rem;
  display: block;
}

.left {
  width: auto;
  height: auto;
}
.left .van-icon {
  font-size: 0.7rem;
}
// .header .nav-lan {
//   width: 2.37rem;
//   height: 0.59rem;
// }
.nav-lan {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.nav-lan > span {
  font-size: 0.44rem;
  border-bottom: 1px solid #000;
}
.nav-lan .nav-menu {
  width: 0.85rem;
  height: 0.6rem;
}
.nav-lan .nav-menu img {
  width: 0.85rem;
  height: 0.6rem;
}
.nav-lan .nav-menu a {
  font-size: 0.4rem;
  width: 0.85rem;
  height: 0.6rem;
  display: block;
}

// .showbgs {
//   width: 100%;
//   height: 1.63rem;
//   display: flex;
//   align-items: center;
//   justify-content: space-between;

//   position: fixed;
//   background: rgba(255, 255, 255, 0.8);
//   padding: 0 0.6rem;
//   box-sizing: border-box;
//   margin: 0;
//   z-index: 99;
//   top: 0;
//   left: 0;
// }

@media screen and (min-width: 640px) {
  .header{
   width: 750px;
   height: 1.3rem;
   margin:0 auto;
   left:50%;
   transform: translate3d(-50%, -4px, 10px);
  }


}
</style>