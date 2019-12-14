<template>
 <div class="myReserve">
 <aheaders status='3' @toback='toreplace' :showLan='true'></aheaders>
 <div class="myreserve">
    <van-cell-group>
          <van-field 
            v-model="value"
            :key='id'
            :placeholder="$t('m.bookName2')" 
            :label="$t('m.bookName')" 
            readonly
            right-icon="arrow-down"
            @click="showPopup"
          />
           <div class="timesall" style=''>
           <van-field 
            v-model="value2"
             width=""
            :placeholder="$t('m.house9')" 
            :label="$t('m.bookName3')" 
            readonly
            @click="showPopup2"
          />
           
           -
            <!-- <input type="text" v-model="value3" class='endtime'>  -->
        <van-field 
            style='padding-left:52px;width:48%'
            :placeholder="$t('m.house9')" 
            v-model="value3"
            right-icon="arrow-down"
            readonly
            @click="showPopup2"
          />
           </div>
        <div class="names">
        <van-field 
            style='width:60%'
              v-model="names"
              id='myReserveInput'
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
            readonly
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
      
      <div class="modelToast" v-show='successHref'>{{$t('m.show13')}}</div>

  <afooter></afooter> 
    </div>
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
import { Field } from 'vant';
Vue.use(Field);
import { Icon ,Dialog} from 'vant';
Vue.use(Icon,Dialog);
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
         },
         goback:'',
         lanBase:'',
         successHref:false
        }
    },
    //    computed(){
    //  this.getHeight.minHeight = (window.outerHeight/window.outerWidth * 10.8 - 5.96)+'rem'
    // },
    created(){
      let mobile=JSON.parse(localStorage.getItem('userinfo')).mobile
      this.lanBase=localStorage.getItem('lanBase')
      this.phone=mobile;
      let id=this.$route.params.id
      let name=this.$route.params.name
      this.value=name
      this.id=id
      this.getHeight.minHeight=(window.outerHeight/window.outerWidth * 10.8 - 5.96)+'rem'
      // this.getListhouses()
    },
      beforeRouteEnter (to, from, next) {
        // this.goback=from.name
      interfaces.getxiecheng().then(function (res) {
      next(vm=>
         {
           vm.columns=res
        })
    })
  },
      mounted(){
           $eventbus.$on("changeLang", (res)=>{
              let id=this.$route.params.id
              // let name=this.$route.params.name
              // this.value=name
              this.getdetailhouses(id)
              this.id=id
              this.getListhouses()
              console.log(res)
          })
       },
    methods:{
        getdetailhouses(id) {
          interfaces.getdetailhouse(id).then(res => {
            this.value = res.project_name
          });
        },
         toreplace(){
          Dialog.confirm({
            title: this.$i18n.t('m.other1'),
            message: this.$i18n.t('m.other2'),
            confirmButtonText:this.$i18n.t('m.other4'),
            cancelButtonText:this.$i18n.t('m.other3')
          }).then(() => {
            return;
          }).catch(() => {
            this.$router.go(-1)
          });
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

        // 比较二个日期的天数
         DateDiff(sDate1,  sDate2){  //日期格式 2019-12-18
          var  aDate,  oDate1,  oDate2,  iDays
          aDate  =  sDate1.split("-")
          oDate1  =  new  Date(aDate[1]  +  '-'  +  aDate[2]  +  '-'  +  aDate[0])    //转换为12-18-2019格式
          aDate  =  sDate2.split("-")
          oDate2  =  new  Date(aDate[1]  +  '-'  +  aDate[2]  +  '-'  +  aDate[0])
          iDays  =  parseInt(Math.abs(oDate1  -  oDate2)  /  1000  /  60  /  60  /24)    //把相差的毫秒数转换为天数
          return  iDays
          },

        
        submitInfor(){
              if(!this.id ){
               this.$toast(this.$i18n.t('m.show6'))
               return;
              }
              if(!this.names ){
               this.$toast(this.$i18n.t('m.show7'))
               return;
             }
               if(!this.radio){
               this.$toast(this.$i18n.t('m.show8'))
               return;
              }
              if(!/^1[345678]\d{9}$/.test(this.phone)||!this.phone){
               this.$toast(this.$i18n.t('m.show9'))
               return;
              }
              if(!this.value2&&!this.value3){
               this.$toast(this.$i18n.t('m.show10'))
               return;
              }
               
              let projectid=this.id     //项目id
              let name=this.names            //订单人姓名
              let user_id=JSON.parse(localStorage.getItem('userinfo')).id   //订单人id
              let in_time =this.value2   //入住时间
              let out_time=this.value3   //离开时间
              let mobile=this.phone   //手机号
              let sex=this.radio    //男女性别

              let date1,date2,date3,date4
               date1=this.value2.split('-')
               date2=date1[0]+date1[1]+date1[2]
            let data={projectid,name,user_id,in_time,out_time,mobile,sex}
             interfaces.bookSave2(data).then((res)=>{
               console.log(res)
                  if(res.code==0){
                //  此处自定义修改弹框  盛修改
                      this.successHref=true
                   let xiecheng_id=res.data.xiecheng_id
                 if(this.lanBase==1){
               
                    setTimeout(()=>{
                      this.successHref=false
                    window.location.href = ('https://m.ctrip.com/webapp/hotel/hoteldetail/'+xiecheng_id+'.html?atime='+date2 +'&days='+this.DateDiff(this.value2, this.value3))
                    },3000)
                   }else if(this.lanBase==4){
                  
                    
                    setTimeout(()=>{
                       this.successHref=false
                      // https://www.trip.com/m/hotels/shanghai-hotel-detail-483962/?checkin=2019-12-13&checkout=2019-12-23
                    window.location.href = (' https://www.trip.com/m/hotels/shanghai-hotel-detail-'+xiecheng_id+'/?checkin='+in_time +'&checkout='+out_time)
                    },3000)
                   } 
                
                     
                  }
              })  
              
            },

        // 获取所有项目列表名称
           getListhouses(){
              interfaces.getxiecheng().then((res)=>{
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
/* .myReserve >>> #myReserveInput::-webkit-input-placeholder{
    color:#333;
}
.myReserve >>> #myReserveInput::input-placeholder{
    color:#333;
}
.myReserve >>> .van-cell__value .van-field__control{
    color: #333 !important;
  }
  .myReserve >>> .van-cell__value .van-field__control:disabled {
      color: #333;
      -webkit-text-fill-color: #333 !important;
      background-color: transparent;
      opacity: 1;
  }

.myReserve >>> ::-moz-placeholder { 
    color: #333;
}

.myReserve >>> input:-ms-input-placeholder,
.myReserve >>> textarea:-ms-input-placeholder {
    color: #333;
}

.myReserve >>> input::-webkit-input-placeholder,
.myReserve >>> textarea::-webkit-input-placeholder {
    color: #333;
} */
.modelToast{   
   width: 5rem;
    height: auto;
    position: fixed;
    top: 40%;
    left: 28%;
    background: rgba(0,0,0,0.5);
    color: #fff;
    border-radius: 4px;
    font-size: 0.35rem;
    line-height: 0.6rem;
    text-align: center;
    padding: 0.5rem;}

.myReserve{width:100%;margin:0 auto; min-height: 100%;padding-bottom:5.96rem;box-sizing: border-box;position:relative;}
.names{position:relative;border: 1px solid #f5f5f5;}
.names .van-radio-group{position:absolute;right: 14px;top:20px;display: flex;align-items: center;}
.names .van-radio{margin-right:0.2rem;font-size:0.3rem;}
.names >>> .van-cell:not(:last-child)::after {border-bottom: none;}
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
    font-size: 0.38rem;
    border: none;
    /* margin-left: 10%; */
    border-radius: 5px;
    margin: 1.2rem auto 1.64rem;}

 .btns-submit[disabled] {
  background-color: #dddddd;
  color:#333;
}
/* .endtime{position:absolute;top:10px;right:10px;border:none;font-size:0.35rem;color:#ddd;width:35%;}
.timesall .van-cell{width:70%;} */

.timesall{position:relative;font-size:0.3rem;display:flex;  align-items: center;margin:0  0.4rem;}
.timesall .van-cell{padding:16px 0px;flex: none;width:50%;}
.timesall .van-cell .van-cell__value{width:50% !important;}
.timesall >>> .van-cell:not(:last-child)::after {border-bottom: none;}
</style>