<template>
  <div class="order">

    <div class="person-center">
       <div class="person_01">  
           <!-- <van-nav-bar title="首页" left-text="返回" left-arrow  @click='toback'>
          </van-nav-bar> -->
          <div class='person-arr' style='position:relative;'>
            <div class="person-arr1"  @click='toback'><van-icon name="arrow-left" /> <em>{{$t('m.home')}}</em> </div> 
            <span class='remove-index' style='position:absolute;top:12px;right:10px;width:0.6rem;height:0.6rem;'><van-icon name="cross"  style='width:100%;height:100%;'/></span>
             </div>
          </div>

       <div class="person_02">
           <div class="person_05">
              <div class="per-msg">
             <img :src="avater" alt="" style='width:2.2rem;height:2.2rem;border-radius:50%;'>
           </div>
           <div class="per_title">
               <div class="per_h3">{{nickname}} </div>
               <div class="isfase" v-if='ischeckPhone' @click="toshowModel">{{$t('m.ischeck')}}</div>
               <div class="isfase2" v-if='!ischeckPhone'> <span>{{mobileLocal}}</span> <em @click='getShowModel'>{{$t('m.changePhone')}}</em> </div>
               <!-- {{mobileLocal}} -->
           </div>
           </div>
         
          <div class="yu-m">
           <div class="yu_01" style='margin-right:0.6rem;' v-if='iskehu==1'><router-link :to="{name:'booking',params:{active:0}}"><img src="../../assets/images/2_06.png" alt=""><i>{{$t('m.manage')}}</i> </router-link> </div>
           <div class="yu_01" v-if='iskehu==1'><router-link :to="{path:'/myOrder'}"><img src="../../assets/images/2_03.jpg" alt=""><i>{{$t('m.myorder')}}</i></router-link> </div> 
           <div class="yu_01" v-if='iskehu==0' :class="{xiaoshou:iskehuClass}"><router-link :to="{path:'/myOrder'}"><img src="../../assets/images/2_03.jpg" alt=""><i>{{$t('m.myorder')}}</i></router-link> </div>
         </div>
       </div> 
       <div class="person_03">
        <ul>
          <li><router-link :to="{path:'/hotel'}"><img src="../../assets/images/2_11.png" alt=""><i>{{$t('m.home1')}}</i> </router-link>  </li>
          <li><router-link :to="{path:'/news'}"><img src="../../assets/images/2_14.png" alt=""><i>{{$t('m.home2')}}</i> </router-link>  </li>
          <li><router-link :to="{path:'/activity'}"><img src="../../assets/images/2_16.png" alt=""><i>{{$t('m.home3')}}</i> </router-link> </li>
          <li style='border-bottom:10px solid #f1f1f1;'><router-link :to="{name:'contact',params:{active:1}}"><img src="../../assets/images/2_18.png" alt=""><i>{{$t('m.home4')}}</i></router-link> </li>
          <li><router-link :to="{name:'contact',params:{active:0}}"><img src="../../assets/images/2_20.png" alt=""><i>{{$t('m.home5')}}</i> </router-link></li>
          <li @click="callPhone"><img src="../../assets/images/2_22.png" alt=""><i>400-700-6008</i> </li>
        </ul>  
       </div>

       <van-button type="info" class='submits' @click="toshowModel">{{$t('m.orderhouse')}}</van-button>

       <!-- 预约弹框 -->
        <!-- <div class="model-diag" v-show="hideModel">
            <div class="model_main">
                 <div class="mains">
                   <div class="left">{{$t('m.s1')}}</div>
                   <div class="right">
                     <input type="text" 
                     v-model="phone"
                      :placeholder="$t('m.s5')"></div>
                   </div>

                   <div class="mains" style='position:relative;'>
                       <div class="left">{{$t('m.s2')}}</div>
                       <div class="right">
                        <input type="text" 
                        v-model="sms"
                         :placeholder="$t('m.s6')">
                          </div>
                        <button>{{$t('m.s3')}}</button>
                     </div> 
                 <button class='btns'>{{$t('m.s4')}}</button>
               <img src="../../assets/images/remove.png" alt="" class='img_remove'  @click="tohideModel">
            </div> -->

        <!-- </div> -->
        <submitBtn  v-if='!hideModel' @tohideModel='tohideModel' :status='status'></submitBtn>
    </div>
  </div>

</template>

<script>
import Vue from 'vue';
import submitBtn from '@/components/submitBtn'
import { NavBar,Field } from 'vant';
import { Icon } from 'vant';
Vue.use(Icon);

Vue.use(Field);
Vue.use(NavBar);
export default {
  name: 'order',
  data(){
     return{
       hideModel:true,
      //  sms:'',
      //  phone:'',
       iskehu:'',
       iskehuClass:false,
       mobileLocal:'',
       ischeckPhone:true,
       nickname:'',
       avater:'',
       status:''
     }
  },

   methods:{
   tohideModel(){
     this.hideModel=false
   },
   toshowModel(){
     let mobile=localStorage.getItem('mobile')
      if(mobile){
        this.hideModel=true
       this.$router.push({name:'orderForm',params:{mobile:this.mobileLocal}})
      }else{
         this.hideModel=false
         this.status=1
       }

   },
   callPhone(){
      window.location.href = 'tel://400 700 6608'
   },
  
   getShowModel(){
     this.hideModel=true
   },
    toback(){
       this.$router.push({path:'/'})
    },

    
   },
   mounted(){
      this.iskehu=JSON.parse(localStorage.getItem('userinfo')).type
      this.avater=JSON.parse(localStorage.getItem('userinfo')).avater
      this.nickname=JSON.parse(localStorage.getItem('userinfo')).nickname
      this.mobileLocal=JSON.parse(localStorage.getItem('userinfo')).mobile
      // this.mobileLocal=localStorage.getItem('mobile')
       if(this.mobileLocal){
         this.ischeckPhone=false
       }
      if( this.iskehu==0){
        this.iskehuClass=true
      }
       console.log(this.iskehu)
   },
   components:{
     submitBtn
   }

}
</script>

<style>

.order{width:100%;height:auto;}
.order .van-nav-bar__text {
    color: #000;
}
.order .van-nav-bar .van-icon {
    color: #000;
    vertical-align: middle;
}
.order  .van-nav-bar__title{margin:0;width:50%;}
.person_01{width:100%;height:1.67rem;display: flex;align-items: center;justify-content: space-between;}

.person-arr{width:90%;height:1.67rem;margin:0 auto;}
.person-arr em{width:auto;height:0.5rem; font-size:0.5rem;margin-left:0.2rem;}
.person-arr i{font-size:0.6rem;}

.person-arr1{width:100%;height:100%;display: flex;align-items: center;justify-content:flex-start;}

/* .remove-index{position:absolute;top:12px;right:10px;width:auto;height:auto;}
.remove-index i{width:0.6rem;height:0.6rem;} */

.person_02{width:auto;height:auto;background-color: #f6f6f6;overflow: hidden;}
.person_05{display:flex;align-items:center;width:80%;margin:0 auto;}
.per-msg{width:3.6rem;height:auto;margin-top:0.3rem;}
.per-msg img{width:2.20rem;height:2.20rem;border-radius: 50%;float:left;}
.per_title{width:7.20rem;display:flex;align-items:left;flex-direction: column;justify-content: center;float:left;margin-top:0.33rem;}
.per_title .per_h3{font-size:0.6rem;color:#000;font-weight: bold;}
.isfase{color:#bfbfbf;font-size:0.4rem;margin-top:0.3rem;}
.isfase2{color:#bfbfbf;font-size:0.4rem;margin-top:0.3rem;display:flex;align-items: center;justify-content:space-between;}
.isfase2 em{font-size:0.25rem;color:#5975a9;}
.yu-m{width:8.20rem;height:auto;display:flex;align-items:center;margin:0.57rem auto 0.71rem;}
.yu-m .yu_01{width:3.8rem;height:1.2rem;line-height:1.2rem;margin-right:10px;border:1px solid #000;text-align: center;display:flex;align-items:center;justify-content: center;border-radius: 6px;}
.yu-m .yu_01 i{font-size:0.39rem;color:#000;margin-left: 0.2rem;}
.yu-m .xiaoshou{width:7.82rem;height:1.18rem;}
.yu-m .yu_01 img{width:0.35rem;height:0.35rem;}
.yu-m .yu_01 a{display: inherit;display: flex;align-items: center;}

.person_03{width:auto;height:auto;background-color: #fff;display:flex;align-items:center;flex-direction: column;}
.person_03 ul{width:100%;height:auto;display:flex;align-items:center;flex-direction: column;}
.person_03 ul li{width:100%;display:flex;align-items:center;border-bottom:1px solid #ddd;padding:0 1.5rem;box-sizing: border-box;height:1.6rem;line-height: 1.6rem;}
.person_03 ul li a{font-size:0.37rem;color:#000;display: block;width:100%;} 
.person_03 ul li i{font-size:0.37rem;color:#000;}
.person_03 ul li img{width:0.42rem;height:0.38rem;margin-right:0.55rem;}

.person_03 ul li:last-child{border-bottom:none;}
.person-center .submits{width:8rem;height:1rem;background-color: #5975a9;margin:0 auto;color:#fff;display: block;margin-top:20px; line-height: 1rem;display: block;}

.model-diag{width:100%;height:100%;background:rgba(0,0,0,0.5);position:fixed;top:0;left:0;}
.model-diag .model_main{width:90%;height:auto;margin:0 auto;top:35%;left:5%;position:absolute;border-radius: 10px;background-color: #fff;padding-bottom:0.53rem;}
.van-cell-group {
    background-color: #fff;
    border-radius: 12px;
}
.mains{width:80%;height:1.6rem;display:flex;align-items:center;flex-direction: row;background-color: #fff;margin:0 auto;border-bottom:1px solid #f1f1f1;}
.mains .left{width:2.58rem;height:auto;font-size:0.34rem;color:#000;}
.mains .right{width:6.21rem;height:auto;font-size:0.34rem;color:#000;} 
/* .van-cell{height:1.56rem;} */
.mains input{border:none;}
.mains button{width:2.37rem;height:0.8rem;font-size:0.3rem;position:absolute;right:-11px;bottom:16px;background-color: #dddddd;border:none;}
.btns{width:80%;height:1.0rem;line-height:1.0rem;color:#333;text-align: center;background-color: #dddddd;font-size:0.3rem;border:none;margin:0 auto;margin-left:10%;border-radius: 0.1rem;margin-top:1.2rem;}

.img_remove{width:0.82rem;height:0.82rem;position: absolute;bottom:-53px;left:47%;}
.person-center{margin-bottom:2.0rem;}

</style>
