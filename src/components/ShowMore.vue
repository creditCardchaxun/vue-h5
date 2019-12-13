
<template>
  <div class="showmore">
    <!-- :class='{showonep:ishide&&shoumore}' -->
    <div class="text" v-html="htmlstr"  :style='textstyle' ref='textdom'></div>
    <div class="index-more" v-show="shoumore" @click="moreLoad()">
      <span v-if="ishide">more</span>
      <img class="more-icon" :class='{down:!ishide}' src="../assets/images/more-icon.jpg" alt />
    </div> 
  </div>
</template>
 
<script>
  export default {
    name: 'showmore',
    props:{
     htmlstr:String,
    },
    data() {
      return {
        shoumore: false,
        ishide : true
      }
    },
    created() {
    },
    mounted(){
      var rem = localStorage.getItem('lcRem')
        if(this.$refs.textdom.offsetHeight>rem*0.81*5){
          this.shoumore = true
        }
    },
    computed: {
      textstyle(){
        if(!this.shoumore) return  'height:auto;';
        if(this.ishide) return 'height:3.8rem;';
        return 'height:auto;';
      }
    },
 
    methods: {
      moreLoad(){
        this.ishide = !this.ishide
      }
     
 
    }
 
  }
 
</script>
 
<style scoped>
  .text{
    width: 90%;
    height: auto;
    margin: 0.64rem auto 1rem;
    overflow: hidden;
    transition: 1s;
  }
  .text >>> p{
    line-height: .81rem;
    font-size: .36rem;
    margin-top: .81rem;
  }
  .showonep.text >>> p{
    display: none;
  }
  .showonep.text >>> p:nth-child(1){
    display: block;
  }
  
  .more-icon{
    margin-top:0.02rem;
    transform: rotate(0deg);
    transition: 0.5s;
  }
  .down{
    transform: rotate(180deg);
    transition: 0.5s;
  }
</style>
