
<template>
    <div class="home">
        <div class="topbar">
            <span><b>Home</b></span>
        </div>
        <div class="logo_pane">
            <img :src="logo">
            <p>WELCOME TO LAWTECH SEARCH</p>
        </div>

        <div class="content_pane">
            <p>Tìm hiểu tính năng của công cụ Lawtech Search !</p>
            <table>
                <tr>
                    <td width="50" style="text-align: center;"><i class="el-icon-search"></i></td>
                    <td>Tìm kiếm tài liệu, văn bản pháp luật</td>
                </tr>
                <tr>
                    <td width="50" style="text-align: center;"><i class="el-icon-document"></i></td>
                    <td>Xem chi tiết các thuộc tính của văn bản</td>
                </tr>
            </table>
        </div>

        <div class="button_pane">

            <p>Để sử dụng công cụ, nhấn <b>Khởi động:</b></p>
            <div style="margin-bottom:10px">
                <router-link to="/search/list">
                    <el-button icon="el-icon-arrow-right">Khởi động</el-button>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
    import logo from "../../assets/logo-filled.png"
    export default {
        name: 'HomeSearch',
        data(){
            return {
                logo : logo
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

.home .button_pane p{
    margin-top: 0px;
    text-align: center;
}
.home .button_pane button{
    margin: 0 auto;
    display: block;
}
.home .button_pane a{
    text-decoration: none;
}
</style>