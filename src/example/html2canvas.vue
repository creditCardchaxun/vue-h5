<template>
  <div >
    <button @click="haibao">生成海报</button>
    <div class="html2canvas-wrap">
      <div class="swiper-item-fenxiang" id="v2">
        <h2>html2canvas</h2>
        <img src="../assets/img/img.jpg" alt />
      </div>
    </div>
  </div>
</template>

<script>
import html2canvas from 'html2canvas'
import canvas2Image from '@/assets/lib/canvas2image'

export default {
  mounted() {

  },
  methods: {
    // 分享海报；
    haibao() {
      var _this = this
      var test = document.getElementsByClassName('swiper-item-fenxiang')[0]
      var width = test.offsetWidth // 获取dom 宽度
      var height = test.offsetHeight // 获取dom 高度
      var canvas = document.createElement('canvas')
      var scale = 1
      canvas.width = width * scale // 定义canvas 宽度 * 缩放
      canvas.height = height * scale // 定义canvas高度 *缩放
      canvas.getContext('2d').scale(scale, scale)

      html2canvas(test, {
        useCORS: true,
        logging: false, // 日志开关，便于查看html2canvas的内部执行流程
        canvas: canvas,
        width: width,
        height: height,
        scale: scale
      }).then(function (canvas) {
        var context = canvas.getContext('2d')
        // 【重要】关闭抗锯齿
        context.mozImageSmoothingEnabled = false
        context.webkitImageSmoothingEnabled = false
        context.msImageSmoothingEnabled = false
        context.imageSmoothingEnabled = false

        var img = canvas2Image.convertToImage(
          canvas,
          canvas.width,
          canvas.height
        )
        img.setAttribute('crossOrigin', 'anonymous')
        var srcfx = img.src || canvas.toDataURL('image/png')
        console.log(srcfx);
      })

    }
  }
}
</script>

<style lang="less" scoped>
.html2canvas-wrap {
  position: relative;
  height: 400px;
}
.swiper-item-fenxiang {
  border: 1px solid red;
  position: absolute;
  top: 0rem;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  // opacity: 0;
  z-index: -10;

  img {
    width: 100%;
    height: auto;
  }
}
</style>