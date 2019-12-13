
<template>
  <div class="showmore">
    <!-- :class='{showonep:ishide&&shoumore}' -->
    <div :class="['text',moreType.className]" v-html="htmlstr" :style="textstyle" ref="textdom"></div>
    <div class="index-more" v-show="shoumore" @click="moreLoad()">
      <span v-if="ishide">more</span>
      <img class="more-icon" :class="{down:!ishide}" src="../assets/images/more-icon.jpg" alt />
    </div>
  </div>
</template>

<script>
// lianxi 联系我们页面
// hotal-gypp  公寓详情公寓品牌
export default {
  name: 'showmore',
  props: {
    htmlstr: String,
    lineNum: {
      default: 4,
      type: Number
    },
    pageType: {
      default: 'lianxi',
      type: String
    }
  },
  data() {
    return {
      shoumore: false,
      ishide: true
    }
  },
  created() {
  },
  mounted() {
    var rem = localStorage.getItem('lcRem')
    if (this.$refs.textdom.offsetHeight > rem * this.moreType.lineHeight * this.lineNum) {
      this.shoumore = true
    }
  },
  computed: {
    moreType() {
      var obj = {}
      switch (this.pageType) {
        case 'lianxi':
          obj = {
            lineHeight: 0.81,
            className: 'lianxi'
          }
          break;
        case 'hotal-gypp':
          obj = {
            lineHeight: 0.6,
            className: 'hotal-gypp'
          }
          break;
        default:
          break;
      }
      return obj
    },
    textstyle() {
      if (!this.shoumore) return 'height:auto;';
      if (this.ishide) return `height:${this.moreType.lineHeight * this.lineNum}rem;`;
      return 'height:auto;';
    }
  },
  methods: {
    moreLoad() {
      this.ishide = !this.ishide
    }
  }
}

</script>

<style scoped>
.text {
  width: 90%;
  height: auto;
  margin: 0.64rem auto 1rem;
  overflow: hidden;
  transition: 1s;
}

.lianxi >>> p {
  line-height: 0.81rem;
  font-size: 0.36rem;
}

.hotal-gypp >>> p {
  line-height: 0.6rem;
  font-size: 0.34rem;
}
.hotal-gypp {
  width: 100%;
  line-height: 0.6rem;
  font-size: 0.34rem;
  margin-bottom: 0.3rem;
}

/* .text >>> p {
  line-height: 0.81rem;
  font-size: 0.36rem;
} */
.showonep.text >>> p {
  display: none;
}
.showonep.text >>> p:nth-child(1) {
  display: block;
}

.more-icon {
  margin-top: 0.02rem;
  transform: rotate(0deg);
  transition: 0.5s;
}
.down {
  transform: rotate(180deg);
  transition: 0.5s;
}
</style>
