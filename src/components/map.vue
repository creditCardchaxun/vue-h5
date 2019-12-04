<template>
  <div :class="['maps', fullScreen? 'window-screen':'full-screen']">
    <div class="main-container">
      <div :class="['button',fullScreen?'window-button':'full-button']" @click="changeFullScreen"></div>
      <div id="container"></div>
      <div class="map-info" v-show="!fullScreen">
        <div id="firstdiv">
          <div class="firstdiv-wrap">
            <div @click="cleartxt" class="img1"></div>
            <input type="text" class="text" id="txt" placeholder="请输入起点" />
            <div class="img2" @click="shownav"></div>
          </div>
        </div>
        <div id="secondfirst">
          <div class="secondfirst-wrap">
            <div class="back" @click="changeFullScreen"></div>
            <div class="input-box">
              <div class="flex-row">
                <div class="red-ball"></div>
                <input type="text" class="text border-b" id="secondtxt" placeholder="请输入起点" />
              </div>
              <div class="flex-row">
                <div class="green-ball"></div>
                <input
                  type="text"
                  readonly="readonly"
                  class="text"
                  id="secondtxtend"
                  placeholder="请输入终点"
                />
              </div>
            </div>
          </div>
          <div class="tab-box">
            <span @click="route(1)" class="span cus" id="car">自驾</span>
            <span class="span" id="bus" @click="route(2)">公交</span>
            <span @click="route(3)" class="span" id="foot">步行</span>
          </div>
        </div>
        <div v-show="!fullScreen">
          <div class="tip" @click="openapp">打开手机APP以获得更好的体验</div>
          <ul class="recommend">
            <li>酒店</li>
            <li>美食</li>
            <li>景点</li>
            <li>购物</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';
import { WXsdk } from '../utils/wxShare';
export default {
  data() {
    return {
      fullScreen: true,
      mapCase: null,
      position: { latitude: 31.121661, longitude: 121.032818 },
      // positionpoint: new AMap.LngLat(this.position.latitude, position.longitude),
      title: "Base-复兴路",
      address: "长宁区复兴路22号",
      markerend: null
    }
  },
  computed: {
    positionpoint() {
      return new AMap.LngLat(this.position.longitude, this.position.latitude)
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    changeFullScreen() {
      this.fullScreen = !this.fullScreen

      if (this.fullScreen) {
        this.destroyMap()
        this.createMap()
        this.backindex()
      }
    },
    init() {
      var _this = this
      // var _this.mapCase = null;
      // var _this.positionpoint = new AMap.LngLat(121.032818, 31.121661);
      // var title = "Base-复兴路";
      // var address = "长宁区复兴路22号";
      // var markerend;

      this.createMap();
      $("#firstdiv").hide()

      $('.amap-sug-result').on('click', 'div', function (data) {
        var text = $(this).contents().filter(function () {
          return this.nodeType == 3;
        }).remove().text()

        _this.shownav(text);
      })

      $("li").click(function () {
        _this.mapCase.clearMap();
        _this.addmarker();
        $(this).siblings("li").removeAttr('class');
        $(this).addClass("current_li");
        var search = $(this).html();
        if (search == "美食") search = "餐饮";
        AMap.service(["AMap.PlaceSearch"], function () {
          //构造地点查询类
          var placeSearch = new AMap.PlaceSearch({
            type: search, // 兴趣点类别
            pageSize: 50, // 单页显示结果条数
            pageIndex: 1, // 页码
            autoFitView: false,
            citylimit: true, //是否强制限制在设置的城市内搜索
            map: _this.mapCase, // 展现结果的地图实例

            autoFitView: false // 是否自动调整地图视野使绘制的 Marker点都处于视口的可见范围
          });
          placeSearch.searchNearBy('', _this.positionpoint, 5000, function (status, result) {
          });
        });
      })
    },
    createMap() {
      var _this = this
      _this.mapCase = new AMap.Map('container', {
        resizeEnable: true,
        center: _this.positionpoint, //初始化地图中心点 
        zoom: 12, //地图显示的缩放级别
        lang: 'zh-cn',
        mapStyle: 'amap://styles/whitesmoke', //设置地图样式 远山黛.
        zoomEnable: true,
        dragEnable: true,
      });
      var auto = new AMap.Autocomplete({
        input: "secondtxt"
      });
      this.addmarker();
    },
    addmarker() {
      var _this = this
      _this.markerend = new AMap.Marker({
        map: _this.mapCase,
        position: _this.positionpoint
      });
      //鼠标点击marker弹出自定义的信息窗体
      _this.mapCase.add(_this.markerend);

      var infoWindow = new AMap.InfoWindow({
        isCustom: true, //使用自定义窗体
        content: _this.createInfoWindow(),
        offset: new AMap.Pixel(0, -45)
      });
      AMap.event.addListener(_this.markerend, 'click', function () {
        infoWindow.open(_this.mapCase, _this.markerend.getPosition());
      });
    },
    createInfoWindow() {
      var _this = this
      var info = document.createElement("div");
      info.className = "custom-info input-card content-window-card";

      //可以通过下面的方式修改自定义窗体的宽高
      //info.style.width = "400px";
      // 定义顶部标题

      // 定义中部内容
      var h1 = document.createElement("h1");
      h1.innerHTML = _this.title;
      info.appendChild(h1);

      var imgdiv = document.createElement("div");
      imgdiv.className = "info-newdiv";
      // imgdiv.innerHTML = "<img src='loca.png' style='vertical-align: middle;width: 20px;height: 25px;'/>" + _this.address;
      imgdiv.innerHTML = _this.address;
      info.appendChild(imgdiv);

      var bottom = document.createElement("div");
      bottom.className = "info-bottom";
      bottom.style.position = 'relative';
      bottom.style.top = '0px';
      bottom.style.margin = '0 auto';
      // var sharp = document.createElement("img");
      // sharp.src = "downarrow.png";
      // bottom.appendChild(sharp);
      info.appendChild(bottom);
      var button = document.createElement("button");
      button.className = "info-button";
      button.innerHTML = "到这里去";
      button.id = 'btngo';
      // button.onclick = _this.showfirst;
      button.onclick = _this.showNav1;
      info.appendChild(button);
      return info;
    },
    showfirst() {
      if (this.fullScreen) {
        this.fullScreen = false
      }

      $("#firstdiv").show()
    },
    showNav1() {
      var _this = this

      if (this.fullScreen) {
        this.fullScreen = false
      }
      setTimeout(() => {
        $("#secondfirst").show()
        $("#secondtxt").focus();
        $("#secondtxtend").val(_this.title);
        $('.amap-info').hide()
      });
    },
    shownav(text) {
      var _this = this
      var begin = null;
      if (typeof text === 'string') {
        begin = text
      } else {
        begin = $("#txt").val();
      }

      if (!begin) {
        return
      }


      _this.mapCase.clearMap();
      $("#firstdiv").hide();
      _this.addmarker();
      $("#secondfirst").show()
      $("#secondtxt").val(begin);
      $("#secondtxt").focus();
      $("#secondtxtend").val(_this.title);
      _this.route(1);
    },
    route(type) {
      console.log('type');
      console.log(type);

      var _this = this
      _this.mapCase.clearMap();
      _this.addmarker();
      $(".span").removeClass('cus');
      var geocoder = new AMap.Geocoder({
      });

      switch (type) {
        case 2:
          $("#bus").addClass("cus");
          break;
        case 1:
          $("#car").addClass("cus");
          break;
        case 3:
          $("#foot").addClass("cus");
          break;
      }

      var positionbegin;
      geocoder.getLocation($("#secondtxt").val(), function (status, result) {
        if (status === 'complete' && result.geocodes.length) {
          positionbegin = new AMap.LngLat(result.geocodes[0].location.lng, result.geocodes[0].location.lat);
          switch (type) {
            // 公交
            case 2:
              var transferOption = {
                nightflag: true, // 是否计算夜班车
                // 其它policy取值请参照 https://lbs.amap.com/api/javascript-api/reference/route-search#m_TransferPolicy
                policy: AMap.TransferPolicy.LEAST_TIME,
                city: '上海市',
                cityd: '上海市'
              }
              var transfer = new AMap.Transfer(transferOption)
              console.log('transfer');
              console.log(transfer);
              console.log('positionbegin');
              console.log(positionbegin);
              console.log('_this.positionpoint');
              console.log(_this.positionpoint);
              //根据起、终点坐标查询公交换乘路线
              transfer.search(positionbegin, _this.positionpoint, function (status, result) {
                // result即是对应的公交路线数据信息，相关数据结构文档请参考  https://lbs.amap.com/api/javascript-api/reference/route-search#m_TransferResult
                console.log('status,result');
                console.log(status, result);
                if (status === 'complete') {
                  if (result.plans && result.plans.length) {
                    drawRoute2(result.plans[0])
                  }
                } else {
                  log.error('公交路线数据查询失败' + result)
                }
              });

              function drawRoute2(route) {
                var startMarker = new AMap.Marker({
                  position: route.segments[0].transit.origin,
                  icon: 'https://webapi.amap.com/theme/v1.3/markers/n/start.png',
                  map: _this.mapCase
                })

                var endMarker = new AMap.Marker({
                  position: route.segments[route.segments.length - 1].transit.destination,
                  icon: 'https://webapi.amap.com/theme/v1.3/markers/n/end.png',
                  map: _this.mapCase
                })

                var routeLines = []

                for (var i = 0, l = route.segments.length; i < l; i++) {
                  var segment = route.segments[i]
                  var line = null

                  // 绘制步行路线
                  if (segment.transit_mode === 'WALK') {
                    line = new AMap.Polyline({
                      path: segment.transit.path,
                      isOutline: true,
                      outlineColor: '#ffeeee',
                      borderWeight: 2,
                      strokeWeight: 5,
                      strokeColor: 'grey',
                      lineJoin: 'round',
                      strokeStyle: 'dashed'
                    })

                    line.setMap(_this.mapCase)
                    routeLines.push(line)
                  } else if (segment.transit_mode === 'SUBWAY' || segment.transit_mode === 'BUS') {
                    line = new AMap.Polyline({
                      path: segment.transit.path,
                      isOutline: true,
                      outlineColor: '#ffeeee',
                      borderWeight: 2,
                      strokeWeight: 5,
                      strokeColor: '#0091ff',
                      lineJoin: 'round',
                      strokeStyle: 'solid'
                    })

                    line.setMap(_this.mapCase)
                    routeLines.push(line)
                  } else {
                    // 其它transit_mode的情况如RAILWAY、TAXI等，该示例中不做处理
                  }
                }

                // 调整视野达到最佳显示区域
                _this.mapCase.setFitView([startMarker, endMarker].concat(routeLines))
              }
              break;
            // 自驾
            case 1:
              var drivingOption = {
                // 其它policy参数请参考 https://lbs.amap.com/api/javascript-api/reference/route-search#m_DrivingPolicy
                policy: AMap.DrivingPolicy.LEAST_TIME,
              }
              // 构造路线导航类
              var driving = new AMap.Driving(drivingOption)
              console.log('driving');
              console.log(driving);
              // 根据起终点经纬度规划驾车导航路线
              driving.search(positionbegin, _this.positionpoint, function (status, result) {
                // result即是对应的驾车导航信息，相关数据结构文档请参考 https://lbs.amap.com/api/javascript-api/reference/route-search#m_DrivingResult
                console.log('result');
                console.log(result);
                if (status === 'complete') {
                  if (result.routes && result.routes.length) {
                    // 绘制第一条路线，也可以按需求绘制其它几条路线
                    drawRoute1(result.routes[0])
                  }
                } else {
                  log.error('获取驾车数据失败：' + result)
                }
              });

              function drawRoute1(route) {
                var path = _this.parseRouteToPath(route)
                var startMarker = new AMap.Marker({
                  position: path[0],
                  icon: 'https://webapi.amap.com/theme/v1.3/markers/n/start.png',
                  map: _this.mapCase
                })
                var endMarker = new AMap.Marker({
                  position: path[path.length - 1],
                  icon: 'https://webapi.amap.com/theme/v1.3/markers/n/end.png',
                  map: _this.mapCase
                })
                var routeLine = new AMap.Polyline({
                  path: path,
                  isOutline: true,
                  outlineColor: '#ffeeee',
                  borderWeight: 2,
                  strokeWeight: 5,
                  strokeColor: '#0091ff',
                  lineJoin: 'round'
                })
                routeLine.setMap(_this.mapCase)
                // 调整视野达到最佳显示区域
                _this.mapCase.setFitView([startMarker, endMarker, routeLine])
              }
              break;
            // 步行
            case 3:
              var walkingOption = {}
              // 步行导航
              var walking = new AMap.Walking(walkingOption)
              //根据起终点坐标规划步行路线
              walking.search(positionbegin, _this.positionpoint, function (status, result) {
                // result即是对应的步行路线数据信息，相关数据结构文档请参考  https://lbs.amap.com/api/javascript-api/reference/route-search#m_WalkingResult
                console.log('result');
                console.log(result);
                if (result === 'OVER_DIRECTION_RANGE') {
                  alert('起点终点距离过长,建议选择其他方式')
                  return
                }
                if (status === 'complete') {
                  if (result.routes && result.routes.length) {
                    drawRoute(result.routes[0])
                  }
                } else {
                  log.error('步行路线数据查询失败' + result)
                }
              });

              function drawRoute(route) {
                var path = _this.parseRouteToPath(route)
                var startMarker = new AMap.Marker({
                  position: path[0],
                  icon: 'https://webapi.amap.com/theme/v1.3/markers/n/start.png',
                  map: _this.mapCase
                })
                var endMarker = new AMap.Marker({
                  position: path[path.length - 1],
                  icon: 'https://webapi.amap.com/theme/v1.3/markers/n/end.png',
                  map: _this.mapCase
                })
                var routeLine = new AMap.Polyline({
                  path: path,
                  isOutline: true,
                  outlineColor: '#ffeeee',
                  borderWeight: 2,
                  strokeWeight: 5,
                  strokeColor: '#0091ff',
                  lineJoin: 'round'
                })
                routeLine.setMap(_this.mapCase)
                // 调整视野达到最佳显示区域
                _this.mapCase.setFitView([startMarker, endMarker, routeLine])
              }
              break;
          }

        } else {
          log.error('查询起点位置失败');
          console.log('获取地址失败的');
          console.log(status, result);
        }
      });
    },
    cleartxt() {
      $("#txt").val("");
    },
    destroyMap() {
      this.mapCase && this.mapCase.destroy();
    },
    parseRouteToPath(route) {
      // 解析DrivingRoute对象，构造成AMap.Polyline的path参数需要的格式
      // DrivingResult对象结构参考文档 https://lbs.amap.com/api/javascript-api/reference/route-search#m_DriveRoute

      var _this = this
      var path = []
      for (var i = 0, l = route.steps.length; i < l; i++) {
        var step = route.steps[i]
        for (var j = 0, n = step.path.length; j < n; j++) {
          path.push(step.path[j])
        }
      }
      return path
    },
    backindex() {
      var _this = this
      _this.mapCase.clearMap();
      _this.addmarker();
      // $("#secondfirst").hide();
      $("#secondtxt").val("");
      // $("#secondtxtend").val("");
      // $("#firstdiv").show();
    },
    openapp() {
      // var _this = this
      // _this.markerend.markOnAMAP({
      //   position: _this.markerend.getPosition()
      // })

      WXsdk.openLocation(this.position, this.address)
    },
  }
}
</script>

<style lang="less" >
.flex-row {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.red-ball {
  width: 0.3rem;
  height: 0.3rem;
  background: green;
  border-radius: 50%;
}

.green-ball {
  width: 0.3rem;
  height: 0.3rem;
  background: red;
  border-radius: 50%;
}

.window-screen {
  background: red;
  height: 6rem;
}

.full-screen {
  background: green;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
}
.maps {
  .main-container {
    position: relative;
    width: 100%;
    height: 100%;
  }
  .button {
    width: 1.5rem;
    height: 1.5rem;
    position: absolute;
    right: 0.3rem;
    z-index: 100;
  }

  .window-button {
    background: url("../assets/images/full.png") no-repeat;
    background-size: 100% 100%;
    top: 0.3rem;
  }

  .full-button {
    background: url("../assets/images/window.png") no-repeat;
    background-size: 100% 100%;
    bottom: 2.6rem;
  }
}

#container {
  width: 100%;
  height: 100%;

  .content-window-card {
    position: relative;
    box-shadow: none;
    bottom: 0;
    // left: 0;
    width: 6.5rem;
    height: 3.5rem;
    border-radius: 10px;
    padding-left: 0.4rem;
    padding-right: 0.4rem;

    h1 {
      font-size: 0.4rem;
      padding-top: 0.2rem;
      padding-bottom: 0.4rem;
    }

    .info-newdiv {
      font-size: 0.4rem;
    }
  }

  .info-button {
    text-align: center;
    height: 30px;
    width: 100px;
    background-color: #5975a9;
    border: none;
    border-radius: 5px;
    color: white;
    font-size: 15px;
    position: absolute;
    margin: 0;
    bottom: 0.3rem;
    left: 50%;
    transform: translate(-50%, 0);
  }

  li {
    width: 25%;
    color: #bbb7b7;
    line-height: 5px;
  }

  ul {
    width: 100%;
    display: inline-flex;
    text-align: center;
    list-style: none;
    margin-left: -5%;
    font-size: 20px;
  }

  li.current_li {
    list-style-type: none;
    border-bottom: 3px solid #3c5896;
    padding-bottom: 14px;
    width: 100px;
    color: black;
  }

  .content-window-card p {
    height: 2rem;
  }

  div.info-bottom {
    height: 0px;
    width: 100%;
    clear: both;
    text-align: center;
  }

  div.info-bottom img {
    position: relative;
    z-index: 104;
    margin-top: 38px;
    margin-left: -20px;
  }

  span {
    margin-left: 5px;
    font-size: 11px;
  }

  .info-middle img {
    float: left;
    margin-right: 6px;
  }

  .info-newdiv {
    font-size: 18px;
    color: #bbb7b7;
  }

  .amap-sug-result {
    visibility: visible;
    display: block;
    left: 0px !important;
    top: 41.1875px;
    min-width: 100% !important;
    position: absolute;
    z-index: 1024;
    background-color: #fefefe;
    border: 1px solid #d1d1d1;
    bottom: auto;
  }

  .auto-item {
    white-space: nowrap;
    font-size: 12px;
    cursor: pointer;
    padding: 4px;
    font-size: 20px;
    color: #688dd9;
    margin-left: 60px;
  }

  .auto-item-span {
    display: table-header-group;
  }

  .span {
    font-size: 20px;
    margin-right: 30px;
    color: #bbb7b7;
  }

  .span.cus {
    list-style-type: none;
    border-bottom: 3px solid #3c5896;
    padding-bottom: 2px;
    width: 100%;
    color: black;
  }
}

.map-info {
  #firstdiv {
    height: 1rem;
    top: 0px;
    position: fixed;
    width: 100%;
    background-color: white;
    z-index: 111;
    padding: 0.3rem;
    display: none;

    .firstdiv-wrap {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-around;

      .img1 {
        width: 0.4rem;
        height: 0.4rem;
        background: green;
        border-radius: 50%;
      }

      .text {
        width: 70%;
        height: 0.8rem;
        line-height: 0.8rem;
        font-size: 0.5rem;
        background-color: #f4f4f4;
        padding-left: 0.2rem;
        padding-right: 0.2rem;
        box-sizing: border-box;
      }

      .img2 {
        width: 0.8rem;
        height: 0.8rem;
        background: url("../assets/images/search.png") no-repeat;
        background-size: 100% 100%;
        margin-right: 0.3rem;
      }
    }
  }

  #secondfirst {
    // height: 140px;
    top: 0px;
    position: fixed;
    width: 100%;
    background-color: white;
    z-index: 111;
    padding: 0.5rem;
    padding-bottom: 0;
    display: none;
    box-sizing: border-box;

    input {
      background: none;
      outline: none;
      border: none;
    }

    .secondfirst-wrap {
      display: flex;
      flex-direction: row;
      position: relative;
      box-sizing: border-box;
      padding-left: 1rem;

      .back {
        width: 1rem;
        // height: 1.7rem;
        background: url("../assets/images/back.png") no-repeat;
        background-size: 100% auto;
        background-position: -13% center;
        margin-right: 0.2rem;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
      }
      .input-box {
        background: #f4f4f4;
        // border-radius: 0.1rem;
        box-sizing: border-box;
        padding-left: 0.5rem;
        width: 100%;

        .text {
          width: 85%;
          height: 0.8rem;
          font-size: 0.4rem;
          margin-left: 0.2rem;
        }

        .border-b {
          border-bottom: 1px solid #dadada !important;
        }

        .img2 {
          width: 13px;
          vertical-align: middle;
        }
      }
    }

    .tab-box {
      width: 100%;
      border-top: 1px #ccc solid;
      height: 0.8rem;
      line-height: 0.8rem;
      margin-top: 5px;
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      font-size: 0.4rem;
      color: gray;

      .cus {
        color: #0f0f0f;
        font-weight: bolder;
        border-bottom: 3px solid #3c5896;
      }
    }
  }

  .tip {
    height: 1.3rem;
    line-height: 1.3rem;
    bottom: 1.3rem;
    position: fixed;
    width: 100%;
    color: white;
    background: rgba(0, 0, 255, 0.5);
    text-align: center;
    font-size: 0.4rem;
  }

  .recommend {
    height: 1.3rem;
    line-height: 1.3rem;
    bottom: 0px;
    position: fixed;
    width: 100%;
    background-color: white;
    display: flex;
    flex-direction: row;
    justify-content: space-around;

    li {
      font-size: 0.4rem;
      color: gray;
    }

    li.current_li {
      color: #3c5896;
    }
  }
}
</style>