
<template>
    <div class="home">
        <div class="topbar">
            <span><b>Home</b></span>
            <span @click="dialogVisible = true"><i class="el-icon-setting"></i></span>
        </div>

        <div class="logo_pane">
            <img :src="logo">
            <p>Chào mừng đến ViSpell</p>
        </div>

        <div class="content_pane">
            <p>Công cụ kiểm tra chính tả Tiếng Việt</p>
            <table>
                <tr>
                    <td width="50" style="text-align: center;"><i class="el-icon-document-checked"></i></td>
                    <td>Phát hiện lỗi chính tả</td>
                </tr>
                <tr>
                    <td width="50" style="text-align: center;"><i class="el-icon-document-copy"></i></td>
                    <td>Gợi ý sửa lỗi</td>
                </tr>
            </table>
        </div>

        <div class="button_pane">
            <div style="margin-bottom:10px">
                <router-link :to="{ name: 'CurSpell', query: { 'field': settings.field, 'speed': settings.speed }}">
                    <el-button type="primary">Kiểm tra đoạn văn</el-button>
                </router-link>
            </div>
            <div>
              <router-link :to="{ name: 'FullSpell', query: { 'field': settings.field, 'speed': settings.speed }}">
                    <el-button type="danger">Kiểm tra văn bản</el-button>
                </router-link>
            </div>
        </div>

      <el-dialog
          destroy-on-close="false"
          :visible.sync="dialogVisible"
          width="30%">
        <el-row>

          <el-col :span="6">
            <svg class="_d758b857-set-goals-image" width="50" height="60" viewBox="0 0 69 80"><g fill="none" fill-rule="evenodd"><path d="M28.935 70C12.955 70 0 57.045 0 41.065 0 25.085 12.955 12.13 28.935 12.13c15.98 0 28.936 12.954 28.936 28.935C57.87 57.045 44.917 70 28.936 70zm0-12.242c9.22 0 16.694-7.474 16.694-16.693 0-9.22-7.475-16.694-16.695-16.694s-16.693 7.475-16.693 16.695 7.474 16.693 16.693 16.693z" fill="#4C7AF1"></path><path d="M28.935 57.758c-9.22 0-16.693-7.474-16.693-16.693 0-9.22 7.474-16.694 16.693-16.694 9.22 0 16.694 7.475 16.694 16.695s-7.475 16.693-16.695 16.693zm0-11.13a5.564 5.564 0 1 0 0-11.128 5.565 5.565 0 0 0 .001 11.129z" fill="#BCDBFB"></path><circle fill="#FFF" cx="28.935" cy="41.065" r="5.565"></circle><path stroke="#4C7AF1" stroke-linecap="round" stroke-width="1.5" d="M15.024 68.016L9.46 78.5m32.274-10.484L47.298 78.5"></path><path d="M61.96 13.367a.65.65 0 0 1 .645.656.65.65 0 0 1-.646.655h-6.075L29.35 41.7a.636.636 0 0 1-.913 0 .663.663 0 0 1 0-.927L54.972 13.75V7.59a.65.65 0 0 1 .645-.656.65.65 0 0 1 .646.656v5.777h5.696zm3.17-3.215a.65.65 0 0 1 .646.655.65.65 0 0 1-.646.655h-6.34a.65.65 0 0 1-.647-.655V4.372a.65.65 0 0 1 .646-.655.65.65 0 0 1 .644.655v5.78h5.696zm3.17-3.218a.65.65 0 0 1 .647.656.65.65 0 0 1-.646.655h-6.34a.65.65 0 0 1-.647-.655V1.155A.65.65 0 0 1 61.96.5a.65.65 0 0 1 .645.655v5.78H68.3z" fill="#4C7AF1"></path><path d="M49.267 20.486l-8.586 8.757" stroke="#FFF" stroke-width="1.3"></path></g></svg>
          </el-col>
          <el-col :span="18" >
            <span style="font-size: 20px;"><b>Cài đặt</b></span>
            <p style="font-size: 10px; color: gray; word-break: normal; font-style: italic">Thay đổi cài đặt dựa trên lĩnh vực của bạn</p>
          </el-col>
        </el-row>

        <el-divider></el-divider>
        <el-row>

          <el-col :span="7" class="margin_top_5">
            <span>Lĩnh vực</span>
          </el-col>
          <el-col :span="17">

            <el-radio-group @change="change_settings" v-model="settings.field" size="small">
              <el-radio-button label="khtn">KHTN</el-radio-button>
              <el-radio-button label="general">Chung</el-radio-button>
              <el-radio-button label="khxh">KHXH</el-radio-button>
            </el-radio-group>
          </el-col>
        </el-row>

        <el-divider></el-divider>

        <el-row>

          <el-col :span="7" class="margin_top_5">
            <span>Tốc độ</span>
          </el-col>
          <el-col :span="17">

            <el-radio-group @change="change_settings" v-model="settings.speed" size="small">
              <el-radio-button label="fast">Nhanh</el-radio-button>
              <el-radio-button label="accurate">Chính xác</el-radio-button>
            </el-radio-group>
          </el-col>
        </el-row>
        <span slot="footer" class="dialog-footer">
          <a @click="reset_settings" type="primary" class="reset_settings">Đặt lại mặc định</a>
          <el-button type="primary" @click="dialogVisible = false">Lưu</el-button>
        </span>
      </el-dialog>

    </div>
</template>

<script>
    import logo from "../../assets/logo-filled.png"
    export default {
        name: 'HomeSpell',
        mounted() {
          this.settings.field = "field" in this.$route.query?  this.$route.query.field : "general"

          this.settings.speed = "speed" in this.$route.query? this.$route.query.speed : "accurate"

        },
      data(){
            return {
                settings :{
                  field: "",
                  speed: ""
                },
                logo : logo,
                dialogVisible: false
            }
        },
      methods :{
          reset_settings(){
            this.settings = {field: "general", speed: "accurate"}
          },
          change_settings(){
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
    line-height: 40px;
    padding-left: 15px;
    color: white;
}

.topbar span:last-child{
  float: right;
  padding-right: 20px;
  cursor: pointer;
}

.logo_pane{
    padding: 60px 20px 20px 20px;
    background-color: #f4f4f4;
}
.logo_pane p{
    font-size: 1.2rem;
    text-align: center;
    color: #848383;
    margin-bottom: 0px;
}

.logo_pane img{
    width: 150px; 
    display: block;
  margin-left: auto;
  margin-right: auto;
}

.content_pane{
    padding: 2px 30px 10px 30px;
}
.content_pane > p {
    text-align:center;
    
    font-size: 1rem;
}
.home table {
    table-layout: fixed;
    width: 250px;
    margin: 20px auto 10px auto;
}

.home table td {
    font-size: 0.91rem;
    word-wrap: break-word;         /* All browsers since IE 5.5+ */
    overflow-wrap: break-word;     /* Renamed property in CSS3 draft spec */
    padding-bottom: 20px;
    color: #606266;
}
.home table i{
    transform: scale(1.5);
}
.home .button_pane button{
    margin: 0 auto;
    display: block;
    width: 290px;
    border-radius: 0px;
}
.home .button_pane a{
    text-decoration: none;
}

.home .button_pane{
    margin-bottom: 30px;
}

</style>

<style>
#app .home .el-dialog{
  width:80%!important;
}

.home .el-dialog .el-dialog__header{
  display: none;
}

.home .el-dialog .el-radio-button--small .el-radio-button__inner{
  padding: 6px 7px;
}

.home .el-dialog__body{
  padding: 20px 15px;
}

.home .el-dialog .el-divider--horizontal{
  margin: 20px 0px;
}
.home .el-dialog .margin_top_5{
  margin-top: 5px;
}

.home .el-dialog__body{
  color: rgb(14, 16, 26);
}

.home .el-dialog__footer{
  padding: 10px 20px 10px;
  background-color:#f9faff;
}

.home .dialog-footer .reset_settings{
  font-size: 12px;
  margin-right: 13px;
  color: rgb(74, 110, 224);
  cursor: pointer;
}
.home .dialog-footer .el-button {
  padding: 7px 10px;
}

</style>