<template>
  <div>
    <selectcountry :showregion="showregion" @select="selectedCountry"></selectcountry>
  </div>
</template>

<script>
import selectcountry from "@/components/selectCountry";
export default {
  data() {
    return {
      showregion: true
    }
  },
  components:{
    selectcountry
  }
}
</script>

<style lang="less" scoped>
</style>