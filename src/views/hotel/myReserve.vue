<template>
 <div class="myReserve" :style='getHeight'>
 <aheaders status='3' @toback='toreplace'></aheaders>
 <!-- <van-cell is-link @click="showPopup">项目</van-cell> -->
    <van-cell-group>
          <van-field 
            v-model="value"
            :key='id'
            :placeholder="$t('m.bookName2')" 
            :label="$t('m.bookName')" 
            disabled="true"
            right-icon="arrow-down"
            @click="showPopup"
          />
           <div class="timesall" style=''>
           <van-field 
            v-model="value2"
             width="45%"
            :placeholder="$t('m.house9')" 
            :label="$t('m.bookName3')" 
            disabled="true"
            @click="showPopup2"
          />
           
           -
            <!-- <input type="text" v-model="value3" class='endtime'>  -->
        <van-field 
            style='padding-left:30px;width:40%'
            v-model="value3"
            right-icon="arrow-down"
            disabled="true"
            @click="showPopup2"
          />
           </div>
        <div class="names">
        <van-field 
            style='width:60%'
            v-model="names"
             :placeholder="$t('m.house10')" 
            :label="$t('m.bookName4')" 
        />
        <van-radio-group v-model="radio">
            <van-radio name="0">{{$t('m.woman')}}</van-radio>
            <van-radio name="1">{{$t('m.man')}}</van-radio>
            </van-radio-group>
        </div>

       <div class="phones">
         <van-field 
            v-model="phone"
            :placeholder="$t('m.s1')" 
            :label="$t('m.s1')" 
            disabled="true"
          />
          <span @click="changePhone">{{$t('m.changePhone')}}</span>
       </div>
    </van-cell-group>

     <div class="reserve">
        <!-- 项目 -->
        <van-popup v-model="show" position="bottom" :overlay="true">
           <van-picker show-toolbar :title="$t('m.bookName')" :columns="columns"  value-key="project_name" @cancel="onCancel" @confirm="onConfirm" @change="onChange" />
        </van-popup>
         <!-- 时间pick -->
        <van-popup v-model="show2" :overlay="true">
<!--            <van-datetime-picker
                v-model="currentDate"
                type="date"
                :min-date="minDate"
                @confirm="confirmPicker"
                @change="onChanges"
                /> -->
             <date @startTime='togetTime'></date>
        </van-popup>
     
       <button class='btns-submit' type='submit' :disabled="isClick" @click='submitInfor'>{{$t('m.s4')}}</button>
     </div>
     
        <submitBtn v-if='hideModel' @tohideModel='tohideModel'></submitBtn>
  <afooter></afooter> 
  </div> 
</template>
<script>
import aheaders from "@/components/Header";
import afooter from "@/components/Footer";
import submitBtn from "@/components/submitBtn";
import date from "@/components/date";
import interfaces from "@/utils/api.js";
import Vue from 'vue';
import { Popup } from 'vant';
Vue.use(Popup);
import { Picker,DatetimePicker  } from 'vant';
 Vue.use(Picker).use(DatetimePicker);

 import { RadioGroup, Radio } from 'vant';
Vue.use(RadioGroup);
Vue.use(Radio);


export default {
    name:'myReserve',
    data(){
        return{
           show: false,
           show2: false,
          //  message:'请选择区域代理',
           columns:[],
           value:'',
           value2:'',
           value3:'',
           currentDate: new Date(),
            minDate: new Date(),
             radio: '0',
             hideModel:false,
             phone:'',
             sms:'',
             names:'',
             disabled:false,
             id:'',
             mobileLocal:'',
         getHeight:{
              minHeight:''
         }
        }
    },
    created(){
      let mobile=JSON.parse(localStorage.getItem('userinfo')).mobile
      this.phone=mobile;
      let id=this.$route.params.id
      let name=this.$route.params.name
      this.value=name
      this.id=id
      this.getHeight.minHeight=window.innerHeight+'px'
      // this.getListhouses()
    },
      beforeRouteEnter (to, from, next) {
      interfaces.getListhouse().then(function (res) {
      next(vm=>
         {
           vm.columns=res
        })
    })
  },
      mounted(){
           $eventbus.$on("changeLang", (res)=>{
              let id=this.$route.params.id
              let name=this.$route.params.name
              this.value=name
              this.id=id
              this.getListhouses()
          })
       },
    
    methods:{
         toreplace(){
         this.$router.go(-1)
       },
       togetTime(data){
       this.value2=data.s1
       this.value3=data.s2
       },
      hidepop(){
        this.show2=false
       },
        showPopup(){
            this.show=true
        },
        onChange(Picker,value,index){
            console.log(value)
        },
        onCancel(){
            this.show=false
        },
        onConfirm(value,index){
           this.show=false
           this.value=value.project_name
           this.id=value.id
        },
        // 时间日期操作
 
        onChanges(e){
            console.log(e)
        },
        showPopup2(){
             this.show2=true
         },
        confirmPicker(value) {// 确定按钮，时间格式化并显示在页面上
            var date = value;
            var m = date.getMonth() + 1;
            var d = date.getDate();
            if (m >= 1 && m <= 9) {
                m = "0" + m;
            }
            if (d >= 0 && d <= 9) {
                d = "0" + d;
            }
            var timer = date.getFullYear() + "-" + m + "-" + d
            // this.$refs[this.datePicker].innerHTML = timer;
            this.value2=timer
            this.show2= false;
            this.datePicker = "";
        },
        formatter(type, value) {// 格式化选择器日期
            if (type === "year") {
                return `${value}年`;
            } else if (type === "month") {
                return `${value}月`;
            }
            return value;
        },

        changePhone(){
         this.hideModel=true
        },
        tohideModel(){
         this.hideModel=false 
        },
        
        submitInfor(){
              if(!this.id ){
               this.$toast('请选择项目')
               return;
              }
              if(!this.names ){
               this.$toast('请输入姓名')
               return;
             }
               if(!this.radio){
               this.$toast('请选择性别')
               return;
              }
              if(!/^1[345678]\d{9}$/.test(this.phone)||!this.phone){
               this.$toast('请填写正确的手机号码')
               return;
              }
              if(!this.value2&&!this.value3){
               this.$toast('请选择预订时间')
               return;
              }

              let projectid=this.id     //项目id
              let name=this.names            //订单人姓名
              let user_id=JSON.parse(localStorage.getItem('userinfo')).id   //订单人id
              let in_time =this.value2   //入住时间
              let out_time=this.value3   //离开时间
              let mobile=this.phone   //手机号
              let sex=this.radio    //男女性别

            let data={projectid,name,user_id,in_time,out_time,mobile,sex}
                 console.log(data)
             interfaces.bookSave2(data).then((res)=>{
                  if(res.code==0){
                    this.$toast('预定信息成功')
                   let xiecheng_id=res.xiecheng_id
                     this.value2=''
                     this.value3='' 
                     this.names =''  
                    setTimeout(()=>{
                    window.location.href('https://m.ctrip.com/webapp/hotel/hoteldetail/'+xiecheng_id+'.html?atime='+this.value2 +'&ctm_ref=ch5_hp_bs_lst')
                    },1000)
                     
                  }
              })  
              
            },

        // 获取所有项目列表名称
           getListhouses(){
              interfaces.getListhouse().then((res)=>{
                  this.columns=res
           })
           }


    },
   computed: {
      isClick() {
      if (!this.value||!this.value2||!this.names||!this.phone) return true;
      else return false;
    }
  },
    components:{
    aheaders,
    afooter,
    date,
    submitBtn
  }
}
</script>

<style scoped>
.names{position:relative;}
.names .van-radio-group{position:absolute;right: 14px;top:20px;display: flex;align-items: center;}
.names .van-radio{margin-right:0.2rem;font-size:0.3rem;}
.phones{position:relative;}
.phones span{font-size:0.3rem;color:#5975a9;position:absolute; top: 20px;right: 14px;}
.reserve{width:80%;height:auto;margin:0 auto;}
.myReserve .van-cell{padding:16px 16px;}
.btns-submit{width: 100%;
    height: 1.0rem;
    line-height: 1.0rem;
    color: #fff;
    text-align: center;
    background-color: #5975a9;
    font-size: 0.3rem;
    border: none;
    /* margin-left: 10%; */
    border-radius: 0.1rem;
    margin: 1.2rem auto 1.64rem;}

      .btns-submit[disabled] {
  background-color: #dddddd;
  color:#333;
}
/* .endtime{position:absolute;top:10px;right:10px;border:none;font-size:0.35rem;color:#ddd;width:35%;}
.timesall .van-cell{width:70%;} */

.timesall{position:relative;font-size:0.3rem;display:flex;  align-items: center;margin:0  0.4rem;}
.timesall .van-cell{padding:16px 0px;flex: none;width:56%;}
.timesall .van-cell .van-cell__value{width:50% !important;}
</style>