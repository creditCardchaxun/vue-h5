
<template>
  <div class="biji">
 
   <!-- <div>时间段:{{starttime}}至{{endtime}}</div> -->
 
    <div class="mobile-top">
      <div class="sel-time">
        <p>开始时间</p>
        <p class="start-date">{{starttime}}</p>
      </div>
      <div class="unsel-time">
        <p>结束时间</p>
        <p class="end-date">{{endtime==''?'请选择结束日期':endtime}}</p>
      </div>
    </div>
 
    <div class="title">
      <div class="btn" @click="last()" 
       :class="(month<=nowmonth)&&(Year<=nowYear)?'noclick':'' ">上一月</div>
      <div class="text">{{Year}}年{{month}}月</div>
      <div class="btn" @click="next()">下一月</div>
    </div>
 
    <div class="head">
      <div class="days" v-for="(item,index) in ['星期日','星期一','星期二','星期三','星期四','星期五','星期六']" :key="index">
        {{item}}
      </div>
    </div>
 
    <div class="wrap">
      <div class="span" v-for="(item,index) in calendarList" :key="index" @click="click(item.count)" :class="item==''?'kong'
      :item.count<nowtime?'noclick'
      :(item.count>=starttime&&item.count<=endtime)||item.count==starttime?'active':''">
        {{item.value}}
      </div>
    </div>
 
    <div class="bottombtn">
      <button class="cancle-btn" @click='cancle()'>取消</button>
      <button class="sure-btn" @click='firm()'>确定</button>
    </div>
  </div>
</template>
 
<script>
  export default {
    name: 'Biji',
    // props:{
    //  start:String,
    //  end:String
    // },
    data() {
      return {
        nowtime: '', //当前日期的时间戳
 
        clickitem: 0, //点击的时间戳
        clickcount: 0, //点击次数
        starttime: '', //开始时间 数字   默认选中当天日期
        endtime: '', //结束时间 数字
 
        Year: new Date().getFullYear(),   //日历上的年份
        month: new Date().getMonth() + 1, //日历上的月份
        Day: new Date().getDate(),        //日历上的天份
 
        nowYear: new Date().getFullYear(),
        nowmonth: new Date().getMonth() + 1,
        nowDay: new Date().getDate(),
 
        calendarList: [],
      }
    },
    created() {
      this.Draw(this.nowYear, this.nowmonth);
 
      let time_month = this.nowmonth; //现在的月份
      let time_day = this.nowDay; //现在的天数
      if (this.nowmonth < 10) {
        time_month = 0 + '' + this.nowmonth;
      }
      if (this.nowDay < 10) {
        time_day = 0 + '' + this.nowDay;
      }
 
      this.nowtime = this.nowYear + '-' + time_month + '-' + time_day;
      this.starttime = this.nowtime;
      this.endtime = this.nowtime;
    },
    computed: {},
 
    methods: {
 
      Draw: function (Year, Month) {
 
        //日期列表
        var calendar = [];
 
        //用当月第一天在一周中的日期值作为当月离第一天的天数(获取当月第一天是周几)
        for (var i = 1, firstDay = new Date(Year, Month - 1, 1).getDay(); i <= firstDay; i++) {
           calendar.push("");
        }
 
        //用当月最后一天在一个月中的日期值作为当月的天数
        for (var i = 1, monthDay = new Date(Year, Month, 0).getDate(); i <= monthDay; i++) {
 
          let time_month = Month;
          let time_day = i;
          if (Month < 10) {
            time_month = 0 + '' + Month;
          }
          if (i < 10) {
            time_day = 0 + '' + i;
          }
 
          calendar.push({
            value: i,
            count: Year + '-' + time_month + '-' + time_day
          })
        }
        this.calendarList = calendar;
        // console.log(calendar)
      },
 
      last() {
        this.month--;
        if (this.month == 0) {
          this.month = 12;
          this.Year--;
        }
 
        this.Draw(this.Year, this.month);
      },
 
      next() {
        this.month++;
        if (this.month == 13) {
          this.month = 1;
          this.Year++;
        }
 
        this.Draw(this.Year, this.month);
      },
 
 
      click(item) {
        this.clickcount++;
        this.clickitem = item;
 
        //开始日期
        if (this.clickcount % 2 == 1) {
          this.starttime = this.clickitem;
          this.endtime = ''
        } else {
          this.endtime = this.clickitem;
          if (this.starttime > this.endtime) {
            this.endtime = this.starttime;
            this.starttime = this.clickitem;
          }
        }
      },
 
    //  确认按钮
      firm(){
        this.$parent.$parent.hidepop();
        this.senMsg(this.starttime,this.endtime)
        },
      senMsg(s1,s2){
        let datas={s1,s2}
        this.$emit('startTime',datas)
      },
    
    // 取消按钮
      cancle(){
    //    this.$parent.$parent.$parent.hidepop();
        this.starttime = this.nowtime;
        this.endtime = this.nowtime;
        this.senMsg(this.starttime,this.endtime)
        this.$parent.$parent.hidepop();
      }
 
    }
 
  }
 
</script>
 
<style scoped>
/* //   @import "../common/common"; */
 
  .wrap {
    width: 8.5rem;
    height: auto;
    overflow: hidden;
    /* padding-bottom: 1rem; */
    padding:0.3rem 0 0.5rem;
  }
 
  .span {
    width: 1.19142rem;
    height: 0.7rem;
    background: #fff;
    color: #337ab7;
    float: left;
    text-align: center;
    line-height: 0.7rem;
    font-size: 0.3rem;
  }
   .span.active {
      background: #5975a9;
      color: #fff;
    }
 
    .span.noclick {
      pointer-events: none;
      background: #ccc;
    }
 
   .span.kong {
      background: #fff;
      pointer-events: none;
    }
  /* } */
 
  .mobile-top {
    display: flex;
    flex-wrap: nowrap;
    background: #fff;
    padding: 0.1rem 0;
    font-size: 0.35rem;
  }
   .mobile-top .sel-time {
      text-align: center;
      width: 50%;
      line-height: 0.5rem;
   }
    .start-date{
        color: #b1b1b1;
        margin-top: 0.05rem;
     }
    
    .unsel-time {
      text-align: center;
      width: 50%;
      line-height: 0.5rem;
         }
     .unsel-time  .end-date{
        color: #b1b1b1;
         margin-top: 0.05rem;
      }
 
  /* } */
 
  .title{
    width: 100%;
    height: 40px;
    background-color: #5975a9;
    display: flex;
    flex-wrap: nowrap;
    text-align: center;
    color: #fff;
    font-weight: bold;
    line-height: 40px;
    font-size: 0.35rem;
  }
    .btn{
      width: 1.2rem; 
    }  
      .btn .noclick{
        pointer-events: none;
         background: #ccc;
      }
    
    .text{
      flex: 1;
    }
  
 
  .head{
  display: flex;
  flex-wrap: nowrap;
  text-align: center;
  height: 40px;
  line-height: 40px;
  }
  .days{
    flex: 1;
    font-size:0.3rem;
  }
  
  .bottombtn {
    height: 40px;
    width: 100%;
    display: flex;
    flex-wrap: nowrap;
    /* justify-content: center; */
  }
    button {
      flex: 1;
      font-size:0.4rem;
      border:none;
      padding:0;
      background: #ccc;
    }
 
    .sure-btn {
      background: #5975a9;
      /* border-bottom-right-radius: 5px; */
      color: #fff;
    }
  
 
</style>
