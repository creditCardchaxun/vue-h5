<template>
  <div class="hotel-detail">
    <aheaders status="3" @toback="goHome" :showLan="true"></aheaders>
    <div class="banner-img">
      <div class="banner_top" @click="showStory" v-show="hideBannerTop">
        <em>{{$t('m.hotelxq1')}}</em>
        <!-- <div class="down">
          <img src="../../assets/images/more-icon01.jpg" alt style="width:0.2rem;height:0.2rem;" />
        </div>-->
      </div>
      <div class="Project-imgs">
        <projectImg
          v-if="showImgAll"
          :imgAll="imgAll"
          :showImgAll="showImgAll"
          :idss="detailId"
          @tohideList="tohideList"
        ></projectImg>
      </div>

      <!--轮播图  -->
      <van-swipe @change="onChanges" :show-indicators="true" :loop="true">
        <!-- 图片轮播 -->
        <template v-if="hideImg&&projectdetail.pic">
          <van-swipe-item v-for="(item,index) in projectdetail.pic.img" :key="index">
            <img :src="item" alt />
          </van-swipe-item>
        </template>
        <!-- VR轮播 -->
        <van-swipe-item v-if="hideVR&&projectdetail.pic">
          <div class="VR-img" @click="toVRurl(projectdetail.pic.VR.url)">
            <img :src="projectdetail.pic.VR.ar_pic" alt />
            <img src="../../assets/images/VR.png" alt class="VR" />
          </div>
        </van-swipe-item>
        <!-- 视频轮播 -->
        <van-swipe-item v-if="hideVideo">
          <div class="VR-img">
            <img
              :src="projectdetail.pic.video.video_pic"
              v-if="projectdetail.pic.video.video_pic"
              @click="showVideoplay"
            />
            <img src="../../assets/images/stop.png" alt class="VR" />
          </div>
        </van-swipe-item>

        <div
          class="custom-indicator"
          slot="indicator"
          v-if="projectdetail.pic"
        >{{ currentBanner + 1 }}/{{hideImg?projectdetail.pic.img.length:totalLength}}</div>
      </van-swipe>
      <p class="swiper-title">
        <span
          v-if="projectdetail.pic&&projectdetail.pic.VR.ar_pic"
          @click="toshowVR(1)"
          :class="{activeTitle:hideVR}"
        >VR</span>
        <span
          v-if="projectdetail.pic&&projectdetail.pic.VR.ar_pic"
          @click="toshowIMG(projectdetail.pic.img.length)"
          :class="{activeTitle:hideImg}"
        >图片</span>
        <span
          v-if="projectdetail.pic&&projectdetail.pic.video.video_pic"
          @click="toshowVideo(1)"
          :class="{activeTitle:hideVideo}"
        >视频</span>
      </p>
    </div>
    <!-- 视频播放 -->
    <div class="video-model" v-if="video_url" @click="tohideVideo">
      <video :src="projectdetail.pic.video.video_url" autoplay controls width="100%" height="400"></video>
    </div>

    <div class="main-content">
      <h3>
        <em>{{projectdetail.project_name}}</em>
        <span>{{projectdetail.open_info}}</span>
      </h3>
      <div class="main-icon">
        <span v-for="(item,index) in projectdetail.project_tags" :key="index">{{item}}</span>
        <!-- <span>露天花园</span><span>露天花园</span><span>露天花园</span> -->
      </div>
      <div class="main-loaction" @click="toMap">
        <div class="location" ref="house">
          <van-icon name="location-o" />
          <span>{{projectdetail.address}}</span>
        </div>
        <van-icon name="arrow" />
      </div>
    </div>
    <div class="desc">
      <h3>{{$t('m.hotelxq2')}}</h3>
      <!-- <div ref="desc" class="desc02" v-if="projectdetail.desc!=''"  :class="{brandStory:showMore}">
        <p>{{projectdetail.desc}}</p>
      </div>
      <div class="nolist" v-else style="font-size:0.35rem;text-align:center;">{{$t('m.others13')}}</div>
      <div class="index-more" v-show="showMore01" @click="toloadMore2" style="margin:0.3rem 0;">
        <span v-show="hideIcon">more</span>
        <img
          src="../../assets/images/more-icon.jpg"
          alt
          style="margin-top: 0.1rem;"
          :class="{brandimg2:showMore}"
        />
      </div>-->
      <showmorenew :pageType="'hotal-gypp'" v-if="projectdetail.desc" :htmlstr="projectdetail.desc"></showmorenew>
    </div>
    <div class="types">
      <div class="types-nav">
        <h3>{{$t('m.hotelxq3')}}</h3>
        <van-tabs
          line-width="6%"
          :border="false"
          :ellipsis="false"
          v-if="projectdetail.house_type!=''"
          @change="onchangeTab"
        >
          <div class="class" v-for="(item,index) in projectdetail.house_type" :key="index">
            <van-tab :title="item.typename">
              <van-swipe @change="onChange" :ref="'detailSwiper' + index">
                <van-swipe-item v-for="(i,ins) in item.pic" :key="ins">
                  <img :src="i.fileurl" alt class="hotel-msg" />
                </van-swipe-item>
                <!-- <van-swipe-item><img src="../../assets/images/hotel-02.jpg" alt="" class='hotel-msg'></van-swipe-item> -->
                <div class="custom-indicator" slot="indicator">{{ current + 1 }}/{{houseTypeLength}}</div>
              </van-swipe>
              <div class="types-mianji">
                <div class="yiju">{{$t('m.hotelxq10')}}:{{item.room_size}}㎡</div>
                <div class="yiju-img">
                  <img :src="item.house_type_pic" alt />
                </div>
              </div>
            </van-tab>
          </div>
          <!-- <van-tab title="二居"> <p style='font-size:0.3rem;margin:0.3rem 0;'>暂无详细信息</p>   </van-tab> -->
        </van-tabs>
      </div>
      <div class="desc" id="maps" ref="tab1">
        <h3 style="margin-top:1.2rem;">{{$t('m.hotelxq4')}}</h3>
        <div class="toall-ul">
          <ul
            :class="{activeLi:showHeight}"
            ref="heightShow"
            v-if="projectdetail.project_setting!=null && lanBase === 'EN'"
          >
            <li v-for="(item,index) in projectdetail.project_setting" :key="index">
              <img :src="item.image" alt />
              <span>{{item.title}}</span>
            </li>
          </ul>
          <ul
            class="ul2"
            :class="{activeLi2:showHeight}"
            ref="heightShow"
            v-if="projectdetail.project_setting!=null && lanBase === '中'"
          >
            <li v-for="(item,index) in projectdetail.project_setting" :key="index">
              <img :src="item.image" alt />
              <span>{{item.title}}</span>
            </li>
          </ul>
          <div
            class="index-more"
            v-if="projectdetail.project_setting!=null&&projectdetail.project_setting.length>8"
            @click="toloadMore"
          >
            <span v-show="hideIcon">more</span>
            <img
              src="../../assets/images/more-icon.jpg"
              alt
              style="margin-top: 0.1rem;"
              :class="{brandimg2:showHeight}"
            />
          </div>
        </div>
        <!-- <div class="nolist" v-else style='font-size:0.35rem;text-align:center;margin:0.3rem 0;'>暂无公寓配置详细信息</div> -->
      </div>
      <div class="map">
        <div class="map01">
          <!-- <img src="../../assets/images/map01.jpg" alt=""> -->
          <maps v-if="projectdetail.address" :dataArr="projectdetail"></maps>
          <h3>{{$t('m.hotelxq5')}}</h3>
          <!-- <div class="map_mains" ref="jiaotong" :class="{jiaoActive:showLoadMore}">
            <p v-html="projectdetail.content">projectdetail.content</p>
          </div>
          <div class="index-more" v-if="showJiao" @click="toloadMoreJiao" style="margin:0.3rem 0;">
            <span v-show="hideIcon">more</span>
            <img
              src="../../assets/images/more-icon.jpg"
              alt
              style="margin-top: 0.1rem;"
              :class="{brandimg2:showLoadMore}"
            />
          </div>-->
          <div class="more-div" style='padding-left:0.2rem;'>
            <showmorenew
              :pageType="'hotal-zbjt'"
              v-if="projectdetail.content"
              :htmlstr="projectdetail.content"
            ></showmorenew>
          </div>
        </div>
      </div>
      <div class="hot-hotel">
        <h3>{{$t('m.hotelxq6')}}</h3>
        <div class="hotel-some" v-if="projectdetail.recommend_list!=''">
          <swiper :options="swiperOption">
            <swiper-slide v-for="(item,index) in projectdetail.recommend_list" :key="index">
              <div class="hotel-item" @click="toDetailxq(item.id)">
                <img :src="item.pic" alt />
                <div class="hotel-title">{{item.project_name}}</div>
                <!-- <p>{{item.area_str}}</p> -->
                <p>{{item.address}}</p>
              </div>
            </swiper-slide>
          </swiper>
        </div>
        <div class="nolist" v-else style="font-size:0.35rem;text-align:center;">{{$t('m.others13')}}</div>
      </div>
    </div>
    <afooter></afooter>
    <!-- <div class="empty" style='height:1.44rem;'></div> -->
    <div
      class="bottomMessage"
      v-show="projectdetail.is_show_black==1"
      v-if="local"
      @click="toAppraise"
    >
      <div class="leftMessage">
        <img src="../../assets/images/warning.png" alt class="sai1" />
        <p>{{$t('m.hotelxq7')}}</p>
      </div>
      <img src="../../assets/images/warn_right.png" alt class="sai2" />
    </div>
    <div class="bottom-nav" v-if="local">
      <div class="bottom-phone">
        <van-icon name="phone-o" />
      </div>
      <button
        @click="toServe(projectdetail.id,projectdetail.project_name)"
        v-if="projectdetail.xiecheng_id!=0 && projectdetail.xiecheng_id!=''"
      >{{$t('m.hotelxq9')}}</button>
      <button
        class="s1"
        :class="{otherClass:!projectdetail.xiecheng_id||projectdetail.xiecheng_id==0}"
        @click="toshowModels(projectdetail.id,projectdetail.project_name)"
      >{{$t('m.hotelxq12')}}</button>
    </div>
    <submitBtn
      v-if="hideModel"
      :id="idss"
      :name="names"
      :status="status"
      @tohideModel="tohideModel"
    ></submitBtn>
  </div>
</template>
<script>
import Vue from "vue";
import { Swipe, SwipeItem, Icon, Tab, Tabs } from "vant";
import showmorenew from "@/components/ShowMoreNew";
Vue.use(Swipe)
  .use(SwipeItem)
  .use(Icon)
  .use(Tab)
  .use(Tabs);

import maps from "@/components/map";
import aheaders from "@/components/Header";
import submitBtn from "@/components/submitBtn";
import afooter from "@/components/Footer";
import projectImg from "@/components/projectImg";
import interfaces from "@/utils/api.js";
export default {
  name: "hotelDetail",
  data() {
    return {
      hideVideo: false,
      hideVR: false,
      hideImg: true,
      current: 0,
      currentBanner: 0,
      scroll: 0,
      swiperOption: {
        slidesPerView: "auto",
        // spaceBetween: 10,
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        }
      },
      projectdetail: {},
      defaultheight: 200,
      defaultheight2: 70,
      showHeight: false,
      hideModel: false,
      mobileLocal: "",
      idss: "",
      names: "",
      status: "",
      scroll: null,
      showImgAll: false,
      local: true,
      scroller: "",
      detailId: "",
      getHeight: {
        minHeight: ""
      },
      hideIcon: true,
      showMore: false,
      showMore01: true,
      showJiao: true,
      showLoadMore: false,
      totalLength: "",
      video_url: false,
      brandStory: "",
      houseTypeLength: 0,
      lanBase: null,
      imgAll: [],
      hideBannerTop: true
    };
  },
  created() {
    this.mobileLocal = JSON.parse(localStorage.getItem("userinfo")).mobile;
    let id = this.$route.params.id;
    this.getHeight.minHeight =
      (window.outerHeight / window.outerWidth) * 10.8 - 5.96 + "rem";
    this.getdetailhouses(id);
    this.storyImg(id);
    this.getLan();
    $eventbus.$on("changeStyle", this.changeStyle);
  },
  beforeRouteEnter(to, from, next) {
    let id = to.params.id;
    let status = to.params.status;
    interfaces.getdetailhouse(id).then(function(res) {
      to.meta[i18n.locale] = res.project_name;
      next(vm => {
        vm.projectdetail = res;

        console.log('vm.projectdetail');
        console.log(vm.projectdetail);

        vm.detailId = res.id;
        var div = vm.$refs.tab1;
        if (from.name == "myOrder") {
          if (div) {
            setTimeout(function() {
              console.log($(div).offset().top);
              // $('html,body').scrollTop($(div).offset().top - 43);
              $("html, body").animate(
                { scrollTop: $(div).offset().top - 43 },
                500
              );
            }, 500);
          }
        }
      });
    });
  },
  beforeRouteUpdate(to, from, next) {
    console.log("beforeRouteUpdate");
    let id = to.params.id;
    let status = to.params.status;
    console.log(to);
    var that = this;
    interfaces.getdetailhouse(id).then(function(res) {
      to.meta[i18n.locale] = res.project_name;
      console.log(22222222);
      that.projectdetail = res;
      that.detailId = res.id;
      var div = that.$refs.tab1;
      if (from.name == "myOrder") {
        if (div) {
          setTimeout(function() {
            console.log($(div).offset().top);
            // $('html,body').scrollTop($(div).offset().top - 43);
            $("html, body").animate(
              { scrollTop: $(div).offset().top - 43 },
              500
            );
          }, 500);
        }
      }
      next();
    });
  },
  watch: {
    scroll: function(newVal, oldVal) {
      console.log('newVal,oldVal');
      console.log( newVal,oldVal );
      if (newVal > oldVal) {
        this.local = false;
      } else {
        this.local = true;
      }
    }
  },
  methods: {
    judgeHaveVR() {
      if (this.projectdetail.pic.VR.ar_pic) {
        this.toshowVR(1)
      }
    },
    // 获取当前语言
    getLan() {
      let lanBase = localStorage.getItem("lanBase");

      if (lanBase == 1) {
        this.lanBase = "EN";
      } else {
        this.lanBase = "中";
      }

      if (!lanBase) this.lanBase = "EN";
    },

    changeStyle(e) {
      this.lanBase = e;
    },

    // 项目故事
    storyImg(id) {
      interfaces.getbrandstory(id).then(res => {
        this.brandStory = res;
      });
    },
    toshowVR(length) {
      this.totalLength = length;
      this.hideVR = true;
      this.hideImg = false;
      this.hideVideo = false;
      console.log("我点击了VR");
    },
    toshowIMG(length) {
      this.totalLength = length;
      this.hideImg = true;
      this.hideVR = false;
      this.hideVideo = false;
      console.log("点击了图片");
    },
    toshowVideo(length) {
      this.totalLength = length;
      this.hideVideo = true;
      this.hideVR = false;
      this.hideImg = false;
      console.log("点击了视频");
    },
    toVRurl(url) {
      window.location.href = url;
    },
    showVideoplay() {
      this.video_url = true;
      // this.play()
    },
    tohideVideo() {
      this.video_url = !this.video_url;
    },

    //  加载品牌故事
    storyImg(id) {
      let projectlist = [];
      interfaces.getbrandstory(id).then(res => {
        if (res != null) {
          this.imgAll = res;
        } else {
          this.hideBannerTop = false;
        }
      });
    },
    goHome() {
      this.$router.go(-1);
    },
    toAppraise() {
      this.$router.push({ name: "appraise", params: { id: this.detailId } });
    },
    btn_pos: function(e) {
      this.setlocaltrue();
    },
    setlocaltrue: _.debounce(function() {
      this.local = true;
    }, 1000),
    showStory() {
      if (this.hideBannerTop) {
        this.showImgAll = true;
      }
    },
    toshowModels(id, name) {
      this.status = 1;
      this.idss = id;
      this.names = name;
      if (this.mobileLocal) {
        this.hideModel = false;
        this.$router.push({
          name: "orderForm",
          params: { mobile: this.mobileLocal, id: id, name: name }
        });
      } else {
        this.hideModel = true;
      }
    },
    toServe(id, name) {
      this.status = 2;
      this.idss = id;
      this.names = name;
      if (this.mobileLocal) {
        this.hideModel = false;
        this.$router.push({
          name: "myReserve",
          params: { mobile: this.mobileLocal, id: id, name: name }
        });
      } else {
        this.hideModel = true;
      }
    },
    toMap(e) {
      document.getElementById("maps").scrollIntoView();
    },
    toloadMore() {
      this.showHeight = !this.showHeight;
      if (this.showHeight == true) {
        this.hideIcon = false;
      } else {
        this.hideIcon = true;
      }
    },
    toloadMore2() {
      this.showMore = !this.showMore;
      if (this.showMore == true) {
        this.hideIcon = false;
      } else {
        this.hideIcon = true;
      }
    },
    toloadMoreJiao() {
      this.showLoadMore = !this.showLoadMore;
      if (this.showLoadMore == true) {
        this.hideIcon = false;
      } else {
        this.hideIcon = true;
      }
    },
    toDetailxq(id) {
      // this.showHeight=false
      //  this.getdetailhouses(id)
      this.$router.push({ name: "hotelDetail", params: { id: id } });
    },
    getdetailhouses(id) {
      interfaces.getdetailhouse(id).then(res => {
        this.projectdetail = res;
        this.detailId = res.id;
        if (this.projectdetail.house_type) {
          this.houseTypeLength = this.projectdetail.house_type[0].pic.length;
          //  console.log(this.projectdetail.house_type[0].pic.length)
        }
        // if (this.projectdetail.is_show_project_story) {
          if (this.projectdetail.is_show_project_story == 2) {
            this.showImgAll = true;
          } else {
            this.showImgAll = false;
          }
        // }
      });
    },
    onChange(index) {
      this.current = index;
    },
    onChanges(index) {
      this.currentBanner = index;
    },
    onchangeTab(index, title) {
      try {
        for (let i = 0; i < this.projectdetail.house_type.length; i++) {
          let temp = "detailSwiper" + i;
          this.$refs[temp][0].swipeTo(0);
        }
      } catch (e) {}
      this.houseTypeLength = this.projectdetail.house_type[index].pic.length;
      this.current = 0;
      // this.projectdetail.house_type.forEach((item,index)=>{
      //      if(item.typename==title){
      //        this.houseTypeLength=item.pic.length
      //      }
      //  })
    },
    handleScroll() {
      this.scroll = $(window).height() + $(document).scrollTop();
    },
    tohideModel() {
      this.hideModel = false;
    },
    tohideList() {
      this.showImgAll = false;
    }
  },
  mounted() {
    //  let id=this.$route.params.status
    // var hash = window.location.hash;
    // console.log(hash)
    // var index = hash.lastIndexOf("#");
    // if (index != -1) {
    //   var id = hash.substring(index + 1, hash.length + 1);
    //   console.log(id)
    //   var div = document.getElementById(id);
    //   console.log(div)
    //   if (div) {
    //     setTimeout(function () {
    //       console.log($(div).offset().top);
    //       // $('html,body').scrollTop($(div).offset().top - 43);
    //       $('html, body').animate({scrollTop: $(div).offset().top - 43}, 500)
    //     }, 500);
    //    }
    //   }
    window.addEventListener("scroll", this.handleScroll);
    window.addEventListener("scroll", this.btn_pos);
    this.$nextTick(() => {
      // let remPx = document.body.clientWidth / 10;
      // let height2 = parseFloat(window.getComputedStyle(this.$refs.desc).height);
      // let more1 = height2/remPx;
      // let height3 = window.getComputedStyle(this.$refs.jiaotong).height;
      // if (height3 > 80 + "px") {
      //   this.showJiao = true;
      // }
      // if (height2 > this.defaultheight2 + "px") {
      //   this.showMore01 = true;
      // }
    });
    $eventbus.$on("changeLang", res => {
      this.mobileLocal = JSON.parse(localStorage.getItem("userinfo")).mobile;
      let id = this.$route.params.id;
      this.getdetailhouses(id);
      this.storyImg(id);
      this.getLan();
    });
  },
  //第四步：当再次进入（前进或者后退）时，只触发activated（注：只有在keep-alive加载时调用）
  activated() {
    // if(this.scroll > 0){
    //     // window.scrollTo(0, this.scroll);
    //     window.addEventListener('scroll', this.handleScroll);
    //  }
  },
  //第五步：deactivated 页面退出时关闭事件 防止其他页面出现问题
  deactivated() {
    window.removeEventListener("scroll", this.handleScroll);
    window.removeEventListener("scroll", this.btn_pos);
  },
  components: {
    aheaders,
    afooter,
    projectImg,
    submitBtn,
    maps,
    showmorenew
  },
  watch:{
    projectdetail(newVal,oldVal) {
      this.judgeHaveVR()
    }
  }
};
</script>
<style lang="less" scoped>
.video-model {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.8);
  z-index: 9999;
}
.video-model video {
  width: 100%;
  height: auto;
  margin-top: 50%;
}
.VR-img {
  position: relative;
  width: 100%;
  height: 100%;
}
.VR-img .VR {
  position: absolute;
  top: 40%;
  left: 40%;
  width: 1.93rem;
  height: 2.08rem;
}
.swiper-title .activeTitle {
  color: #fff;
}
.swiper-title {
  width: auto;
  height: auto;
  margin: 0 auto;
  position: absolute;
  bottom: 0.2rem;
  left: 38%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.swiper-title span {
  width: 1.45rem;
  height: 0.58rem;
  line-height: 0.58rem;
  background: rgba(0, 0, 0, 0.5);
  text-align: center;
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.35rem;
  border-right: 1px solid rgba(255, 255, 255, 0.5);
}
.swiper-title span:last-child {
  border-right: none;
}

.desc .desc02 {
  height: 2.4rem;
  overflow: hidden;
}
.desc .brandStory {
  height: auto;
  overflow: visible;
  transition: 0.4s ease;
}
.hotel-detail {
  width: 100%;
  margin: 0 auto;
  min-height: 100%;
  padding-bottom: 5.96rem;
  box-sizing: border-box;
  position: relative;
}
.banner-img {
  width: 100%;
  height: 7.71rem;
  position: relative;
  // padding-top: 0.2rem;
}
.banner-img img {
  width: 100%;
  height: 7.71rem;
}
.banner-img .banner_top {
  width: 2.56rem;
  height: 0.56rem;
  background: rgba(57, 58, 59);
  color: #fff;
  position: absolute;
  top: 0rem;
  left: 50%;
  transform: translate(-50%, 0);
  z-index: 99;
  z-index: 999;
  border-bottom-left-radius: 0.1rem;
  border-bottom-right-radius: 0.1rem;
}
.banner-img .banner_top .down {
  width: 0.2rem;
  height: 0.2rem;
  display: flex;
  align-items: center;
  flex-direction: column;
}
.banner-img .banner_top .down span {
  width: 0;
  height: 0;
  border-right: 4px solid transparent;
  border-left: 4px solid transparent;
  border-top: 4px solid #fff;
}
.banner-img .banner_top .down img {
  width: 0.2rem;
  height: 0.2rem;
  margin-left: 0.1rem;
}
.banner-img .banner_top em {
  font-size: 0.28rem;
}
.banner-img .banner_top {
  display: flex;
  align-items: center;
  justify-content: center;
}
.Project-imgs .van-popup {
  border-radius: none !important;
}
.van-swipe .custom-indicator {
  position: absolute;
  right: 5px;
  bottom: 5px;
  padding: 2px 5px;
  color: #fff;
  font-size: 12px;
  background: rgba(0, 0, 0, 0.1);
}
.hotel-some .swiper-slide {
  width: 47%;
}
.main-content {
  width: 100%;
  height: auto;
  background-color: #3c5896;
  color: #fff;
  overflow: hidden;
}
.main-content h3 {
  color: #fff;
  width: 9.5rem;
  margin: 0.51rem auto 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: bold;
}
.main-content h3 span {
  color: #fff;
  font-size: 0.36rem;
  text-align: right;
}
.main-content h3 em {
  color: #fff;
  font-size: 0.6rem;
  text-align: left;
}
.main-icon {
  width: 9.5rem;
  display: flex;
  align-items: center;
  margin: 0.44rem auto 0;
  flex-wrap: wrap;
}
.main-icon span {
  font-size: 0.3rem;
  border: 1px solid #fff;
  padding: 0 0.25rem;
  height: 0.56rem;
  line-height: 0.56rem;
  margin: 0.2rem 0.2rem 0 0;
  border-radius: 0.1rem;
}
.main-loaction {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 9.5rem;
  margin: 0.55rem auto;
}
.main-loaction i {
  font-size: 0.36rem;
}
.main-loaction span {
  font-size: 0.36rem;
  margin-left: 0.2rem;
  max-height: 1rem;
  line-height: 0.5rem;
  overflow: hidden;
}
.location {
  width: auto;
  height: auto;
  display: flex;
  align-items: center;
}
.desc {
  width: auto;
  height: auto;
  padding: 0 0.66rem;
}
.desc h3 {
  margin-top: 0.85rem;
  margin-bottom: 0.4rem;
  font-size: 0.42rem;
  color: #060606;
  font-weight: bold;
}
.desc p {
  font-size: 0.34rem;
  color: #000;
  line-height: 0.6rem;
  color: #0d0d0d;
  // margin-top: 0.44rem;
}
.desc ul {
  width: auto;
  height: 4.4rem;
  overflow: hidden;
  margin: 0 0 0.6rem;
  transition: all 0.4s ease;
}
.desc .activeLi {
  width: auto;
  height: auto;
}
.desc .activeLi2 {
  width: auto;
  height: auto;
}
.desc ul li {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 25%;
  float: left;
  margin-top: 0.8rem;
  height: 1.4rem;
}
.desc ul.ul2 li {
  color: red;
  display: flex;
  align-items: center;
  justify-content: end;
  flex-direction: row;
  width: 50%;
  float: left;
  margin-top: 0.8rem;
  height: 1.4rem;
}
.desc ul li img {
  width: 1.3rem;
  height: 1rem;
}
.desc ul li span {
  font-size: 0.32rem;
  color: #000;
  white-space: nowrap;
}
.types {
  width: 100%;
  height: auto;
}
.types .van-tabs--line .van-tabs__wrap {
  height: 44px;
  border-bottom: 1px solid #d9d9d9;
  margin: 0 0.75rem;
}
.types .types-nav {
  width: 100%;
  height: auto;
  background-color: #fff;
  padding-top: 1rem;
}
.types .types-nav h3 {
  font-size: 0.42rem;
  color: #060606;
  margin-left: 0.6rem;
  font-weight: bold;
  margin-bottom: 0.3rem;
}
.types .van-tabs__nav {
  background-color: #fff;
}
.types .van-tabs .van-tab {
  flex: none;
  width: 20%;
}
.types .van-tabs__content {
  margin-top: 0.3rem;
}
.types .van-tabs .van-tab--active span {
  font-size: 0.38rem;
}
.types .hotel-msg {
  height: 6.2rem;
  width: 100%;
}
.types-mianji .yiju {
  font-size: 0.34rem;
  color: #161616;
  width: 90%;
  margin: 0.5rem auto;
}
.yiju-img {
  width: 100%;
  height: auto;
  overflow: hidden;
  margin-bottom: 0.6rem;
}
.yiju-img img {
  width: 100%;
  height: 6.1rem;
}
.index-more {
  width: auto;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0.85rem 0;
}
.map {
  width: 100%;
  height: auto;
  padding-bottom: 0.9rem;
  border-bottom: 1px solid #e5e5e5;
}
.map .map01 {
  width: 100%;
  height: auto;
  margin: 0rem auto 0;
}
.map .map01 h3 {
  font-size: 0.42rem;
  color: #161616;
  font-weight: bold;
  margin: 0.5rem 0.67rem 0.65rem;
}
/* .map .map01 img{width:100%;height:auto;margin:0rem 0 0.85rem;} */
.map .map01 .map_mains {
  height: 2.5rem;
  overflow: hidden;
}
.map .map01 p {
  font-size: 0.34rem;
  color: #000;
  line-height: 0.62rem;
  margin: 0 0.67rem;
}
.map .map01 p b {
  font-weight: bold;
  font-size: 0.36rem;
  margin-right: 0.2rem;
}
.hot-hotel {
  width: 100%;
  height: auto;
  padding-bottom: 0.3rem;
}
.hot-hotel h3 {
  font-size: 0.42rem;
  color: #060606;
  margin: 0.75rem 0 0.36rem 0.67rem;
  font-weight: bold;
}
.hot-hotel .hotel-some {
  width: auto;
  height: auto;
  padding-left: 0.3rem;
}
.hot-hotel .hotel-some .hotel-item {
  width: 4.63rem;
  height: auto;
}
.hot-hotel .hotel-some .hotel-item img {
  width: 4.63rem;
  height: 3.31rem;
  overflow: hidden;
}
.hot-hotel .hotel-some .hotel-item .hotel-title {
  // padding-left: 0.2rem;
  font-size: 0.36rem;
  color: #212121;
  line-height: 0.54rem;
  overflow: hidden;
  font-weight: bold;
}
.hot-hotel .hotel-some .hotel-item p {
  // padding-left: 0.2rem;
  font-size: 0.32rem;
  color: #212121;
  line-height: 0.42rem;
  height: 0.42rem;
  overflow: hidden;
}
.van-swipe-item {
  float: left;
}
.bottom-nav {
  width: 100%;
  height: 1.44rem;
  display: flex;
  align-items: center;
  justify-content: space-around;
  position: fixed;
  bottom: -1px;
  left: 0;
  background-color: #fff;
  z-index: 100;
}
.bottom-nav i {
  font-size: 0.6rem;
}
.bottom-nav button {
  width: 3.9rem;
  height: 0.98rem;
  line-height: 0.98rem;
  color: #fff;
  font-size: 0.38rem;
  border: 1px solid #5975a9;
  background-color: #fff;
  color: #5975a9;
  padding: 0;
  border-radius: 5px;
}
.bottom-nav .s1 {
  background-color: #5975a9;
  color: #fff;
}
.bottom-phone {
  display: flex;
  align-items: center;
}
.hotel-detail .scrolltop {
  bottom: 10%;
}
.bottom-nav button a {
  color: #5975a9;
}
.bottom-nav .s1 a {
  color: #fff;
}
@keyframes bounce-down {
  25% {
    transform: translateY(-3px);
  }
  50% {
    transform: translateY(0);
  }
  75% {
    transform: translateY(3px);
  }
  100% {
    transform: translateY(0);
  }
}
.down img {
  -webkit-animation: bounce-down 1s linear infinite;
  animation: bounce-down 1s linear infinite;
}
.bottomMessage {
  width: 100%;
  padding: 0 0.6rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.8);
  height: 1.2rem;
  position: fixed;
  bottom: 1.4rem;
  left: 0;
  z-index: 100;
}
.bottomMessage .leftMessage {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.bottomMessage .leftMessage p {
  font-size: 0.37rem;
  color: #fff;
  margin-left: 0.15rem;
}
.bottomMessage .leftMessage .sai1 {
  width: 0.32rem;
  height: 0.32rem;
}
.bottomMessage .sai2 {
  width: 0.16rem;
  height: 0.27rem;
}
.brandimg2 {
  transform: rotate(180deg);
}
.map .map01 .jiaoActive {
  height: auto;
  overflow: visible;
  transition: 0.4s ease;
}
.bottom-nav .otherClass {
  width: 7rem;
}
</style>