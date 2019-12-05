<template>
  <div class="myReserve" :style='getHeight'>
    <aheaders status="3" @toback='toreplace'></aheaders>
    <!-- <van-cell is-link @click="showPopup">项目</van-cell> -->
    <van-cell-group>
      <van-field
        v-model="value"
        :placeholder="$t('m.house8')"
        :label="$t('m.house1')"
        right-icon="arrow-down"
        disabled="true"
        @click="showPopup"
      />
      <van-field
        v-model="value2"
        :placeholder="$t('m.house9')"
        :label="$t('m.house2')"
         right-icon="arrow-down"
         disabled="true"
        @click="showPopup2"
      />
      <div class="names">
        <van-field v-model="name" :placeholder="$t('m.house10')" :label="$t('m.house3')" />
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
          :placeholder="$t('m.house11')"
          :label="$t('m.house4')"
          type="number"
          disabled="true"
        />
        <span @click="changePhone">{{$t('m.changePhone')}}</span>
      </div>

      <div class="yixiang">
        <p>{{$t('m.house7')}}</p>
        <div class="all-p">
          <span
            v-for="(item,index) in tags"
            :key="index"
            @click="chooseTag($event,tags[index])"
            :class="{onstag:tags[index].checked}"
          >{{item}}</span>

        </div>
        <textarea
          v-model="message"
          name="message"
          id
          cols="20"
          rows="2"
          :placeholder="$t('m.house6')"
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
          @confirm="confirmPicker"
          @change="onChanges"
        />
      </van-popup>

      <button class="btns-submit" :disabled="isClick" @click="submitInfor">{{$t('m.orderform')}}</button>
    </div>
    <!-- 传入手机 国籍 china 区号 0086 监听手机信息改变 监听关闭事件 -->
    <submitBtn v-if="hideModel" :phone='hideModel' :code='hideModel' @tohideModel="tohideModel" @update1="getPhones111"></submitBtn>

    <van-popup v-model="show_right">
      <div class="good">
        <img src="../../assets/images/checkmark.png" alt style="width:1.05rem;height:0.95rem;" />
        <p style="color:#000;font-size:0.4rem;">{{$t('m.other5')}}</p>
      </div>
    </van-popup>

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
import { Icon ,Dialog} from 'vant';
Vue.use(Icon,Dialog);

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
      name: "",
      message: "",
      currentDate: new Date(new Date().getTime()+1000*3600*24),
      minDate: new Date(new Date().getTime() +1000*3600*24),
      maxDate: new Date(new Date().getTime() +1000*3600*24*180),
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
       getHeight:{
             minHeight:''
            }
    };
  },

  computed: {
    isClick() {
      if (
        !this.value ||
        !this.value2 ||
        !this.name ||
        !this.phone ||
        (!this.intention[0]&&!this.intention[1]&&!this.message)
        // !this.intention ||
        // !this.message
      )return true;
      else return false;
    }
  },
  mounted() {
    $eventbus.$on("changeLang", res => {
      this.bookHouses();
      this.ids = this.$route.params.id;
      this.value = this.$route.params.name;
      let mobile = this.$route.params.mobile;

      if (mobile) {
        this.phone = mobile;
      } else {
        //  this.phone=''
        this.phone = JSON.parse(localStorage.getItem('userinfo')).mobile
      }
      if (this.ids) {
        this.bookTag(this.ids);
      }
    });
  },

  created() {
    this.getHeight.minHeight=window.innerHeight+'px'
    this.ids = this.$route.params.id;
    this.value = this.$route.params.name;
    let mobile = this.$route.params.mobile;

    if (mobile) {
      this.phone = mobile;
    } else {
      //  this.phone=''
      this.phone = JSON.parse(localStorage.getItem('userinfo')).mobile
    }
    if (this.ids) {
      this.bookTag(this.ids);
    }
    this.bookHouses();
  },
  methods: {
    //  filters(type, options) {
    //   if (type === 'month') {
    //     return options.filter(option => option % 2 === 0)
    //    }
    //     return options;
    //   },
    // 返回上一页
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
    getPhones111(data) {
      this.phone = data;
     },
    // 公寓选择
    bookHouses() {
      interfaces.bookHouse().then(res => {
        this.columns = res;
        console.log(this.columns,'项目列表');
      });
    },

    //  标签
    bookTag(id) {
      interfaces.bookTags(id).then(res => {
        this.tags = res;
      });
    },

    showPopup() {
      this.show = true;
    },
    onChange(Picker, value, index) {
      this.value = value.project_name;
      this.ids = value.id;
      this.bookTag(this.ids);
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
      //  if(this.getnewDate()){
      if (this.getnewDate() == timer) {
        this.$toast("请选择其它预约日期");
        this.value2 = "";
        return;
      } else {
        this.value2 = timer;
        this.show2 = false;
        this.datePicker = "";
      }
    },

    getnewDate(time) {
      var date = new Date();
      var seperator1 = "-";
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      time = year + seperator1 + month + seperator1 + strDate;
      return time;
    },

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
      this.phone = localStorage.getItem("mobile");
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
      if (!this.name) {
        this.$toast("请填写姓名");
        return;
      }
      if (!this.radio) {
        this.$toast("请选择性别");
        return;
      }
      if (!/^1[345678]\d{9}$/.test(this.phone) || !this.phone) {
        this.$toast("请填写正确的手机号码");
        return;
      }
      if (!this.value2) {
        this.$toast("请选择预约时间");
        return;
      }
      if (!inter2 && !this.message) {
        this.$toast("请选择意向标签或填写意向信息");
        return;
      }

      let projectid = this.ids;
      // let user_id=JSON.parse(localStorage.getItem('userinfo')).id
      let name = this.name;
      let sex = this.radio;
      let mobile = this.phone;
      let comment = this.message;
      let book_time = this.value2;
      let intention = inter2;
      let data = {
        projectid,
        name,
        sex,
        mobile,
        comment,
        book_time,
        intention
      };
      console.log(data);
      interfaces.bookSave(data).then(res => {
        if (res.code == 0) {
          this.show_right = true;
          setTimeout(() => {
            this.show_right = false;
            this.$router.push({ path: "myOrder" });
          }, 2000);
        } else {
          this.$toast(res.data);
        }
      });
    },


  },
  components: {
    aheaders,
    afooter,
    submitBtn,
  }
};
</script>

<style scoped>
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
  border-bottom: 1px solid #ddd;
  font-size: 0.3rem;
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
  font-size: 0.3rem;
  border: none;
  /* margin-left: 10%; */
  border-radius: 0.1rem;
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
.van-popup {
  border-radius: 10px;
  overflow: visible;
}
</style>