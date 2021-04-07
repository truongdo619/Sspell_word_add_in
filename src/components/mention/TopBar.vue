<template>
    <div class="topbar">
        <span><b>Danh sách văn bản</b></span>
        <router-link to="/mention/home">
            <span><i class="el-icon-close"></i></span>
        </router-link>
    </div>
</template>

<script>
export default {
    "name" : "TopBar"
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
}
</style>