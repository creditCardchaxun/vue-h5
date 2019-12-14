
<template>
  <div class="showmore">
    <!-- :class='{showonep:ishide&&shoumore}' -->
    <div class='testhight' :style="testhightstyle" ref='en-US'>A<br>A<br>A<br>A<br></div>
    <div class='testhight' :style="testhightstyle" ref='zh-CN'>啊<br>啊<br>啊<br>啊<br></div>
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
      ishide: true,
      textlang:'',cnH:123,enH:123
    }
  },
  created() {
    this.textlang = this.$store.state.lang
  },
  mounted() {
    // var enH = this.$refs.textdom.offsetHeight
    // var cnH = this.$refs.textdom.offsetHeight
    // 'zh-CN': require('./assets/lang/zh'),   
    //   'en-US': require('./assets/lang/en')  
    // debugger
    this.init()
  },
  computed: {
    testhightstyle(){
      if(this.pageType=='shouye')return 'font-size:0.34rem;line-height: 0.68rem;'
      if(this.pageType=='lianxi')return 'font-size:0.34rem;line-height: 0.81rem;'
      if(this.pageType=='hotal-gypp')return 'font-size:0.34rem;line-height: 0.6rem;'
      if(this.pageType=='hotal-zbjt')return 'font-size:0.34rem;line-height: 0.6rem;'
      return 'font-size:0.34rem;line-height: 0.68rem;'
    },
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
      // console.log(this.$refs[this.textlang]);
      if (!this.shoumore) return 'height:auto;';
      // if (this.ishide) return `height:${this.moreType.lineHeight * this.lineNum - 0.2 }rem;`;
      if (this.ishide) return `height:${this.$refs[this.textlang].offsetHeight}px;`;
      return 'height:auto;';
    }
  },
  watch:{
    htmlstr:function(){
        this.textlang = this.$store.state.lang
        if(this.cnH!==123&&this.textlang==='zh-CN'){
          this.shoumore = !!this.cnH
          return
        }
        if(this.enH !== 123&&this.textlang==='en-US'){
          this.shoumore = !!this.enH
          return
        }
        this.shoumore = false
        setTimeout(()=>{
          this.init()
        },10)
    }
  },
  methods: {
    init(){
      var rem = localStorage.getItem('lcRem')
      if (typeof (this.htmlstr) === 'string') {
        console.log(this.$refs.textdom.scrollHeight,rem * this.moreType.lineHeight * this.lineNum);
        if (this.$refs.textdom.scrollHeight - 6 > rem * this.moreType.lineHeight * this.lineNum) {
          
        console.log(1);
          this.shoumore = true
        }else{
          
        console.log(0);
          this.shoumore = false
          }
          this.textlang==='zh-CN'?this.cnH=!!this.shoumore:this.enH=!!this.shoumore
      } else {
        this.$nextTick(() => {
          if (this.$refs.textdomArr.scrollHeight - 6 > rem * this.moreType.lineHeight * this.lineNum) {
            this.shoumore = true
          }else{this.shoumore = false}
        })
      }
    },
    moreLoad() {
      this.ishide = !this.ishide
    }
  }
}

</script>

<style scoped>
.testhight{
  position: absolute;
  top: 3rem;
  visibility: hidden;
  /* display: none; */
  /* font-size:0.34rem;
  line-height: 0.68rem; */
}
.text {
  width: 90%;
  height: auto;
  margin: 0.64rem auto 1rem;
  overflow: hidden;
  transition: 1s;
}

.lianxi{
  margin-bottom: 0;
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
