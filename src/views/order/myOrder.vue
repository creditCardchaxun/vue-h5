<template>
  <div class="myorder" :style='getHeight'>
     <!-- <img src='../assets/images/about.png'/> -->
     <aheaders status='2'></aheaders>
     <div class="order-list" :style="getHeight" >
        <div class="myorder-list" v-if="orderList.length>0">
             <h2>{{$t('m.watch')}}</h2>
             <div class="total">
             <div class="orderlist" v-for="(item,index) in orderList"  :key='index' @click.stop='todetailOrder(item.id)'>
                 <div class="left"><router-link :to="{name:'orderDetail', params:{id:item.id}}"><img :src="item.onepic" alt=""></router-link></div>
                 <div class="right">
                      <h3><router-link :to="{name:'orderDetail', params:{id:item.id}}">{{item.project_name}}</router-link> </h3>
                      <p>{{$t('m.watch3')}}{{item.book_time}}</p>
                      <em @click.stop.prevent="toMaps(item.projectid)"> 
                        <!-- <router-link :to="{name:'hotelDetail?#maps', params:{id:projectid}}"> -->
                        <span>{{$t('m.watch4')}}</span>
                        <!-- </router-link>  -->
                        </em>
                 </div>
              </div>
            </div>
             <!-- <div class="s1" v-else>{{$t('m.watch5')}}</div> -->
        </div> 

          <div class="myorder-list2" v-if="orderList2.length>0">
           <h2>{{$t('m.watch2')}}</h2>
              <div class="total">
              <div class="orderlist" v-for="(item,index) in orderList2"  :key='index' @click.stop='todetailOrder2(item.id)'>
                   <router-link :to="{name:'orderDetail',params:{id:item.id}}" >
                 <div class="left"><img :src="item.onepic"  alt=""></div>
                   </router-link>
                    <router-link :to="{name:'orderDetail',params:{id:item.id}}" style='width:6.45rem;'>
                 <div class="right">
                      <h3>{{item.project_name}}</h3>
                      <p>{{$t('m.watch3')}}{{item.book_time}}</p>
                      <div class="morder-t">
                       <em @click.stop.prevent='toMaps(item.projectid)'><span style='padding-bottom:2px;'>{{$t('m.watch4')}}</span></em>
                      <button v-show="item.is_pj==0" @click.stop.prevent='toAppraise(item.id)'>{{$t('m.watch6')}}</button>
                      </div>
                 </div>
                 </router-link>
               </div>
                </div>
                <!-- <div class="s1" v-else>{{$t('m.watch5')}}</div> -->
                
             </div>

          <div class="s1" v-show='showBtn'>
            {{$t('m.watch5')}} 
           <button @click='toOrder'>点击去预约</button>
          </div>

         </div>
          <!-- </div> -->

          <afooter></afooter>




  </div>
</template>
<script>
import aheaders from "@/components/Header";
import afooter from "@/components/Footer";
import interfaces from "@/utils/api.js";
  export default{
      name:'myorder',
       data(){
       return{
                orderList:[],
                orderList2:[],
                getHeight:{
                    minHeight:''
                  },
                showBtn:false     
                }
             },
           computed:{
        //  this.getHeight.minHeight = (window.outerHeight/window.outerWidth * 10.8 - 5.96)+'rem'
      //       minHeight(){
      //   return (window.outerHeight/window.outerWidth * 10.8 - 5.96)+'rem'
      // }
       },
          mounted(){
        $eventbus.$on("changeLang", (res)=>{
           let id=JSON.parse(localStorage.getItem('userinfo')).id 
            this.booklists()
         })
      },
      created(){
            let id=JSON.parse(localStorage.getItem('userinfo')).id 
            this.booklists()
            this.getHeight.minHeight=(window.outerHeight/window.outerWidth * 10.8 - 5.96)+'rem'
      },
       methods:{
              toMaps(id){
                this.$router.push({name:'hotelDetail',params:{id:id,status:'map'}})
              },
               booklists(){
               interfaces.bookList().then((res)=>{

                  if(res.not_finish!=null||res.not_finish!=''){
                   this.orderList=res.not_finish   //即将开始
                  } 
                   if(res.finish !=null||res.finish !=''){
                    this.orderList2=res.finish   //已经看过
                  } 
                  if((res.not_finish==null||res.not_finish==''||res.not_finish.length==0)&&(res.finish ==null||res.finish ==''||res.finish.length==0)){
                     this.showBtn=true
                  }
                })
               }, 
               todetailOrder(id){
                this.$router.push({name:'orderDetail',params:{id:id}})
               },
                todetailOrder2(id){
                this.$router.push({name:'orderDetail',params:{id:id}})
               },
               toAppraise(id){
                 this.$router.push({name:'appraise',params:{id:id}})
               },
               toOrder(){
                 this.$router.push({name:'orderForm'})
               }
       },
      components:{
       aheaders,
       afooter
      },
  }
</script>

<style scoped>
.myorder{width:100%;margin:0 auto; min-height: 100%;padding-bottom:5.96rem;box-sizing: border-box;position:relative;}
.myorder-list{width:9.69rem;height:auto;margin:0 auto;padding-top:0.9rem;border-top:1px solid #f5f5f5;}
.myorder-list2{width:9.69rem;height:auto;margin:0 auto;padding-top:0.9rem;}
.myorder-list h2{font-size:0.44rem;color:#000;font-weight: bold;}


.order-list .s1{font-size:0.35rem;color:#999;text-align: center;margin-top:0.8rem}
.order-list .s1 button{
    width: 5rem;
    height: 0.8rem;
    line-height: 0.8rem;
    color: #fff;
    background-color: #5975a9;
    text-align: center;
    display: block;
    margin: 54px auto;
    padding: 0;
    border: none;
    border-radius: 3px;
}
.myorder-list2 .s1{font-size:0.35rem;color:#999;text-align: center;}
.myorder-list2 h2{font-size:0.44rem;color:#000;font-weight: bold;}
 .orderlist{width:100%;height:auto;display: flex;align-items: left;padding:0.52rem 0;border-bottom:1px solid #f1f1f1;}
  /* .orderlist a{} */
 .orderlist .left{width:3.29rem;height:2.60rem;}
 .orderlist .left img{width:3.29rem;height:2.60rem;}
 .orderlist .right{width:auto;height:2.6rem;display: flex;align-items: left;flex-direction: column;padding-left:0.4rem;overflow: hidden;}
 .orderlist .right h3{font-size:0.4rem;color:#000;font-weight: bold;line-height: 0.5rem;height:0.5rem;overflow: hidden;}
 .orderlist .right h3 a{font-size:0.40rem;color:#000;}
 .orderlist .right p{font-size:0.3rem;color:#999;padding-top:0.2rem;}
 .orderlist .right em{margin-top:0.4rem;}
 .orderlist .right span{font-size:0.3rem;color:#999;border-bottom:1px solid #999;padding-bottom:4px;width:auto;}
 .orderlist .right button{width:2.14rem;height:0.78rem;font-size:0.3rem;background-color: #5975a9;border:none;color:#fff;margin: 0.88rem 0 0 auto;border-radius: 3px;}
 .orderlist .right button a{color:#fff;}
 .orderlist .right .morder-t{    display: flex;
    justify-content: space-between;
    align-items: center;}
</style>