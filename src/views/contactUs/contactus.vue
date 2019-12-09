<template>
  <div class="contact" :style='getHeight'>
 <!-- <img src='../../assets/images/contact.png'/> -->
<!-- 关于我们 联系我们 -->
    <aheaders status='2'></aheaders>
     <div class="about">
      <img src="../../assets/images/about-banner.jpg" alt="" style='width:100%;height:6.08rem'>
        
        <van-tabs @click="onClick" line-width='7%' :border='false'  v-model="active">
        <van-tab :title="$t('m.home5')">
           <div class="contact">
             
              <div class="foot_01s">
                 <h3 style='font-weight:bold;'>{{contact.title}}</h3>  
                  <!-- <p v-html='contact.content' style='font-size:0.35rem;line-height:0.75rem;'>{{contact.content}}</p> -->
            <ul>
                <li class='s11' @click='toCallPhone'><van-icon name="phone-o" />{{contact.tel}}
                <!-- <em style='font-size:0.28rem;color:#000;'>(8:00-22:00)</em> -->
                </li>
                <li class='s12'><van-icon name="location-o"/>{{contact.address}}</li>
                <li class='s13'><van-icon name="envelop-o"/>{{contact.keywords}} <em style='color:#bfbfbf;font-size:0.28rem;padding-left:0.1rem;'  @click="copy" class='getcopy' :data-clipboard-text="contact.keywords">{{$t('m.feedback14')}}</em></li>
            </ul>
          </div>
           </div>

        </van-tab>
        <van-tab :title="$t('m.home4')">
                     
         <div class="about-01" ref='brandHeight' v-for='(item,index) in about' :key='index'  :class='{moreHeight:showMore}'>
            <div class="brand-01" :height='listheight'>
               <h2 style='font-weight:bold;'>{{item.title}}</h2>
               <p v-html='item.content'>{{item.content}}</p>
            </div>
           <div class="index-more" v-show='showMoress' @click='moreLoad' ><span>more</span> <img src="../../assets/images/more-icon.jpg" alt=""></div>
         </div>
         
        
        </van-tab>
      </van-tabs>
       <afooters></afooters>
     </div>
  </div>


</template>

<script>
import Clipboard from "clipboard"; //复制版
import Vue from 'vue';
import { Tab, Tabs,Icon } from 'vant';

Vue.use(Tab).use(Tabs).use(Icon);;
import interfaces from "@/utils/api.js";
import aheaders from "@/components/Header";
import afooters from "@/components/Footer";
export default {
  name: 'contact',
   data(){
      return{
        scroll:0,
        contact:{},
        about:[],
        ms2:'',
        ms5:'',
        heightOther:190,
        showMore:false,
        heightImg:'',
        heightOther2:200,
        showMoress:false,
        active:0,
        listheight:'',
        getHeight:{
          minHeight:''
        }
      }
   },
    components:{
    aheaders,
    afooters,
  },
     computed:{
      // this.getHeight.minHeight = (window.outerHeight/window.outerWidth * 10.8 - 5.96)+'rem'
      //    minHeight(){
      //   return (window.outerHeight/window.outerWidth * 10.8 - 5.96)+'rem'
      // }
    },
  created(){
    // this.contacts()
    // this.abouts()
    this.getHeight.minHeight=(window.outerHeight/window.outerWidth * 10.8 - 5.96)+'rem'
    this.active=this.$route.params.active 
    if(this.active==0){
      this.contacts()
    }else{
     this.abouts()
    }
  },
  beforeRouteEnter (to, from, next) {
      interfaces.contactus().then(function (res) {
      next(vm=>
         {
              if(res!=undefined){
              vm.contact=res
              let main=res.content
              // let ms=main.split('<br/></p>')
              // vm.ms2=ms[0].split('<p>')
              // let ms3=ms[1].split('<p>')
              // let ms4=ms3[1].split('</p>')
              // vm.ms5=ms4[0]
          }
         })
        })

        interfaces.aboutus().then((res)=>{ 
          next(vm=>{
              vm.about=res
          })  
        })
      

   },

  methods:{
      copy: function() {
        var _this = this;
        var clipboard = new Clipboard(".getcopy"); //单页面引用
        clipboard.on("success", e => {
         _this.$toast('复制成功') 
          // 释放内存
          clipboard.destroy();
        });
        clipboard.on("error", e => {
          // 不支持复制
          Message({
            message: "该浏览器不支持自动复制",
            type: "warning"
          });
          // 释放内存
          clipboard.destroy();
        });
      }, 　　
    
       heightGet(){
         if(this.heightOther2>this.heightOther){
           this.showMoress=true
         }
       },
         toCallPhone(){
        window.location.href = 'tel://400 700 6608'
        },
        moreLoad(){
          this.showMore=! this.showMore
        },
        contacts(){
        interfaces.contactus().then((res)=>{   
          if(res!=undefined){
              this.contact=res
              let main=res.content
              // let ms=main.split('<br/></p>')
              // this.ms2=ms[0].split('<p>')
              // let ms3=ms[1].split('<p>')
              // let ms4=ms3[1].split('</p>')
              // this.ms5=ms4[0]
          }
       })
        },
         abouts(){
             interfaces.aboutus().then((res)=>{   
               this.about=res
               res.forEach((item,index)=>{
                  let abouts=item.content
               })
            })
        },
     onClick(name, title) {
       if(title=='联系我们'){
         this.contacts()
       }else if(title=='关于我们'){
        this.abouts()
       }
     },
     handleScroll () {
         this.scroll  = $(window).height()+ $(document).scrollTop()
       }
     },

     updated:function(){
      },
    mounted:function(){
      
             $eventbus.$on("changeLang", (res)=>{
                this.contacts()
                this.abouts()
                this.active=this.$route.params.active 
                if(this.active==0){
                  this.contacts()
                }else{
                this.abouts()
                }
            
         })

    },

      	//第四步：当再次进入（前进或者后退）时，只触发activated（注：只有在keep-alive加载时调用）
	activated(){
	    if(this.scroll > 0){
	        // window.scrollTo(0, this.scroll);
          window.addEventListener('scroll', this.handleScroll);
	    }
   	},
   	//第五步：deactivated 页面退出时关闭事件 防止其他页面出现问题
  	deactivated(){
		window.removeEventListener('scroll', this.handleScroll);
	},
}
</script>

<style>
.contact{width:100%;margin:0 auto; min-height: 100%;padding-bottom:5.96rem;box-sizing: border-box;position:relative;}
.contact .van-tabs .van-tab {
    flex: none;
    width: 50%;
    font-weight: bold;
}
.about .van-tabs--line .van-tabs__wrap {
    height: 44px;
    border-bottom: 1px solid #d9d9d9;
}
.contact{width:100%;height:auto;overflow: hidden;}
.contact h3{font-size:0.38rem;height:auto;color:#0e0e0e}
.contact .foot_01s{width:auto;height:auto;margin:0.64rem auto 0.5rem;padding:0 0.65rem;}
.contact .foot_01s ul {display: flex;align-items: left;flex-direction: column;text-align: left;margin-top:0.3rem;}
.contact .foot_01s ul li{font-size:0.36rem;color:#000;line-height: 0.75rem;height:0.75rem;display: flex;
    align-items: center;    justify-content: flex-start;}
.contact .foot_01s ul li i{margin-right:0.3rem;}
.brand-01{width:auto;height:auto;}
.about-01{width:90%;height:auto;margin:0.64rem auto 1rem;overflow: hidden;}
.about-01 h2{font-size:0.40rem;height:auto;color:#0e0e0e;margin-top:0.57rem;}
.about-01 p{font-size:0.36rem;height:auto;color:#0e0e0e;margin-top:0.57rem;line-height: 0.75rem;}

.about-01 .index-more {width:auto;height:auto;display: flex;align-items: center;justify-content: center;margin:0.5rem 0;}
.about-01 .index-more span{font-size:0.35rem;margin-right:0.1rem;color:#a5a5a5;}
.about-01 .index-more img{width:0.2rem;height:0.2rem;margin-top:0.1rem;}

.moreHeight{height:auto;overflow: visible;}
</style>
