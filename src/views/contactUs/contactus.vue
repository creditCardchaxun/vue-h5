<template>
  <div class="contact">
    <!-- <img src='../../assets/images/contact.png'/> -->
    <!-- 关于我们 联系我们 -->
    <aheaders status="2" :showLan='true'></aheaders>
    <div class="about">
      <img src="../../assets/images/about-banner.jpg" alt style="width:100%;height:6.08rem" />

      <van-tabs @click="onClick" line-width="7%" :border="false" v-model="active">
        <van-tab :title="$t('m.home5')">
          <div class="contact">
            <div class="foot_01s">
              <h3 style="font-weight:bold;">{{contact.title}}</h3>
              <!-- <p v-html='contact.content' style='font-size:0.35rem;line-height:0.75rem;'>{{contact.content}}</p> -->
              <ul>
                <li class="s11" @click="toCallPhone">
                  <van-icon name="phone-o" />
                  {{contact.tel}}
                  <!-- <em style='font-size:0.28rem;color:#000;'>(8:00-22:00)</em> -->
                </li>
                <li class="s12">
                  <van-icon name="location-o" />
                  {{contact.address}}
                </li>
                <li class="s13">
                  <van-icon name="envelop-o" />
                  {{contact.keywords}}
                  <em
                    style="color:#bfbfbf;font-size:0.28rem;padding-left:0.1rem;"
                    @click="copy"
                    class="getcopy"
                    :data-clipboard-text="contact.keywords"
                  >{{$t('m.feedback14')}}</em>
                </li>
              </ul>
            </div>
          </div>
        </van-tab>
        <van-tab :title="$t('m.home4')">
          <div class="about-01" :ref="'brandHeight'+index" v-for='(item,index) in about' :key='index'>
            <div class="brand-01" :class='{activeHeight:about[index].showMore1}'>
                 <!-- {{about[index].showMore1}} -->
               <h2 style='font-weight:bold;'>{{item.title}}</h2>
               <p v-html='item.content'>{{item.content}}</p>
            </div>
           <div class="index-more" v-show="'showMoress'+index" @click='moreLoad(index)' ><span v-if='IconMore1'>more</span> <img src="../../assets/images/more-icon.jpg" alt=""></div>
          </div>

          <!-- <div class="about-01">
            <div class="brand-01" ref="brandHeight" :class='{activeHeight:showMore1}'>
              <h2 style="font-weight:bold;">品牌背景</h2>
              <p>base是盛煦存量地产 (Shanghai NOVA Real Estate Co., Ltd)旗下的一个创意地产品牌。盛煦存量地产成立于2014年，是一家专业性存量地产投资及资产管理公司。2016年，盛煦存量地产对存量地产改造及增值服务运营商翌成创意的股权进行收购，成为其控股股东，并共同发展旗下品牌base。</p>
              <p>base秉承着国际化的视角和前瞻性的创新发展理念，专注于投资、开发及运营一体化经营的领域。而我们所做的，远不止于此，我们始终相信，建筑物并非盈盈独立的个体，而是灵感的聚集地，城市社群的据点，以此交织成城市的脉搏。对于生活在其中的人们，我们希望他们可以彼此联结，相互启发，发现无处不在的灵感。</p>
              <p>目前base旗下所运营及改造中的项目已接近40个，总投资规模近120亿人民币，项目面积约达400,000平方米，覆盖上海、北京等一线城市。旗下运营品牌有base佰舍和Waterline盛溪，着力打造品牌联盟，以满足不同业态定位需求。我们的版图仍在不断扩大，我们将会把创新的理念带去更多的地方。</p>
            </div>
            <div class="index-more" v-if="showMoress" @click="moreLoad">
              <span v-if='IconMore1'>more</span>
              <img src="../../assets/images/more-icon.jpg" alt :class="{brandimg1:showMore1}" />
            </div>
          </div>

          <div class="about-01">
            <div class="brand-01" id='brandImg' ref="brandHeight2" :class='{activeHeight:showMore2}'>
              <h2 style="font-weight:bold;">品牌精神</h2>
              <p>我们始于生活, 着眼未来，让人们在有形的空间中彼此联结，在交流中获得启发、突破创新，</p>
              <p>—— 这是base的品牌精神。</p>
            </div>
            <div class="index-more" v-if="showMoress2" @click="moreLoad2">
              <span v-if='IconMore2'>more</span>
              <img src="../../assets/images/more-icon.jpg" alt :class="{brandimg2:showMore2}" />
            </div>
          </div>

          <div class="about-01">
            <div class="brand-01" ref="brandHeight3" :class='{activeHeight:showMore3}'>
              <h2 style="font-weight:bold;">品牌故事</h2>
              <p>base 源于2012年，但我们的故事和上海的老旧社区生活有着难解情缘。</p>
              <p>老旧社区见证着上海的发展进程，为每一位居民构筑出属于自己的生活天地，也凝聚了这座都市悠久的人文情怀。</p>
              <p>眼下，“破旧立新”的住行方式，被视为是城市发展必经的阶段，却忽略了凝聚在老旧社区原有的情怀与记忆。</p>
              <p>人与人之间互相联结居住的生态，才让建筑和生活散发出由内而外的美。那些老式的建筑、废弃的房屋，保存着我们无法割舍的闪光点。</p>
              <p>老旧社区，对久居者来说是儿时的回忆；对异乡旅人而言，它是探寻一座城市的起点。反之，房客是旧社区焕发新生的源泉，书写新篇章的开始。</p>
              <p>“以旧创新”，正是base的灵魂所在。</p>
              <p>我们以老旧社区与人的关系为灵感，主张在废旧建筑开放式的格局基础上，以现代空间美学理念为其重新赋予新生活力，重新连接人与人之间的亲密关系，营造焕然一新的社群生活。</p>
            </div>
            <div class="index-more" v-if="showMoress3" @click="moreLoad3">
              <span v-if='IconMore3'>more</span>
              <img src="../../assets/images/more-icon.jpg" alt :class="{brandimg3:showMore3}" /> 
            </div>
          </div> -->
        </van-tab>
      </van-tabs>
      <afooters></afooters>
    </div>
  </div>
</template>

<script>
import Clipboard from "clipboard"; //复制版
import Vue from "vue";
import { Tab, Tabs, Icon } from "vant";

Vue.use(Tab)
  .use(Tabs)
  .use(Icon);
import interfaces from "@/utils/api.js";
import aheaders from "@/components/Header";
import afooters from "@/components/Footer";
export default {
  name: "contact",
  data() {
    return {
      scroll: 0,
      contact: {},
      about: [],
      ms2: "",
      ms5: "",
      heightOther: 190,
      showMore: false,
      heightImg: "",
      heightOther2: 200,
      showMoress: false,
      showMoress2: false,
      showMoress3: false,
      active: 0,
      listheight: "",
      getHeight: {
        minHeight: ""
      },
      showMore1:false,
      showMore2:false,
      showMore3:false,
      IconMore1:true,
      IconMore2:true,
      IconMore3:true
    };
  },
  components: {
    aheaders,
    afooters
  },
  computed: {
    // this.getHeight.minHeight = (window.outerHeight/window.outerWidth * 10.8 - 5.96)+'rem'
    //    minHeight(){
    //   return (window.outerHeight/window.outerWidth * 10.8 - 5.96)+'rem'
    // }
  },
  created() {
    // this.contacts()
    // this.abouts()
    this.getHeight.minHeight =
      (window.outerHeight / window.outerWidth) * 10.8 - 5.96 + "rem";
    this.active = this.$route.params.active;
    if (this.active == 0) {
      this.contacts();
    } else {
       this.abouts()
    }
  },
  beforeRouteEnter(to, from, next) {
    interfaces.contactus().then(function(res) {
      next(vm => {
        if (res != undefined) {
          vm.contact = res;
          let main = res.content;
          // let ms=main.split('<br/></p>')
          // vm.ms2=ms[0].split('<p>')
          // let ms3=ms[1].split('<p>')
          // let ms4=ms3[1].split('</p>')
          // vm.ms5=ms4[0]
        }
      });
    });

    interfaces.aboutus().then((res)=>{
      next(vm=>{
          vm.about=res
          forEach((item,index)=>{
            res[index].showMore1=this.showMore1
            console.log(res[index].showMore1)
          })
      })
    })
  },

  methods: {
    copy: function() {
      var _this = this;
      var clipboard = new Clipboard(".getcopy"); //单页面引用
      clipboard.on("success", e => {
        _this.$toast(this.$i18n.t("m.show3"));
        // 释放内存
        clipboard.destroy();
      });
      clipboard.on("error", e => {
        // 不支持复制
        Message({
          message: this.$i18n.t("m.show4"),
          type: "warning"
        });
        // 释放内存
        clipboard.destroy();
      });
    },
    //  heightGet(){
    //    if(this.heightOther2>this.heightOther){
    //      this.showMoress=true
    //    }
    //  },
    toCallPhone() {
      window.location.href = "tel://400 700 6608";
    },
    moreLoad(indexs) {
      this.about.forEach((item,index)=>{
          if(indexs==index){
            console.log(indexs,index)
          this.about[index].showMore1 =!this.about[index].showMore1;
          // this.showMore1=this.about[index].showMore1
           console.log(this.about[index].showMore1)
          // this.showMore1 =!this.about[index].showMore1;
          //  if(this.showMore1==true){
          //     this.IconMore1=false
          //   }else{
          //     this.IconMore1=true
          //   }
          }
     
      })
  
    },
      moreLoad2() {
      this.showMore2 = !this.showMore2;
       if(this.showMore2==true){
         this.IconMore2=false
      }else{
         this.IconMore2=true
      }
    },
      moreLoad3() {
      this.showMore3 = !this.showMore3;
       if(this.showMore3==true){
         this.IconMore3=false
      }else{
         this.IconMore3=true
      }
    },
    
    contacts() {
      interfaces.contactus().then(res => {
        if (res != undefined) {
          this.contact = res;
          let main = res.content;
          // let ms=main.split('<br/></p>')
          // this.ms2=ms[0].split('<p>')
          // let ms3=ms[1].split('<p>')
          // let ms4=ms3[1].split('</p>')
          // this.ms5=ms4[0]
        }
      });
    },

     abouts(){
         interfaces.aboutus().then((res)=>{
           this.about=res
           res.forEach((item,index)=>{
              let abouts=item.content
            res[index].showMore1=this.showMore1
            console.log(res[index].showMore1)
           })
        })
    },

    onClick(name, title) {
      if (title == "联系我们") {
        this.contacts();
      } else if (title == "关于我们") {
        // this.$router.push({ name: "contact", params: { active: 1 } });
        this.abouts()
      }
    },
    handleScroll() {
      this.scroll = $(window).height() + $(document).scrollTop();
    }

    //  获取字符串长度
    //   GetLength(str) {
    //   ///<summary>获得字符串实际长度，中文2，英文1</summary>
    //   ///<param name="str">要获得长度的字符串</param>
    //   var realLength = 0, len = str.length, charCode = -1;
    //   for (var i = 0; i < len; i++) {
    //     charCode = str.charCodeAt(i);
    //     if (charCode >= 0 && charCode <= 128) realLength += 1;
    //     else realLength += 2;
    //   }
    //   return realLength;
    //   }
  },

  updated() {},
  mounted() {
    // let that = this;
    // that.$nextTick(() => {
    //   // let height= window.getComputedStyle(this.$refs.heightShow).height
    //   console.log(that.$refs.brandHeight);
    //   let height2 = window.getComputedStyle(that.$refs.brandHeight).height;
    //   console.log(that.$refs.brandHeight);
    //   let height3 = window.getComputedStyle(that.$refs.brandHeight2).height;
    //   let height4 = window.getComputedStyle(that.$refs.brandHeight3).height;
    //   alert(height2);
    //   if (height2 > 180 + "px") {
    //     that.showMoress = true;
    //   }
    // });

    $eventbus.$on("changeLang", res => {
      this.contacts();
      // this.abouts()
      this.active = this.$route.params.active;
      if (this.active == 0) {
        this.contacts();
      } else {
        this.abouts()
      }
    });
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
  watch: {
    active(newa, olda) {
      if (newa === 1) {
          for(let i in this.about){
              this.$nextTick(() => {
             console.log(this.$refs["brandHeight" + i][0])
            //  console.log(this.$refs["brandHeight" + i][1])
            //  console.log(this.$refs["brandHeight" + i][2])

          let height2 = window.getComputedStyle(this.$refs["brandHeight" + i][0]).height;
          // let height3 = window.getComputedStyle(this.$refs["brandHeight" + i][1]).height;
          // let height4 = window.getComputedStyle(this.$refs["brandHeight" + i][2]).height;

            console.log(height2)
            // console.log(height3)
            // console.log(height4)
          //  }
           if (height2 > 180 + "px") {
            this.showMoress = true;
          }
          //    if (height3 > 180 + "px") {
          //   this.showMoress2 = true;
          // }
          //    if (height4 > 180 + "px") {
          //   this.showMoress3= true;
          // }

               
        })
      }
 
      }
      
    }
  }
}
</script>

<style>
.brandimg1 {
  transform: rotate(180deg);
}
.brandimg2 {
  transform: rotate(180deg);
}
.brandimg3 {
  transform: rotate(180deg);
}
.contact {
  width: 100%;
  margin: 0 auto;
  min-height: 100%;
  padding-bottom: 5.96rem;
  box-sizing: border-box;
  position: relative;
  background-color: #fff;
}
.contact .van-tabs .van-tab {
  flex: none;
  width: 50%;
  font-weight: bold;
}
.about .van-tabs--line .van-tabs__wrap {
  height: 44px;
  border-bottom: 1px solid #d9d9d9;
}
.contact {
  width: 100%;
  height: auto;
  overflow: hidden;
}
.contact h3 {
  font-size: 0.38rem;
  height: auto;
  color: #0e0e0e;
}
.contact .foot_01s {
  width: auto;
  height: auto;
  margin: 0.64rem auto 0.5rem;
  padding: 0 0.65rem;
}
.contact .foot_01s ul {
  display: flex;
  align-items: left;
  flex-direction: column;
  text-align: left;
  margin-top: 0.3rem;
}
.contact .foot_01s ul li {
  font-size: 0.36rem;
  color: #000;
  line-height: 0.75rem;
  height: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.contact .foot_01s ul li i {
  margin-right: 0.3rem;
}

.contact .activeHeight{height:auto;overflow: visible;}
.brand-01 {
  width: auto;
  height: 5.5rem;
  overflow: hidden;
}
#brandImg{height: 4.5rem;}
.about-01 {
  width: 90%;
  height: auto;
  margin: 0.64rem auto 1rem;
  overflow: hidden;

}
.about-01 h2 {
  font-size: 0.4rem;
  height: auto;
  color: #0e0e0e;
  margin-top: 0.57rem;
  margin-bottom: 0.57rem;
}
.about-01 p {
  font-size: 0.36rem;
  height: auto;
  color: #0e0e0e;
  line-height: 0.81rem;
}

.about-01 .index-more {
  width: auto;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0.5rem 0;
}
.about-01 .index-more span {
  font-size: 0.35rem;
  margin-right: 0.1rem;
  color: #a5a5a5;
}
.about-01 .index-more img {
  width: 0.2rem;
  height: 0.2rem;
  margin-top: 0.1rem;
}

.moreHeight {
  height: auto;
  overflow: visible;
}
</style>
