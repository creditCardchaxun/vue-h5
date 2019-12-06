<template>
  <div class="select-country">
    <!-- <select :placeholder="placeholder" :value="value" @input="change($event)">
        <option v-for="item in options" :key="item.value" :label="`${item.name}(${item.en})  +${item.tel}`" :value="item.tel">
        </option>
    </select>-->
    <!-- {{}} -->
  <!-- <van-popup
    closeable
    v-model="showregion"
    position="left"
    :style="{ height: '100%',width:'100%' }"
    > -->
    <van-icon name="close" size='25px'  class='iconClose'  @click='setCountry()'/>
    <van-index-bar @select="changeIndex" :index-list="indexList">
      <van-index-anchor index="A"/>
      <van-cell
        v-for="(item) in $i18n.t('m.selectCountry.optionsA')"
        @click='setCountry(item)'
        :key="item.tel"
        :title="item.name"
      >{{item.tel}}</van-cell>
      <van-index-anchor index="B"/>
      <van-cell
        v-for="(item) in $i18n.t('m.selectCountry.optionsB')"
        @click='setCountry(item)'
        :key="item.tel"
        :title="item.name"
      >{{item.tel}}</van-cell>
      <van-index-anchor index="C"/>
      <van-cell
        v-for="(item) in $i18n.t('m.selectCountry.optionsC')"
        @click='setCountry(item)'
        :key="item.tel"
        :title="item.name"
      >{{item.tel}}</van-cell>
      <van-index-anchor index="D"/>
      <van-cell
        v-for="(item) in $i18n.t('m.selectCountry.optionsD')"
        @click='setCountry(item)'
        :key="item.tel"
        :title="item.name"
      >{{item.tel}}</van-cell>
      <van-index-anchor index="E"/>
      <van-cell
        v-for="(item) in $i18n.t('m.selectCountry.optionsE')"
        @click='setCountry(item)'
        :key="item.tel"
        :title="item.name"
      >{{item.tel}}</van-cell>
      <van-index-anchor index="F"/>
      <van-cell
        v-for="(item) in $i18n.t('m.selectCountry.optionsF')"
        @click='setCountry(item)'
        :key="item.tel"
        :title="item.name"
      >{{item.tel}}</van-cell>
      <van-index-anchor index="G"/>
      <van-cell
        v-for="(item) in $i18n.t('m.selectCountry.optionsG')"
        @click='setCountry(item)'
        :key="item.tel"
        :title="item.name"
      >{{item.tel}}</van-cell>
      <van-index-anchor index="H"/>
      <van-cell
        v-for="(item) in $i18n.t('m.selectCountry.optionsH')"
        @click='setCountry(item)'
        :key="item.tel"
        :title="item.name"
      >{{item.tel}}</van-cell>
      <van-index-anchor index="I"/>
      <van-cell
        v-for="(item) in $i18n.t('m.selectCountry.optionsI')"
        @click='setCountry(item)'
        :key="item.tel"
        :title="item.name"
      >{{item.tel}}</van-cell>
      <van-index-anchor index="J"/>
      <van-cell
        v-for="(item) in $i18n.t('m.selectCountry.optionsJ')"
        @click='setCountry(item)'
        :key="item.tel"
        :title="item.name"
      >{{item.tel}}</van-cell>
      <van-index-anchor index="K"/>
      <van-cell
        v-for="(item) in $i18n.t('m.selectCountry.optionsK')"
        @click='setCountry(item)'
        :key="item.tel"
        :title="item.name"
      >{{item.tel}}</van-cell>
      <van-index-anchor index="L"/>
      <van-cell
        v-for="(item) in $i18n.t('m.selectCountry.optionsL')"
        @click='setCountry(item)'
        :key="item.tel"
        :title="item.name"
      >{{item.tel}}</van-cell>
      <van-index-anchor index="M"/>
      <van-cell
        v-for="(item) in $i18n.t('m.selectCountry.optionsM')"
        @click='setCountry(item)'
        :key="item.tel"
        :title="item.name"
      >{{item.tel}}</van-cell>
      <van-index-anchor index="N"/>
      <van-cell
        v-for="(item) in $i18n.t('m.selectCountry.optionsN')"
        @click='setCountry(item)'
        :key="item.tel"
        :title="item.name"
      >{{item.tel}}</van-cell>
      <van-index-anchor index="O"/>
      <van-cell
        v-for="(item) in $i18n.t('m.selectCountry.optionsO')"
        @click='setCountry(item)'
        :key="item.tel"
        :title="item.name"
      >{{item.tel}}</van-cell>
      <van-index-anchor index="P"/>
      <van-cell
        v-for="(item) in $i18n.t('m.selectCountry.optionsP')"
        @click='setCountry(item)'
        :key="item.tel"
        :title="item.name"
      >{{item.tel}}</van-cell>
      <van-index-anchor index="Q"/>
      <van-cell
        v-for="(item) in $i18n.t('m.selectCountry.optionsQ')"
        @click='setCountry(item)'
        :key="item.tel"
        :title="item.name"
      >{{item.tel}}</van-cell>
      <van-index-anchor index="R"/>
      <van-cell
        v-for="(item) in $i18n.t('m.selectCountry.optionsR')"
        @click='setCountry(item)'
        :key="item.tel"
        :title="item.name"
      >{{item.tel}}</van-cell>
      <van-index-anchor index="S"/>
      <van-cell
        v-for="(item) in $i18n.t('m.selectCountry.optionsS')"
        @click='setCountry(item)'
        :key="item.tel"
        :title="item.name"
      >{{item.tel}}</van-cell>
      <van-index-anchor index="T"/>
      <van-cell
        v-for="(item) in $i18n.t('m.selectCountry.optionsT')"
        @click='setCountry(item)'
        :key="item.tel"
        :title="item.name"
      >{{item.tel}}</van-cell>
      <van-index-anchor index="U"/>
      <van-cell
        v-for="(item) in $i18n.t('m.selectCountry.optionsU')"
        @click='setCountry(item)'
        :key="item.tel"
        :title="item.name"
      >{{item.tel}}</van-cell>
      <van-index-anchor index="V"/>
      <van-cell
        v-for="(item) in $i18n.t('m.selectCountry.optionsV')"
        @click='setCountry(item)'
        :key="item.tel"
        :title="item.name"
      >{{item.tel}}</van-cell>
      <van-index-anchor index="W"/>
      <van-cell
        v-for="(item) in $i18n.t('m.selectCountry.optionsW')"
        @click='setCountry(item)'
        :key="item.tel"
        :title="item.name"
      >{{item.tel}}</van-cell>
      <van-index-anchor index="X"/>
      <van-cell
        v-for="(item) in $i18n.t('m.selectCountry.optionsX')"
        @click='setCountry(item)'
        :key="item.tel"
        :title="item.name"
      >{{item.tel}}</van-cell>
      <van-index-anchor index="Y"/>
      <van-cell
        v-for="(item) in $i18n.t('m.selectCountry.optionsY')"
        @click='setCountry(item)'
        :key="item.tel"
        :title="item.name"
      >{{item.tel}}</van-cell>
      <van-index-anchor index="Z"/>
      <van-cell
        v-for="(item) in $i18n.t('m.selectCountry.optionsZ')"
        @click='setCountry(item)'
        :key="item.tel"
        :title="item.name"
      >{{item.tel}}</van-cell>
    </van-index-bar>
    <!-- </van-popup> -->
  </div>
</template>

<script>
import Vue from "vue";
import { IndexBar, IndexAnchor,Popup } from "vant";
Vue.use(Popup);
Vue.use(IndexBar).use(IndexAnchor);
import { Icon } from 'vant';
Vue.use(Icon);

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
  // mounted(){console.log('mounted')},
  data() {
    return {
      indexList: [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z"
      ],
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