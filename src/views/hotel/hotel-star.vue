<template>
  <div class="star" :style='minHeight'>
    <!-- <img src='../../assets/images/jp.png'/> -->
      <aheaders status='2'></aheaders>
       <div class="top-hotel"><img src="../../assets/images/hotel-01.jpg" alt=""></div>
  
       <div class="hotel">
            <div class="choose-hotel">
                <div class="hotel-01">
                <div class="s1" @click='city'>{{cityName}} <van-icon name="arrow-down" v-show='!toshowicon'/> <van-icon name="arrow-up" v-show='toshowicon' /> </div>
                <div class="s1" @click='typeHouse'>{{typehousename}} <van-icon name="arrow-down" v-show='!toshowicon2'/> <van-icon name="arrow-up" v-show='toshowicon2' /></div>
                </div>
                     <div class="s2" v-show='toshowCity'>
                       <div class="s3"><span style='border-right: 1px solid #ddd;'>{{$t('m.hotel3')}}</span> <span>{{$t('m.hotel4')}}</span></div>
                        <div class="s4">
                           <div class="left">
                             <div class='city3' @click='togetAll' :class='{active:currentIndex==-1}'>
                                <span> 全部</span> 
                               </div>
                               <div class='city3' @click='city2(index,item)' :class='{active:index==currentIndex}'  v-for='(item,index) in cityAll' :key='index'>
                                <span> {{item.name}}</span> 
                               </div>
                                <!-- <span @click='getListhouses({})'> 全部</span>  -->
                                </div> 
                                  <div class="right" :class="{active:currentIndex!=-1}" v-show='tochina'>
                                  <ul>
                                     <li @click='city3()'>全部</li>
                                     <li v-for='(i,ins) in alllistss' :class='{active:ins==currentIndex}' :key='ins' @click='getname(i.name,i.linkageid)'>{{i.name}}</li>
                                  </ul>
                                </div>
                        </div>
                   </div> 
                       <div class="s2" v-show='toshowtype'> 
                            <div class="right">
                                  <ul>
                                     <li :class='{active:currentIndex2==-1}' @click="getName('','全部',-1)">全部</li>
                                     <li @click="getName(item.id,item.title,index)" v-for='(item,index) in getHouseType' :key='index' :class='{active:index==currentIndex2}'>{{item.title}}</li>
                                     <!-- <li @click="getName(2,'二居')">二居</li> -->
                                  </ul>
                            </div>
                        </div>

            </div>
           <div class="hotel_main" v-if="alllist.length>0">
             <ul>
               <li v-for='(item,index) in alllist' :key='index'>
                   <div class="hotel-img"><router-link :to="{name:'hotelDetail',params:{id:item.id}}"><img :src="item.pic" alt=""> </router-link> 
                   <div class="location">{{item.address}}</div></div>
                   <div class="hotel-title">
                      <div class="title">{{item.project_name}}</div>
                      <button @click='toDetails(item.id,item.project_name)'>
                          <!-- <router-link :to="{name:'orderForm',params:{id:item.id,name:item.project_name}}">  -->
                            {{$t('m.orderhouse')}}
                             <!-- </router-link> -->
                         </button>
                   </div>
               </li>

             </ul>
             <!-- <div class="more-list" v-show='pagemore' @click="addMore"><img src="../../assets/images/list-more.jpg" alt=""></div> -->
            
           </div>
               <div v-else  class="nolist" style='margin:0.8rem 0;font-size:0.3rem;text-align:center;'>{{$t('m.others13')}}</div>
               <div class="index-more" v-show='alllist.length>6'><span>more</span> <img src="../../assets/images/more-icon.jpg" alt=""></div>
           </div>
           <afooter></afooter>

       <submitBtn  v-if='hideModel' @tohideModel='tohideModel' :status='status'></submitBtn>  

   <!-- <router-view /> -->
  </div>
</template>

<script>
// @ is an alias to /src
import Vue from 'vue';
import { Icon } from 'vant';

Vue.use(Icon);
import aheaders from "@/components/Header";
import afooter from "@/components/Footer";
import submitBtn from "@/components/submitBtn";
import interfaces from "@/utils/api.js";


export default {
  name: 'star',
  data(){
     return{
        scroll:0,
        pagemore:true,
        alllist:[],
        toshowCity:false,
        toshowtype:false,
        cityAll:[],
        currentIndex:-1,
        currentIndex2:-1,
        alllistss:[],
        cityName:this.$i18n.t('m.hotel1'),
        typehousename:this.$i18n.t('m.hotel2'),
        idsarea:'',
        houseId:'',
        cityid:'',
        mobileLocal:'',
        hideModel:false,
        getHouseType:[],
        getHeight:{
           minHeight:''
         },
         toshowicon:false,
         toshowicon2:false,
         status:'',
         tochina:false
        
 
     }
  },
     computed:{
    //  this.getHeight.minHeight = (window.outerHeight/window.outerWidth * 10.8 - 5.96)+'rem'
        minHeight(){
        return (window.outerHeight/window.outerWidth * 10.8 - 5.96)+'rem'
      }
    },
  methods:{
        city(){
          this.toshowCity=!this.toshowCity 
          this.toshowicon=!this.toshowicon
          this.toshowtype=false
         },
         gethouseTypes(){
         interfaces.gethouseType().then((res)=>{
          this.getHouseType=res
         })
         },
        city2(index,item){
           this.tochina=true;
           this.alllistss=item.area
           this.cityName=item.name
           this.currentIndex=index
           this.cityid=item.linkageid
           let city=item.linkageid
           let area=this.idsarea
           let type=this.houseId
           let data={city,area,type}
           this.getcity(data)
        },
        city3(){
          this.toshowCity=false
           this.toshowicon=false
           let city=this.cityid
           let area=this.idsarea
           let type=this.houseId
           let data={city,area,type}
           this.getcity(data)
        },
        // 获取地区
        getcity(data){
            interfaces.getListhouseAll(data).then((res)=>{
            this.alllist=res
          console.log(res)
         })
        },

        // 城市获取全部
       togetAll(){
          this.cityName='全部'
          this.currentIndex=-1
          this.tochina=false
         let data={};
         this.getListhouses(data)
         this.toshowCity=false
         this.toshowicon=false
       },



        typeHouse(){
            this.toshowtype=!this.toshowtype
            this.toshowicon2=!this.toshowicon2
            this.toshowCity=false
        },
        getname(name,id){
          this.cityName=name,
          this.idsarea=id
          this.toshowCity=false
          this.toshowicon=false
           let city=this.cityid
           let area=id
           let type=this.houseId
           let data={city,area,type}
         //   this.getListhouses(data)
           interfaces.getListhouseAll(data).then((res)=>{
          this.alllist=res
          console.log(res)
         })
        },
        getName(id,title,index){
          this.currentIndex2=index
           this.typehousename=title
           this.houseId=id
           this.toshowtype=false
            this.toshowicon2=false
            let city=this.cityid
           let area=this.idsarea
           let type=id
           let data={type,city,area}

          interfaces.getListhouseAll(data).then((res)=>{
          this.alllist=res
          console.log(res)
         })
        },
         getListhouses(data){
          interfaces.getListhouseAll(data).then((res)=>{
          this.alllist=res
         })
     },
         getcitys(){
          interfaces.getcity().then((res)=>{
          this.cityAll=res
          console.log(res)
      })
     },
       
       tohideModel(){
          this.hideModel=false
       },
         handleScroll () {
         this.scroll  = $(window).height()+ $(document).scrollTop()
       },
       toDetails(id,name){
         this.status=1
        if(this.mobileLocal){
          this.$router.push({name:'orderForm',params:{id:id,name:name,mobile:this.mobileLocal}})
        }else{
          this.hideModel=true
        }
       },
      //  获取全部城市
       getAllCity(){
          let data={}
        this.getListhouses(data)
       }
     },
     created(){
        this.mobileLocal=JSON.parse(localStorage.getItem('userinfo')).mobile
        // let data={}
        // this.getListhouses(data)
        // this.getcitys()
        // this.gethouseTypes()
        // this.getHeight.minHeight=window.innerHeight+'px'
     },

     beforeRouteEnter (to, from, next) {
       console.log(to, from)
      let data={}
      interfaces.getListhouseAll(data).then(function (res) {
      next(vm=>
         {
          vm.alllist=res
          vm.getcitys()
          vm.gethouseTypes()
        })
    })
  },

     mounted:function(){
    window.addEventListener('scroll', this.handleScroll);
         $eventbus.$on("changeLang", (res)=>{
                this.mobileLocal=JSON.parse(localStorage.getItem('userinfo')).mobile
                let data={}
                this.getListhouses(data)
                this.getcitys()
                this.gethouseTypes()
                this.getHeight.minHeight=window.innerHeight+'px'
            
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
  components:{
    aheaders,
    afooter,
    submitBtn
  }
}
</script>

<style>
.star{width:100%;margin:0 auto; min-height: 100%;padding-bottom:5.96rem;box-sizing: border-box;position:relative;}
.hotel{width:auto;height:auto;margin:0 auto;}
.star .top-hotel{width:100%;height:auto;margin:0.22rem 0 0.88rem;}
.star .top-hotel img{width:100%;height:auto;}
.star .choose-hotel{width:auto;height:auto;}
.hotel-01{display: flex;align-items: left;justify-content: flex-start;margin:0 0.6rem;}
.star .choose-hotel .s1 {font-size:0.44rem;color:#0e0e0e;margin-right:0.54rem;}
.star .choose-hotel .s1 i{font-size:0.44rem;color:#0e0e0e;}
.star .hotel_main{width:auto;height:auto;}
.star .hotel_main ul{display: flex;align-items: center;justify-content: center;flex-direction: column;}
.star .hotel_main ul li{width:auto;height:auto;padding:0.56rem 0;border-bottom:1px solid #f1f1f1;}
.star .hotel_main ul li .hotel-img{width:9.62rem;height:6.85rem;position:relative;}
.star .hotel_main ul li .hotel-img img{width:9.62rem;height:6.85rem;}
.star .hotel_main ul li .hotel-img .location{position:absolute;left:0;bottom:0;font-size:0.36rem;color:#fff; background-image:linear-gradient(to top,rgba(0,0,0,0.5), rgba(0,0,0,0)) ;  width:96%;padding:0.2rem;}
.star .hotel_main ul li .hotel-title{display: flex;align-items: center;justify-content:space-between;margin-top:0.45rem;padding-left: 0.2rem;}
.star .hotel_main ul li .hotel-title .title{font-size:0.48rem;color:#000;font-weight: bold;}
.star .hotel_main ul li .hotel-title button{width:2.97rem;height:0.98rem;font-size:0.38rem;background-color: #5975a9;color:#fff;border:none;border-radius: 5px;}
.star .hotel_main ul li .hotel-title button a{color:#fff;}


.more-list{width:auto;height:auto;margin:0.5rem 0; display:flex;align-items: center;justify-content:center;}
.more-list img{width:1.2rem;height:0.3rem;}


.s2{width:100%;height:auto;display: flex;align-items: center;justify-content: center;flex-direction: column;margin-top:0.24rem;transition: all 0.4s ease;}
.s3{width:100%;height:0.9rem;border-top:1px solid #ddd;border-bottom:1px solid #ddd;display: flex;align-items: center;justify-content: center;}
.s3 span{font-size:0.48rem;flex:1;text-align: center;}
.s4{width:100%;display: flex;align-items: flex-start;justify-content:flex-start;}
.s4 .left{width:5.38rem;display: flex;flex-direction: column;align-items:center;font-size:0.37rem;justify-content: flex-start;}
.s4 .left .city3{ width:5.38rem;text-align: center;display: flex;align-items:center;}
.s4 .left .city3 span{font-size:0.37rem;height:1rem;line-height: 1rem;width:5.38rem;}
.s4 .left .city3 .right{width:5.4rem;}

.s4 .right{width:5.4rem;}
.s4 .right ul{width:100%;display: flex;flex-direction: column;align-items: center;}
.s4 .right ul li{font-size:0.37rem;color:#0e0e0e;line-height:0.85rem;}
.s2 ul li{font-size:0.37rem;color:#0e0e0e;line-height:0.85rem;text-align: center} 
.s2 .right{width:100%;padding: 0.3rem 0;}
.s2 .right ul{width:100%;}
.active{background-color: #eeeeee;}
.active span{border-left:0.1rem solid #3c5896;}

</style>
