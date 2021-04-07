<template>
    <div class="step">
        <div class="el_step">
<!--            <h4>{{this.current_step.title}}</h4>-->
            <StepElement :item="this.current_step"></StepElement>
        </div>
        <div class="operation_button">
            <el-button class="step_btn" :class="{ 'btn_hidden' : this.current_index === 0}" icon="el-icon-arrow-left" @click="handlePrevious">Previous </el-button>
            <el-button class="step_btn" type="primary" @click="handleNext">Next <i class="el-icon-arrow-right el-icon-right" ></i></el-button>
        </div>
    </div>
</template>

<script>
    import StepElement from "./StepElement";
    export default {
        name : "CustomStep",
        components: {StepElement},
        props : ['steps'],
        data(){
            return {
                current_index : 0
            }
        },
        computed : {
            current_step(){
                return this.steps[this.current_index]
            },
            steps_length(){
                return this.steps.length
            }
        },
        methods:{
            handlePrevious(){
                if (this.current_index > 0){
                    this.current_index--;
                    this.$emit('update_progress', this.current_step.step_percentage, false)
                }
            },
            handleNext(){

                document.getElementById("v2Whv-ViN2or").scrollIntoView({ behavior: "smooth"});
                if (this.current_index < this.steps_length-1){
                    this.$emit('update_progress', this.current_step.step_percentage, true)
                    this.current_index++;
                }

            }
        }
    }
</script>

<style scoped>
    .operation_button{
        text-align: center;
    }

    .step_btn{
        display: inline-block
    }
    .btn_hidden{
        display: none;
    }
</style>