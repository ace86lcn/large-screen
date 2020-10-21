<template>
  <div class="center">
    <div class="search">
      <h2 class="search-title">人员活动图</h2>
      <el-input placeholder="搜索工人名称" v-model="input" @blur="show = false">
        <i slot="append" class="el-input__icon el-icon-search" @click="search" />
      </el-input>
      <div class="search-content" v-if="show">
        <p
          v-for="item in searchList"
          :key="item.id"
          @click="checkWorker(item.card_number, item.lng, item.lat)"
        >{{item.name}}</p>
        <p v-if="searchList.length == 0">暂无搜索结果~</p>
      </div>
    </div>
    <div class="center-map">
      <div :style="{width: '615px', height: '505px'}" ref="myEcharts"></div>
    </div>
  </div>
</template>

<script>
import echarts from "echarts";
import "echarts/map/js/china.js";
import BMap from "BMap";
require("echarts/extension/bmap/bmap");

export default {
  props: {
    shows: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      list: [],
      input: "",
      show: false,
      searchList: [], //搜索列表
      chart: null,
      points: [],
      citys: {},
      center: [117.715445, 34.604592],
      timer: "",
    };
  },
  watch: {
    shows(bol) {
      if (!bol) {
        this.getData();
      }
    },
  },
  methods: {
    getData() {
      this.$http
        .get("/worker/SmallMenu/bigScreen", {
          params: {
            name: this.input,
          },
        })
        .then((res) => {
          if (res.data.code === 200) {
            this.list = res.data.data.list;
            if (this.list.length > 0) {
              this.points = [];
              this.citys = {};
              this.list.map((item) => {
                this.points.push({
                  name: item.name,
                  value: item.id,
                  card: item.card_number,
                  is_alert: item.is_alert,
                });
                this.citys[item.name] = [item.lng * 1, item.lat * 1];
              });

              setTimeout(() => {
                this.chinaConfigure();
              });
            }
          }
        });
    },
    // 搜索
    search() {
      this.show = true;
      this.$http
        .get("/worker/SmallMenu/bigScreen", {
          params: {
            name: this.input,
          },
        })
        .then((res) => {
          if (res.data.code === 200) {
            this.searchList = res.data.data.list;
          }
        });
    },
    // 选择工人
    checkWorker(id, lng, lat) {
      this.center = [lng, lat];
      this.show = false;
      this.$emit("check", id);
      this.chinaConfigure();
    },
    convertData(data) {
      var res = [];
      for (var i = 0; i < data.length; i++) {
        var geoCoord = this.citys[data[i].name];
        if (geoCoord) {
          res.push({
            name: data[i].name,
            value: geoCoord.concat(data[i].value),
          });
        }
      }
      return res;
    },
    chinaConfigure() {
      let that = this;
      let myChart = echarts.init(this.$refs.myEcharts); //这里是为了获得容器所在位置

      myChart.setOption({
        backgroundColor: "", //背景颜色
        title: {},
        // 提示框，鼠标移入
        tooltip: {
          trigger: "item",
        },
        bmap: {
          center: that.center,
          zoom: 16,
          roam: true,
          mapStyle: {
            styleJson: [
              {
                featureType: "water",

                elementType: "all",

                stylers: {
                  color: "#044161",
                },
              },
              {
                featureType: "land",

                elementType: "all",

                stylers: {
                  color: "rgba(20,48,104,0.4)",
                },
              },
              {
                featureType: "railway",

                elementType: "all",

                stylers: {
                  visibility: "off",
                },
              },
              {
                featureType: "highway",

                elementType: "all",

                stylers: {
                  color: "#004981",
                },
              },
              {
                featureType: "highway",

                elementType: "labels",

                stylers: {
                  visibility: "off",
                },
              },
              {
                featureType: "arterial",

                elementType: "geometry",

                stylers: {
                  color: "#00AFE8",
                },
              },
              {
                featureType: "arterial",

                elementType: "geometry.fill",

                stylers: {
                  color: "#00AFE8",
                },
              },
              {
                featureType: "poi",

                elementType: "all",

                stylers: {
                  visibility: "off",
                },
              },
              {
                featureType: "green",

                elementType: "all",

                stylers: {
                  visibility: "off",
                },
              },
              {
                featureType: "subway",

                elementType: "all",

                stylers: {
                  visibility: "off",
                },
              },
              {
                featureType: "manmade",

                elementType: "all",

                stylers: {
                  color: "#00AFE8",
                },
              },
              {
                featureType: "local",

                elementType: "all",

                stylers: {
                  color: "#00AFE8",
                },
              },
              {
                featureType: "arterial",

                elementType: "geometry",

                stylers: {
                  color: "#004981",
                },
              },

              {
                featureType: "arterial",

                elementType: "geometry.fill",

                stylers: {
                  color: "#00508b",
                },
              },
              {
                featureType: "boundary",

                elementType: "all",

                stylers: {
                  color: "#029fd4",
                },
              },
              {
                featureType: "building",

                elementType: "all",

                stylers: {
                  color: "#1a5787",
                },
              },
              {
                featureType: "label",

                elementType: "labels.text.fill",

                stylers: {
                  color: "#9ea7aa",
                },
              },
            ],
          },
        },
        //配置地图的数据，并且显示
        series: [
          {
            type: "scatter",
            coordinateSystem: "bmap",
            data: that.convertData(that.points),
            symbolSize: 15,
            encode: {
              value: 2,
            },
            label: {
              formatter: "{b}",
              position: "right",
              show: false,
            },
            selectedMode: "single", //添加点击事件 此处必须设置
            itemStyle: {
              color: "#00FBDB",
            },
            emphasis: {
              label: {
                show: true,
              },
            },
          },
          {
            name: "",
            type: "effectScatter",
            coordinateSystem: "bmap",
            data: that.convertData(
              that.points.filter((item) => item.is_alert == 1)
            ),
            symbolSize: function (val) {
              return 16;
            },
            encode: {
              value: 2,
            },
            showEffectOn: "render",
            rippleEffect: {
              brushType: "stroke",
            },
            hoverAnimation: true,
            label: {
              formatter: "{b}",
              position: "right",
              show: true,
            },
            selectedMode: "single", //添加点击事件 此处必须设置
            itemStyle: {
              color: "#E75076",
              shadowBlur: 10,
              shadowColor: "#333",
            },
            zlevel: 1,
          },
        ],
      }),
        window.addEventListener(
          "resize",
          () => {
            // 自动渲染echarts
            myChart.resize();
          },
          true
        );

      myChart.on("click", function (params) {
        let id = params.value[2];
        let worker = that.list.find((item) => item.id == id);
        that.checkWorker(worker.card_number, worker.lng, worker.lat);
      });
    },
  },
  created() {},
  mounted() {
    this.getData();
    return false
    // this.chinaConfigure()
    this.timer = setInterval(() => {
      // this.chinaConfigure()
      this.getData();
    }, 15000);
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
  destroyed() {
    // clearInterval(this.timer);
  },
};
</script>

<style lang="scss" scoped>
.center {
  .search {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 70px 0 15px;
    position: relative;
    .search-title {
      font-size: 24px;
      line-height: 24px;
      color: #63dcff;
    }
    /deep/ .el-input-group {
      width: 300px;
      height: 32px;
      border-radius: none !important;
    }
    /deep/ .el-input__inner {
      height: 32px;
      line-height: 32px;
      font-size: 16px;
      background-color: transparent;
      border: 2px solid #00c0ff;
      color: #00c0ff;
      border-radius: none !important;
      &::placeholder {
        color: #00c0ff;
      }
      &::-webkit-input-placeholder {
        /* WebKit browsers 适配谷歌 */
        color: #00c0ff;
      }
      &:-moz-placeholder {
        /* Mozilla Firefox 4 to 18 适配火狐 */
        color: #00c0ff;
      }
      &::-moz-placeholder {
        /* Mozilla Firefox 19+ 适配火狐 */
        color: #00c0ff;
      }
      &:-ms-input-placeholder {
        /* Internet Explorer 10+  适配ie*/
        color: #00c0ff;
      }
    }
    /deep/ .el-input-group__append {
      background-color: #00c0ff;
      padding: 0 10px;
      border-radius: none !important;
      border: none;
      cursor: pointer;
    }
    /deep/ .el-input__icon {
      color: #fff;
      font-size: 18px;
      line-height: 32px;
    }
    .search-content {
      position: absolute;
      width: 300px;
      background-color: rgba(11, 20, 49, 0.8);
      height: 160px;
      // overflow-y: scroll;
      top: 48px;
      right: 70px;
      box-sizing: border-box;
      padding: 5px 15px;
      z-index: 99999;
      p {
        line-height: 26px;
        font-size: 16px;
        color: #00bfff;
        font-weight: bold;
      }
    }
  }
  .center-map {
    box-sizing: border-box;
    height: 506px;
    margin-top: 33px;
  }
}
/deep/ .anchorBL,
.BMap_pop {
  display: none;
}
</style>