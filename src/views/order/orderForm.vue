<template>
  <!-- :style='getHeight' -->
  <div class="myReserve">
    <div>
      <aheaders status="3" @toback="toreplace" :showLan="true"></aheaders>
      <!-- <van-cell is-link @click="showPopup">项目</van-cell> -->
      <!-- <h1>{{name}}</h1> -->
      <van-cell-group>
        <!-- <div class="inputGroup" 
        @click="showPopup">
           <label for="">{{$t('m.house1')}}</label>
           <input type="text" disabled="true"  v-model="value" :placeholder="$t('m.house8')">
           <span arrow-down></span>
        </div>-->
        <van-field
          v-model="value"
          id="input1"
          :placeholder="$t('m.house8')"
          :label="$t('m.house1')"
          right-icon="arrow-down"
          readonly
          @click="showPopup"
          @blur="onBlurRepireIos"
          @focus="onFocusRepireIos"
        />
        <van-field
          v-model="value2"
          id="input2"
          :placeholder="$t('m.house9')"
          :label="$t('m.house2')"
          right-icon="arrow-down"
          readonly
          @click="showPopup2"
          @blur="onBlurRepireIos"
          @focus="onFocusRepireIos"
        />
        <div class="names">
          <van-field
            type="text"
             v-model="Personalname"
            :placeholder="$t('m.house10')"
            :label="$t('m.house3')"
            id="orderFormInput"
            @blur="onBlurRepireIos"
            @focus="onFocusRepireIos"
          />
          <van-radio-group v-model="radio">
            <van-radio name="1">{{$t('m.woman')}}</van-radio>
            <van-radio name="0">{{$t('m.man')}}</van-radio>
          </van-radio-group>
        </div>

        <div class="phones">
          <!-- <van-field> -->

          <!-- </van-field> -->
          <van-field
            v-model="phone"
            id="input4"
            :placeholder="$t('m.house11')"
            :label="$t('m.house4')"
            type="number"
            readonly
          />
          <span @click="changePhone">{{$t('m.changePhone')}}</span>
        </div>

        <div class="yixiang">
          <p>{{$t('m.house7')}}</p>
          <div class="all-p" v-show="tags.length">
            <span
              v-for="(item,index) in tags"
              :key="index"
              @click="chooseTag($event,tags[index])"
              :class="{onstag:tags[index]&&tags[index].checked}"
            >{{item}}</span>
          </div>
          <textarea
            v-model="message"
            name="message"
            id="input5"
            cols="20"
            rows="2"
            :placeholder="$t('m.house6')"
            @blur="onBlurRepireIos"
            @focus="onFocusRepireIos"
          ></textarea>
        </div>
      </van-cell-group>

      <div class="reserve">
        <!-- 项目 -->
        <van-popup v-model="show" position="bottom" :overlay="true">
          <van-picker
            show-toolbar
            :title="$t('m.house1')"
            :columns="columns"
            value-key="project_name"
            @cancel="onCancel"
            @confirm="onConfirm"
            @change="onChange"
          />
        </van-popup>
        <!-- 时间pick -->
        <van-popup v-model="show2" position="bottom" :overlay="true">
          <van-datetime-picker
            v-model="currentDate"
            type="date"
            :min-date="minDate"
            :max-date="maxDate"
            :confirm-button-text="$t('m.date1')"
            :cancel-button-text="$t('m.date2')"
            @confirm="confirmPicker"
            @cancel="cancelPicker"
            @change="onChanges"
          />
        </van-popup>

        <button class="btns-submit" :disabled="isClick" @click="submitInfor">{{$t('m.orderform')}}</button>
      </div>
      <!-- 传入手机 国籍 china 区号 0086 监听手机信息改变 监听关闭事件 -->
      <submitBtn
        v-if="hideModel"
        :phone="hideModel"
        :code="hideModel"
        @tohideModel="tohideModel"
        @update1="getPhones111"
      ></submitBtn>

      <van-popup v-model="show_right">
        <div class="good">
          <img src="../../assets/images/checkmark.png" alt style="width:1.05rem;height:0.95rem;" />
          <p style="color:#000;font-size:0.4rem;">{{$t('m.other5')}}</p>
        </div>
      </van-popup>
    </div>
    <!-- 信息弹框  盛修改 -->
    <div class="modelToast" v-show='successHref'>{{getTostat}}</div>  
    <afooter></afooter>
  </div>
</template>
<script>
import interfaces from "@/utils/api.js";
import aheaders from "@/components/Header";
import afooter from "@/components/Footer";
import submitBtn from "@/components/submitBtn";

import Vue from "vue";
import { Popup } from "vant";
Vue.use(Popup);
import { Picker, DatetimePicker } from "vant";
Vue.use(Picker).use(DatetimePicker);
import { Icon, Dialog } from "vant";
Vue.use(Icon, Dialog);
import { Field } from "vant";
Vue.use(Field);
import { RadioGroup, Radio } from "vant";
Vue.use(RadioGroup);
Vue.use(Radio);

export default {
  name: "myReserve",
  data() {
    return {
      // registerForm:{

      // },
      show: false,
      show2: false,
      //    message:'请选择区域代理',
      columns: [],
      tags: [],
      value: "",
      value2: "",
      Personalname: "",
      message: "",
      currentDate: new Date(new Date().getTime() + 1000 * 3600 * 24),
      minDate: new Date(new Date().getTime() + 1000 * 3600 * 24),
      maxDate: new Date(new Date().getTime() + 1000 * 3600 * 24 * 180),
      radio: "1",
      hideModel: false,
      phone: "",
      sms: "",
      onstags: false,
      currentIndex: "",
      hoverSum: false,
      disabled: false,
      ids: "",
      intention: [],
      show_right: false,
      checked: false,
      getHeight: {
        minHeight: ""
      },
      getTostat:'',
      successHref:false



    };
  },

  computed: {
    // (!this.intention[0]&&!this.intention[1]&&!this.message)
    isClick() {
      if (
        !this.value ||
        !this.value2 ||
        !this.Personalname ||
        !this.phone
        // !this.intention ||
        // !this.message
      )
        return true;
      else return false;
    }
  },
  mounted() {
    $eventbus.$on("changeLang", res => {
      this.tags = []
      this.bookHouses();
      this.ids = this.$route.params.id;
      this.value = this.$route.params.name;
      let mobile = this.$route.params.mobile;
      this.orderid=this.$route.params.orderid;
      if (mobile) {
        this.phone = mobile;
      } else {
        //  this.phone=''
        this.phone = JSON.parse(localStorage.getItem("userinfo")).mobile;
      }
      if (this.ids) {
        this.getdetailhouses(this.ids)
        this.bookTag(this.ids);
      }
        if(this.orderid){
       this.editMain(this.orderid)
     }
    });
  },
  // computed:{
  //     minHeight(){
  //       return (window.outerHeight/window.outerWidth * 10.8 - 5.96)+'rem'
  //     }
  //   },

  created() {
    this.ids = this.$route.params.id;
    this.value = this.$route.params.name;
    let mobile = this.$route.params.mobile;
    this.orderid=this.$route.params.orderid;
    this.getHeight.minHeight =
      (window.outerHeight / window.outerWidth) * 10.8 - 5.96 + "rem";
    if (mobile) {
      this.phone = mobile;
    } else {
      //  this.phone=''
      this.phone = JSON.parse(localStorage.getItem("userinfo")).mobile;
    }
    if (this.ids) {
      this.bookTag(this.ids);
    }
    if(this.orderid){
       this.editMain(this.orderid)
    }

    // this.bookHouses();
  },

  beforeRouteEnter(to, from, next) {
    let id = to.params.id;
    // let orderid = to.params.orderid;
    // 项目列表
    interfaces.bookHouse().then(function(res) {
      next(vm => {
        vm.columns = res;
      });
    });
    // 意向标签
    //  interfaces.bookTags(id).then(res => {
    //     next(vm => {
    //      if(res!=null){
    //        vm.tags = res;
    //      }
    //     })
    //   });

  },
  methods: {
    editMain(orderid){
      interfaces.editForm(orderid).then(res => {
          this.columns.forEach((item,index)=>{
             if(res.data.projectid==item.id){
               this.ids = res.data.projectid;
               this.value = item.project_name;
             }
          })
          this.Personalname = res.data.name;
          this.radio = res.data.sex;
          this.phone = res.data.mobile;
          this.message = res.data.intention;
          this.value2 = res.data.book_time;
        });
    },
    getdetailhouses(id) {
      interfaces.getdetailhouse(id).then(res => {
        this.value = res.project_name
      });
    },
    //  filters(type, options) {
    //   if (type === 'month') {
    //     return options.filter(option => option % 2 === 0)
    //    }
    //     return options;
    //   },
    // 返回上一页
    toreplace() {
      Dialog.confirm({
        title: this.$i18n.t("m.other1"),
        message: this.$i18n.t("m.other2"),
        confirmButtonText: this.$i18n.t("m.other4"),
        cancelButtonText: this.$i18n.t("m.other3")
      })
        .then(() => {
          return;
        })
        .catch(() => {
          this.$router.go(-1);
        });
    },
    getPhones111(data) {
      this.phone = data;
    },

    // 公寓选择
    bookHouses() {
      interfaces.bookHouse().then(res => {
        this.columns = res;
      });
    },

    //  标签
    bookTag(id) {
      interfaces.bookTags(id).then(res => {
        console.log(res);
        if (res != null) {
          this.tags = res;
        }
      });
    },

    showPopup() {
      this.show = true;
    },
    onChange(Picker, value, index) {
      // this.value = value.project_name;
      // this.ids = value.id;
      // this.bookTag(this.ids);
    },
    onCancel() {
      this.show = false;
    },
    onConfirm(value, index) {
      this.show = false;
      this.value = value.project_name;
      this.ids = value.id;
      this.bookTag(this.ids);
    },
    // 时间日期操作

    onChanges(Picker, value, index) {
      this.value2 = value;
    },
    showPopup2() {
      this.show2 = true;
    },
    cancelPicker() {
      this.show2 = false;
    },

    confirmPicker(value) {
      // 确定按钮，时间格式化并显示在页面上
      var date = value;
      var m = date.getMonth() + 1;
      var d = date.getDate();
      if (m >= 1 && m <= 9) {
        m = "0" + m;
      }
      if (d >= 0 && d <= 9) {
        d = "0" + d;
      }
      var timer = date.getFullYear() + "-" + m + "-" + d;
      this.value2 = timer;
      this.show2 = false;
      this.datePicker = "";

      // if (this.getnewDate() == timer) {
      //   this.$toast("请选择其它预约日期");
      //   this.value2 = "";
      //   return;
      // } else {
      //   this.value2 = timer;
      //   this.show2 = false;
      //   this.datePicker = "";
      // }
    },

    // getnewDate(time) {
    //   var date = new Date();
    //   var seperator1 = "-";
    //   var year = date.getFullYear();
    //   var month = date.getMonth() + 1;
    //   var strDate = date.getDate();
    //   if (month >= 1 && month <= 9) {
    //     month = "0" + month;
    //   }
    //   if (strDate >= 0 && strDate <= 9) {
    //     strDate = "0" + strDate;
    //   }
    //   time = year + seperator1 + month + seperator1 + strDate;
    //   return time;
    // },

    formatter(type, value) {
      // 格式化选择器日期
      if (type === "year") {
        return `${value}年`;
      } else if (type === "month") {
        return `${value}月`;
      }
      return value;
    },

    changePhone() {
      this.hideModel = true;
    },
    tohideModel() {
      this.hideModel = false;
      this.phone = JSON.parse(localStorage.getItem("userinfo")).mobile;
    },
    chooseTag(e, list) {
      var str = {};
      var str2 = "";
      if (e.target.className.indexOf("onstag") == -1) {
        e.target.className = "onstag";
        this.intention.push(list);
      } else {
        e.target.className = "";
        this.intention.forEach((item, index) => {
          if (item == list) {
            this.intention.splice(index, 1);
          }
        });
      }
    },
    submitInfor() {
      let inter = "";
      let inter2 = "";
      this.intention.forEach((item, index) => {
        inter += "," + item;
        return (inter2 = inter.substr(1));
      });
      if (!this.Personalname) {
        this.$toast(this.$i18n.t("m.show7"));
        return;
      }
      if (!this.radio) {
        this.$toast(this.$i18n.t("m.show8"));
        return;
      }
      if (!/^1[345678]\d{9}$/.test(this.phone) || !this.phone) {
        this.$toast(this.$i18n.t("m.show9"));
        return;
      }
      if (!this.value2) {
        this.$toast(this.$i18n.t("m.show11"));
        return;
      }
      // if (!inter2 && !this.message) {
      //   this.$toast(this.$i18n.t('m.show12'));
      //   return;
      // }
      let id=''
      if(this.orderid){
        id=this.orderid
      }

      let projectid = this.ids;
      let name = this.Personalname;
      let sex = this.radio;
      let mobile = this.phone;
      let comment = this.message;
      let book_time = this.value2;
      let intention = inter2;
      let data = {
        id,     //订单id
        projectid, //项目id
        name,
        sex,
        mobile,
        comment,
        book_time,
        intention
      };

      interfaces.bookSave(data).then(res => {
        if (res.code == 0) {
          this.show_right = true;
          setTimeout(() => {
            this.show_right = false;
            this.$router.push({ path: "myOrder" });
          }, 2000);
        } else {
          this.successHref=true;
          this.getTostat=res.data
          setTimeout(()=>{
            this.successHref=false;
           },3000)
          // this.$toast(res.data);
        }
      });
      console.log(data)
    }
  },
  components: {
    aheaders,
    afooter,
    submitBtn
  }
};
</script>

<style scoped>
.myReserve {
  width: 100%;
  margin: 0 auto;
  min-height: 100%;
  padding-bottom: 5.96rem;
  box-sizing: border-box;
  position: relative;
}
.myReserve >>> #orderFormInput::input-placeholder {
  color: #999;
}
.myReserve >>> #orderFormInput::-webkit-input-placeholder {
  color: #999;
}
/* .myReserve >>> .van-cell__value .van-field__control{
    color: #333 ;
  }
.myReserve >>> .van-cell__value .van-field__control:disabled {
      color: #333;
      -webkit-text-fill-color: #333 ;
      background-color: transparent;
      opacity: 1;
  } */

.myReserve >>> #input1::input-placeholder {
  color: #999;
}
.myReserve >>> #input1::-webkit-input-placeholder {
  color: #999;
}

.myReserve >>> .van-cell__value input::-moz-placeholder {
  color: #999;
}

.myReserve >>> .van-cell__value input:-ms-input-placeholder,
.myReserve >>> .van-cell__value textarea:-ms-input-placeholder {
  color: #999;
}

.myReserve >>> .van-cell__value input::-webkit-input-placeholder,
.myReserve >>> .van-cell__value textarea::-webkit-input-placeholder {
  color: #999;
}

.myReserve >>> .van-field__control:disabled {
  color: #333;
  -webkit-text-fill-color: #333;
  background-color: transparent;
  opacity: 1;
}

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

.names {
  position: relative;
}
.names .van-radio-group {
  position: absolute;
  right: 14px;
  top: 20px;
  display: flex;
  align-items: center;
}
.names .van-radio {
  margin-right: 0.2rem;
  font-size: 0.3rem;
}
.phones {
  position: relative;
}
.phones span {
  font-size: 0.3rem;
  color: #5975a9;
  position: absolute;
  top: 20px;
  right: 14px;
}
.reserve {
  width: 80%;
  height: autto;
  margin: 0 auto;
}
.myReserve .van-cell {
  padding: 16px 16px;
}

.yixiang {
  width: auto;
  height: auto;
  display: flex;
  align-items: left;
  flex-direction: column;
  padding: 0 0.5rem;
}
.yixiang p {
  font-size: 0.4rem;
  color: #000;
  margin: 0.7rem 0;
  margin-bottom: 0.1rem;
}
.yixiang .all-p {
  width: 100%;
  height: auto;
  overflow: hidden;
}
.yixiang .all-p span {
  font-size: 0.25rem;
  padding: 0.2rem 0.1rem;
  border: 1px solid #aaaaaa;
  color: #aaa;
  margin-right: 0.22rem;
  width: auto;
  float: left;
  text-align: center;
  margin-top: 0.29rem;
}
.yixiang textarea {
  width: 97%;
  margin: 0.5rem auto 0;
  border: none;
  /* border-bottom: 1px solid #ddd; */
  font-size: 14px;
  line-height: 0.5rem;
}
.yixiang .all-p .onstag {
  border: 1px solid #6079b7;
  color: #6079b7;
  background-color: #dfeaf2;
}
/* .sumhover{background-color: #5975a9;color:#fff;} */

.btns-submit[disabled] {
  background-color: #dddddd;
  color: #333;
}

.btns-submit {
  width: 100%;
  height: 1rem;
  line-height: 1rem;
  color: #fff;
  text-align: center;
  background-color: #5975a9;
  font-size: 0.38rem;
  border: none;
  /* margin-left: 10%; */
  border-radius: 5px;
  margin: 1.2rem auto 1.64rem;
}

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
.myReserve .van-popup {
  border-radius: 10px;
  overflow: visible;
}
</style>