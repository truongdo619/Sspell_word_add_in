<template>
    <div class="tc_container">
        <el-row>
            <div class="tc_header">
                <h3>Lawtech - Bản Kiểm Kê Hàng Hóa</h3>
            </div>
            <div class="tc_progress">
                <el-progress :percentage="this.percentage" :stroke-width="10" :show-text="false"></el-progress>
            </div>
        </el-row>
        <el-row>
            <el-col :sm="12" :md="12" :lg="12" class="tc_step">
                <CustomStep :steps="this.steps" @update_progress="update_pro"></CustomStep>
            </el-col>

            <el-col :sm="12" :md="12" :lg="12">
                <div class="tc_template">
                    <div class="tc_template_notify">
                        <p>1 Changes will be applies</p>
                    </div>
                    <div class="tx_template_content">
                        <TemplateContent></TemplateContent>
                    </div>
                    </div>
            </el-col>
        </el-row>

    </div>
</template>

<script>

import CustomStep from "../../components/template_creator/Step";
import TemplateContent from "../../components/template_creator/Template";
export default {
    name : "TemplateCreator",
    components: {TemplateContent, CustomStep},
    data(){
        return{
            steps : [
                {
                    title: "Where will your Privacy Policy be used?",
                    step_percentage : 10,
                    options : [
                        {
                            content: "Website",
                            tag : "Recommended"
                        },
                        {
                            content: "Mobile app"
                        },
                        {
                            content: "Both"
                        }
                    ],
                    type: "radio"
                },
                {
                    title: "Choose type of your company:",
                    step_percentage : 20,
                    options : [
                        {
                            content: "Delaware corporation"
                        },
                        {
                            content: "Other"
                        }
                    ],
                    type: "checkbox"
                },
                {
                    title: "Do you send emails to your users?",
                    step_percentage : 30,
                    options : [
                        {
                            content: "Yes"
                        },
                        {
                            content: "No"
                        }
                    ],
                    type: "radio"

                },{
                    title: "Do you ask for location information (i.e. GPS)?",
                    step_percentage : 40,
                    options : [
                        {
                            content : "Yes, we ask users for their location",
                            tag : "Recommended"
                        },
                        {
                            content: "No"
                        }
                    ],
                    type: "radio"
                },
                {
                    title: "Done"
                }
            ],
            percentage : 0
        }
    },
    methods:{
        update_pro(step_percentage, isIncre){
            this.percentage += isIncre ? step_percentage : -step_percentage
        }
    }
}
</script>

<style scoped>
h3{
    color: #253958;
}
.tc_container{
    padding: 0 15px 20px 15px;
    font-family: -apple-system,\.SFNSText-Regular,San Francisco,Roboto,Segoe UI,Helvetica Neue,Lucida Grande,sans-serif;

}

.tc_container h3 {
    margin: 15px 0;
    font-weight: 400;
    font-size: 24px;
}
.tc_step{
    background-color: #fff;
    border: 1px solid #d7dbe0;
    border-radius: 3px!important;
    padding: 24px 30px;
}
.tc_progress{
    margin-bottom: 40px;
}

.tc_container .tc_template{
    position: sticky;
    background-color: #fff;
    min-height: 300px;
    max-height: calc(100vh - 170px);
    margin-left: 15px;
    overflow-y: auto;
    overflow-x: hidden;
    border: 2px solid #409eff;
    border-radius: 3px;
}

.tc_container .tx_template_content{
    padding-left: 15px;
    padding-right: 20px;
}

.tc_container .tc_template_notify{
    color: #253958;
    background-color: #ebedef;
    height: 43px;
    position: sticky;
    top: 0;
    z-index: 1;
    opacity: .9;
}


.tc_container .tc_template_notify p {
    padding: 10px 0;
    margin: 0;
    font-size: 14px;
    font-weight: 400;
    line-height: 22px;
    text-align: center;
}
</style>