<template>
    <el-pagination
      @current-change="handleCurrentChange"
      :page-size="size"
      layout="total, prev, pager, next, jumper"
      :total="total"
        :prev-text="'上一页'"
        :next-text="'下一页'"
        background>
    </el-pagination>
</template>

<script>
    export default {
        props: {
            total: {
                type: Number,
                default: 0
            },
            size: {
                type: Number,
                default: 10
            }
        },
        data() {
            return {
                
            }
        },
        methods: {
            handleCurrentChange(val) {
                this.$emit('update:page', val)
            }
        }
    }
</script>

<style lang="scss" scoped>
	$color_blue: #409eff;
    .el-pagination {
        padding: 40px 0px;
        background-color: #fff;
        z-index: 999;
        display: flex;
        justify-content: flex-end;
        /deep/ .el-pagination__total {
            color: #3B3B3B;
        }
        /deep/ button {
            background-color: #fff !important;
            border: 1px solid $color_blue;
            color: #3B3B3B !important;
            padding: 0 10px !important;
        }
        /deep/ li {
            background-color: #fff !important;
            border: 1px solid $color_blue;
            color: #3B3B3B !important;
            padding: 0 20px !important;
            margin: 0 !important;
        }
        /deep/ .el-pager li:not(.disabled).active {
            background-color: $color_blue !important;
            color: #fff !important;
        }
        /deep/ .el-pager li.active+li {
            border-left: 1px solid $color_blue;
        }
        /deep/ .btn-prev {
            margin-left: 10px;
        }
    }
</style>