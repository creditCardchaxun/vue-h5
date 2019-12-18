<template>
  <div class="star">
    <aheaders status="2" :showLan="true" :showEmpty="false"></aheaders>
    <!-- <div class="top-hotel" style="display:none">
      <img src="../../assets/images/hotel-01.jpg" alt />
    </div>-->
    <div class="img-wrap" v-if="topImage">
      <img :src="topImage" />
    </div>
    <div v-else class="img-wrap-pol"></div>
    <div class="hotel">
      <div class="choose-hotel">
        <div class="hotel-01">
          <div class="s1" @click="city">
            {{cityName}}
            <van-icon name="arrow-down" v-show="!toshowicon" />
            <van-icon name="arrow-up" v-show="toshowicon" />
          </div>
          <div class="s1" @click="typeHouse">
            {{typehousename}}
            <van-icon name="arrow-down" v-show="!toshowicon2" />
            <van-icon name="arrow-up" v-show="toshowicon2" />
          </div>
        </div>
        <!-- 市区标题 -->
        <div class="s2" v-show="toshowCity">
          <div class="s3">
            <span style="border-right: 1px solid #ddd;">{{$t('m.hotel3')}}</span>
            <span>{{$t('m.hotel4')}}</span>
          </div>

          <!-- 城市筛选 -->
          <div class="s4">
            <div class="left">
              <!-- <div class="city3" @click="togetAll" :class="{active:currentIndex==-1}">
                <span>{{$t('m.show5')}}</span>
              </div>-->
              <div
                class="city3"
                @click="city2(index,item)"
                :class="{active:index==currentIndex}"
                v-for="(item,index) in cityAll"
                :key="index"
              >
                <span>{{item.name}}</span>
              </div>
              <!-- <span @click='getListhouses({})'> 全部</span>  -->
            </div>
            <div class="right" :class="{active:currentIndex!=-1}" v-show="tochina">
              <ul class="nihao" v-if="cityAll[currentIndex]">
                <!-- <li @click="city3('全部',-1)">{{$t('m.show5')}}</li> -->
                <li
                  v-for="(i,ins) in cityAll[currentIndex].area"
                  :class="{active:ins===currentIndex3}"
                  :key="ins"
                  @click="getname(i.name,i.linkageid,ins)"
                >{{i.name}}</li>
              </ul>
            </div>
          </div>
        </div>

        <!-- 户型标题 筛选 -->
        <div class="s2" v-show="toshowtype">
          <div class="right">
            <ul>
              <!-- <li :class="{active:currentIndex2==-1}" @click="getName('',$t('m.show5'),-1)">{{$t('m.show5')}}</li> -->
              <li
                @click="getName(item.id,item.title,index)"
                v-for="(item,index) in getHouseType"
                :key="index"
                :class="{active:index==currentIndex2}"
              >{{item.title}}</li>
            </ul>
          </div>
        </div>
      </div>

      <!-- 项目列表数据 -->
      <div class="hotel_main" v-if="alllist.length>0">
        <ul>
          <li v-for="(item,index) in alllist" :key="index">
            <div class="hotel-img">
              <router-link :to="{name:'hotelDetail',params:{id:item.id}}">
                <img :src="item.pic" alt />
              </router-link>
              <div class="location">{{item.address}}</div>
            </div>
            <div class="hotel-title">
              <div class="title">{{item.project_name}}</div>
              <button @click="toDetails(item.id,item.project_name)">
                <!-- <router-link :to="{name:'orderForm',params:{id:item.id,name:item.project_name}}">  -->
                {{$t('m.orderhouse')}}
                <!-- </router-link> -->
              </button>
            </div>
          </li>
        </ul>
        <!-- <div class="more-list" v-show='pagemore' @click="addMore"><img src="../../assets/images/list-more.jpg" alt=""></div> -->
      </div>
      <div
        v-else
        class="nolist"
        style="margin:0.8rem 0;font-size:0.3rem;text-align:center;"
      >{{$t('m.others13')}}</div>
      <div class="index-more" v-if="showMore" @click="toloadMore">
        <span>more</span>
        <img src="../../assets/images/more-icon.jpg" alt />
      </div>
    </div>
    <afooter></afooter>

    <submitBtn v-if="hideModel" @tohideModel="tohideModel" :status="status"></submitBtn>

    <!-- <router-view /> -->
  </div>
</template>

<script>
// @ is an alias to /src
import Vue from "vue";
import { Icon } from "vant";

Vue.use(Icon);
import aheaders from "@/components/Header";
import afooter from "@/components/Footer";
import submitBtn from "@/components/submitBtn";
import interfaces from "@/utils/api.js";

export default {
  name: "star",
  data() {
    return {
      scroll: 0,
      pagemore: true,
      alllist: [],
      toshowCity: false,
      toshowtype: false,
      cityAll: [],
      currentIndex0: -1,
      currentIndex: 0,
      currentIndex2: 0,
      currentIndex3: 0,
      alllistss: [],
      cityName: this.$i18n.t("m.hotel1"),
      typehousename: this.$i18n.t("m.hotel2"),
      idsarea: "",
      houseId: "",
      cityid: "",
      mobileLocal: "",
      hideModel: false,
      getHouseType: [],
      getHeight: {
        minHeight: ""
      },
      toshowicon: false,
      toshowicon2: false,
      status: "",
      tochina: false,
      showshengfen: true,
      showMore: false,
      page: 1,
      hideMore: true,
      currentItem: null,
      topImage: null
    };
  },
  computed: {
    //  this.getHeight.minHeight = (window.outerHeight/window.outerWidth * 10.8 - 5.96)+'rem'
    minHeight() {
      return (window.outerHeight / window.outerWidth) * 10.8 - 5.96 + "rem";
    }
  },
  methods: {
    city(index) {
      if (index === 0) {
        this.toshowicon = true;
      }
      this.toshowCity = !this.toshowCity;
      this.toshowicon = !this.toshowicon;
      this.toshowtype = false;
    },
    gethouseTypes(city, area) {
      interfaces.gethouseType(city, area).then(res => {
        this.getHouseType = res;
      });
    },
    // 城市筛选
    city2(index, item) {
      // alert('城市筛选')
      console.log("城市筛选方法");
      console.log(index, item);

      let city;
      let area;
      let type;
      this.houseId = "";
      type = this.houseId;
      if (index !== 0) {
        this.tochina = true;
        city = item.linkageid;
        area = this.idsarea;
      } else if (index === 0) {
        this.tochina = false;
        this.showshengfen = false;
        this.toshowicon = false;
        // this.toshowCity = !this.toshowCity
        city = "";
        area = "";
        this.idsarea = "";
        this.gethouseTypes();
        this.city(index);
      }
      this.currentIndex = index;
      this.currentIndex0 = index;
      this.clearHuxing();
      this.currentItem = item;
      // this.tochina = true;
      this.alllistss = this.cityAll[index].area;
      this.cityName = item.name;
      this.currentIndex3 = 0;
      this.cityid = item.linkageid;
      // let city = item.linkageid
      // let area = this.idsarea
      // let type = this.houseId
      let data = { city, area, type };
      console.log("第一个的数据", data);
      this.getcity(data);
    },
    // 获取地区
    getcity(data) {
      interfaces.getListhouseAll(data).then(res => {
        console.log("第一个", res);
        this.alllist = res;
      });
    },
    clearHuxing() {
      // 户型清零
      this.currentIndex2 = 0;
      this.typehousename = this.$i18n.t("m.hotel2");
      // this.getName(this.getHouseType.id, this.typehousename, 0)
    },
    //  房屋类型
    typeHouse() {
      this.toshowtype = !this.toshowtype;
      this.toshowicon2 = !this.toshowicon2;
      this.toshowCity = false;
    },
    // 点击地区进行筛选
    getname(name, id, index) {
      console.log("点击区域触发 name id index");
      console.log(name, id, index);
      let area;
      if (index === 0) {
        area = "";
      } else {
        area = id;
      }
      this.clearHuxing();

      this.currentIndex3 = index;
      if (name === "全部" || name === "ALL") {
        if (this.currentItem.name) {
          this.cityName = this.currentItem.name;
        }
      } else {
        this.cityName = name;
      }

      this.idsarea = id;
      this.toshowCity = false;
      this.toshowicon = false;
      this.typehousename = this.$i18n.t("m.hotel2");
      let city = this.cityid;
      // let type = this.houseId
      this.houseId = "";
      var type = this.houseId;
      let data = { city, area, type };
      //   this.getListhouses(data)
      console.log("第二个的参数", data);
      interfaces.getListhouseAll(data).then(res => {
        console.log("第二个", res);
        this.alllist = res;
      });

      // this.gethouseTypes(this.city, this.idsarea)
      this.gethouseTypes(this.cityid, this.idsarea);
    },
    // 点击户型进行筛选
    getName(id, title, index) {
      console.log("户型筛选触发");
      console.log("id, title, index");
      console.log(id, title, index);

      this.currentIndex2 = index;
      this.typehousename = title;
      this.houseId = id;
      this.toshowtype = false;
      this.toshowicon2 = false;
      let type = id;
      let city = this.cityid;
      let area = this.idsarea;

      let data = { type, city, area };
      console.log("第三个的数据", data);
      interfaces.getListhouseAll(data).then(res => {
        console.log("第三个点击户 型进行筛选触发", res);
        this.alllist = res;
      });
    },
    // 获取房屋数据
    getListhouses(data) {
      interfaces.getListhouseAll(data).then(res => {
        console.log("第四个");
        this.alllist = res;
      });
    },
    // 获取城市数据
    getcitys() {
      // alert('获取所有城市数据')
      interfaces.getcity().then(res => {
        this.cityAll = res;
        // if (this.cityName === 'All' || this.cityName === '全部') {
        //   this.cityName = this.$i18n.t('m.hotel5')
        // }

        // if (this.cityName !== this.$i18n.t('m.hotel1')) {

        // }
      });
    },
    toloadMore() {
      this.hideMore = !this.hideMore;
      this.page += 1;
      interfaces
        .getListhouseAll({
          pagesize: this.page //请求页数
        })
        .then(res => {
          console.log("第五个");
          this.alllist = this.alllist.concat(res); //将请求回来的数据和上一次进行组合
        });
      // .catch(err => {
      //     this.$toast.fail("系统开小差,请重试");
      // });
    },

    tohideModel() {
      this.hideModel = false;
    },
    handleScroll() {
      this.scroll = $(window).height() + $(document).scrollTop();
    },
    toDetails(id, name) {
      this.status = 1;
      if (this.mobileLocal) {
        this.$router.push({
          name: "orderForm",
          params: { id: id, name: name, mobile: this.mobileLocal }
        });
      } else {
        this.hideModel = true;
      }
    },
    //  获取全部城市
    getAllCity() {
      let data = {};
      this.getListhouses(data);
    },
    // 获取即将开业图片
    getHotalListImage() {
      interfaces.getHotalListImage().then(res => {
        this.topImage = res.data.pic;
      });
    }
  },
  created() {
    this.mobileLocal = JSON.parse(localStorage.getItem("userinfo")).mobile;
    // let data={}
    // this.getListhouses(data)
    // this.getcitys()
    // this.gethouseTypes()
    // this.getHeight.minHeight=window.innerHeight+'px'
    this.getHotalListImage();
  },

  beforeRouteEnter(to, from, next) {
    console.log(to, from);
    let data = {};
    interfaces.getListhouseAll(data).then(function(res) {
      next(vm => {
        console.log("第六次");
        vm.alllist = res;
        console.log(res.length, "liebiao");
        if (res.length >= 8) {
          vm.showMore = true;
        }
        vm.getcitys();

        vm.gethouseTypes();
      });
    });
  },

  mounted: function() {
    window.addEventListener("scroll", this.handleScroll);
    $eventbus.$on("changeLang", res => {
      this.getcitys();
      this.getHotalListImage();
      (this.cityName = this.$i18n.t("m.hotel1")),
        (this.typehousename = this.$i18n.t("m.hotel2")),
        (this.mobileLocal = JSON.parse(
          localStorage.getItem("userinfo")
        ).mobile);
      let data = {};
      if (this.cityid) {
        this.city2(this.currentIndex, this.currentItem);
      }
      this.getListhouses(data);

      this.gethouseTypes(this.cityid, this.idsarea);
      this.getHeight.minHeight = window.innerHeight + "px";
    });
  },
  //第四步：当再次进入（前进或者后退）时，只触发activated（注：只有在keep-alive加载时调用）
  activated() {
    if (this.scroll > 0) {
      // window.scrollTo(0, this.scroll);
      window.addEventListener("scroll", this.handleScroll);
    }
  },
  //第五步：deactivated 页面退出时关闭事件 防止其他页面出现问题
  deactivated() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  components: {
    aheaders,
    afooter,
    submitBtn
  },
  watch: {
    "$store.state.lang": function(newVal, oldVal) {
      console.log(newVal);
    },
    cityAll(newVal, oldVal) {
      console.log("newVal");
      console.log(newVal);
      console.log(this.$i18n.t("m.hotel1"));

      if (JSON.stringify(newVal) !== JSON.stringify(oldVal)) {
        if (newVal[this.currentIndex0]) {
          this.cityName = newVal[this.currentIndex0].name;
        } else {
          this.cityName = this.$i18n.t("m.hotel1");
        }
      }
    }
  }
};
</script>

<style lang="less">
.img-wrap {
  padding-top: 1.6rem;
  height: 4.2rem;
  overflow: hidden;
  display: flex;
  justify-content: center;
  img {
    height: 100%;
  }
}

.img-wrap-pol {
  padding-top: 1.6rem;
}

.star {
  width: 100%;
  margin: 0 auto;
  min-height: 100%;
  padding-bottom: 5.96rem;
  box-sizing: border-box;
  position: relative;
  overflow-y: scroll; /* 增加该属性，可以增加弹性 */
  -webkit-overflow-scrolling: touch;
}
.hotel {
  width: auto;
  height: 100%;
  margin: 0 auto;
  border-top: 1px solid #f5f5f5;
  background-color: #fff;
}
.star .top-hotel {
  width: 100%;
  height: auto;
  margin: 0.22rem 0 0.88rem;
}
.star .top-hotel img {
  width: 100%;
  height: auto;
}
.star .choose-hotel {
  width: auto;
  height: auto;
  margin-top: 0.4rem;
}
.hotel-01 {
  display: flex;
  align-items: left;
  justify-content: flex-start;
  margin: 0 0.6rem;
}
.star .choose-hotel .s1 {
  font-size: 0.44rem;
  color: #0e0e0e;
  margin-right: 0.54rem;
}
.star .choose-hotel .s1 i {
  font-size: 0.44rem;
  color: #0e0e0e;
}
.star .hotel_main {
  width: auto;
  height: auto;
}
.star .hotel_main ul {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.star .hotel_main ul li {
  width: auto;
  height: auto;
  padding: 0.56rem 0;
  border-bottom: 1px solid #f1f1f1;
}
.star .hotel_main ul li .hotel-img {
  width: 9.62rem;
  height: 6.85rem;
  position: relative;
}
.star .hotel_main ul li .hotel-img img {
  width: 9.62rem;
  height: 6.85rem;
}
.star .hotel_main ul li .hotel-img .location {
  position: absolute;
  left: 0;
  bottom: 0;
  font-size: 0.36rem;
  color: #fff;
  background-image: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.5),
    rgba(0, 0, 0, 0)
  );
  width: 100%;
  padding: 0.2rem;
}
.star .hotel_main ul li .hotel-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 0.45rem;
  padding-left: 0.2rem;
}
.star .hotel_main ul li .hotel-title .title {
  font-size: 0.48rem;
  color: #000;
  font-weight: bold;
}
.star .hotel_main ul li .hotel-title button {
  width: 2.97rem;
  height: 0.98rem;
  font-size: 0.38rem;
  background-color: #5975a9;
  color: #fff;
  border: none;
  border-radius: 5px;
}
.star .hotel_main ul li .hotel-title button a {
  color: #fff;
}

.more-list {
  width: auto;
  height: auto;
  margin: 0.5rem 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.more-list img {
  width: 1.2rem;
  height: 0.3rem;
}

.s2 {
  width: 100%;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 0.24rem;
  transition: all 0.4s ease;
}
.s3 {
  width: 100%;
  height: 0.9rem;
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  display: flex;
  align-items: center;
  justify-content: center;
}
.s3 span {
  font-size: 0.48rem;
  flex: 1;
  text-align: center;
  font-weight: bold;
}
.s4 {
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  font-weight: bold;
}
.s4 .left {
  width: 5.38rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 0.37rem;
  justify-content: flex-start;
}
.s4 .left .city3 {
  width: 5.38rem;
  text-align: left;
  box-sizing: border-box;
  // padding-left: 0.3rem;
  display: flex;
  align-items: center;
}
.s4 .left .city3 span {
  font-size: 0.37rem;
  height: 1rem;
  line-height: 1rem;
  width: 5.38rem;
  padding-left: 0.4rem;
}
.s4 .left .city3 .right {
  width: 5.4rem;
}

.s4 .right {
  width: 5.4rem;
}
.s4 .right ul {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.s4 {
  .nihao {
    font-size: 0.37rem;
    color: #0e0e0e;
    line-height: 0.85rem;
    width: 100%;
    box-sizing: border-box;
    padding-left: 0.5rem;
    text-align: left;
  }
}

.s4 .right ul li {
  font-size: 0.37rem;
  color: #0e0e0e;
  line-height: 0.85rem;
  width: 100%;
  box-sizing: border-box;
  padding-left: 0.5rem;
  text-align: left;
}
.s2 ul li {
  font-weight: bold;
  color: #0e0e0e;
  font-weight: bold;
  line-height: 0.85rem;
  text-align: center;
  font-size: 0.37rem;
  height: 1rem;
  line-height: 1rem;
}
.s2 .right {
  width: 100%;
  padding: 0.3rem 0;
}
.s2 .right ul {
  width: 100%;
}
.s2 .nihao li.active {
  color: #3c5896;
  position: relative;
  background: url("../../assets/images/gou.png") no-repeat 80%;
  background-size: auto 50%;
}
.active {
  background-color: #eeeeee;
}
.active span {
  border-left: 0.15rem solid #3c5896;
}
// .activeIcon{transform: rotate(180deg);}

@media screen and (min-width: 640px) {
  .star .hotel_main ul li .hotel-img {
    width: 10.92rem;
  }
  .star .hotel_main ul li .hotel-img img {
    width: 10.92rem;
  }
  .hotel-01 {
    margin: 0 1.9rem;
  }
}
</style>
