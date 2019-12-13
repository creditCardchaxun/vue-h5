
<template>
  <div class="showmore">
    <div class="text" v-html="htmlstr" :style='textstyle' ref='textdom'></div>
  
    <div class="index-more" v-show="shoumore" @click="moreLoad()">
      <span>more</span>
      <img class="more-icon" src="../assets/images/more-icon.jpg" alt />
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
        if(this.$refs.textdom.offsetHeight>rem*0.81*4){
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
  }
  .text >>> p{
    line-height: .81rem;
    font-size: .36rem;
    margin-top: .5rem;
  }
  .more-icon{
    margin-top:0.02rem;
  }
</style>
