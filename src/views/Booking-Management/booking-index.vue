<template>
  <div class="bookings" id='bookings'>
    <aheaders status='2'></aheaders>
    <div class="books" style='margin-top:0.2rem;'>
   <van-tabs v-model="active" line-width='7%' :border='false' @click="onClick">

    <van-tab :title="$t('m.others5')">
      <div class="search-phone">
           <van-search 
          :placeholder="$t('m.others8')" 
          v-model="inputVal" 
          type="number" 
          maxlength="11"
        />
     <button class='search' @click='togetnumber' v-if='noRearch'>{{$t('m.others16')}}</button>
    </div> 
     <!-- <p  v-if="!isShow">请输入正确的手机号</p> -->
      <div class="booking">
      <div class="book-list">
           <ul v-if="list1.length>0">
             <li v-for='(item,index) in list1' :key='index'>
              <div class="date" @click="tobookingxq(item)"><router-link to="#"><span>{{list1[index].date}}</span> <i>{{list1[index].moth}}月</i> </router-link></div>
               <div class="date_02" @click="tobookingxq(item)"> 
                   <router-link to="#">
                 <span class='date-icon'>{{item.name}}</span> 
                 <span style='font-size:0.34rem'>{{item.mobile}}</span> 
                 <span>{{item.project_name}}</span>  
                  </router-link>
                 </div>
              <div class="date_03">
                <div class="isNew" v-show='item.is_new==1'><img src="../../assets/images/news-icon.jpg" alt=""></div>
                <div class="total-button">
                  <button plain hairline  class='s11' @click="toCallPhone(item.mobile)">{{$t('m.others9')}}</button>
                  <button  class='s22' @click="showRight(item.id)">{{$t('m.others11')}}</button>
                </div>
              </div>
             </li>
           </ul>
            <!-- <div class="nolist" v-else>{{$t('m.others13')}}</div> -->
            <div class="nolist" v-show='noMain'>{{$t('m.others14')}}</div>
                 <van-popup v-model="show_right">
                <div class="good">
                  <img src="../../assets/images/checkmark.png" alt style='width:1.05rem;height:0.95rem;' />
                  <p style='color:#000;font-size:0.4rem;'>{{$t('m.others12')}}</p>
                </div>
             </van-popup>
             <div class="index-more" v-show='this.list1.length>6'><span>more</span> <img src="../../assets/images/more-icon.jpg" alt=""></div>
        </div>    
   </div>

  </van-tab>
  <van-tab :title="$t('m.others6')">
     <div class="search-phone">
    <van-search 
     :placeholder="$t('m.others8')" 
         v-model="inputVal2" 
         type="number" 
         maxlength="11"
     />
          <button class='search' @click='togetnumber2' v-if='noRearch2'>{{$t('m.others16')}}</button>
    </div> 
     <!-- <p  v-if="!isShow">请输入正确的手机号</p> -->
     <div class="booking">
      <div class="book-list">
           <ul v-if="list2.length>0">
             <li v-for='(item,index) in list2' :key='index'>
              <div class="date"><router-link :to="{name:'bookingfeedback',params:{id:item.id}}"><span>{{list2[index].date}}</span> <i>{{list2[index].moth}}月</i></router-link></div>
               <div class="date_02"> 
                  <router-link :to="{name:'bookingfeedback',params:{id:item.id}}">
                 <span class='date-icon'>{{item.name}}</span> 
                 <span style='font-size:0.34rem'>{{item.mobile}}</span>
                  <span>{{item.project_name}}</span>
                  </router-link>
                    </div>
              <div class="date_03">
                <!-- <div class="isNew"><img src="../../assets/images/news-icon.jpg" alt=""></div> -->
                <div class="total-button">
                 <van-button plain hairline  class='s11'  @click="toCallPhone(item.mobile)">{{$t('m.others9')}}</van-button>
                 <router-link :to="{name:'bookingfeedback',params:{id:item.id}}"><van-button  class='s22'> {{$t('m.others10')}}</van-button></router-link>
                </div>
              </div>

             </li>
           </ul>
               <!-- <div class="nolist" v-else>{{$t('m.others13')}}</div> -->
               <div class="nolist" v-if='noMain2'>{{$t('m.others14')}}</div>
               <div class="index-more" v-show='this.list2.length>6'><span>more</span> <img src="../../assets/images/more-icon.jpg" alt=""></div>
        </div>  
   </div>

  </van-tab>
  <van-tab :title="$t('m.others7')">
        <div class="search-phone">
        <van-search 
        :placeholder="$t('m.others8')" 
         v-model="inputVal3" 
         type="number" 
         maxlength="11"
     />
      <button class='search' @click='togetnumber3' v-if='noRearch3'>{{$t('m.others16')}}</button>
    </div> 
     <!-- <p  v-if="!isShow">请输入正确的手机号</p> -->
      <div class="booking">
      <div class="book-list">
           <ul v-if="list3.length>0">
             <li v-for='(item,index) in list3' :key='index'>
              <div class="date"><router-link :to="{name:'feedbackdetail',params:{id:item.id}}"><span>{{list3[index].date}}</span> <i>{{list3[index].moth}}{{$t('m.others15')}}</i> </router-link></div>
               <div class="date_02">
                  <router-link :to="{name:'feedbackdetail',params:{id:item.id}}">
                  <span class='date-icon'>{{item.name}}</span> 
                  <span style='font-size:0.34rem'>{{item.mobile}}</span> 
                  <span>{{item.project_name}}</span> </router-link> </div>
              <div class="date_03">
                <!-- <div class="isNew"><img src="../../assets/images/news-icon.jpg" alt=""></div> -->
                <div class="total-button onlyone">
                 <van-button plain hairline  class='s11'  @click="toCallPhone(item.mobile)">{{$t('m.others9')}}</van-button>
                <!-- <van-button type="info">接受预约</van-button> -->
                </div>
              </div>
             </li>

           </ul>
           <!-- <div class="nolist" v-else>{{$t('m.others13')}}</div> -->
           <div class="nolist" v-if='noMain3'>{{$t('m.others14')}}</div>
           <div class="index-more" v-show='this.list3.length>6'><span>more</span> <img src="../../assets/images/more-icon.jpg" alt=""></div>
        </div>  
   </div>
  </van-tab>
 </van-tabs>
</div>

    <footers></footers>
  </div>

</template>

<script scoped>
import Vue from 'vue';
import aheaders from "@/components/Header";
import footers from "@/components/Footer";
import interfaces from "@/utils/api.js";
import { Tab, Tabs,NavBar,Search  } from 'vant';

Vue.use(Tab).use(Tabs);
Vue.use(NavBar).use(NavBar);
Vue.use(Search);

export default {
  name: 'booking',
  data() {
    return {
      active: 0,
      value:'',
      list1:[],
      list2:[],
      list3:[],
      moth:'',
      date:'',
      show_right:false,
      num:'',
      confirmList:[],
      isNew:'',
      checked:true,
      inputVal:'',
      inputVal2:'',
      inputVal3:'',
      timeout: null,
       isShow:true,
       noMain:false,
       noMain2:false,
       noMain3:false,
       noRearch:false,
       noRearch2:false,
       noRearch3:false,
       getHeight:{
         minHeight:''
       }
    }
  },
   
  computed:{
    //  this.getHeight.minHeight = (window.outerHeight/window.outerWidth * 10.8 - 5.96)+'rem'
      //  minHeight(){
      //   return (window.outerHeight/window.outerWidth * 10.8 - 5.96)+'rem'
      // }
    },
  created(){
    this.getHeight.minHeight = (window.outerHeight/window.outerWidth * 10.8 - 5.96)+'rem'
    this.active=this.$route.params.active
    this.num=this.$route.params.num
     if(!this.num||!this.active){
          this.booklist1(1)
          this.booklist2(2)
          this.booklist3(3)
     }
     else if(this.num||this.active){
       console.log(this.num,this.active)
          this.booklist1(this.num,this.active)
          this.booklist2(this.num,this.active)
          this.booklist3(this.num,this.active)
     }
      let ids=localStorage.getItem('bookId')
  },
    mounted(){
      $eventbus.$on("changeLang", (res)=>{
    this.active=this.$route.params.active
    this.num=this.$route.params.num
     if(!this.num||!this.active){
          this.booklist1(1)
          this.booklist2(2)
          this.booklist3(3)
     }
     else if(this.num||this.active){
       console.log(this.num,this.active)
          this.booklist1(this.num,this.active)
          this.booklist2(this.num,this.active)
          this.booklist3(this.num,this.active)
     }
      let ids=localStorage.getItem('bookId')
      })
  },
  watch:{
      inputVal(){
         if(this.inputVal.length>=4){
            this.noRearch=true
           }else{
            this.noRearch=false
          }
       },
        inputVal2(){
          //  this.togetnumber2()
         if(this.inputVal2.length>=4){
            this.noRearch2=true
           }else{
            this.noRearch2=false
           }
       },
        inputVal3(){
            // this.togetnumber3()
           if(this.inputVal3.length>=4){
            this.noRearch3=true
           }else{
            this.noRearch3=false
           }
      },
    //   togetnumber:_.debounce(function(){
    //  },1000),
    //    togetnumber2:_.debounce(function(){
    //  },1000),
    //    togetnumber3:_.debounce(function(){
    //  },1000)

  },
  methods:{
  //  toreplace(){
  //     this.$router.go(-1)
  //    },
   togetnumber(){
       let re = /^1(3|4|5|6|7|8|9)\d{9}$/
        // 正则，验证手机号输入是否正确
        let show = re.test(this.inputVal)
        // 若正确返回true，反之false
             if (show) {
           interfaces.getphone(1,this.inputVal).then((res)=>{
               if(res==null ||res.length==0){
                        this.list1=[]
                        this.noMain=true
                        setTimeout(()=>{
                          this.inputVal=''
                          this.noRearch=false
                          this.noMain=false
                           this.booklist1(1,0)
                        },3000)
                   }else{
                   this.list1=res
                 }
          })
        }else{
          this.$toast('请您输入正确的手机号')
        } 
   },

   togetnumber2(){
       let re = /^1(3|4|5|6|7|8|9)\d{9}$/
        // 正则，验证手机号输入是否正确
        let show = re.test(this.inputVal2)
        // 若正确返回true，反之false
        // this.isShow = show
        // isShow获取之后返回到v-if进行判断是消失还是出现 
             if (show) {
           interfaces.getphone(2,this.inputVal2).then((res)=>{
             console.log(res)
               if(res==null ||res.length==0){
                  this.list2=[]
                  this.noMain2=true
                  setTimeout(()=>{
                    this.inputVal2=''
                    this.noRearch2=false
                     this.noMain2=false
                      this.booklist2(2,1)
                  },3000)
                 }else{
                   this.list2=res
                 }
          })
        }else{
          this.$toast('请您输入正确的手机号')
        }  
   },

   togetnumber3(){
       let re = /^1(3|4|5|6|7|8|9)\d{9}$/
        // 正则，验证手机号输入是否正确
        let show = re.test(this.inputVal3)
        // 若正确返回true，反之false
        // this.isShow = show
        // isShow获取之后返回到v-if进行判断是消失还是出现 
             if (show) {
           interfaces.getphone(3,this.inputVal3).then((res)=>{
               if(res==null ||res.length==0){
                 this.noMain3=true
                  this.list3=[]
                  setTimeout(()=>{
                    this.inputVal3=''
                    this.noRearch3=false
                    this.noMain3=false
                    this.booklist3(3,2)
                  },3000)
                 }else{
                   this.list3=res
                 }
          })
        }else{
          this.$toast('请您输入正确的手机号')
        }   
   },

  tobookingxq(item){
       this.confirmList.push(item)
       this.$router.push({name:'bookingDetail',params:{id:item.id}})
  },
  booklist1(i,n){
    let ids=localStorage.getItem('bookId')
     interfaces.bookList2(i).then((res)=>{
              if(res!=null){
              this.list1=res
              this.list1.forEach((item,index)=>{
               let other=item.book_time 
               let s2=other.split('-')
                  this.moth=s2[1]
                  this.date=s2[2]
                  this.list1[index].moth=this.moth
                  this.list1[index].date=this.date
                  this.list1[index].checked=false
               })
               this.active=n
              }
          })
    },
 booklist2(i,n){
     interfaces.bookList2(i).then((res)=>{
       if(res!=null){
              this.list2=res
              this.active=n
              this.list2.forEach((item,index)=>{
               let other=item.book_time 
               let s2=other.split('-')
                  this.moth=s2[1]
                  this.date=s2[2]
                  this.list2[index].moth=this.moth
                  this.list2[index].date=this.date
              })
             }
          })
     },
 booklist3(i,n){
           interfaces.bookList2(i).then((res)=>{
             if(res!=null){
              this.list3=res
              this.list3.forEach((item,index)=>{
               let other=item.book_time 
               let s2=other.split('-')
                  this.moth=s2[1]
                  this.date=s2[2]
                  this.list3[index].moth=this.moth
                  this.list3[index].date=this.date
               })
             this.active=n
           }
         })
},
 onClick(index,title){
        if(title==this.$i18n.t('m.others5')&&index==0){
           if(this.num==undefined){
            this.booklist1(1,0)
            // this.togetnumber(1,this.inputVal)
           }else{
             this.booklist1(this.num,this.active)
           }
        }else if(title==this.$i18n.t('m.others6')&&index==1){
          console.log(this.num,this.active)
           if(this.num==undefined){
            this.booklist2(2,1)
            // this.togetnumber2(2,this.inputVal2)
           }else{
             this.booklist2(this.num,this.active)
           }
        }else if(title==this.$i18n.t('m.others7')&&index==2){
          console.log(this.num,this.active)
            if(this.num==undefined){
            this.booklist3(3,2)
            // this.togetnumber3(3,this.inputVal3)
           }else{
             this.booklist3(this.num,this.active)
           }
        }
     },
showRight(id) {
      let status=2
      let data={id,status}
      interfaces.jieshou(data).then(res=>{
             this.show_right = true;
           setTimeout(()=> {
                  this.show_right = false;
                   this.active=1
                   this.booklist2(2,1)
             }, 3000);
         })
       },
       toCallPhone(mobile){
         console.log(mobile,'获取手机号')
         window.location.href = 'tel://'+mobile
       },
},
  components:{
    aheaders,
    footers
  }
}
</script>

<style>
.books .van-tabs--line .van-tabs__wrap {
    height: 44px;
    border-bottom: 1px solid #d9d9d9;
}

.van-tabs--line .van-tabs__wrap{ border-bottom: 1px solid #d9d9d9;}

.bookings{width:100%;margin:0 auto; min-height: 100%;padding-bottom:5.96rem;box-sizing: border-box;position:relative;}
.book-list{width:90%;height:auto;margin:0.2rem auto;}
.book-list ul{width:100%;height:auto;margin:0 auto;}
.book-list ul li{width:auto;height:auto;margin:0 auto;display: flex;align-items: flex-end;border-bottom:0.03rem solid #f1f1f1;padding:0.4rem 0;position: relative;}

.book-list ul li .date{display: flex;align-items: center;flex-direction: column;width:1.28rem;}
.book-list ul li .date a{display: flex;align-items: center;flex-direction: column;}
.book-list ul li .date a>span{font-size:0.44rem;color:#fff;background-color: #9da3ad;width:1.28rem;height:0.85rem;text-align: center;line-height:0.85rem;border-top-left-radius: 4px;border:1px solid transparent; 
    border-top-right-radius: 4px;
}
.book-list ul li .date a>i{font-size:0.35rem;color:#5975a9;background-color: #fff;width:1.25rem;height:0.85rem;line-height:0.85rem;text-align: center;border:1px solid #c1c7d2;    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
}
.date_02{width:2.48rem;height:auto;display: flex;align-items: left;flex-direction: column;margin-left:0.34rem;}
.date_02 a{display: flex;align-items: left;flex-direction: column;}
.date_02 span{color:#666666;font-size:0.3rem;margin:0.1rem 0;}
.date_02 .date-icon{color:#010101;font-size:0.4rem}

.van-tabs .van-tab{flex:1;}
.date_03{width:5.50rem;height:0.78rem;display: flex;flex-direction: column;justify-content: flex-end;margin-left:1.1rem;}
.date_03 .isNew{width:auto;height:auto;text-align: right; position: absolute;top: 0;right: 0;
} 
.date_03 .isNew img{width:0.94rem;height:0.39rem;}
.date_03 .total-button{display: flex;align-items: right;flex-direction: row;}
.date_03 .total-button a{display: inherit;}

.date_03 .total-button button::after {
  border: none;
}
.date_03 .total-button button{width:2.14rem;height:0.78rem;line-height:0.78rem;font-size:0.34rem;padding:0;margin-left:0.2rem;border:none;}
.date_03 .total-button button span{font-size:0.34rem;}
.date_03 .total-button .s11{background-color: #fff;border:1px solid #5975a9;color:#5975a9;}
.date_03 .total-button .s22{background-color: #5975a9;border:1px solid #5975a9;color:#fff;}
.date_03 .total-button .s11 span{color:#5975a9;}
.date_03 .total-button .s22 span{color:#fff;}

.more-list{width:auto;height:auto;margin:0.5rem 0; display:flex;align-items: center;justify-content:center;}
.more-list img{width:1.2rem;height:0.3rem;}

.date_03  .onlyone button{margin:0 0 0 auto;}



.good {
  width: 7.7rem;
  height: 4rem;
  margin: 0 auto;
  overflow: hidden;
  /* padding-top:1.5rem; */
}
.good img {
  display: block;
  margin: 0 auto;
  margin-top: 1rem;
}
.good p {
  font-size: 0.45rem;
  text-align: center;
  margin-top: 0.5rem;
}
#bookings .van-popup {
    border-radius: 10px;
    overflow:visible;
}
.nolist{
      display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.35rem;
}
.search-phone{width:auto;height:auto;position:relative;}
.search-phone .van-search{flex:1;}
.search-phone .search{ width: auto;
    padding: 5px 10px;
    position: absolute;
    top: 12px;
    right: 15px;
    color:#fff;
    background-color: #5975a9;
    border: 1px solid #5975a9;
    font-size: 0.34rem;}
</style>
