<template>
  <div class="myorder">
    <!-- <img src='../assets/images/about.png'/> -->
    <aheaders status="2" :showLan="true"></aheaders>
    <div class="order-list" :style="getHeight">
      <div class="myorder-list" v-if="orderList.length>0">
        <h2>{{$t('m.watch')}}</h2>
        <div class="total">
          <div
            class="orderlist"
            v-for="(item,index) in orderList"
            :key="index"
            @click.stop="todetailOrder(item.id)"
          >
            <div class="left">
              <router-link :to="{name:'orderDetail', params:{id:item.id}}">
                <img :src="item.onepic" alt />
              </router-link>
            </div>
            <div class="right" style="width:6.45rem">
              <div>
                <h3>
                  <router-link :to="{name:'orderDetail', params:{id:item.id}}">{{item.project_name}}</router-link>
                </h3>
                <p>{{$t('m.watch3')}}:&nbsp;{{item.book_time}}</p>
                <p>{{item.zhut?item.zhut:'&nbsp;'}}</p>
              </div>
              <div class="morder-t" style="width:100%;">
                <em @click.stop.prevent="toMaps(item.projectid)">
                  <!-- <router-link :to="{name:'hotelDetail?#maps', params:{id:projectid}}"> -->
                  <span>{{$t('m.watch4')}}</span>
                  <!-- </router-link>  -->
                </em>
                <button
                  @click.stop.prevent="orderDetails(item.id,item.status,item.mobile)"
                >{{orderList[index].titleBtn2}}</button>
              </div>
            </div>
          </div>
        </div>
        <!-- <div class="s1" v-else>{{$t('m.watch5')}}</div> -->
      </div>

      <div class="myorder-list2" v-if="orderList2.length>0">
        <h2>{{$t('m.watch2')}}</h2>
        <div class="total">
          <div
            class="orderlist"
            v-for="(item,index) in orderList2"
            :key="index"
            @click.stop="todetailOrder2(item.id)"
          >
            <router-link :to="{name:'orderDetail',params:{id:item.id}}">
              <div class="left">
                <img :src="item.onepic" alt />
              </div>
            </router-link>
            <router-link :to="{name:'orderDetail',params:{id:item.id}}" style="width:6.45rem;">
              <div class="right">
                <div>
                  <h3>{{item.project_name}}</h3>
                  <p>{{$t('m.watch3')}}:&nbsp;{{item.book_time}}</p>
                  <p>{{item.zhut?item.zhut:'&nbsp;'}}</p>
                </div>
                <div class="morder-t">
                  <em @click.stop.prevent="toMaps(item.projectid)">
                    <span style="padding-bottom:2px;">{{$t('m.watch4')}}</span>
                  </em>
                  <!-- <button
                    v-show="item.is_pj==0"
                    @click.stop.prevent="toAppraise(item.id)"
                  >{{$t('m.watch6')}}</button>-->
                  <button
                    v-if="item.status"
                    @click.stop.prevent="orderDetails2(item.id,item.status,item.mobile)"
                  >{{orderList2[index].titleBtn2}}</button>
                </div>
              </div>
            </router-link>
          </div>
        </div>
        <!-- <div class="s1" v-else>{{$t('m.watch5')}}</div> -->
      </div>

      <div class="myorder-list" v-if="canceled.length > 0">
        <h2>{{$t('m.watch33')}}</h2>
        <div class="total">
          <div
            class="orderlist"
            v-for="(item,index) in canceled"
            :key="index"
            @click.stop="todetailOrder(item.id)"
          >
            <div class="left">
              <router-link :to="{name:'orderDetail', params:{id:item.id}}">
                <img :src="item.onepic" alt />
              </router-link>
            </div>
            <div class="right" style="width:6.45rem">
              <div>
                <h3>
                  <router-link :to="{name:'orderDetail', params:{id:item.id}}">{{item.project_name}}</router-link>
                </h3>
                <p>{{$t('m.watch3')}}:&nbsp;{{item.book_time}}</p>
                <p>{{item.zhut?item.zhut:'&nbsp;'}}</p>
              </div>

              <div class="morder-t" style="width:100%;">
                <em @click.stop.prevent="toMaps(item.projectid)">
                  <!-- <router-link :to="{name:'hotelDetail?#maps', params:{id:projectid}}"> -->
                  <span>{{$t('m.watch4')}}</span>
                  <!-- </router-link>  -->
                </em>
                <button
                  @click.stop.prevent="orderDetails(item.id,item.status,item.mobile)"
                >{{orderList[index].titleBtn2}}</button>
              </div>
            </div>
          </div>
        </div>
        <!-- <div class="s1" v-else>{{$t('m.watch5')}}</div> -->
      </div>

      <div class="s1" v-show="showBtn">
        {{$t('m.watch5')}}
        <button @click="toOrder">{{$t('m.watch7')}}</button>
      </div>
    </div>

    <!-- 预约弹框 -->
    <submitBtn v-if="hideModel" @tohideModel="tohideModel" :status="status" @update1="getPhones111"></submitBtn>

    <afooter></afooter>
  </div>
</template>
<script>
import aheaders from "@/components/Header";
import afooter from "@/components/Footer";
import interfaces from "@/utils/api.js";
import submitBtn from "@/components/submitBtn";

export default {
  name: "myorder",
  data() {
    return {
      orderList: [],
      orderList2: [],
      canceled: [],
      getHeight: {
        minHeight: ""
      },
      showBtn: false,
      hideModel: false,
      status: '',
      titleBtn: '',
      titleBtn2: ''
    };
  },
  computed: {

  },
  mounted() {
    // eslint-disable-next-line no-undef
    $eventbus.$on("changeLang", () => {
      // eslint-disable-next-line no-unused-vars
      let id = JSON.parse(localStorage.getItem("userinfo")).id;
      this.booklists();
    });
  },
  created() {
    // eslint-disable-next-line no-unused-vars
    let id = JSON.parse(localStorage.getItem("userinfo")).id;
    this.mobileLocal = JSON.parse(localStorage.getItem('userinfo')).mobile
    this.booklists();
  },
  methods: {
    tohideModel() {
      this.hideModel = false
    },
    getPhones111(data) {
      this.phone = data;
    },
    toMaps(id) {
      this.$router.push({
        name: "hotelDetail",
        params: { id: id, status: "map" }
      });
    },
    booklists() {
      interfaces.bookList().then(res => {

        var allArr = [].concat(res.not_finish).concat(res.finish).concat(res.cancel)

        var orderList = allArr.filter((item) => {
          return Number(item.status) === 1 || Number(item.status) === 2 || Number(item.status) === 3 || Number(item.status) === 4
        })

        this.orderList = this.addBtnTitle(orderList)

        var orderList2 = allArr.filter((item) => {
          return Number(item.status) === 6 || Number(item.status) === 7
        })

        this.orderList2 = this.addBtnTitle(orderList2)

        var canceled = allArr.filter((item) => {
          return Number(item.status) === 5
        })

        this.canceled = this.addBtnTitle(canceled)

        // if (res.not_finish.length !== 0) {
        //   this.orderList = this.addBtnTitle(res.not_finish)
        // }

        // if (res.finish.length !== 0) {
        //   this.orderList2 = this.addBtnTitle(res.finish)
        // }

        // if (res.cancel.length !== 0) {
        //   this.canceled = this.addBtnTitle(res.cancel)
        // }


        if (
          (res.not_finish == null ||
            res.not_finish == "" ||
            res.not_finish.length == 0) &&
          (res.finish == null || res.finish == "" || res.finish.length == 0)
        ) {
          this.showBtn = true;
        }
      });
    },
    addBtnTitle(arr) {
      var titleBtn2 = ''
      var zhut = ''
      arr.forEach((item) => {
        switch (item.status) {
          case '1':
            titleBtn2 = "查看详情";
            zhut = '待接单'
            break;
          case '2':
            titleBtn2 = "联系销售";
            zhut = '销售已接单'
            break;
          case '3':
            titleBtn2 = "查看详情";
            zhut = '待接单'
            break;
          case '4':
            titleBtn2 = "查看详情";
            zhut = '待接单'
            break;
          case '5':
            titleBtn2 = "已取消";
            zhut = ''
            break;
          case '6':
            titleBtn2 = "立即评价";
            zhut = ''
            break;
          case '7':
            titleBtn2 = "已完成";
            zhut = ''
            break;
          case '8':
            titleBtn2 = "已完成";
            zhut = ''
            break;
        }
        item.titleBtn2 = titleBtn2
        item.zhut = zhut
      })

      return arr
    },
    orderDetails(id, status, mobile) {
      switch (status) {
        case '1':
          this.$router.push({ name: "orderDetail", params: { id: id } });
          break;
        case '2':
          window.location.href = 'tel://' + mobile
          break;
        case '3':
          this.$router.push({ name: "orderDetail", params: { id: id } });
          break;
        case '4':
          this.$router.push({ name: "orderDetail", params: { id: id } });
          break;
        case '5':
          this.$router.push({ name: "orderDetail", params: { id: id } });
          break;
        case '6':
          this.$router.push({ name: "appraise", params: { id: id } });
          break;
        case '7':
          this.$router.push({ name: "orderDetail", params: { id: id } });
          break;
        case '8':
          this.$router.push({ name: "orderDetail", params: { id: id } });
          break;
      }
    },
    orderDetails2(id, status, mobile) {
      switch (status) {
        case '1':
          this.$router.push({ name: "orderDetail", params: { id: id } });
          break;
        case '2':
          window.location.href = 'tel://' + mobile
          break;
        case '3':
          this.$router.push({ name: "orderDetail", params: { id: id } });
          break;
        case '4':
          this.$router.push({ name: "orderDetail", params: { id: id } });
          break;
        case '5':
          this.$router.push({ name: "orderDetail", params: { id: id } });
          break;
        case '6':
          this.$router.push({ name: "appraise", params: { id: id } });
          break;
        case '7':
          this.$router.push({ name: "orderDetail", params: { id: id } });
          break;
        case '8':
          this.$router.push({ name: "orderDetail", params: { id: id } });
          break;
      }
    },
    todetailOrder(id) {
      this.$router.push({ name: "orderDetail", params: { id: id } });
    },
    todetailOrder2(id) {
      this.$router.push({ name: "orderDetail", params: { id: id } });
    },
    toAppraise(id) {
      this.$router.push({ name: "appraise", params: { id: id } });
    },
    toOrder() {
      // this.$router.push({ name: "orderForm" });
      if (this.mobileLocal) {
        this.hideModel = false
        this.$router.push({ name: 'orderForm', params: { mobile: this.mobileLocal } })
      } else {
        this.hideModel = true
        this.status = 1
      }
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
.myorder {
  width: 100%;
  margin: 0 auto;
  min-height: 100%;
  padding-bottom: 5.96rem;
  box-sizing: border-box;
  position: relative;
  overflow-y: scroll; /* 增加该属性，可以增加弹性 */
  -webkit-overflow-scrolling: touch;
}
.myorder-list {
  width: 9.69rem;
  height: auto;
  margin: 0 auto;
  padding-top: 0.9rem;
  border-top: 1px solid #f5f5f5;
}
.myorder-list2 {
  width: 9.69rem;
  height: auto;
  margin: 0 auto;
  padding-top: 0.9rem;
}
.myorder-list h2 {
  font-size: 0.44rem;
  color: #000;
  font-weight: bold;
}
.order-list {
  background-color: #fff;
}
.order-list .s1 {
  font-size: 0.35rem;
  color: #999;
  text-align: center;
  margin-top: 0.8rem;
}
.order-list .s1 button {
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
.myorder-list2 .s1 {
  font-size: 0.35rem;
  color: #999;
  text-align: center;
}
.myorder-list2 h2 {
  font-size: 0.44rem;
  color: #000;
  font-weight: bold;
}
.orderlist {
  width: 100%;
  height: auto;
  display: flex;
  align-items: left;
  padding: 0.52rem 0;
  border-bottom: 1px solid #f1f1f1;
}
/* .orderlist a{} */
.orderlist .left {
  width: 3.29rem;
  height: 2.6rem;
}
.orderlist .left img {
  width: 3.29rem;
  height: 2.6rem;
}
.orderlist .right {
  width: auto;
  height: 2.6rem;
  display: flex;
  align-items: left;
  flex-direction: column;
  justify-content: space-between;
  padding-left: 0.4rem;
  overflow: hidden;
  position: relative;
}
.orderlist .right h3 {
  font-size: 0.4rem;
  color: #000;
  font-weight: bold;
  line-height: 0.5rem;
  height: 0.5rem;
  overflow: hidden;
}
.orderlist .right h3 a {
  font-size: 0.4rem;
  color: #000;
}
.orderlist .right p {
  font-size: 0.3rem;
  color: #999;
  padding-top: 0.2rem;
}
.orderlist .right em {
  /* margin-top: 0.4rem; */
}
.orderlist .right span {
  display: block;
  font-size: 0.3rem;
  color: #999;
  border-bottom: 1px solid #999;
  padding-bottom: 4px;
  width: auto;
}
.orderlist .right button {
  width: 2.14rem;
  height: 0.78rem;
  font-size: 0.3rem;
  background-color: #5975a9;
  border: none;
  color: #fff;
  /* margin: 0.68rem 0 0 auto; */
  border-radius: 3px;
  white-space: nowrap;
}
.orderlist .right button a {
  color: #fff;
}
.orderlist .right .morder-t {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

@media screen and (min-width: 640px) {
  .myorder-list {
    width: 690px;
    margin: 0 auto;
  }
  .myorder-list2 {
    width: 690px;
    margin: 0 auto;
  }
  .orderlist {
    position: relative;
  }
  .orderlist .right button {
    position: absolute;
    right: 0;
    margin-top: 0.32rem;
  }
}
</style>