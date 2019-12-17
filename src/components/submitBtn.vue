<template>
  <!-- 预约弹框 v-show='hideModel'-->
  <div class="model-diag">
    <selectcountry v-if="showregion" :showregion="showregion" @select="selectedCountry"></selectcountry>
    <div class="model_main">
      <div class="mains">
        <div class="left">
          {{$t('m.s7')}}
          <!-- {{$t('m.selectCountry.'+codeLettet+'.'+findArrIndex('m.selectCountry.'+codeLettet,codeId))}}  -->
        </div>
        <div class="right">
          <input class="numCode" readonly @click="toshowRegion" v-model="numCode" />
        </div>
      </div>
      <div class="mains" :class="{'is-invalid':errors2}">
        <div class="left">{{$t('m.s1')}}</div>
        <div class="right">
          <input
            type="number"
            v-model="phone"
            :placeholder="$t('m.s5')"
            :disabled="iswrite"
            @input="$emit('input',$event.target.value)"
            @blur="onBlurRepireIos"
            @focus="onFocusRepireIos"
          />
        </div>
      </div>

      <div class="mains" style="position:relative;">
        <div class="left">{{$t('m.s2')}}</div>
        <div class="right">
          <input
            type="number"
            v-model="sms"
            :placeholder="$t('m.s6')"
            @blur="onBlurRepireIos"
            @focus="onFocusRepireIos"
          />
        </div>
        <button :disabled="disableds" @click="getVerifyCode" class="btnVerfity">{{btntitle}}</button>
      </div>
      <!-- 错误提醒-->
      <div v-if="errors2" class="invalid-feedback">{{errors2}}</div>
      <!-- @click='handleLogin' -->
      <button class="btns-sub" @click="handleLogin" :disabled="isClick">{{$t('m.s4')}}</button>
      <img src="../assets/images/remove.png" alt class="img_remove" @click="hideClose()" />
    </div>

    <van-popup v-model="show_right">
      <div class="good">
        <img src="../assets/images/checkmark.png" alt style="width:1.05rem;height:0.95rem;" />
        <p style="color:#000;font-size:0.4rem;">{{$t('m.submitSuccess')}}</p>
      </div>
    </van-popup>
  </div>
</template>


<script>
import interfaces from "@/utils/api.js";
import selectcountry from "@/components/selectCountry";
import { log } from 'util';
export default {
  name: "submitBtn",
  props: {
    hideModel: Boolean,
    name: String,
    id: String,
    status: String,
  },
  data() {
    return {
      btntitle: this.$i18n.t('m.s3'),
      phone: '',
      sms: '',
      disabled: false,
      errors2: '',
      show_right: false,
      mobile: '',
      hasAskCode: false,
      iswrite: false,
      timeing: false,
      region: '',
      showregion: false,
      // numCode:'中国+86',
      codeId: 'China',
      numName: '中国',
      codeLettet: 'optionsC',

    }
  },
  computed: {
    numCode() {
      var index = this.findArrIndex(this.$t('m.selectCountry.' + this.codeLettet), this.codeId)
      var selectedObj = this.$t('m.selectCountry.' + this.codeLettet + '[' + index + ']')
      return selectedObj.name + '/+' + selectedObj.tel
    },
    isClick() {
      if (!this.phone || !this.sms) return true;
      else return false;
    },
    disableds() {
      if (!this.phone || this.timeing) {
        return true;
      } else {
        return false;
      }
    },
  },
  created() {
    this.mobile = JSON.parse(localStorage.getItem('userinfo')).mobile
    // this.getUserInfo()
    // var user = res

    // localStorage.set('user',JSON.stringify(user))

    // var user = JSON.parse(localStorage.get('user'))

    // user.a = newval

    // localStorage.set('user',JSON.stringify(user))

  },
  methods: {
    // onBlurRepireIos() {
    //   this.beforeSlide = document.body.scrollTop || document.documentElement.scrollTop;
    //   // alert(this.beforeSlide)
    // },
    // //blur
    // onFocusRepireIos() {
    //   window.scrollTo(0, this.beforeSlide);
    //   // alert(this.beforeSlide)
    // },
    findArrIndex(arr, id) {
      console.log(arr, id);
      console.log(_)
      return _.findIndex(arr, function (o) { return o.id == id; });
    },
    selectedCountry(res) {


      console.log(res)
      this.showregion = false
      if (res == undefined) {
        this.codeId = 'China'
        this.codeLettet = 'optionsC'
      } else {
        // this.numCode=res.name+'+'+res.tel 
        this.codeId = res.id
        this.codeLettet = 'options' + res.short[0]
      }
    },
    getUserInfo() {
      interfaces.getuserInfo().then(res => {
        this.userinfo = res
        localStorage.setItem('userinfo', JSON.stringify(res))
      });
    },

    toshowRegion() {
      this.showregion = true
    },
    hideClose() {
      this.$emit('tohideModel')
    },
    //销毁
    leaveOut() {
      // setDataInit()
      this.phone = '',
        this.sms = '',
        this.disabled = false,
        this.errors2 = '',
        this.show_right = false,
        this.mobile = '',
        this.hasAskCode = false,
        this.iswrite = false,
        this.timeing = false
    },
    // 手机验证
    handleLogin() {
      // 取消错误提醒
      this.errors = {};
      // 发送请求
      let mobile = this.phone
      let numCode = this.numCode
      let codeid = this.codeId
      let code = this.sms
      let data = { mobile, code, numCode, codeid }
      console.log(data)
      interfaces.postMessage(data).then((res) => {
        if (res.data.code != 0) {
          this.$toast(res.data.data)
        } else if (res.data.code == 0) {
          this.show_right = true
          this.getUserInfo()
          this.$emit("update1", this.phone)
          setTimeout(() => {
            if (this.mobile) {
              this.show_right = false
              //  this.hideModel=false
              this.$emit('tohideModel')
              this.phone = ''
              this.sms = ''
              this.numCode = ''
              this.codeId = ''
              // document.documentElement.scrollTop=0
            } else {
              this.hideModel == false
              if (this.status == 1) {
                //  this.$router.replace({name:'orderForm',params:{mobile:this.phone,name:this.name,id:this.id}});
                this.$router.push({ name: 'orderForm', params: { mobile: this.phone, name: this.name, id: this.id } });

              } else if (this.status == 2) {
                this.$router.replace({ name: 'myReserve', params: { mobile: this.phone, name: this.name, id: this.id } });
              }

            }
          }, 2000)
        }
      }).catch(err => {
        // this.$toast(err)
      })
      //  }
    },
    getVerifyCode() {
      if (this.validatePhone()) {
        this.validateBtn();
        // 发送网络请求
        let phone = this.phone
        let data = { phone }
        console.log(data)
        interfaces.verifyCode(phone).then((res) => {
          if (res.code == 0) {
            this.$toast('已发送成功')
          }
        })
      }
    },
    validateBtn() {
      let time = 60;
      this.timeing = true
      let timer = setInterval(() => {
        if (time == 0) {
          this.timeing = false
          clearInterval(timer);
          this.btntitle = this.$i18n.t('m.s3');
          this.disabled = false;
          this.iswrite = false;
        } else {
          // 倒计时
          this.btntitle = time + "秒后重试";
          this.disabled = true;
          this.iswrite = true;
          time--;
        }
      }, 1000);
    },
    validatePhone() {
      // 验证手机号码
      if (!this.phone) {
        this.$toast('手机号码不能为空')
        return false;
      }
      // else if (!/^1[345678]\d{9}$/.test(this.phone)) {
      //   this.$toast('请填写正确的手机号码')
      //   return false;
      // } 
      else {
        this.errors = '';
        return true;
      }
    },



  },
  components: {
    selectcountry
  }
};
</script>

<style scoped>
.model-diag {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
  overflow: scroll;
}
.model-diag .model_main {
  width: 90%;
  height: auto;
  margin: 0 auto;
  top: 35%;
  left: 5%;
  position: absolute;
  border-radius: 10px;
  background-color: #fff;
  padding-bottom: 0.53rem;
  padding-top: 0.4rem;
}
.van-cell-group {
  background-color: #fff;
  border-radius: 12px;
}
.mains {
  width: 80%;
  height: 1.6rem;
  display: flex;
  align-items: center;
  flex-direction: row;
  background-color: #fff;
  margin: 0 auto;
  border-bottom: 1px solid #f1f1f1;
}
.mains .left {
  width: 2.58rem;
  height: auto;
  font-size: 0.34rem;
  color: #000;
}
.mains .right {
  width: 6.21rem;
  height: auto;
  font-size: 0.34rem;
  color: #000;
}
/* .van-cell{height:1.56rem;} */
.mains input {
  border: none;
}
.mains input[disabled] {
  background-color: #fff;
}
/* .mains button{} */

/* .btns{width:80%;height:1.0rem;line-height:1.0rem;color:#333;text-align: center;background-color: #dddddd;font-size:0.3rem;border:none;margin:0 auto;margin-left:10%;border-radius: 0.1rem;margin-top:1.2rem;} */

.img_remove {
  width: 0.82rem;
  height: 0.82rem;
  position: absolute;
  bottom: -53px;
  left: 47%;
}

.is-invalid {
  border: 1px solid red;
}
.invalid-feedback {
  color: red;
  padding-top: 5px;
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
.model-diag .van-popup {
  border-radius: 10px;
  overflow: visible;
}

.btns-sub[disabled] {
  background-color: #dddddd;
  color: #333;
}

.btns-sub {
  /* width: 100%;
    height: 1.0rem;
    line-height: 1.0rem;
    color: #fff;
    text-align: center;
    background-color: #5975a9;
    font-size: 0.3rem;
    border: none;
    border-radius: 0.1rem;
    margin: 1.2rem auto 1.64rem; */
  width: 80%;
  height: 1rem;
  line-height: 1rem;
  color: #fff;
  text-align: center;
  background-color: #5975a9;
  font-size: 0.3rem;
  border: none;
  margin: 0 auto;
  margin-left: 10%;
  border-radius: 0.1rem;
  margin-top: 1.2rem;
}

.mains .btnVerfity {
  width: 2.37rem;
  height: 0.8rem;
  font-size: 0.3rem;
  position: absolute;
  right: -11px;
  bottom: 16px;
  background-color: #5975a9;
  border: none;
  color: #fff;
}
.btnVerfity[disabled] {
  background-color: #dddddd;
  color: #333;
}
@media screen and (min-width: 640px) {
   .model-diag .model_main {
  width: 55%;
  height: auto;
  margin: 0 auto;
  top: 25%;
  left:23.5%;
  }
}
</style>
