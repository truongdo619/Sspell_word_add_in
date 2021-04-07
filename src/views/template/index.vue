
<template>
    <div class="home">
        <div class="topbar">
            <span><b>Mẫu văn bản</b></span>
        </div>
        <div class="template">
            <Element v-for="item in element" :key="item.id" :item="item"></Element>
        </div>
        <div v-loading="this.loading" class="spinner"></div>
    </div>
    
</template>

<script>
    import Element from '../../components/template/Element'
    export default {
        name: 'HomeTemplate',
        async mounted(){
            await this.$store.dispatch("template/load_template", {"page": 1, "limit": 10})
        },
        computed: {
            element(){
                return this.$store.state.template.template_list;
            },
            loading(){
                return (this.$store.state.template.is_loading_template || this.$store.state.template.is_loading_detail)
            }
        },
        data (){
            return {
            }
        },
        components : {Element}
        
    }
</script>

<style >
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

.template{
    padding: 60px 20px 20px 20px;
}
.template .element{
    display: inline-block;
    padding: 10px;
    border: 2px solid transparent;
    cursor: pointer;
    
}
.element:hover{
    border: 2px solid #1f7246;
}
.element img{
    width: 110px;
    border: gray 1px solid;
    box-shadow: 0px 0px 8px #ccc;
}

.element .element_title{
    width: 110px;
    text-align: center;
    font-size: 12px;
    overflow: hidden;
    text-overflow: ellipsis; 
}

.el-message-box{
    width: 270px!important;
}

.el-message{
    min-width: 150px!important;
}
</style>