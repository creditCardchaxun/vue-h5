
<template>
  <div class='maps'>
 

    <!-- <div id="firstdiv" style="height:50px;top:0px;position: fixed;width: 100%;background-color: white;z-index: 111;padding: 10px;display: none">
    <img @click="cleartxt()" src="arrow.png" style="    width: 15px;height: 25px;margin-left: 5%;display: inline; vertical-align: middle;margin-right: 20px;
" />
    <input style="width: 80%;height: 35px;background-color: #F4F4F4" type="text" id="txt" placeholder="请输入起点" /><img
 style="  width: 25px;height: 25px;vertical-align: middle;margin-left: -30px;margin-top: 5px;position: fixed;" @click="shownav()" src="search.png"/>
</div>

<div id="secondfirst" style="height:140px;top:0px;position: fixed;width: 100%;background-color: white;z-index: 111;padding: 10px;display: none;">
    <img @click="backindex()" src="arrow.png" style="    width: 15px;height: 25px;margin-left: 5%;display: inline; vertical-align: middle;margin-right: 20px;
" />
  <div style="width: 85%;float:right">
      <img src="green.png" style="    width: 13px;vertical-align: middle" /><input style="width: 85%;height: 35px;background-color: #F4F4F4;border-radius: 5px;" type="text" id="secondtxt" placeholder="请输入起点" />
      <br/>
      <img src="red.png" style="  width: 13px;vertical-align: middle" /> <input style="margin-left: -3px;width: 85%;height: 35px;background-color: #F4F4F4; margin-top: 5px;border-radius: 5px;" type="text" id="secondtxtend" placeholder="请输入终点" /></div>
    <div style="width: 100%;display: block;border-top:1px #ccc solid;    display: inline-block;height: 50px;margin-top: 5px;    padding: 10px;">

        <span class="span" id="bus" @click="route(2)">公交</span>   <span  @click="route(1)"  class="span cus" id="car">自驾</span>  <span  @click="route(3)"  class="span" id="foot">步行</span>
    </div>
</div> -->


<div id="container" style='width:100%;height:300px;'></div>

<!-- <img @click="openapp()" src="app.png" style="height:50px;bottom:50px;position: fixed;width: 100%;"/>
<div id='mapsd' style="height:50px;bottom:0px;position: fixed;width: 100%;background-color: white">
    <ul>
        <li>酒店</li>
        <li>美食</li>
        <li>景点</li>
        <li>购物</li>
    </ul>
</div> -->

  </div> 

</template>

<script>
//  import AMap from 'AMap'
  var map
import $ from 'jquery';
export default {
    name:'maps',
    data(){
        return{
         map:null,
         positionpoint : new AMap.LngLat(121.032818,31.121661),
        // positionpoint:[121.032818,31.121661],
         title : "Base-复兴路",
         address :"长宁区复兴路22号",
         markerend:''
        }
    },
        mounted: function () {
         this.createMap()
    },

    methods:{

       createMap() {
         this.map = new AMap.Map('container', {
            resizeEnable: true,
            center: this.positionpoint, //初始化地图中心点
            zoom: 14, //地图显示的缩放级别
            lang: 'zh-cn',
            mapStyle: 'amap://styles/whitesmoke',//设置地图样式 远山黛
            zoomEnable:true,
            dragEnable: true,
        });

        var auto = new AMap.Autocomplete({
            input: "txt"
        });

        this.addmarker();
       },


        addmarker(){
         let marker= new AMap.Marker({
            map: this.map,
            position: new AMap.LngLat(121.032818,31.121661)
         });
        //鼠标点击marker弹出自定义的信息窗体
          this.map.add(marker);
        var infoWindow = new AMap.InfoWindow({
            isCustom: true,  //使用自定义窗体
            content: this.createInfoWindow(),
            offset: new AMap.Pixel(0, -45),
         
            });
        AMap.event.addListener( marker , 'click', ()=>{
            console.log(123123)
            infoWindow.open(this.map,marker.getPosition());     
         });
         
    },
     
    //   openapp(){
    //     this.markerend.markOnAMAP({
    //         position:marker.getPosition()
    //     })

    //    },
    //  cleartxt(){
    //     $("#txt").val("");
    // },
     createInfoWindow() {
        var info = document.createElement("div");
        info.className = "custom-info input-card content-window-card";

        //可以通过下面的方式修改自定义窗体的宽高
        info.style.width = "400px";
        // 定义顶部标题


        // 定义中部内容
        var h1 = document.createElement("h1");
        h1.innerHTML = this.title;
        info.appendChild(h1);

        var imgdiv = document.createElement("div");
        imgdiv.className = "info-newdiv";
        imgdiv.innerHTML = "<img src='loca.png' style='vertical-align: middle;width: 20px;height: 25px;'/>"+this.address;
        info.appendChild(imgdiv);

        var bottom = document.createElement("div");
        bottom.className = "info-bottom";
        bottom.style.position = 'relative';
        bottom.style.top = '0px';
        bottom.style.margin = '0 auto';
        var sharp = document.createElement("img");
        sharp.src = "downarrow.png";
        bottom.appendChild(sharp);
        info.appendChild(bottom);
        var button = document.createElement("button");
        button.className = "info-button";
        button.innerHTML = "到这里去";
        button.id='btngo';
        // button.onclick=this.showfirst;
        info.appendChild(button);
        return info;
    },


    //    showfirst(){
    //       $("#firstdiv").show()
    //     },
    //  destroyMap() {
    //     map && map.destroy();
    //   },
    //  shownav(){
    //     var begin = $("#txt").val();
    //     if(begin != "") {
    //         map.clearMap();
    //         $("#firstdiv").hide();
    //         this.addmarker();
    //         $("#secondfirst").show()
    //         $("#secondtxt").val(begin);
    //         $("#secondtxtend").val(title);
    //         route(1);
    //     }
    // },

    //初始化地图


    //  route(type){
    //     map.clearMap();
    //     this.addmarker();
    //     $(".span").removeClass('cus');

    //     var geocoder = new AMap.Geocoder({

    //     });

    //     switch(type){
    //         case 2:
    //             $("#bus").addClass("cus");
    //             break;
    //         case 1:
    //             $("#car").addClass("cus");

    //             break;
    //         case 3:
    //             $("#foot").addClass("cus");
    //             break;
    //     }

    //     var positionbegin;
    //      geocoder.getLocation($("#secondtxt").val(), function(status, result) {
    //             if (status === 'complete'&&result.geocodes.length) {

    //                 positionbegin = new AMap.LngLat(result.geocodes[0].location.lng,result.geocodes[0].location.lat);
    //                 switch(type){
    //                     case 2:
    //                         var transferOption = {
    //                             nightflag: true, // 是否计算夜班车
    //                             policy: AMap.TransferPolicy.LEAST_TIME, // 其它policy取值请参照 https://lbs.amap.com/api/javascript-api/reference/route-search#m_TransferPolicy
    //                             city: '上海市',
    //                         }

    //                         var transfer = new AMap.Transfer(transferOption)

    //                         //根据起、终点坐标查询公交换乘路线
    //                         transfer.search(positionbegin, positionpoint, function(status, result) {
    //                             // result即是对应的公交路线数据信息，相关数据结构文档请参考  https://lbs.amap.com/api/javascript-api/reference/route-search#m_TransferResult
    //                             if (status === 'complete') {
    //                                 if (result.plans && result.plans.length) {

    //                                     drawRoute2(result.plans[0])
    //                                 }

    //                             } else {
    //                                 log.error('公交路线数据查询失败' + result)
    //                             }
    //                         });

    //                     function drawRoute2 (route) {
    //                         var startMarker = new AMap.Marker({
    //                             position: route.segments[0].transit.origin,
    //                             icon: 'https://webapi.amap.com/theme/v1.3/markers/n/start.png',
    //                             map: map
    //                         })

    //                         var endMarker = new AMap.Marker({
    //                             position: route.segments[route.segments.length - 1].transit.destination,
    //                             icon: 'https://webapi.amap.com/theme/v1.3/markers/n/end.png',
    //                             map: map
    //                         })

    //                         var routeLines = []

    //                         for (var i = 0, l = route.segments.length; i < l; i++) {
    //                             var segment = route.segments[i]
    //                             var line = null

    //                             // 绘制步行路线
    //                             if (segment.transit_mode === 'WALK') {
    //                                 line = new AMap.Polyline({
    //                                     path: segment.transit.path,
    //                                     isOutline: true,
    //                                     outlineColor: '#ffeeee',
    //                                     borderWeight: 2,
    //                                     strokeWeight: 5,
    //                                     strokeColor: 'grey',
    //                                     lineJoin: 'round',
    //                                     strokeStyle: 'dashed'
    //                                 })


    //                                 line.setMap(map)
    //                                 routeLines.push(line)
    //                             } else if (segment.transit_mode === 'SUBWAY' || segment.transit_mode === 'BUS') {
    //                                 line = new AMap.Polyline({
    //                                     path: segment.transit.path,
    //                                     isOutline: true,
    //                                     outlineColor: '#ffeeee',
    //                                     borderWeight: 2,
    //                                     strokeWeight: 5,
    //                                     strokeColor: '#0091ff',
    //                                     lineJoin: 'round',
    //                                     strokeStyle: 'solid'
    //                                 })

    //                                 line.setMap(map)
    //                                 routeLines.push(line)
    //                             } else {
    //                                 // 其它transit_mode的情况如RAILWAY、TAXI等，该示例中不做处理
    //                             }
    //                         }

    //                         // 调整视野达到最佳显示区域
    //                         map.setFitView([startMarker, endMarker].concat(routeLines))
    //                     }
    //                         break;
    //                     case 1:

    //                         var drivingOption = {
    //                             policy: AMap.DrivingPolicy.LEAST_TIME, // 其它policy参数请参考 https://lbs.amap.com/api/javascript-api/reference/route-search#m_DrivingPolicy
    //                         }

    //                         // 构造路线导航类
    //                         var driving = new AMap.Driving(drivingOption)

    //                         // 根据起终点经纬度规划驾车导航路线
    //                         driving.search(positionbegin, positionpoint, function(status, result) {
    //                             // result即是对应的驾车导航信息，相关数据结构文档请参考 https://lbs.amap.com/api/javascript-api/reference/route-search#m_DrivingResult
    //                             if (status === 'complete') {
    //                                 if (result.routes && result.routes.length) {
    //                                     // 绘制第一条路线，也可以按需求绘制其它几条路线
    //                                     drawRoute1(result.routes[0])
    //                                 }
    //                             } else {
    //                                 log.error('获取驾车数据失败：' + result)
    //                             }
    //                         });

    //                     function drawRoute1 (route) {
    //                         var path = this.parseRouteToPath(route)
    //                         var startMarker = new AMap.Marker({
    //                             position: path[0],
    //                             icon: 'https://webapi.amap.com/theme/v1.3/markers/n/start.png',
    //                             map: map
    //                         })

    //                         var endMarker = new AMap.Marker({
    //                             position: path[path.length - 1],
    //                             icon: 'https://webapi.amap.com/theme/v1.3/markers/n/end.png',
    //                             map: map
    //                         })

    //                         var routeLine = new AMap.Polyline({
    //                             path: path,
    //                             isOutline: true,
    //                             outlineColor: '#ffeeee',
    //                             borderWeight: 2,
    //                             strokeWeight: 5,
    //                             strokeColor: '#0091ff',
    //                             lineJoin: 'round'
    //                         })

    //                         routeLine.setMap(this.map)

    //                         // 调整视野达到最佳显示区域
    //                         this.map.setFitView([ startMarker, endMarker, routeLine ])
    //                     }

    //                         // 解析DrivingRoute对象，构造成AMap.Polyline的path参数需要的格式
    //                         // DrivingResult对象结构参考文档 https://lbs.amap.com/api/javascript-api/reference/route-search#m_DriveRoute
    //                     function parseRouteToPath(route) {
    //                         var path = []

    //                         for (var i = 0, l = route.steps.length; i < l; i++) {
    //                             var step = route.steps[i]

    //                             for (var j = 0, n = step.path.length; j < n; j++) {
    //                                 path.push(step.path[j])
    //                             }
    //                         }

    //                         return path
    //                     }

    //                         break;
    //                     case 3:
    //                         var walkingOption = {}

    //                         // 步行导航
    //                         var walking = new AMap.Walking(walkingOption)

    //                         //根据起终点坐标规划步行路线
    //                         walking.search(positionbegin, positionpoint, function(status, result) {
    //                             // result即是对应的步行路线数据信息，相关数据结构文档请参考  https://lbs.amap.com/api/javascript-api/reference/route-search#m_WalkingResult
    //                             if (status === 'complete') {
    //                                 if (result.routes && result.routes.length) {
    //                                     drawRoute(result.routes[0])

    //                                 }
    //                             } else {
    //                                 log.error('步行路线数据查询失败' + result)
    //                             }
    //                         });

    //                      function drawRoute (route) {
    //                         var path = this.parseRouteToPath(route)

    //                         var startMarker = new AMap.Marker({
    //                             position: path[0],
    //                             icon: 'https://webapi.amap.com/theme/v1.3/markers/n/start.png',
    //                             map: map
    //                         })

    //                         var endMarker = new AMap.Marker({
    //                             position: path[path.length - 1],
    //                             icon: 'https://webapi.amap.com/theme/v1.3/markers/n/end.png',
    //                             map: map
    //                         })

    //                         var routeLine = new AMap.Polyline({
    //                             path: path,
    //                             isOutline: true,
    //                             outlineColor: '#ffeeee',
    //                             borderWeight: 2,
    //                             strokeWeight: 5,
    //                             strokeColor: '#0091ff',
    //                             lineJoin: 'round'
    //                         })

    //                         routeLine.setMap(map)

    //                         // 调整视野达到最佳显示区域
    //                         map.setFitView([ startMarker, endMarker, routeLine ])
    //                     };
    //                     // function parseRouteToPath(route) {
    //                     //     var path = []

    //                     //     for (var i = 0, l = route.steps.length; i < l; i++) {
    //                     //         var step = route.steps[i]

    //                     //         for (var j = 0, n = step.path.length; j < n; j++) {
    //                     //             path.push(step.path[j])
    //                     //         }
    //                     //     }

    //                     //     return path
    //                     // }
    //                         break;
    //                 }

    //             }else{
    //                 log.error('查询起点位置失败');
    //             }
    //         });

    // },
    //  backindex(){
    //     map.clearMap();
    //    this.addmarker();
    //     $("#secondfirst").hide();
    //     $("#secondtxt").val("");
    //     $("#secondtxtend").val("");
    //     $("#firstdiv").show();
    //   },

    //   $("#mapsd li").click(function(){
    //     map.clearMap();
    //     addmarker();
    //     $(this).siblings("li").removeAttr('class');
    //     $(this).addClass("current_li");
    //     var search =$(this).html();
    //     if(search == "美食")search="餐饮";
    //     AMap.service(["AMap.PlaceSearch"], function() {
    //         //构造地点查询类
    //         var placeSearch = new AMap.PlaceSearch({
    //             type: search, // 兴趣点类别
    //             pageSize: 50, // 单页显示结果条数
    //             pageIndex: 1, // 页码
	// 			autoFitView: false,
    //             citylimit: true,  //是否强制限制在设置的城市内搜索
    //             map: map, // 展现结果的地图实例

    //             autoFitView: false // 是否自动调整地图视野使绘制的 Marker点都处于视口的可见范围
    //         });


    //         placeSearch.searchNearBy('', positionpoint, 5000, function (status, result) {

    //         });
    //     });
    // })






    }

    }
</script>

<style scoped>


       html,
        body,
        #container {
            width: 100%;
            height: 100%;
        }
        li{
            width: 25%;
            color:#bbb7b7;

            line-height: 5px;

        }ul{
                     width: 100%;
                     display: inline-flex;
                     text-align: center;
                     list-style: none;
                     margin-left: -5%;
                     font-size: 20px;

                 }
        li.current_li{
            list-style-type: none;
            border-bottom: 3px solid #3c5896;
            padding-bottom: 14px;
            width: 100px;
            color:black;
        }
  
</style>