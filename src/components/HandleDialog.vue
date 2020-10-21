<template>
    <el-dialog
        :visible.sync="show"
        width="500px"
        :before-close="handleClose"
        :center="true"
		:show-close="false">
        <div class="contents">
			<h4>提示</h4>
			<p>确认解除报警？</p>
		</div>
        <span slot="footer" class="dialog-footer">
            <button @click="handleConfirm" class="btn-1">确认</button>
            <button @click="handleClose" class="btn-2">取消</button>
        </span>
    </el-dialog>
</template>

<script>
    export default {
        props: {
            show: {
                type: Boolean,
                default: false
            },
        },
        methods: {
            handleClose() {
                this.$emit('close')
            },
            handleConfirm() {
                this.$emit('confirm')
            }
        }
    }
</script>

<style lang="scss" scoped>
    /deep/ .el-dialog {
        border-image:linear-gradient(180deg, rgba(2,192,255,1), rgba(5,63,115,0)) 4 4;
        box-shadow:-1px -6px 14px 0px rgba(0,175,231,0.6);
        height: 300px;
        background-color: rgba(11,20,49,.5);
        margin-top: 300px !important;
    }
	/deep/ .el-dialog__header {
		height: 0;
        padding: 0;
	}
    /deep/ .el-dialog__body {
        padding: 0
    }
    .contents {
        h4 {
            font-size: 36px;
            line-height: 36px;
            color: #63DCFF;
            padding-top: 29px;
            text-align: center;
        }
        p {
            font-size: 30px;
            line-height: 30px;
            font-weight: bold;
            color: #63DCFF;
            padding-top: 47px;
            text-align: center;
        }
    }
    /deep/ .el-dialog__footer {
        padding: 62px 83px 0;
    }
    /deep/ .dialog-footer {
        display: flex;
        justify-content: space-between;
        button {
            width: 140px;
            height: 40px;
            text-align: center;
            line-height: 38px;
            background-color: transparent;
            font-size: 24px;
            font-weight: bold;
            box-sizing: border-box;
            border-radius: 2px;
        }
        .btn-1 {
            color: #63DCFF;
            border:2px solid rgba(1,193,255,1);
        }
        .btn-2 {
            color: #E74F75;
            border:2px solid rgba(231,79,117,1);
        }
    }
</style>