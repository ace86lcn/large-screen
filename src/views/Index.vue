<template>
  <div
    class="box"
    :style="{
      'background-image': 'url(' + require('../assets/images/bg.png') + ')',
    }"
  >
    <!-- 顶部 -->
    <div class="header">
      <div class="header-center">
        <h1>摩云劳务云管理平台</h1>
        <h2>The Cloud Management Platform of Moyun Labor</h2>
      </div>
      <p>
        <span>{{ time1 }}</span>
        <span>星期{{ time2 }}</span>
        <span>{{ time3 }}</span>
      </p>
    </div>
    <!-- content -->
    <div class="content">
      <div class="content-1">
        <!-- 招聘业务 -->
        <div class="content-1-box-1 box-shadow">
          <div class="box-top">
            <h4>招聘业务</h4>
            <span>Recruitment Business</span>
          </div>
          <column />
        </div>
        <!-- 结算中心 -->
        <div class="content-1-box-2 box-shadow">
          <div class="box-top">
            <h4>代发业务</h4>
            <span>Agency Business</span>
          </div>
          <div class="flex-all-center" style="height: 136px">
            <div class="radius-box-wrap">
              <div class="radius-box">
                <h4>{{ detail.order_count }}</h4>
                <div>
                  <p>订单总数</p>
                  <p>(个)</p>
                </div>
              </div>
              <div class="radius-box">
                <h4>{{ detail.order_amount }}</h4>
                <div>
                  <p>订单总金额</p>
                  <p>(元)</p>
                </div>
              </div>
              <div class="radius-box">
                <h4>{{ detail.order_worker_count }}</h4>
                <div>
                  <p>已发工资人数</p>
                  <p>(人)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 设备管理 -->
        <div class="content-1-box-3 box-shadow">
          <div class="box-top">
            <h4>平台项目</h4>
            <span>Platform Project</span>
          </div>
          <div class="flex-all-center" style="height: 154px">
            <div class="radius-box-wrap">
              <Swipper />
            </div>
          </div>
        </div>
      </div>
      <div class="content-2">
        <div class="content-2-box-1">
          <center @check="searchChoose" :show="dialog_show" />
        </div>
        <!-- SOS预警 -->
        <div
          :class="[
            'content-2-box-2',
            'box-shadow',
            { 'warning-shadow': warningList.length > 0 },
          ]"
        >
          <div class="box-top">
            <h4>SOS预警</h4>
            <span>SOS Warning</span>
          </div>
          <p class="no-warning" v-if="warningList.length == 0">暂无异常情况</p>
          <div class="warning-box" v-else>
            <!-- <img :src="require('../assets/images/icon-warning.png')"/> -->
            <!-- <p v-for="item in 4">【项目名称】的【工人姓名】正在SOS报警，请赶快前往救援！<span>解除报警</span></p> -->
            <el-carousel
              height="120px"
              :interval="5000"
              arrow="never"
              indicator-position="none"
            >
              <el-carousel-item
                v-for="(item, index) in warningList"
                :key="index"
              >
                <p v-for="i in item" :key="i.id">
                  【{{ i.project_name }}】的【{{
                    i.name
                  }}】正在SOS报警，请赶快前往救援！<span
                    @click="refuse(i.bracelet_id)"
                    >解除报警</span
                  >
                </p>
              </el-carousel-item>
            </el-carousel>
          </div>
        </div>
      </div>
      <div class="content-3">
        <!-- 工人信息 -->
        <div class="content-3-box-1 box-shadow">
          <div class="box-top">
            <h4>工人信息</h4>
            <span>Workers Information</span>
          </div>
          <div class="worker-box">
            <div class="worker-box-l">
              <div class="worker-msg-item">
                <span>姓名：</span>
                <div>
                  <p>{{ workerDetail.name }}</p>
                </div>
              </div>
              <div class="worker-msg-item">
                <span>身份证号：</span>
                <div>
                  <p>{{ workerDetail.card_number_index }}</p>
                </div>
              </div>
              <div class="worker-msg-item">
                <span>手机号：</span>
                <div>
                  <p>{{ workerDetail.mobile_index }}</p>
                  <!-- <a :href="'tel:'+workerDetail.mobile">
                                        <img :src="require('../assets/images/icon-phone.png')"/>
                                        <span>一键呼叫</span>
                                    </a> -->
                  <div class="call-worker" @click="callWorker">
                    <img :src="require('../assets/images/icon-phone.png')" />
                    <span>一键聊天</span>
                  </div>
                </div>
              </div>
              <div class="worker-msg-item">
                <span>手环设备号：</span>
                <div>
                  <p>{{ workerDetail.hand_code }}</p>
                </div>
              </div>
              <div class="worker-msg-item">
                <span>信用分：</span>
                <div>
                  <p>{{ workerDetail.score }}分</p>
                </div>
              </div>
              <div class="worker-card">
                <div class="worker-card-item">
                  <div
                    :style="{
                      'background-image':
                        'url(' + require('../assets/images/bg-card.png') + ')',
                    }"
                  >
                    <!-- <img :src="workerDetail.card_img_front_absolute" v-if="workerDetail.card_img_front_absolute"/> -->
                    <img src="../assets/images/frontID.jpg" />
                    <!-- <img src="../assets/images/card1.png"/> -->
                  </div>
                  <p>身份证正面</p>
                </div>
                <div class="worker-card-item">
                  <div
                    :style="{
                      'background-image':
                        'url(' + require('../assets/images/bg-card.png') + ')',
                    }"
                  >
                    <!-- <img :src="workerDetail.card_img_back_absolute" v-if="workerDetail.card_img_back_absolute"/> -->
                    <img src="../assets/images/behindID.jpg" />
                    <!-- <img src="../assets/images/card2.png"/> -->
                  </div>
                  <p>身份证反面</p>
                </div>
              </div>
            </div>
            <div class="worker-box-r">
              <div
                class="worker-score"
                :style="{
                  'background-image':
                    'url(' + require('../assets/images/bg-score.png') + ')',
                }"
              >
                <span>{{ workerDetail.score }}</span>
              </div>
              <div class="worker-score-text">
                <p>信用分</p>
                <p>(分)</p>
              </div>
            </div>
          </div>
        </div>
        <div class="content-3-box-2">
          <div class="content-3-box-2-l box-shadow">
            <div class="worker-number-list">
              <div class="radius-box">
                <h4>{{ steps }}</h4>
                <div>
                  <p>今日步数</p>
                  <p>(步)</p>
                </div>
              </div>
              <div class="radius-box">
                <h4>{{ temperature }}</h4>
                <div>
                  <p>今日体温</p>
                  <p>(℃)</p>
                </div>
              </div>
            </div>
            <div class="worker-number-list">
              <div class="radius-box">
                <h4>{{ workHours }}</h4>
                <div>
                  <p>今日工作时长</p>
                  <p>(小时)</p>
                </div>
              </div>
              <div class="radius-box">
                <h4>{{ alreadyWorkDays }}</h4>
                <div>
                  <p>已工作天数</p>
                  <p>(天)</p>
                </div>
              </div>
            </div>
          </div>
          <div class="content-3-box-2-r box-shadow">
            <order-list :list="workerDetail.wage_list" />
          </div>
        </div>
      </div>
    </div>
    <!-- 解除报警弹窗 -->
    <handle-dialog
      :show="dialog_show"
      @close="dialog_show = false"
      @confirm="refuse2"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      time1: "",
      time2: "",
      time3: "",
      detail: {},
      dialog_show: false,
      worker_id: "",
      workerDetail: {},
      warningList: [],
      warningId: "",
      baojinIschange: false,
      steps: 3512,
      stepsTimer: "",
      workHours: 0.0,
      workHoursTimer: "",
      temperature: "",
      alreadyWorkDays:0
    };
  },
  components: {
    OrderList: () => import("../components/List"),
    Column: () => import("../components/Column"),
    Center: () => import("../components/Center"),
    HandleDialog: () => import("../components/HandleDialog"),
    Swipper: () => import("../components/Swipper"),
  },
  methods: {
    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    },
    //修改步数
    updateSteps() {
      this.stepsTimer = setInterval(() => {
        this.steps = this.steps + this.randomNum(40, 70);
      }, 60000);
    },
    //修改工时
    updateWorkHours() {
      this.workHoursTimer = setInterval(() => {
        this.calcWorkHour();
      }, 60000);
    },
    //计算工时
    calcWorkHour() {
      let d = new Date();
      let hour = d.getHours();
      let minute = Number((d.getMinutes() / 60).toFixed(1));
      if (hour >= 8 && hour < 12) {
        this.workHours = (hour - 8 + minute).toFixed(1);
      }
      if (hour >= 12 && hour < 14) {
        this.workHours = 4.0;
      }
      if (hour >= 14 && hour < 18) {
        this.workHours = (hour - 10 + minute).toFixed(1);
      }
      if (hour >= 18) {
        this.workHours = 8.0;
      }
    },
    //随机体温
    randTemperature() {
      this.temperature = (36 + Number(Math.random().toFixed(1))).toFixed(1);
    },
    //已工作天数
    alreadyWorksDays() {
      var d = new Date();
      var d2 = new Date(2020, 1, 3, 8, 0, 0);
      var num = d - d2; //这是两个天数之间的毫秒差
      var secondNum = num / 1000; //将毫秒转化成秒
      var day = parseInt(secondNum / 86400); //已经工作天数
      this.alreadyWorkDays = day;
    },
    // 获取右上角时间
    getTime() {
      this.time1 = this.getTime1();
      this.time2 = this.getTime2();
      this.time3 = this.getTime3();
    },
    getTime1() {
      var strDate;
      var date = new Date(); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var Y = date.getFullYear() + "年";
      var M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "月";
      var D =
        (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + "日";
      strDate = Y + M + D;
      return strDate;
    },
    getTime2() {
      return "日一二三四五六".charAt(new Date().getDay());
    },
    getTime3() {
      var d = new Date();
      var time;
      time =
        d.getHours() +
        ":" +
        (d.getMinutes() <10 ? "0"+ d.getMinutes() : d.getMinutes() ) +
        ":" +
        (d.getSeconds() < 10 ? "0" + d.getSeconds() : d.getSeconds());
      return time;
    },
    getData() {
      this.$http.get("/worker/SmallMenu/bigScreen").then((res) => {
        if (res.data.code === 200) {
          this.detail = res.data.data;
        }
      });
    },
    // 获取工人详情
    getWorker() {
      this.$http
        .get("/worker/SmallMenu/workerDetail", {
          params: {
            card_number: this.worker_id,
          },
        })
        .then((res) => {
          if (res.data.code === 200) {
            this.workerDetail = res.data.data;
          }
        });
    },
    // 获取报警列表
    getList() {
      this.$http.get("/worker/SmallMenu/getAlertList").then((res) => {
        if (res.data.code === 200) {
          const list = [];
          res.data.data.map((item, index) => {
            const page = Math.floor(index / 4); //每页显示8个
            if (!list[page]) {
              //如果不存在
              list[page] = []; //添加一个新的数值
            }
            list[page].push(item); //追加到数值中
          });
          this.warningList = list;
        }
      });
    },
    // 解除警报
    refuse(id) {
      this.warningId = id;
      this.dialog_show = true;
    },
    refuse2() {
      this.dialog_show = false;
      this.$http
        .get("/worker/SmallMenu/cancelAlert", {
          params: {
            bracelet_id: this.warningId,
          },
        })
        .then((res) => {
          if (res.data.code === 200) {
            this.$message({
              message: "解除成功",
              type: "success",
            });
            this.getList();
          }
        });
    },
    searchChoose(id) {
      this.worker_id = id;
      this.getWorker();
    },
    // 呼叫工人
    callWorker() {
      window.nextView.nextView();
    },
  },
  created() {
    // var appClientWidth = window.nextView.getWidth()
    // appClientWidth = appClientWidth+''
    // if(appClientWidth.slice(-2) == 'px') {
    //     appClientWidth = appClientWidth.replace(/px/g,'')
    // }
    // var multiple = appClientWidth / 1845;
    //var multiple = window.screen.width / 1920;
    //document.write(`<meta name="viewport" content="width=1920, user-scalable=no, target-densitydpi=device-dpi,initial-scale=${multiple},minimum-scale=${multiple}" />`)
    // 获取当前时间
    setInterval(() => {
      this.getTime();
    }, 1000);
    // 获取一个工人
    this.$http.get("/worker/SmallMenu/bigScreen").then((res) => {
      if (res.data.code === 200) {
        this.worker_id = res.data.data.list[0].card_number;
        this.getWorker();
        this.detail = res.data.data;
      }
    });
    setInterval(() => {
      this.getData();
    }, 15000);
    // 获取报警工人
    this.getList();
    setInterval(() => {
      this.getList();
    }, 15000);
  },
  mounted() {
    this.updateSteps();
    this.calcWorkHour();
    this.updateWorkHours();
    this.randTemperature();
    this.alreadyWorksDays();
  },
  destroyed() {
      clearInterval(this.stepsTimer);
      clearInterval(this.workHoursTimer);
  },
};
</script>

<style lang="scss" scoped>
.box {
  width: 1920px;
  height: 1200px;
  box-sizing: border-box;
  background-size: 100%;
  background-repeat: no-repeat;
}
.box-shadow {
  border: 2px solid;
  border-image: linear-gradient(
      180deg,
      rgba(2, 192, 255, 1),
      rgba(5, 63, 115, 0)
    )
    2 2;
  box-shadow: -1px -6px 14px 0px rgba(0, 175, 231, 0.3);
  box-sizing: border-box;
  background-color: rgba(11, 20, 49, 0.5);
}
.warning-shadow {
  border: 2px solid;
  border-image: linear-gradient(
      180deg,
      rgba(231, 80, 118, 1),
      rgba(5, 63, 116, 0)
    )
    2 2;
  box-shadow: 0px -6px 14px 0px rgba(231, 80, 118, 0.5);
  box-sizing: border-box;
  background-color: rgba(11, 20, 49, 0.5);
  .box-top {
    border-bottom: 2px solid #e75076;
    h4 {
      color: #e75076;
    }
    span {
      color: #e75076;
    }
  }
  .warning-box {
    padding: 10px 0px;
    img {
      display: block;
      width: 96px;
      height: 88px;
      margin: 0 auto;
    }
    p {
      color: #e75076;
      font-size: 14px;
      line-height: 15px;
      font-weight: bold;
      text-align: center;
      margin-bottom: 18px;
      span {
        color: #00fbdb;
        margin-left: 10px;
      }
    }
  }
}
.box-top {
  height: 50px;
  box-sizing: border-box;
  margin: 0 15px;
  line-height: 58px;
  border-bottom: 2px solid #01c1ff;
  display: flex;
  justify-content: space-between;
  h4 {
    font-size: 24px;
    color: #63dcff;
  }
  span {
    font-size: 16px;
    color: #63dcff;
    font-weight: bold;
  }
}
.flex-all-center {
  display: flex;
  justify-content: center;
  align-items: center;
  .radius-box-wrap {
    display: flex;
  }
}
.radius-box {
  height: 78px;
  box-sizing: border-box;
  padding: 5px 15px 0 15px;
  border-left: 2px solid #00bfff;
  border-right: 2px solid #00bfff;
  border-radius: 8px;
  h4 {
    color: #fff;
    font-size: 30px;
    line-height: 30px;
    text-align: center;
  }
  div {
    margin-top: 14px;
    p {
      text-align: center;
      font-size: 14px;
      line-height: 14px;
      font-weight: bold;
      color: #00bfff;
    }
  }
}
.header {
  display: flex;
  align-items: flex-end;
  justify-content: center;
  height: 250px;
  position: relative;
  box-sizing: border-box;
  padding-bottom: 70px;
  .header-center {
    padding-right: 10px;
    h1 {
      color: rgba(255, 255, 255, 1);
      text-shadow: 0px 4px 13px rgba(4, 4, 4, 0.69);
      font-size: 35px;
      text-align: center;
      -webkit-text-stroke: 1px rgb(225, 248, 255);
    }
    h2 {
      font-size: 24px;
      color: rgba(255, 255, 255, 1);
      text-shadow: 0px 4px 13px rgba(4, 4, 4, 0.69);
      -webkit-text-stroke: 1px rgb(225, 248, 255);
    }
  }
  p {
    position: absolute;
    line-height: 24px;
    top: 112px;
    right: 112px;
    span {
      &:not(:last-child) {
        margin-right: 30px;
      }
      font-size: 24px;
      color: rgba(255, 255, 255, 1);
      text-shadow: 0px 4px 13px rgba(4, 4, 4, 0.69);
      font-weight: bold;
    }
  }
}
.content {
  box-sizing: border-box;
  padding: 0 68px;
  height: 790px;
  display: flex;
  justify-content: space-between;
  .content-1 {
    width: 555px;
    .content-1-box-1 {
      height: 348px;
    }
    .content-1-box-2 {
      height: 198px;
      margin-top: 41px;
      .radius-box {
        &:not(:last-child) {
          margin-right: 35px;
        }
      }
    }
    .content-1-box-3 {
      height: 210px;
      margin-top: 41px;
      .machine-item {
        width: 74px;
        &:not(:last-child) {
          margin-right: 53px;
        }
        img {
          display: block;
          width: 74px;
          height: 74px;
        }
        p {
          text-align: center;
          font-size: 16px;
          color: #00bfff;
          line-height: 16px;
          font-weight: bold;
          margin-top: 5px;
        }
        h4 {
          position: relative;
          text-align: center;
          font-size: 16px;
          color: #00fbdb;
          line-height: 16px;
          margin-top: 8px;
          padding-left: 10px;
          &::before {
            content: "";
            position: absolute;
            top: 3px;
            left: 11px;
            width: 10px;
            height: 10px;
            background-color: #00fbdb;
            border-radius: 50%;
          }
        }
      }
    }
  }
  .content-2 {
    width: 615px;
    .content-2-box-1 {
      height: 587px;
      box-sizing: border-box;
    }
    .content-2-box-2 {
      height: 210px;
      margin-top: 41px;
      .no-warning {
        text-align: center;
        line-height: 150px;
        font-weight: bold;
        font-size: 24px;
        color: #00fbdb;
      }
    }
  }
  .content-3 {
    width: 555px;
    .content-3-box-1 {
      height: 467px;
      .worker-box {
        display: flex;
        box-sizing: border-box;
        padding-top: 40px;
        padding-left: 24px;
        .worker-box-l {
          width: 334px;
          .worker-msg-item {
            display: flex;
            align-items: center;
            margin-bottom: 25px;
            span {
              width: 120px;
              font-weight: bold;
              font-size: 16px;
              line-height: 16px;
              color: #63dbff;
            }
            div {
              display: flex;
              align-items: center;
              p {
                font-weight: bold;
                font-size: 16px;
                line-height: 16px;
                color: #63dbff;
              }
              .call-worker {
                display: flex;
                align-items: center;
                width: 86px;
                height: 24px;
                border: 2px solid rgba(99, 219, 255, 1);
                box-shadow: -1px -6px 14px 0px rgba(0, 175, 231, 0.3);
                margin-left: 18px;
                img {
                  display: inline-block;
                  width: 14px;
                  height: 14px;
                  padding-left: 10px;
                }
                span {
                  font-weight: bold;
                  font-size: 12px;
                  line-height: 12px;
                  color: #63dbff;
                  margin-left: 2px;
                }
              }
            }
          }
          .worker-card {
            display: flex;
            .worker-card-item {
              width: 138px;
              &:last-child {
                margin-left: 39px;
              }
              div {
                box-sizing: border-box;
                background-size: 100% 100%;
                background-repeat: no-repeat;
                padding: 2px;
                height: 90px;
                img {
                  display: block;
                  width: 100%;
                  height: 100%;
                }
              }
              p {
                font-weight: bold;
                font-size: 16px;
                line-height: 16px;
                color: #63dbff;
                text-align: center;
                margin-top: 12px;
              }
            }
          }
        }
        .worker-box-r {
          padding-top: 65px;
          margin-left: 19px;
          .worker-score {
            background-size: 100% 100%;
            background-repeat: no-repeat;
            width: 150px;
            height: 150px;
            display: flex;
            align-items: center;
            justify-content: center;
            span {
              font-weight: bold;
              font-size: 30px;
              color: #fff;
              text-shadow: 0px 4px 13px rgba(4, 4, 4, 0.69);
              -webkit-text-stroke: 1px rgb(225, 248, 255);
            }
          }
          .worker-score-text {
            width: 150px;
            margin-top: 11px;
            p {
              font-weight: bold;
              font-size: 16px;
              line-height: 18px;
              color: #63dbff;
              text-align: center;
            }
          }
        }
      }
    }
    .content-3-box-2 {
      display: flex;
      justify-content: space-between;
      margin-top: 41px;
      height: 330px;
      .content-3-box-2-l {
        width: 268px;
        padding-top: 7px;
        .worker-number-list {
          display: flex;
          justify-content: space-between;
          padding: 38px 15px 0;
          .radius-box {
            box-sizing: border-box;
            width: 112px;
            padding: 5px 0 0;
          }
        }
      }
      .content-3-box-2-r {
        width: 268px;
      }
    }
  }
}
.next-icon {
  display: block;
  width: 50px;
  height: 50px;
  position: absolute;
  top: 106px;
  left: 83px;
  z-index: 9999;
}
.refresh-icon {
  display: block;
  width: 50px;
  height: 50px;
  position: absolute;
  top: 106px;
  left: 155px;
  z-index: 9999;
}
</style>