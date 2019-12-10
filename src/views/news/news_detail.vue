<template>
  <div class="newsdetail">
    <!-- <img src='../../assets/images/news-detail.png'/> -->
    <aheaders status='3' @toback='toreplace'></aheaders>
       <div class="newsdatails">
       <h2>{{newsDetails.title}}</h2>
       <div class="date">{{newsDetails.inputtime}}</div>
        <div class="mains-new">
         <!-- <img src="../../assets/images/index_01.jpg" alt="">
                   <p> 中国城市发展已迈入存量更新时代，城市更新既是建筑规划的时代更迭，是科技人文的发展需求，也是经济民生的新方向。“中国城
     中国城市发展已迈入存量更新时代，城市更新既是建筑规划的时代更迭，是科技人文的发展需求，也是经济民生的新方向。“中国城
      </p>  -->
          <p v-html="newsDetails.description">{{newsDetails.description}}</p> 
           <div v-html="newsDetails.content" class='content'>
             {{newsDetails.content}} 
             </div>
        </div>
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
  name: 'newsdetail',
  data(){
    return{
      newsId:'',
      newsDetails:{},
      scroll:0,
      newsHeight:{
        minHeight:''
      }
    }
  },
  components:{
    aheaders,
    afooter
  },

  beforeRouteEnter (to, from, next) {
    let id=to.params.id
    interfaces.newsDetail(id).then(function (res) {
      next(vm=>
         {
          vm.newsDetails=res
        })
    })
  },
   computed(){
     this.getHeight.minHeight = (window.outerHeight/window.outerWidth * 10.8 - 5.96)+'rem'
    },
   methods:{
     newsDetail(id){
       interfaces.newsDetail(id).then((res)=>{
          this.newsDetails=res
          console.log(res)
       })
     },
     
     toreplace(){
         this.$router.go(-1)
       },
      handleScroll () {
	       this.scroll  = $(window).height()+ $(document).scrollTop()
	   	}
   },
   created(){
        // this.newsHeight.minHeight=window.innerHeight+'px'
          //  this.newsId = this.$route.params.id;
          //  this.newsDetail(this.newsId)
    },
       mounted:function(){
         this.newsId = this.$route.params.id;
    window.addEventListener('scroll', this.handleScroll);
     $eventbus.$on("changeLang", (res)=>{
          this.newsDetail(this.newsId)
       });
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
  
  //   beforeRouteEnter(to, from, next) {
  //   // console.log(to.params.city + "test");
  //   console.log(to)
  //   next(vm => {
  //     vm.newsId = to.params.id;
  //   });
  // }
    


}
</script>

<style>
.newsdetail{width:100%;margin:0 auto; min-height: 100%;padding-bottom:5.96rem;box-sizing: border-box;position:relative;}
.newsdatails{width:90%;height:auto;margin:0.6rem auto 0;overflow: hidden;}
.newsdatails h2{font-size:0.6rem;color:#2d2d2d;line-height: 0.87rem;height: 1.7rem;overflow: hidden;}
.newsdatails .date{font-size:0.34rem;color:#aeaeae;margin:0.6rem 0;}
.newsdatails .mains-new{font-size:0.36rem;color:#000;padding-bottom:1rem;}
.newsdatails .mains-new img{width:100%;height:auto;margin:0 auto;}
.newsdatails .mains-new p{font-size:0.36rem;color:#000;line-height:0.79rem;width:100%;height:auto;}
.content{width:100%;height:auto;}
.newsdatails .mains-new .content p{font-size:0.36rem;color:#000;line-height:0.79rem;width:100%;height:auto;}
.content video{width:100%;height:auto}
</style>
