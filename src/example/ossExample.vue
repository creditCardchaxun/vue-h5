<template>
  <div>
    <h3>oss上传示例</h3>
    <button @click="showAction">点击上传</button>
    <input
      type="file"
      id="video"
      accept="video/*"
      @change="onFileChange($event)"
      style="display: none;"
    />
    <input
      type="file"
      id="picture"
      accept="image/*"
      @change="onFileChange($event)"
      style="display: none;"
    />

    <h5 class=".mint-indicator-text"></h5>
    <div v-if="poster">
      <h6>预览</h6>
    </div>
    <img :src="poster" alt />
    <mt-actionsheet :actions="actions" v-model="showactions"></mt-actionsheet>
  </div>
</template>

<script>
import { Toast, Indicator } from "mint-ui"

export default {
  data() {
    return {
      actions: [{
        name: '上传照片',
        method: this.getPicture	// 调用methods中的函数
      }, {
        name: '上传视频',
        method: this.getVideo	// 调用methods中的函数
      }],
      showactions: false,
      poster: null,
      videoUrl: null
    }
  },
  mounted() {

  },
  methods: {
    showAction() {
      this.showactions = true;
    },
    getPicture() {
      document.querySelector("#picture").click();
    },
    getVideo() {
      document.querySelector("#video").click();
    },
    getFileToken() {
      return $axios.get("wandah5/oss/info", {
        headers: {
          "content-type": "application/json"
        }
      });
    },
    upload(flie) {
      console.log("upload");
      Indicator.open({
        text: "上传中",
        spinnerType: "fading-circle"
      });
      return this.getFileToken().then(res => {
        return new Promise((resolve, reject) => {
          let data = res.data.data;
          var formData = new FormData();
          // formData.append('name', flie.name)
          formData.append("OSSAccessKeyId", data.accessid);
          formData.append("key", data.dir + data.expire + flie.name);
          formData.append("policy", data.policy);
          formData.append("dir", data.dir);
          // formData.append('name', flie)
          formData.append("signature", data.signature);
          // formData.append('callback', data.callback)
          formData.append("success_action_status", "200");
          formData.append("file", flie);
          console.log(formData, data);
          //   Indicator.close()
          $axios
            .post(data.host, formData, {
              onUploadProgress: progressEvent => {
                let complete =
                  (((progressEvent.loaded / progressEvent.total) * 100) | 0) +
                  "%";
                console.log(complete, "progress");
                // Indicator.close()
                document.querySelector(
                  ".mint-indicator-text"
                ).innerText = complete;
              },
              headers: {
                "Content-Type": "multipart/form-data;"
              }
            })
            .then(file => {
              Indicator.close();
              Indicator.open({
                text: "上传成功",
                spinnerType: "fading-circle"
              });
              setTimeout(() => {
                Indicator.close();
              }, 500);
              resolve({
                url:
                  "https://wanda-h5.bdideal.com" +
                  "/" +
                  data.dir +
                  data.expire +
                  flie.name
              });
              console.log(data.host + "/" + data.dir + data.expire + flie.name);
            })
            .catch(err => {
              Indicator.open({
                text: "上传失败",
                spinnerType: "fading-circle"
              });
              setTimeout(() => {
                Indicator.close();
              }, 500);
              console.log("upload 失败", err);
            });
        });
      });
    },
    onFileChange: function (e) {
      var files = e.target.files || e.dataTransfer.files;

      console.log('files')
      console.log(files)
      if (!files.length) return

      if (files.length && files[0].size / 1024 / 1024 >= 80) {
        Toast({
          message:
            "选择的视频文件不得大于80M，您先通过微信聊天窗口压缩视频，再另保存到手机内，再进行上传。",
          duration: 5000
        });
        return;
      }
      let file = files[0];

      return

      console.log(files, "event", files[0].size / 1024 / 1024);
      this.upload(file)
        .then(res => {
          console.log('上传文件的回调')
          console.log(res)
          this.videoUrl = res.url
          this.poster =
            res.url + "?x-oss-process=video/snapshot,t_0,f_jpg,w_750,h_0,m_fast,ar_auto";
        })
        .catch(err => {
          Indicator.open({
            text: "上传失败",
            spinnerType: "fading-circle"
          });
          setTimeout(() => {
            Indicator.close();
          }, 500);
          console.log("upload 失败", err);
        });

    },
  }
}
</script>