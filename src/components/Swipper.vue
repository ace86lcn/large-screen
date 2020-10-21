<template>
  <div class="pro-swipper">
    <el-carousel indicator-position="outside" arrow="never">
      <div class="project-title">
        <span>项目名称</span>
        <span>所属公司</span>
      </div>
      <el-carousel-item v-for="(item, index) in proList" :key="index">
        <p class="project" v-for="elm in item" :key="elm.id">
          <span>{{ elm.proName }}</span>
          <span>{{ elm.compName }}</span>
        </p>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  data() {
    return {
      proList: [
        [
          {
            id: 1,
            proName: "运河印象",
            compName: "枣庄鼎力建筑工程有限公司",
          },
          {
            id: 2,
            proName: "三一筑工",
            compName: "三一山东筑工科技有限公司",
          },
        ],
        [
          {
            id: 1,
            proName: "台儿庄古城",
            compName: "山东省台儿庄古城旅游集团有限公司",
          },
          {
            id: 2,
            proName: "市民中心",
            compName: "枣庄华厦建筑工程有限公司",
          },
        ],
        [
          {
            id: 1,
            proName: "三一绿建",
            compName: "山东摩云网络科技有限公司",
          },
        ],
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.project-title {
  position: absolute;
  display: flex;
  justify-content: space-evenly;
  top: -25px;
  color: #00bfff;
  font-size: 16px;
  font-weight: bold;
  line-height: 30px;
  height: 30px;
  margin-bottom: 30px;
  span {
    margin-left: 80px;
  }
  span:first-child {
    margin-left: 82px;
  }
}
.pro-swipper {
  /deep/ .el-carousel__container {
    position: relative;
    height: 85px !important;
    margin-top: 20px;
  }
}

.el-carousel {
  width: 500px;
  height: 140px;
  margin-top: 10px;
}

.el-carousel__item {
  height: 100px;
  font-size: 16px;
  font-weight: bold;
  color: #fff;
}
.el-carousel__item .project {
  height: 35px;
  line-height: 35px;
  text-align: center;
  display: flex;
  justify-content: space-evenly;
}
.el-carousel__item .project:first-child {
  border-top: 2px solid #01c1ff;
  border-bottom: 1px solid #01c1ff;
  margin-top: 20px;
}
</style>