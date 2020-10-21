<template>
    <div class="order">
        <el-carousel height="288px" :interval="5000" arrow="never">
            <el-carousel-item v-for="(item, index) in lists" :key="index">
                <div class="order-title">
                    <span>编号</span>
                    <span>发放月份</span>
                    <span>到账时间</span>
                </div>
                <div class="order-item" v-for="(i, index2) in item" :key="i.id">
                    <span>0{{index2+1}}</span>
                    <span>{{i.wage_month}}</span>
                    <span>{{i.get_wage_time}}</span>
                </div>
            </el-carousel-item>
        </el-carousel>
    </div>
</template>

<script>
    export default {
        props: ['list'],
        data() {
            return {
                lists: []
            }
        },
        watch: {
            list(val) {
                const lists = []
                this.list.map((item,index)=>{
                    const page = Math.floor(index/6)//每页显示8个
                    if(!lists[page]) {//如果不存在
                        lists[page] = []//添加一个新的数值
                    }
                    lists[page].push(item)//追加到数值中
                })
                this.lists = lists
            }
        }
    }
</script>

<style lang="scss" scoped>
    .order {
        padding: 20px 19px 0;
    }
    .order-title {
        display: flex;
        align-items: center;
        height: 36px;
        border-bottom: 2px solid #01C1FF;
        span {
            font-size: 16px;
            font-weight: bold;
            color: #00BFFF;
            &:first-child {
                width: 45px;
            }
            &:nth-child(2) {
                text-align: center;
                width: 90px;
            }
            &:last-child {
                width: 95px;
                text-align: center;
            }
        }
    }
    .order-item {
        display: flex;
        align-items: center;
        height: 36px;
        border-bottom: 1px solid #01C1FF;
        span {
            font-size: 16px;
            font-weight: bold;
            color: #fff;
            &:first-child {
                width: 45px;
            }
            &:nth-child(2) {
                text-align: center;
                width: 90px;
            }
            &:last-child {
                width: 95px;
                text-align: center;
            }
        }
    }
    /deep/ .el-carousel__button {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background-color: #1B3A88;
    }
</style>