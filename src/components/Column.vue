<template>
  <div id="myChart"></div>
</template>

<script>
export default {
  name: "column",
  data() {
    return {
      data: [2510, 4561, 14561],
      timer: "",
    };
  },
  mounted() {
    this.drawLine();
    this.freshData();
  },
  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      let echarts = this.$echarts;
      // 绘制图表
      myChart.setOption({
        tooltip: {},
        xAxis: {
          data: ["合同签约数", "活跃工人数", "热门招聘信息数"],
          axisTick: {
            //y轴刻度线
            show: false,
          },
          axisLine: {
            lineStyle: {
              type: "solid",
              color: "#fff", //左边线的颜色
              width: "1", //坐标线的宽度
            },
          },
        },
        textStyle: {
          fontWeight: "normal",
          color: "#fff", // 标题颜色
          fontSize: 14,
        },
        yAxis: {
          axisTick: {
            //y轴刻度线
            show: false,
          },
          splitLine: {
            //网格线
            show: false,
          },
          axisLine: {
            lineStyle: {
              type: "solid",
              color: "#fff", //左边线的颜色
              width: "1", //坐标线的宽度
            },
          },
          axisLabel: {
            show: false,
          },
        },
        // color: ["#0C8DFF", "#0C8DFF", "#0C8DFF"],
        series: [
          {
            type: "bar",
            barWidth: 50, // 设置柱的宽度
            data: this.data,
            itemStyle: {
              //上方显示数值
              normal: {
                label: {
                  show: true, //开启显示
                  position: "top", //在上方显示
                  textStyle: {
                    //数值样式
                    color: "white",
                    fontSize: 14,
                  },
                },
                color: function (params) {
                  var colorList = [
                    ["#ffab71", "#d7a481", "#cfb39f"],
                    ["#fff333", "#fef672", "#f9f6ca"],
                    ["#ff7070", "#f99595", "#f4cece"],
                  ];

                  var index = params.dataIndex;
                  if (params.dataIndex >= colorList.length) {
                    index = params.dataIndex - colorList.length;
                  }

                  return new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    { offset: 0, color: colorList[index][0] },
                    { offset: 0.5, color: colorList[index][1] },
                    { offset: 1, color: colorList[index][2] },
                  ]);
                },
                barBorderRadius: 2, //柱状角成椭圆形
              },
            },
          },
        ],
      });
    },
    freshData() {
      this.timer = setInterval(() => {
        this.data = this.data.map((item, index) => {
          switch (index) {
            case 0:
              return item + this.randomNum(300, 600);
              break;
            case 1:
              return item + this.randomNum(300, 600);
              break;
            case 2:
              return item + this.randomNum(600, 900);
              break;
            default:
              return item + this.randomNum(300, 600);
              break;
          }
        });
        this.drawLine();
      }, 60000);
    },
    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    },
  },
  destroyed() {
    clearInterval(this.timer);
  },
};
</script>
<style lang="scss" scoped>
#myChart {
  width: 100%;
  height: 320px;
}
</style>