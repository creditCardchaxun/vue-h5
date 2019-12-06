<template>
  <div class="newlist" :style="getHeight">
         <aheaders status='2'></aheaders>

          <div class="news_main">
            <div class="news_01">
              <router-link :to="{name:'newsdetail', params:{id:topList.id}}">
              <img :src="topList.thumb" alt="">
             <h3>{{topList.title}}</h3>
             <p>{{topList.description}}</p>
             <div class="date">{{topList.inputtime}}</div>
             </router-link>
             </div>

          <div class="news_02" v-for='(item,index) in news' :key='index'>
           <div class="left"><router-link :to="{name:'newsdetail', params:{id:item.id}}"><img :src=item.thumb alt="">  </router-link></div>
           <div class="right">
             <h3><router-link :to="{name:'newsdetail', params:{id:item.id}}">{{item.title}}</router-link></h3>
             <p><router-link :to="{name:'newsdetail', params:{id:item.id}}">{{item.description}} </router-link></p>
             <div class="date">{{item.inputtime}}</div>
           </div>
         </div>
        <!-- <div class="more-list" v-show='pagemore' @click="addMore"><img src="../../assets/images/list-more.jpg" alt=""></div> -->

               <div class="index-more" v-show='pagemore'><span>more</span> <img src="../../assets/images/more-icon.jpg" alt=""></div>
         
  </div>
   <afooter></afooter>
 </div>


</template>

<script>
// @ is an alias to /src
import interfaces from "@/utils/api.js";
import aheaders from "@/components/Header";
import afooter from "@/components/Footer";
export default {
  name: 'newlist',
    data(){
      return{
        topList:{},
         news:[],
         pagemore:false,
         page:1,
         scroll:0,
         getHeight:{
           minHeight:''
         }
      }
    },
    //  computed(){
    //  this.getHeight.minHeight = (window.outerHeight/window.outerWidth * 10.8 - 5.96)+'rem'
    // },
    mounted:function(){
    window.addEventListener('scroll', this.handleScroll);
       $eventbus.$on("changeLang", (res)=>{
        this.newsList()
      });
  },
   beforeRouteEnter (to, from, next) {
    interfaces.newsList().then(function (res) {
      next(vm=>
         {
            vm.news=res.news_list
            vm.topList=res.news_top
            if(vm.news.length>6){
              vm.pagemore=true
            }else{
              vm.pagemore=false
            }
        })
    })
  },
    created(){
    //  this.newsList()
    this.getHeight.minHeight=(window.outerHeight/window.outerWidth * 10.8 - 5.96)+'rem'
    },
    methods:{
    //  newsList(){
    //    interfaces.newsList().then((res)=>{
    //       console.log(res.news_top)
    //        this.news=res.news_list
    //        this.topList=res.news_top
    //     if(this.news.length>6){
    //        this.pagemore=true
    //     }else{
    //        this.pagemore=false
    //     }
    //   })
    //  },
     addMore(){
      this.page++
      this.newsList(this.page)
     },
     
     handleScroll () {
	       this.scroll  = $(window).height()+ $(document).scrollTop()
	   	}
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
       afooter
      },
}
</script>

<style scoped>
.newlist{width:100%;height:auto;}
.news_main{width:90%;height:auto;margin:0 auto;padding-top:0.32rem;}
.news_main .news_01{width:100%;height:auto;border-bottom:1px solid #e5e5e5;}
.news_main .news_01 img{width:100%;height:auto;}
.news_main .news_01 h3{font-size:0.44rem;color:#000;margin-top:0.64rem;line-height:0.44rem;overflow: hidden;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 1;}
.news_main .news_01 p{font-size:0.3rem;color:#1b1b1b;line-height:0.5rem;height:1.44rem;overflow: hidden;margin-top:0.43rem; display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 3;}
.news_main .news_01 .date{font-size:0.28rem;color:#959595;margin:0.35rem 0;}

.news_02{width:100%;height:auto;border-bottom:1px solid #e5e5e5;display:flex;align-items: center;justify-content: center;padding:0.35rem 0;}
/* .news_main .news_02{width:100%;height:auto;border-bottom:1px solid #e5e5e5;} */
.news_main .news_02 .left{width:3.6rem;height:2.56rem;}
.news_main .news_02 .left img{width:3.6rem;height:2.56rem;}
.news_main .news_02 .right{width:6.02rem;height:2.56rem;display:flex;align-items: left;flex-direction: column;padding-left: 0.43rem;overflow: hidden;}
.news_main .news_02 .right h3 a{color:#000;}
.news_main .news_02 h3{font-size:0.4rem;color:#000;height: 1.2rem;overflow: hidden;line-height:0.56rem;width:6.02rem;overflow: hidden;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 2;}
.news_main .news_02 p{font-size:0.28rem;color:#959595;height:1rem;overflow: hidden;line-height:0.5rem;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 2; }
.news_main .news_02 p a{color:#959595;}
.news_main .news_02 .date{font-size:0.28rem;color:#959595;margin:0.2rem 0 0;}

.more-list{width:auto;height:auto;margin:0.8rem 0; display:flex;align-items: center;justify-content:center;}
.more-list img{width:1.2rem;height:0.3rem;}

</style>
