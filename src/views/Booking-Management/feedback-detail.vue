<template>
  <div class="bookingfeedback">
    <aheaders status='3' @toback='toreplace'></aheaders>
    <div class="message">
      <h6>{{$t('m.feedback18')}}</h6>
      <ul>
        <li>
          <div>
            <span class="time">{{$t('m.feedback10')}}</span>
            <span>{{feedback.feedinfo.sales_time}}</span>
          </div>
        </li>
        <li>
          <span class="time">{{$t('m.feedback2')}}</span>
          <span>{{feedback.feedinfo.sales_content}}</span>
        </li>
        <li>
          <span class="time">{{$t('m.feedback3')}}</span>
          <span>{{feedback.feedinfo.sales_desc}}</span>
        </li>
      </ul>
    </div>

    <div class="detail">
      <ul>
        <li>
          <span class="detail-name">{{$t('m.bookName')}}</span>
          <span>{{feedback.project_name}}</span>
        </li>
        <li>
          <span class="detail-name">{{$t('m.feedback8')}}</span>
          <span>{{feedback.name}}</span>
        </li>
        <li>
          <span class="detail-name">{{$t('m.feedback9')}}</span>
          <span>{{feedback.mobile}}</span>
        </li>
        <li>
          <span class="detail-name">{{$t('m.feedback10')}}</span>
          <span>{{feedback.book_time}}</span>
        </li>
        <li>
          <span class="detail-name">{{$t('m.feedback11')}}</span>
          <span>{{feedback.intention}}</span>
        </li>
        <li>
          <span class="detail-name">{{$t('m.feedback12')}}</span>
          <span>{{feedback.book_number}} <em style='font-size:0.3rem;color:#bfbfbf' @click="copy" class='getcopy' :data-clipboard-text="feedback.book_number">{{$t('m.feedback14')}}</em></span>
        </li>
        <li>
          <span class="detail-name">{{$t('m.feedback13')}}</span>
          <span>{{feedback.inputtime}}</span>
        </li>
      </ul>
    </div>

    <footers></footers>
  </div>
</template>

<script scoped>
import Vue from "vue";
import Clipboard from "clipboard"; 
import aheaders from "@/components/Header";
import footers from "@/components/Footer";
import interfaces from "@/utils/api.js";
import { Tab, Tabs, NavBar, Search } from "vant";

Vue.use(Tab).use(Tabs);
Vue.use(NavBar).use(NavBar);
Vue.use(Search);

export default {
  name: "bookingfeedback",
  data() {
    return {
      ids:'',
      feedback:''
    };
  },
  components: {
    aheaders,
    footers
  },
  created(){
    this.ids=this.$route.params.id
    this.detailfeed(this.ids)
  },
  mounted(){
      $eventbus.$on("changeLang", (res)=>{
        this.ids=this.$route.params.id
        this.detailfeed(this.ids)
      })
  },
  methods: {
     toreplace(){
        this.$router.replace({name:'booking',params:{active:1,num:2}})
       },
       detailfeed(id){
       interfaces.fankuidetail(id).then((res)=>{
         this.feedback=res   
         console.log(res)
       })
     },
           copy: function() {
        var _this = this;
        var clipboard = new Clipboard(".getcopy"); //单页面引用
        clipboard.on("success", e => {
         this.$toast('复制成功') 
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
  }
};
</script>

<style>
.bookingdetail {
  width: 100%;
  height: auto;
  margin: 0 auto;
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

.message {
  width: 90%;
  height: 5.5rem;
  margin: 0.2rem auto;
  border-bottom: 0.3rem solid #f1f1f1;
}

.message h6 {
  font-size: 0.5rem;
  font-weight: bold;
}
.message ul {
  width: 100%;
  height: auto;
  margin: 0 auto;
}
.message ul li {
  width: auto;
  height: 1.5rem;
  margin: 0 auto;
  display: flex;
  align-items: center;
}
.message .time {
  font-size: 0.35rem;
  display: inline-block;
  width: 2.5rem;
}
.message ul li span {
  font-size: 0.42rem;
}
.detail {
  width: 90%;
  height: auto;
  margin: 0.2rem auto;
}
.detail ul {
  width: 100%;
  height: auto;
  margin: 0 auto;
}
.detail ul li {
  width: auto;
  height: 1.5rem;
  margin: 0 auto;
  display: flex;
  align-items: center;
  /* justify-content: space-between; */
}
.detail ul li:nth-child(5) {
  border-bottom: 0.3rem solid #f1f1f1;
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
.good {
  width: 7.7rem;
  height: 4rem;
  margin: 0 auto;
}
.good img {
  display: block;
  margin: 0 auto;
  margin-top: 1.5rem;
}
.good p {
  font-size: 0.45rem;
  text-align: center;
  margin-top: 0.5rem;
}
</style>
