
<template> 
    <div class="dict_home">
        <div class="topbar">
            <span><b>Từ điển của tôi</b></span>

            <router-link :to="{ name: 'HomeSpell', query: { 'field': field, 'speed': speed }}">
                <span class="coordinate_button"><i class="el-icon-close"></i></span>
            </router-link>
        </div>

        <div class="dictionary">
            <el-tag
            v-for="tag in tags"
            :key="tag"
            closable
            type="info"
             @close="handleClose(tag)">
            {{tag}}
            </el-tag>
        </div>

        <div class="save" @click="centerDialogVisible = true">
            <div><i class="el-icon-edit-outline"></i> Lưu thay đổi</div>
        </div>

        <el-dialog
        title="Đồng ý lưu thay đổi?"
        :visible.sync="centerDialogVisible"
        width="30%"
        center>
        <span>Đồng ý lưu những thay đổi?</span>
        <span slot="footer" class="dialog-footer">
            <el-button @click="centerDialogVisible = false">Hủy</el-button>
            <el-button type="primary" @click="saveDictionary">Đồng ý</el-button>
        </span>
        </el-dialog>

    </div>
</template>

<script>

    export default {
        name: 'DictionarySpell',

        data(){
            return{
                field: "",
                speed: "",
                tags: [],
                centerDialogVisible: false
            }
        },
        mounted() {
        this.field = this.$route.query.field
        this.speed = this.$route.query.speed
        this.tags = JSON.parse(JSON.stringify(this.$store.state.spell.dictionary))
        },
         methods: {
            handleClose(tag) {
                this.tags.splice(this.tags.indexOf(tag), 1);
            },
            saveDictionary(){
                this.$store.dispatch("spell/save_dictionary", this.tags)
                this.centerDialogVisible = false
            }
        }
    }
</script>

<style scoped>
.topbar{
    width: 100%;
    position: fixed;
    z-index: 100;
    height: 40px;
    /* padding: 5px 15px 5px 15px; */
    background-color: #1e87f0;
}
.topbar span{
    cursor: pointer;
    line-height: 40px;
    padding-left: 15px;
    color: white;
}
.topbar span:last-child{
    float: right;
    padding-right: 16px;
}

.topbar span:hover{
  background-color: #2b579a;
}

.dictionary{
    position: relative;
    top: 50px;
    padding: 10px 30px 60px 25px;

}

.dictionary .el-tag{

}

.save{
    box-shadow: 0px 20px 30px 20px rgba(0,0,0,0.16);
    position: fixed;
    bottom: 0px;
    background: #fafafa;
    width: 100%;
    z-index: 100;
}
.save div{
    cursor: pointer;
    line-height: 40px;
    color: #1e87f0;
    text-align: center;
}


</style>

<style>

.dictionary .el-tag{
    margin-right:20px;
    margin-bottom: 10px;
    width: 100%;
}

.dictionary .el-tag__close{
    float: right;
    margin-right: 8px;
    margin-top: 8px;
}

.dict_home .el-dialog{
  width:80%!important;
}

.dict_home .el-dialog .el-dialog__header{
  display: none;
}

.dict_home .el-dialog span:first-child{
    font-size: 14px;
    font-weight: 600;
}

.dict_home .el-dialog--center .el-dialog__body{
  padding: 25px 25px 10px 35px;
}

.dict_home .dialog-footer .el-button {
  padding: 7px 10px;
}
</style>

