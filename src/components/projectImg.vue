<template>

 <van-popup v-model="showImgAll" position="top" :overlay="true">
   <div class="projectImg">
     <van-swipe :loop="false" :style='getheights' :show-indicators='true'>
       <!-- <swipe :options="swiperOption"></swipe> -->
     <!-- <swiper :style='getheights' :options="swiperOption"> -->
        <van-swipe-item v-for='(item,index) in imgAll' :key='index'>
            <div class="pro-item">
                <div class="pro-items">
                      <img v-if='item.fileurl' :src="item.fileurl" alt="" class='big-img' style='width:100%;height:100%;position:absolute;top:0;left:0;z-index:-1' >
                      <img v-if='item.video_pic' :src="item.video_pic" alt="" class='big-img' style='width:100%;height:100%;position:absolute;top:0;left:0;z-index:-1' >
                    <div class="project-img">
                      <!-- 视频添加 -->
                       <video v-if='item.video_url'  src="item.video_url" width=100%></video>  
                      <div class="pro-img"><img src="../assets/images/project-logo.png" alt=""></div>
                        <div class="main-other">
                          <div class="pro-main">
                              <span v-if='item.type==1'>改造以前</span>     
                              <span v-if='item.type==2'>改造以后</span>
                          </div> 
                          <div class="pro_font" v-if='item.type==1'> Before</div> 
                          <div class="pro_font" v-if='item.type==2'> After</div> 
                      </div>
                          <p v-if='item.project_name'>
                            {{item.project_name}}  
                          </p>
                           <p v-if='item.video_desc' >
                            {{item.video_desc}}  
                          </p>
                    </div>
                </div>
            </div>
        </van-swipe-item>
   </van-swipe>

      <div class="icon-img" @click="tohideLists()">
        <!-- <van-icon name="arrow-down" /> -->
        <img src="../assets/images/toTops.png" alt="" class='topImgs'>
      </div>
   </div>
 </van-popup>

</template>

<script>
import interfaces from "@/utils/api.js";
import Vue from 'vue';
import { Swipe, SwipeItem } from 'vant';
import { Popup } from 'vant';
Vue.use(Popup);
Vue.use(Swipe).use(SwipeItem);

export default {
    name:'projectImg',
    props:{
      showImgAll:Boolean,
      idss:String
    },
    data(){
       return{
         imgAll:[],
         getheights:{
           height:''
          },
      //    swiperOption: {
      //   slidesPerView: "auto",
      //   spaceBetween: 10,
      //   pagination: {
      //     el: ".swiper-pagination",
      //     clickable: true
      //   }
      // },
       } 
    },
    methods:{
       getheight(){
         this.getheights.height=window.innerHeight+'px';
        },
         storyImg(id){
          let projectlist=[]
          interfaces.getbrandstory(id).then((res)=>{
          this.imgAll=res
          })
         },
       tohideLists(){
         this.$emit('tohideList')
        }
     },

     mounted(){
          　this.getheight()
            this.storyImg(this.idss)
         }
      }
</script>

<style scoped>

.projectImg{width:100%;height:auto;position:relative;}
.pro-item{width:100%;height:100%;position:fixed;top:0;left:0;z-index:999;}
.pro-item .pro-items{width:100%;height:100%;
/* background: url('../assets/images/project-after.jpg')no-repeat 100% 100%;background-size: 100% 100%; */
}
.big-img{width:100%;height:100%;position:fixed;top:0;left:0;z-index:9999;}
.pro-item .pro-items .project-img{width:100%;height:8rem;background-image:linear-gradient(to top,rgba(0,0,0,0.5), rgba(0,0,0,0)); position:absolute;bottom:0;left:0;}
.pro-item .pro-items .project-img .pro-img{width:3.35rem;height:0.99rem;margin:0 0.73rem;}
.pro-item .pro-items .project-img .pro-img img{width:100%;height:auto;}
.pro-item .pro-items .project-img .pro-main{background-color:#3c5896;text-align: right;font-size:0.37rem;width:4.2rem;height:1.1rem;line-height:1.1rem;margin-top:0.27rem;float:left;margin-right:0.28rem;padding-right:0.3rem;}
.pro-item .pro-items .project-img .pro-main span{font-size:0.36rem;color: #fff; }
/* .pro_font{font-size:0.95rem;color:#fff;float:left;} */
.pro_font{font-size:0.85rem;line-height:1.1rem;color:#fff;height:1.1rem;margin-top:0.27rem;}
.pro-item .pro-items .project-img p{font-size:0.35rem;line-height:0.54rem;color:#fff;margin:0.57rem 0.73rem 0;text-indent: 0.6rem;}
.main-other{display:flex;align-items: center;justify-content: flex-start;}

.icon-img{width:1.6rem;height:0.8rem;line-height: 0.8rem;background:rgba(0,0,0,0.5);position:absolute;bottom:0;left:43%;text-align: center;}
.projectImg .icon-img>.topImgs{width:0.48rem;height:0.29rem;margin-bottom:0.2rem;}

   @keyframes bounce-down {
    25% {transform: translateY(-3px);}
     50%{transform: translateY(0);}
     75% {transform: translateY(3px);}
     100% {transform: translateY(0);}
    }

   .topImgs{ -webkit-animation: bounce-down 1s linear infinite;animation: bounce-down 1s linear infinite;
    }

</style>