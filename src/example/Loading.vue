<template>
  <div>
    <h4>loading预加载示例</h4>
    <button @click="startLoad">开始加载</button>
    <h4>{{progress}}</h4>
  </div>
</template>

<script>
// 在index中引用了preload.js
export default {
  data() {
    return {
      progress: 0,
      mainfest: [
        { src: require("../assets/img/img.jpg") },
        // 音频
        { src: require("../assets/mp3/music.mp3"), id: 'loop' },
        // 视频
        // { src: require("../assets/video/锡伯舞.mp4"), id: 'myVideo' }
      ]
    }
  },
  mounted() {

  },
  methods: {
    initLoad() {
      var self = this

      // var mainfest = [
      //   { src: require("../assets/img/img.jpg") },
      //   // 音频
      //   { src: require("../assets/mp3/music.mp3"), id: 'loop' },
      //   // 视频
      //   { src: require("../assets/video/锡伯舞.mp4"), id: 'myVideo' }
      // ];

      var preload = {
        // 预加载函数
        startPreload: function () {
          var preload = new createjs.LoadQueue(true);
          //为preloaded添加整个队列变化时展示的进度事件
          preload.addEventListener("progress", this.handleFileProgress);
          //注意加载音频文件需要调用如下代码行
          preload.installPlugin(createjs.SOUND);
          //为preloaded添加当队列完成全部加载后触发事件
          preload.addEventListener("complete", this.loadComplete);
          //设置最大并发连接数  最大值为10
          preload.setMaxConnections(1);
          preload.loadManifest(self.mainfest);
        },
        // 当整个队列变化时展示的进度事件的处理函数
        handleFileProgress: function (event) {
          // $(".percent").text('loading...' + Math.ceil(event.loaded * 100) + "%");
          console.log(event.loaded);
          self.progress = Math.ceil(event.loaded * 100) + "%"
        },
        // 处理preload添加当队列完成全部加载后触发事件
        loadComplete: function () {
          // shuangjie.$pageLoad.addClass('hide').next().removeClass('hide')
        }
      }
      preload.startPreload();
    },
    startLoad() {
      this.initLoad()
    }
  }
}
</script>

<style lang="less" scoped>
</style>
