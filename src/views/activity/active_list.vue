<template>
  <div class="newlist">
         <aheaders status='2'></aheaders>
          <div class="news_main">
            <div class="news_01" v-if='topList'>
              <router-link :to="{name:'activitydetail',params:{id:topList.id}}">
              <img :src="topList.thumb" alt="">
             <h3>{{topList.title}}</h3>
             <p>{{topList.description}}</p>
             <div class="date">{{topList.inputtime}}</div>
             </router-link>
             </div>

          <div class="news_02" v-for='(item,index) in activelists' :key='index'>
            
           <div class="left">
             <router-link :to="{name:'activitydetail',params:{id:item.id}}"><img :src="item.thumb" alt="">  </router-link></div>
           <div class="right">
              <router-link :to="{name:'activitydetail',params:{id:item.id}}">
             <h3>{{item.title}}</h3>
             <p>{{item.description}}</p>
             <div class="date">{{item.inputtime}}</div>
             </router-link>
           </div>
          </div>

            <!-- <div class="news_02">
           <div class="left"> <router-link :to="{path:'/activitydetail'}"><img src="../../assets/images/index_01.jpg" alt=""></router-link></div>
           <div class="right">
             <h3>盛煦地产设计大赛：与世界对话“未来生活空间”</h3>
             <p>本次活动主会场设在盛煦地产旗下品牌安福路。分为论坛区和展览区，集中呈现了…</p>
             <div class="date">2019/1/15</div>
           </div>
           
           </div> -->
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
  name: 'activity',
    data(){
      return{
        activelists:[],
        topList:{},
        pagemore:false,
         scroll:0,
         newsHeight:{
           minHeight:''
         }
      }
    },
    computed:{
         minHeight(){
        return (window.outerHeight/window.outerWidth * 10.8 - 5.96)+'rem'
      }
    },
     methods:{
      //  interfaces.activeList
     activeLists(){
        interfaces.activeList().then((res)=>{
        //  if(res.code==0){
           console.log(res)
           this.activelists=res.news_list
           this.topList=res.news_top
        //  }
      })
     },
     addMore(){
     this.activeLists()
     },
      handleScroll () {
	       this.scroll  = $(window).height()+ $(document).scrollTop()
	   	}
    },
    created(){
    //  this.activeLists()
    //  this.newsHeight.minHeight=window.innerHeight+'px'
      },
       beforeRouteEnter (to, from, next) {
      interfaces.activeList().then(function (res) {
      next(vm=>
         {
           vm.activelists=res.news_list
           vm.topList=res.news_top
         })
      })
   },

   mounted:function(){
    window.addEventListener('scroll', this.handleScroll);

      $eventbus.$on("changeLang", (res)=>{
          this.activeLists()
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
       afooter
      },
}
</script>

<style scoped>
.newlist{width:100%;margin:0 auto; min-height: 100%;padding-bottom:5.96rem;box-sizing: border-box;position:relative;}
.news_main{width:90%;height:auto;margin:0 auto;padding-top:0.32rem;}
.news_main .news_01{width:100%;height:auto;border-bottom:1px solid #e5e5e5;}
.news_main .news_01 img{width:100%;height:auto;}
.news_main .news_01 h3{font-size:0.44rem;color:#000;margin-top:0.64rem;line-height:0.44rem;overflow: hidden;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp:1;}
.news_main .news_01 p{font-size:0.3rem;color:#1b1b1b;line-height:0.5rem;padding-bottom: 0.5rem; overflow: hidden;margin-top:0.43rem;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 3; }
.news_main .news_01 .date{font-size:0.28rem;color:#959595;margin:0.35rem 0;}

.news_02{width:100%;height:auto;border-bottom:1px solid #e5e5e5;display:flex;align-items: center;justify-content: center;padding:0.35rem 0;}
/* .news_main .news_02{width:100%;height:auto;border-bottom:1px solid #e5e5e5;} */
.news_main .news_02 .left{width:3.6rem;height:2.56rem;}
.news_main .news_02 .left img{width:3.6rem;height:2.56rem;}
.news_main .news_02 .right{position: relative; width:6.02rem;height:2.56rem;display:flex;align-items: left;flex-direction: column;padding-left: 0.43rem;overflow: hidden;}
.news_main .news_02 .right h3 a{color:#000;}
.news_main .news_02 h3{font-size:0.4rem;color:#000;max-height: 1.2rem;overflow: hidden;line-height:0.56rem;width:5.8rem;overflow: hidden;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 2;}
.news_main .news_02 p{font-size:0.28rem;color:#959595;height:1rem;overflow: hidden;line-height:0.5rem;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 2; }
.news_main .news_02 p a{color:#959595;}
.news_main .news_02 .date{font-size:0.28rem;color:#959595;margin:0.2rem 0 0; position: absolute;bottom: 0.35rem;}

.more-list{width:auto;height:auto;margin:0.8rem 0; display:flex;align-items: center;justify-content:center;}
.more-list img{width:1.2rem;height:0.3rem;}

</style>
