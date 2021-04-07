<template>
    <div>
        <div class="el_step_title">
            <span>
                {{item.title}}
            </span>
        </div>
        <div class="el_step_select" v-if="this.item.type === 'radio'">
            <el-radio-group v-model="radio">
                <div  v-for="item in item.options" :key="item">
                    <el-radio :label="item">{{item}}</el-radio >
                   <el-tag effect="dark" style="overflow: hidden">Recommended</el-tag>
                </div>

            </el-radio-group>
        </div>

        <div class="el_step_select" v-if="this.item.type === 'checkbox'">
            <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">Check all</el-checkbox>
            <div style="margin: 15px 0;"></div>
            <el-checkbox-group v-model="checkedBox" @change="handleCheckedOptionChange">

                <div  v-for="item in item.options" :key="item">
                    <el-checkbox :label="item">{{item}}</el-checkbox>

                   <el-tag effect="dark" style="overflow: hidden">Recommended</el-tag>
                </div>
            </el-checkbox-group>
        </div>

    </div>
</template>

<script>
    export default {
        name : "StepElement",
        props : ['item'],
        data(){
            return {
                checkAll: false,
                isIndeterminate: true,
                checkedBox : [ this.item.options[0] ],
                radio : this.item.options[0]
            }
        },
        watch :{
            item: function() {
                this.checkedBox = [ this.item.options[0] ]
                this.radio = this.item.options[0]
            }
        },
        methods: {
            handleCheckAllChange(val) {
                this.checkedBox = val ? this.item.options : [];
                this.isIndeterminate = false;
            },
            handleCheckedOptionChange(value) {
                let checkedCount = value.length;
                this.checkAll = checkedCount === this.item.options.length;
                this.isIndeterminate = checkedCount > 0 && checkedCount < this.item.options.length;
            }
        }
    }
</script>

<style>
.el_step .el_step_title{
    font-weight: 400;
    font-size: 20px;
    line-height: 110%;
    color: #253958;
    margin-bottom: 30px;
}
.el_step_select {
    margin-bottom: 30px;
}
.el_step_select .el-radio{
    display: inline-block;
    margin-top: 10px;
    margin-bottom: 10px;
}

.el_step_select .el-checkbox{
    display: inline-block;
    margin-top: 10px;
    margin-right: 30px;
    margin-bottom: 10px;
}

.el_step_select .el-tag{
    display: inline;
    padding: 5px;
    background-color: #009ddc;
    top: -15px;
    position: relative;
}

.el_step_select .el-radio__label{
    display: block;
    word-wrap: break-word;
    white-space: normal;
    width: 100%;
    position: relative;
    top: -15px;
    left: 15px;
}
.el_step_select .el-radio .el-radio__label{
    display: block;
    word-wrap: break-word;
    white-space: normal;
    width: 100%;
    position: relative;
    top: -15px;
    left: 15px;
}
</style>