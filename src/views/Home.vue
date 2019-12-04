<template>
  <div class="home">
    <van-swipe :autoplay="3000" indicator-color="white" class="swiperImg">
      <van-swipe-item v-for='(item,index) in bannerImg' :key='index'>
         <img :src="item.thumb" alt />
      </van-swipe-item>
    </van-swipe>

    <div class="header" :class="{showbgs:showbg}" :style="nav">
      <div class="logo">
        <img src="@/assets/images/logo.png" alt />
      </div>
      <div class="nav-lan">
        <span @click="changeLangEvent">{{lang ==='zh-CN'?'EN':'ZH'}}</span> 
        <!-- <input type="text" v-model="lang" value="lang" style='display:none'>  -->
        <!-- <select id="sex" v-model="lang" @change="changeLangEvent">
          <option value="zh-CN">中文</option>
          <option value="en-US">英文</option>
        </select> -->
        <div class="nav-menu">
          <router-link :to="{path:'/order'}">
            <img src="@/assets/images/right-menu.png" alt />
          </router-link>
        </div>
      </div>
    </div>

    <div class="brand-story">
      <h3>{{story.catname}}</h3>
       <div class="brand-all" ref='heightShow' :class='{brandStory:showMore}'>
            <!-- <p v-html='story.description'> 
               {{story.description}}
         </p> -->
          <p v-for="(item,index) in story2" :key='index'>{{item}}</p>
           <div class="story-img"><img :src="story.image" alt=""></div>
         </div>

     <div class="index-more"  @click='toloadMore' style='margin:0 auto;'>
       <div class="mas" v-show='toshows'><span>more</span><img src="../assets/images/more-icon.jpg" alt /></div> 
       <div class="mas"  v-show='toshows2' :class='{brandimg2:showMore}'><img src="../assets/images/more-icon.jpg" alt /> </div>
     </div>
     <!-- <div class='index-more' ></div> -->

     
      
      <!-- <div class="active-img">
        <img src="../assets/images/index_03.jpg" alt />
      </div> -->
    </div>

    <div class="yuyue">
       
      <swiper :options="swiperOption">
        <swiper-slide v-for='(item,index) in project_list' :key='index'>
          <div class="yu-item">
            <div class="yu-img">
              <router-link :to="{name:'hotelDetail', params:{id:item.id,name:item.project_name}}">
                <img :src="item.pic" alt />
                <div class="yu-title">{{item.address}}</div>
              </router-link>
            </div>
            <div class="yu-name">
              <i>{{item.project_name}}</i>
              <!-- <router-link :to="{path:'/orderForm'}"> -->
                <van-button type="info" @click='toOrderForm(item.id,item.project_name)'>预约看房</van-button>
              <!-- </router-link> -->
            </div>
          </div>
        </swiper-slide>

        <!-- <swiper-slide>
          <div class="yu-item">
            <div class="yu-img">
              <router-link :to="{path:'/hotelDetail'}">
                <img src="../assets/images/index_01.jpg" alt />
                <div class="yu-title">上海市浦东区龙东大道3000号</div>
              </router-link>
            </div>
            <div class="yu-name">
              <i>张江</i>
              <router-link :to="{path:'/orderForm'}">
                <van-button type="info">预约看房</van-button>
              </router-link>
            </div>
          </div>
        </swiper-slide>
        <swiper-slide>
          <div class="yu-item">
            <div class="yu-img">
              <router-link :to="{path:'/hotelDetail'}">
                <img src="../assets/images/index_01.jpg" alt />
                <div class="yu-title">上海市浦东区龙东大道3000号</div>
              </router-link>
            </div>
            <div class="yu-name">
              <i>张江</i>
              <router-link :to="{path:'/orderForm'}">
                <van-button type="info">预约看房</van-button>
              </router-link>
            </div>
          </div>
        </swiper-slide>
        <swiper-slide>
          <div class="yu-item">
            <div class="yu-img">
              <router-link :to="{path:'/hotelDetail'}">
                <img src="../assets/images/index_01.jpg" alt />
                <div class="yu-title">上海市浦东区龙东大道3000号</div>
              </router-link>
            </div>
            <div class="yu-name">
              <i>张江</i>
              <router-link :to="{path:'/orderForm'}">
                <van-button type="info">预约看房</van-button>
              </router-link>
            </div>
          </div>
        </swiper-slide> -->

        <!-- <div class="swiper-pagination" slot="pagination"></div> -->
      </swiper>
    </div>

    <div class="news">
      <van-tabs v-model="active" line-width='7%' :border='false'>
        <van-tab :title="$t('m.news')">
          <ul>
            <li v-for='(item,index) in news_list' :key='index'>
              <router-link :to="{name:'newsdetail', params:{id:item.id}}" >
              <div class="news-date">
                <h3 style="font-size:0.38rem;font-weight:bold;" v-if='index==0'>{{item.title}}</h3>
                <h3 v-else>{{item.title}}</h3>
                <span style="font-size:0.4rem;font-weight:bold;" v-if='index==0'>{{item.inputtime}}</span>
                 <span v-else>{{item.inputtime}}</span>
              </div>
              <div class="news-img" v-if="index==0&&item.thumb!=''">
                <img :src="item.thumb" alt />
              </div>
              </router-link>
            </li>
 
          </ul>
          <div class="news-more">
            <router-link :to="{path:'/news'}">
              <span style='color: #a5a5a5;'>more</span>
              <img src="../assets/images/right.png" alt />
            </router-link>
          </div>
        </van-tab>
        <van-tab :title="$t('m.activity')">
          <ul>
               <li v-for='(item,index) in activity_list' :key='index'>
                 <router-link :to="{name:'activitydetail', params:{id:item.id}}">
              <div class="news-date">
                <h3 style="font-size:0.38rem;font-weight:bold;" v-if='index==0'>{{item.title}}</h3>
                <h3 v-else>{{item.title}}</h3>
                <span style="font-size:0.4rem;font-weight:bold;" v-if='index==0'>{{item.inputtime}}</span>
                 <span v-else>{{item.inputtime}}</span>
              </div>
              <div class="news-img" v-if="index==0&&item.thumb!=''">
                <img :src="item.thumb" alt />
              </div>
              </router-link>
            </li>
           
          </ul>
             <div class="news-more">
            <router-link :to="{path:'/activity'}">
              <span style='color: #a5a5a5;'>more</span>
              <img src="../assets/images/right.png" alt />
            </router-link>
          </div>
        </van-tab>
      </van-tabs>
    </div>

  <div class="map">
            <div class="alltag" @click="toopencity">
            <span>{{openName}}</span>
          <div class="alltags" v-show='opens1'>
            <!-- <span>fhfhh</span> -->
              <span v-for='(item,index) in allcityName' :key='index' @click='tochangecity(item)'>{{item.name}}</span>
          </div>
          <img src="../assets/images/bottom.jpg" alt />
        </div>
       <maps></maps>
      <!-- <iframe src="static/index.html" frameborder="0" scrolling="auto"></iframe> -->
    </div> 
    <footers></footers>
     <submitBtn v-if='hideModel' :name='names' :id='idss' @tohideModel='tohideModel' :status='status'></submitBtn>
  </div>
</template>


<script>
import Vue from "vue";
import interfaces from "../utils/api.js";
// import aheaders from "@/components/Header";
import footers from "@/components/Footer";
import store from "../store";
import maps from "@/components/map";
import submitBtn from "@/components/submitBtn";

import { Swipe, SwipeItem, Tab, Tabs } from "vant";

Vue.use(Swipe).use(SwipeItem);
Vue.use(Tab).use(Tabs);

export default {
  name: "home",
  data() {
    return {
      bannerImg: [],
      story:{},
      news_list:[],
      project_list:[],
      activity_list:[],
      storyHeight:105,
      toshows:false,
      toshows2:false,
      showMore: false,
      active: 0,
      showImgs: false,
      scroll: 0,
      showbg: false,
      swiperOption: {
        slidesPerView: "auto",
        spaceBetween: 10,
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        }
      },
       lang: store.state.lang,
       
         hideModel:false,
         mobileLocal:'',
         story2:[],
         idss:'',
         names:'',

         name:'',
         sms:'',
         allcityName:'',
         couponSelected:'',
        // 地图
        opens1:false,
        openName:'上海',
        alllongitude:[],
        allcityName:[],
        Longid:'',
        LongName:'',
        status:''
      }
   },

  computed:{
    nav(){
       if(this.iswx) return '';
       return "width:660px;transform: translate3d(-50%, -4px, 10px);position:absolute;left:50%;margin:0;"
      }
   },

  methods: {
    // getHomedata(){
    //     interfaces.getData().then((res)=>{
    //        console.log(res.data.project_list)
    //       this.bannerImg=res.data.banner
    //       this.story=res.data.story
    //       this.news_list=res.data.news_list
    //       this.activity_list=res.data.activity_list
    //       this.project_list=res.data.project_list
           
    //        let story=res.data.story.description
    //        this.story2=story.split('。') 
    //       console.log(res.data)
    //     })
    // },
    handleScroll() {
      this.scroll = $(window).height() + $(document).scrollTop();
    },

    handleScrolls() {
      let scrolltop =
        document.documentElement.scrollTop || document.body.scrollTop;
      scrolltop > 55 ? (this.showbg = true) : (this.showbg = false);
    },
    changeLangEvent() {
      // console.log("改变语言");
      // const totalLan='';
       if(this.lang=='zh-CN'){
         this.lang='en-US'
       }else{
        this.lang='zh-CN'
        // totalLan=1
       }
      this.$i18n.locale = this.lang; //关键语句

      this.$store.commit("changeLang", this.lang);
       $eventbus.$emit("changeLang", this.lang);
       localStorage.setItem('lanBase', this.lang=='zh-CN'?1:4)
    },
     toloadMore(){
       this.showMore=!this.showMore
       if(this.showMore==true){
        this.toshows=false
        this.toshows2=true
       }else{
           this.toshows=true
           this.toshows2=false
       }
     },
    
    tohideModel(){
     this.hideModel=false
     },
     toOrderForm(id,name){
       this.idss=id
       this.names=name
       this.status=1
      if(this.mobileLocal){
        //  console.log(this.mobileLocal)
        this.$router.push({name:'orderForm',params:{id:id,name:name,mobile:this.mobileLocal}})
      }else{
         this.hideModel=true
      }
     },
     getCouponSelected(){
       console.log(this.couponSelected)
     },
      // 地图
      toopencity(){
     this.opens1=!this.opens1
    },
    tochangecity(item){
      //  this.opens1=!this.opens1
      this.openName=item.name
      this.Longid=item.linkageid
      this.LongName=item.name
      this.getallother(item.linkageid)
    },
    getallother(id){
     interfaces.getCode(id).then((res)=>{
        this.alllongitude=res
        //  this.$store.dispatch("setLocation", res);
        })
     },

     getAllmap(){
       interfaces.getAllcity().then((res)=>{
         this.allcityName=res
       })
     },

  },
  beforeRouteEnter (to, from, next) {
    interfaces.getData().then(function (res) {
      next(vm=>
         {
          console.log(res.data.project_list)
          vm.bannerImg=res.data.banner
          vm.story=res.data.story
          vm.news_list=res.data.news_list
          vm.activity_list=res.data.activity_list
          vm.project_list=res.data.project_list

           let story=res.data.story.description
           vm.story2=story.split('。') 
          console.log(res.data)
        })
    })
  },
  created() {
    //  this.getHomedata()
       this.getallother(3362) 
       this.getAllmap()
     this.mobileLocal=localStorage.getItem('mobile') 
    //  this.couponSelected = this.allcityName[0].name;
  }, 
  mounted: function() {
    window.addEventListener("scroll", this.handleScroll);
    window.addEventListener("scroll", this.handleScrolls, true);
    $eventbus.$on("changeLang", (res)=>{
        this.getHomedata()
    });

    // let height= window.getComputedStyle(this.$refs.heightShow).height
    let height= window.getComputedStyle(this.$refs.heightShow).height
      //  console.log(height,'px')
      if(height>this.storyHeight+'px'){
        this.toshows=true;
       } 
  },
  //第四步：当再次进入（前进或者后退）时，只触发activated（注：只有在keep-alive加载时调用）
  activated() {
    if (this.scroll > 0) {
      // window.scrollTo(0, this.scroll);
      window.addEventListener("scroll", this.handleScroll);
    }
  },
  //第五步：deactivated 页面退出时关闭事件 防止其他页面出现问题
  deactivated() {
    window.removeEventListener("scroll", this.handleScroll);
  },

  components: {
    // aheaders,
    footers,
    maps,
    submitBtn
  }
};
</script>

<style scoped>
/* .map h3 select{width:2rem;height:1rem;overflow: hidden;background-color: #fff;border:transparent;}
.map h3 select option{width:2rem;height:1rem;overflow: hidden;padding:0;height:1rem;min-height:1rem;} */

.brandimg2{
  transform:rotate(180deg)
}
.header {
  width: 9.55rem;
  height: auto;
  display: flex;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  justify-content: space-between;
  margin: 0 0 0 0.55rem;
}
.header .logo {
  width: 1.54rem;
  height: 1.09rem;
  margin-top: 10px;
}
.header .nav-lan {
  width: 2.37rem;
  height: 0.59rem;
}

.nav-lan {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.nav-lan span {
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

.swiper-slide {
  width: 90%;
}
.home {
  width: 100%;
  height: auto;
}
.home img {
  width: 100%;
  height: auto;
}
.van-sidebar {
  position: fixed;
  top: 0;
  left: 0;
}
.swiperImg img {
  width: 100%;
  height: 12rem;
}

.brand-story {
  width: 80%;
  height: auto;
  text-align: center;
  margin: 0 auto;
}
.brand-all{width:100%;height:2.6rem;overflow: hidden;}

.brand-story h3 {
  font-size: 0.6rem;
  color: #060606;
  margin: 1.5rem 0 0.86rem;
  font-weight: bold;
}
.brand-story p {
  font-size: 0.34rem;
  color: #060606;
  line-height: 0.68rem;
  /* height: 2.52rem; */
  /* max-height:2.52rem; */
  min-height:0.68rem;
  overflow: hidden;
}

.brand-story .brandStory{
  height:auto;
  overflow: visible;
}

/* .brand-story .more{text-align: center;color:#a5a5a5;font-size:14px;padding-right:5px;background: url('../assets/images/more-icon.jpg')no-repeat 59% 50%;background-size: 10px 10px;} */
.index-more {
  width: auto;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
}
.index-more span {
  font-size: 0.4rem;
  margin-right: 0.1rem;
  color: #a5a5a5;
}
.index-more .mas img {
  /* width: 0.12rem;
  height: 0.15rem; */
    width: 0.18rem;
  height: 0.18rem;
  margin-top:0.1rem;
}
.active-img {
  text-align: center;
  margin-top: 1.16rem;
}

.yuyue {
  margin-top: 1.5rem;
}
.yuyue .van-swipe {
  padding-bottom: 20px;
}
.yu-item {
    width: 9.57rem;
    height: auto;
  margin: 0 auto;
  padding-bottom: 0.2rem;
}
.yu-img {
     width: 9.57rem;
    height: auto;
  position: relative;
}
.yu-img img {
   width: 9.57rem;
    height: 6.83rem;
    display: block;
}
.yu-title {
  width: auto;
  height: auto;
  position: absolute;
  bottom: 13px;
  left: 0px;
  font-size: 0.34rem;
  color: #fff;
  padding: 0 0.6rem;
}
.yu-name {
  padding: 0.45rem 0.6rem 0.34rem;
  color: #000;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  box-shadow: 0px 2px 3px 3px #ededed;
}
.yu-name span {
  font-size: 0.38rem;
  color: #fff;
}
.yu-name i {
  font-size: 0.48rem;
  color: #000;
  font-weight: bold;
}
.yu-name a {
  display: inherit;
}
.yu-name button {
  background-color: #5975a9;
  border-radius: 4px;
  color: #fff;
  /* height: 35px; */
  /* line-height: 35px; */
  font-size: 14px;
  /* padding: 0 15px; */
  border: none;
  width: 2.96rem;
  height: 0.98rem;
  line-height: 0.98rem;
}

/* .news-more{width:auto;font-size:0.3rem;color:#a5a5a5;position:absolute;right:8px;top:17px;background: url('../assets/images/right.png')no-repeat 80% 50%;padding-right:0.6rem;background-size:13% 73%;} */
.news-more {
  display: flex;
  align-items: center;
  position: absolute;
  right: 8px;
  top: 17px;
}
.news-more a {
  color: #a5a5a5;
  font-size: 0.34rem;
}
.news-more a span {
  font-size: 0.4rem;
}
.news-more img {
  width: 0.18rem;
  height: 0.25rem;
  margin-left: 0.1rem;
}

.news ul {
  width: 100%;
  height: auto;
  margin-top: 0.4rem;
}
.news ul li .news-date {
  display: flex;
  align-items: center;
  justify-content: space-between;
  line-height: 1rem;
  height: 1rem;
  overflow: hidden;
}
.news ul li .news-date h3 {
  font-size: 0.34em;
  color: #000;
  line-height: 1rem;
  height: 1rem;
  overflow: hidden;
}
.news ul li .news-date span {
  font-size: 0.34rem;
  color: #000;
}

.news-img {
  /* margin: 0.4rem 0; */
  margin:0.2rem 0;
}
.van-tabs .van-tab {
  flex: none;
  width: 20%;
  margin-right: 0.5rem;
}
.van-tabs .van-tab {
  flex: none;
  width: 20%;
}
.van-tabs .van-tab span {
  font-size: 0.5rem;
}
.news {
  padding-top: 1.48rem;
  position: relative;
  width: 90%;
  margin: 0 auto;
  border-bottom: 1px solid #d9d9d9;
  padding-bottom: 0.33rem;
}
.van-tabs .van-tabs__line {
  position: absolute;
  bottom: 15px;
  left: 0;
  z-index: 1;
  height: 3px;
  background-color: #3c5896;
  border-radius: 3px;
}
.news .van-tabs--line .van-tabs__wrap {
  height: 44px;
  border-bottom: 1px solid #ddd;
}
.van-tabs .van-tab span {
  font-size: 17px;
  color: #bfbfbf;
}

.van-tabs .van-tab--active {
  color: #000;
  font-weight: 500;
}
.van-tabs .van-tab--active span {
  color: #000;
}

.scrolltop {
  width: 0.99rem;
  height: 0.96rem;
  position: fixed;
  bottom: 5%;
  right: 3%;
}
.scrolltop img {
  width: 100%;
  height: auto;
}

.showbgs {
  width: 10.8rem;
  height: auto;
  position: fixed;
  background: rgba(255, 255, 255, 0.8);
  /* padding: 0 10%; */
  padding: 0 0.5rem;
  box-sizing: border-box;
  margin: 0;
  z-index: 99;
}

.map {
  width: auto;
  height: auto;
  padding-top: 1.51rem;
  padding-bottom: 0 !important;
}
.map .alltag {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  /* padding: 0 0.6rem; */
  margin-bottom: 0.38rem;
  position: relative;
  width: 2rem;
  margin-left: 0.6rem;
}
.map .alltag>span {
  font-size: 0.38rem;
  color: #0e0e0e;
  font-weight: bold;
  margin-right: 0.1rem;
  width:auto;
  min-width:0.5rem
}
.map .alltag img {
  width: 0.27rem;
  height: 0.16rem;
}
.map img {
  width: 100%;
  height: auto;
  display: block;
}
.alltags{
  position: absolute;;
  top:24px;
  left:-11px;
  width:100%;
  height:auto;
  z-index:99;
  background-color: #fff;
}
.alltags>span{width:auto;height:auto;padding:10px;  font-size: 0.38rem;
  color: #0e0e0e;display: block;}

@media screen and (min-width: 640px) {
  body{width:100%;height:100%;background-color:#000 !important;}
  .swiper-slide{
    width: 65%;
   }
}


</style>>


