
<template>
  <div class="showmore">
    <!-- :class='{showonep:ishide&&shoumore}' -->
    <div
      v-if="typeof htmlstr === 'string'"
      :class="['text',moreType.className]"
      v-html="htmlstr"
      :style="textstyle"
      ref="textdom"
    ></div>
    <div
      v-show="typeof htmlstr !== 'string'"
      :class="['shouye',moreType.className]"
      :style="textstyle"
      ref="textdomArr"
    >
      <p v-for="(item,index) in htmlstr" :key="index">{{item}}</p>
    </div>
    <div class="index-more" v-show="shoumore" @click="moreLoad()">
      <span v-if="ishide">more</span>
      <img class="more-icon" :class="{down:!ishide}" src="../assets/images/more-icon.jpg" alt />
    </div>
  </div>
</template>

<script>
// lianxi 联系我们页面
// hotal-gypp  公寓详情公寓品牌
// hotal-zbjt  公寓详情周边交通
// shouye 首页
export default {
  name: 'showmore',
  props: {
    htmlstr: {
      required: true
    },
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
    if (typeof (this.htmlstr) === 'string') {
      if (this.$refs.textdom.offsetHeight > rem * this.moreType.lineHeight * this.lineNum) {
        this.shoumore = true
      }
    } else {
      this.$nextTick(() => {
        if (this.$refs.textdomArr.offsetHeight > rem * this.moreType.lineHeight * this.lineNum) {
          this.shoumore = true
        }
      })
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
        case 'hotal-zbjt':
          obj = {
            lineHeight: 0.6,
            className: 'hotal-zbjt'
          }
          break;
        case 'shouye':
          obj = {
            lineHeight: 0.68,
            className: 'shouye'
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

.hotal-zbjt {
  margin-bottom: 0;
}

.hotal-zbjt >>> p {
  line-height: 0.6rem;
  font-size: 0.34rem;
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

.shouye {
  overflow: hidden;
}

.shouye p {
  font-size: 0.34rem;
  color: #060606;
  line-height: 0.68rem;
}

.more-icon {
  margin-top: 0.02rem;
  transform: rotate(0deg);
  transition: 0.5s;
  position: relative;
  top: 0.03rem;
}
.down {
  transform: rotate(180deg);
  transition: 0.5s;
}
</style>
