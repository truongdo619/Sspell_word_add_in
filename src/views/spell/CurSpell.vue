
<template>
        <div class="home">
            <TopBar></TopBar>
            <ErrorList></ErrorList>
            <div class="home-footer">
                <!-- <span>
                    <i class="el-icon-loading"></i>
                    Loading
                </span> -->
                <span>
                    <i class="el-icon-circle-check"></i>
                    Hoàn thành
                </span>
                <span>
                    Đoạn {{currentPara}}
                </span>
            </div>
        </div> 
</template>

<script>

import ErrorList from '../../components/spell/ErrorList'
import TopBar from '../../components/spell/TopBar'
    export default {
        name: 'CurSpell',
        components : { ErrorList, TopBar},
        computed: {
            currentPara(){
                return this.$store.state.spell.currentParaLoading
            }
        }
    }
</script>

<style scoped>
.home-footer{
    padding: 0 20px;
    height: 25px;
    position: fixed;
    bottom: 0px;
    background: #fafafa;
    width: 100%;
    z-index: 100;
    box-shadow: 0 1px 7px 0 rgba(129,137,169,.2);
}
.home-footer span{
    font-size: 0.8rem;
    color: gray;
    line-height: 25px;
}
.home-footer span:last-child{
    padding-right: 40px;
    float: right;
}
</style>