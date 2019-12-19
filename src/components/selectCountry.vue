<template>
  <div class="select-country">
<van-icon name="close" size='25px'  class='iconClose'  @click='setCountry()'/>
    <van-index-bar @select="changeIndex" :index-list="indexList">
      
      <Fragment v-for="letter in itemList" :key="letter.anchor" >
        <Fragment v-if='letter.show'>  
          <van-index-anchor :index="letter.anchor"/>
          <van-cell 
            v-for="(item) in letter.data"
            @click='setCountry(item)'
            :key="item.tel"
            :title="item.name"
          >{{item.tel}}</van-cell>
        </Fragment>
      </Fragment>
      </van-index-bar>
  </div>
</template>

<script>
import Vue from "vue";
import { IndexBar, IndexAnchor,Popup } from "vant";
Vue.use(Popup);
Vue.use(IndexBar).use(IndexAnchor);
import { Icon } from 'vant';
Vue.use(Icon);
import { Fragment } from 'vue-fragment'

export default {
  name: "select-country",
  // type: [String, Number, Array],
  props: {
    // value: {
    //   type: Number,
    //   default: ''
    // },
    placeholder: String,
    showregion:Boolean
  },
  components:{Fragment},
  created(){
    console.log(this.$t('m.selectCountry'));
  },
  computed: {
    itemList(){
      // debugger
      var indexList = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
      var dataArr = this.$t('m.selectCountry')
      var res = []
      for (let i = 0; i < indexList.length; i++) {
        res.push({anchor:indexList[i],data:[],show:false});
      }
      for (let j = 0; j < dataArr.length; j++) {
        var thisIndex = _.findIndex(indexList,function(letter){return dataArr[j].short[0]==letter});
        res[thisIndex].data.push(dataArr[j]);
      }
      for (let k = 0; k < res.length; k++) {
        if(res[k].data.length>0){res[k].show = true}
      }
      return res
    },
    indexList(){
      var indexList = []
      for (let i = 0; i < this.itemList.length; i++) {
        if(this.itemList[i].data.length>0)indexList.push(this.itemList[i].anchor);
      }
      return indexList
    }
  },
  // mounted(){console.log('mounted')},
  data() {
    return {
    };
  },
  methods: {
    change(val) {
      this.$emit("input", val);
    },
    changeIndex(index, value) {
      console.log(index);
    },
    setCountry(res){
      this.$emit("select", res);
    }
  }
};
</script>

<style scoped>
/* .select{width:2rem;height:1rem;position:absolute;top:0;left:0;} */
.select-country .iconClose{width:10%;height:auto;position:fixed;top:7px;right:-8px;z-index:999;color:#999;}
select {
  width: 2rem;
  height: 1rem;
}
.select-country {
  z-index: 999;
  position: relative;
  background: #fff;
  overflow: scroll;
}
.van-index-bar .van-cell__value{text-align: left;}
</style>