<template>
  <div class="bookingfeedback">
    <aheaders status="3" @toback="toreplace" :showLan="true"></aheaders>

    <div class="message">
      <h6>{{$t('m.feedback1')}}</h6>
      <ul>
        <li>
          <div class="isHouse" style>
            <!-- <span class="time">看房时间</span> -->

            <!-- <span ref="termEnd" @click="showDatePicker('termEnd')">{{endTime}}</span> -->
            <van-field
              v-model="date2"
              :placeholder="$t('m.feedback10')"
              :label="$t('m.feedback10')"
              right-icon="arrow-down"
              disabled="true"
              @click="showDatePicker"
            />

            <!-- <img src="../../assets/images/bottom.jpg" alt="" style='width:0.27rem;height:0.16rem;'> -->
          </div>
          <van-popup v-model="isPopShow" position="bottom">
            <van-datetime-picker
              @cancel="cancelPicker"
              @confirm="confirmPicker"
              v-model="endTime"
              type="date"
              :formatter="formatter"
              :min-date="startTime"
            />
          </van-popup>
        </li>
        <li>
          <span class="time">{{$t('m.feedback2')}}</span>
          <span class="times02">
            <label v-for="(item,index) in feedback.state" :key="index">
              <input
                name="item"
                v-model="statusIcon"
                type="radio"
                :value="item"
              />
              {{item}}
            </label>
          </span>
        </li>
      </ul>
      <div class="feedback">
        <p>{{$t('m.feedback3')}}</p>
        <textarea cols="15" rows="5" v-model="msg" :placeholder="$t('m.feedback4')"></textarea>
        <button
          class="btns-submit"
          @click="showRight"
          type="submit"
          :disabled="isclicks"
        >{{$t('m.feedback5')}}</button>
        <van-popup v-model="show_right">
          <div class="good">
            <img src="../../assets/images/checkmark.png" alt style="width:0.8rem;" />
            <p>{{$t('m.feedback6')}}</p>
          </div>
        </van-popup>
      </div>
    </div>

    <div class="details">
      <ul>
        <li>
          <span class="detail-name">{{$t('m.feedback7')}}</span>
          <span>{{feedback.project_name}}</span>
        </li>
        <li>
          <span class="detail-name">{{$t('m.feedback8')}}</span>
          <span>{{feedback.name}}</span>
        </li>
        <li style="position:relative">
          <span class="detail-name">{{$t('m.feedback9')}}</span>
          <span>{{feedback.mobile}}</span>
          <img
            src="../../assets/images/dianhua.png"
            @click.stop.prevent="tocallPhone(feedback.mobile)"
            alt
            style="width:0.6rem;height:0.6rem;position:absolute;right:20px;top:12px;"
          />
        </li>
        <li>
          <span class="detail-name">{{$t('m.feedback10')}}</span>
          <span>{{feedback.book_time}}</span>
        </li>
        <li>
          <span class="detail-name">{{$t('m.feedback11')}}</span>
          <span>{{feedback.intention}}</span>
        </li>
        <li>
          <span class="detail-name">{{$t('m.feedback12')}}</span>
          <span>
            {{feedback.book_number}}
            <em
              style="font-size:0.3rem;color:#bfbfbf"
              @click="copy"
              class="getcopy"
              :data-clipboard-text="feedback.book_number"
            >{{$t('m.feedback14')}}</em>
          </span>
        </li>
        <li>
          <span class="detail-name">{{$t('m.feedback13')}}</span>
          <span>{{feedback.inputtime}}</span>
        </li>
      </ul>
    </div>

    <footers></footers>
  </div>
</template>

<script scoped>
import Vue from "vue";
import Clipboard from "clipboard";
import interfaces from "@/utils/api.js";
import aheaders from "@/components/Header";
import footers from "@/components/Footer";
import { Tab, Tabs, NavBar, Search } from "vant";

Vue.use(Tab).use(Tabs);
Vue.use(NavBar).use(NavBar);
Vue.use(Search);

export default {
  name: "bookingfeedback",
  data() {
    return {
      count: "", // 倒计时
      show_right: false,
      //   currentTime: new Date(), // 开始时间不能超过当前时间
      startTime: new Date(), // 开始时间
      endTime: new Date(), // 结束时间
      datePicker: "", // 用于判断哪个选择器的显示与隐藏
      isPopShow: false, // 弹出层隐藏与显示
      statusIcon: "",
      ids: "",
      feedback: {},
      msg: "",
      moren: "",
      disabled: false,
      date2: "",
      getHeight: {
        minHeight: ""
      }
    };
  },
  components: {
    aheaders,
    footers
  },
  computed: {
    isclicks() {
      if (!this.endTime || !this.statusIcon || !this.msg) {
        return true;
      } else {
        return false;
      }
    }
  },
  created() {
    this.getHeight.minHeight =
      (window.outerHeight / window.outerWidth) * 10.8 - 5.96 + "rem";
    this.ids = this.$route.params.id;
    this.detailInfor(this.ids);
    // this.endTime=this.confirmPicker(new Date())
  },
  mounted() {
    $eventbus.$on("changeLang", res => {
      this.ids = this.$route.params.id;
      this.detailInfor(this.ids);
    });
  },
  methods: {
    // 添加电话拨打 盛修改
    tocallPhone(mobile) {
      window.location.href = "tel://" + mobile;
    },
    toreplace() {
      this.$router.go(-1);
    },
    showDatePicker() {
      //弹出层并显示时间选择器
      this.isPopShow = true;
      // this.datePicker = picker;
    },
    cancelPicker() {
      // 选择器取消按钮点击事件
      this.isPopShow = false;
      this.datePicker = "";
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
      // var timer = date.getFullYear() + "-" + m + "-" + d;
      // this.$refs[this.datePicker].innerHTML = timer;

      this.date2 = date.getFullYear() + "-" + m + "-" + d;
      // this.$refs[this.datePicker].innerHTML = this.endTime;
      // this.moren=this.endTime
      this.isPopShow = false;
      this.datePicker = "";
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

    // 提交表单
    showRight() {
      if (!this.endTime || !this.statusIcon || !this.msg) {
        this.$toast(this.$i18n.t("m.show2"));
      } else {
        let bookid = this.ids;
        let sales_time = this.endTime;
        let sales_desc = this.msg;
        let sales_content = this.statusIcon;
        let data = { bookid, sales_time, sales_desc, sales_content };
        console.log(data);
        interfaces.fankuiList(data).then(res => {
          if (res == true) {
            // this.$toast('提交成功')
            this.$router.replace({
              name: "feedbackdetail",
              params: { id: this.ids }
            });
          }
        });
        this.$router.push({ name: "feedbackdetail", params: { id: this.ids } });
      }
    },

    detailInfor(id) {
      interfaces.fankuidetail(id).then(res => {
        this.feedback = res;
      });
    },

    copy: function() {
      var _this = this;
      var clipboard = new Clipboard(".getcopy"); //单页面引用
      clipboard.on("success", e => {
        this.$toast(this.$i18n.t("m.show3"));
        // 释放内存
        clipboard.destroy();
      });
      clipboard.on("error", e => {
        // 不支持复制
        Message({
          message: this.$i18n.t("m.show4"),
          type: "warning"
        });
        // 释放内存
        clipboard.destroy();
      });
    }
  }
};
</script>

<style scoped>
.bookingfeedback {
  width: 100%;
  margin: 0 auto;
  min-height: 100%;
  padding-bottom: 5.96rem;
  box-sizing: border-box;
  position: relative;
}
.isHouse {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.isHouse .van-cell {
  padding: 0;
}

.top {
  width: 9.55rem;
  height: 1.72rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 0 0 0.55rem;
}
.top .logo {
  width: 0.54rem;
  height: 0.65rem;
  text-align: center;
}
.top .logo img {
  width: 75%;
  height: auto;
}
.top .nav-lan {
  width: 2.37rem;
  height: 0.59rem;
}

.message {
  /* width: 90%;
  height: 8.5rem;
  margin: 0.2rem auto;
  border-bottom: 0.2rem solid #f1f1f1; */

  width: 90%;
  /* height: 8.5rem; */
  height: 11.7rem;
  padding: 0.95rem 0.58rem 0;
  border-bottom: 0.2rem solid #f1f1f1;
  border-top: 1px solid #ddd;
}

.message h6 {
  font-size: 0.56rem;
  font-weight: bold;
  color: #060606;
}
.message ul {
  width: 100%;
  height: auto;
  margin: 0 auto;
  padding-top: 0.4rem;
}
.message ul li {
  width: auto;
  height: 1.65rem;
  margin: 0 auto;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #f1f1f1;
}
.message .time {
  font-size: 0.4rem;
  display: inline-block;
  width: 2.5rem;
}
.message ul li span {
  font-size: 0.42rem;
  width: 6.66rem;
}
.message ul li .times02 {
  width: 7.14rem;
}
.message ul li span label {
  width: auto;
  height: auto;
  float: left;
  padding-right: 0.4rem;
}
.feedback {
  font-size: 0.35rem;
  margin-top: 0.9rem;
}
.feedback p {
  font-size: 0.4rem;
}
.feedback textarea {
  width: 9rem;
  height: auto;
  margin: 0.4rem 0 0.65rem;
  font-size: 0.4rem;
  padding: 0.2rem;
  border-color: #ddd;
}
.feedback .van-button {
  width: 80%;
  height: auto;
  margin: 0 0.6rem;
}
.bookingfeedback .details {
  /* width: 90%; */
  height: auto;
  /* padding: 0.2rem 0.58rem 0; */
  /* margin: 0.2rem auto; */
}
.bookingfeedback .details ul {
  width: 100%;
  height: auto;
  margin: 0 auto;
  padding-bottom: 0.2rem;
}
.details ul li {
  width: auto;
  height: 1.35rem;
  margin: 0 auto;
  display: flex;
  align-items: center;
  padding: 0 0.65rem;
  /* justify-content: space-between; */
}
.details ul li:nth-child(5) {
  border-bottom: 0.2rem solid #f1f1f1;
  padding-bottom: 0.4rem;
}
.details ul li:nth-child(6) {
  /* border-bottom: 0.2rem solid #f1f1f1; */
  padding-top: 0.2rem;
}
.details ul li span {
  font-size: 0.36rem;
}
.details ul li .detail-name {
  color: #bfbfbf;
  font-size: 0.36rem;
  display: inline-block;
  width: 2.5rem;
}
.good {
  width: 7.7rem;
  height: 4rem;
  margin: 0 auto;
}
.good img {
  display: block;
  margin: 0 auto;
  margin-top: 1.5rem;
}
.good p {
  font-size: 0.45rem;
  text-align: center;
  margin-top: 0.5rem;
}

.feedback .btns-submit {
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
  /* margin: 1.2rem auto 1.64rem; */
  width: 86%;
  margin: 0 0.6rem;
}
.feedback .btns-submit[disabled] {
  background-color: #dddddd;
  color: #333;
}
</style>
