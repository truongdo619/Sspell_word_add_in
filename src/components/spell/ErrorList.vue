<template>
    <div>
        <el-collapse accordion @change="handleChange">
            <ErrorElement v-for="item in items" :key="item.id" :item="item"></ErrorElement>
        </el-collapse>
        <div v-loading="!this.loading" class="spinner"></div>
    </div>
</template>

<script>
import ErrorElement from "./ErrorElement"
export default {
    name: 'ErrorList',
    components : { ErrorElement },
    data(){
      return{
        field: "",
        speed: ""
      }
    },
    created: function () {
      setTimeout(() => {
        this.field = this.$route.query.field
        this.speed = this.$route.query.speed
        this.$store.dispatch("spell/load_error_items_cur", { "field" : this.field, "speed" : this.speed})
      }, 1000)

    },
    computed: {
        items() {
            return this.$store.state.spell.errorItemsCur
        },
        loading(){
          // return true
            return this.$store.state.spell.loadErrorItemsCur
        }
    },
    methods: {
      handleChange(val) {
        this.$store.dispatch("spell/select_current_para", { id : val, isCur : true});
      }
    }
}
</script>


<style>
#app .home .el-collapse-item{
    border: 1px solid #EBEEF5;
    padding: 0px 10px 0px 30px;
    border-radius: 5px;
    margin-bottom: 20px;
    box-shadow: 0 1px 7px 0 rgba(129,137,169,.2);
}
#app .home .el-collapse-item .el-collapse-item__wrap{
    border-bottom: none;
}

#app .home .el-collapse-item .el-collapse-item__header{
    border-bottom: none;
}

#app .home .el-collapse{
    border-top: none;
    border-bottom: none;
    position: relative;
    top: 50px;
    padding: 5px 10px 10px 10px;
}
#app .home .el-collapse-item span.common-label{
    position: relative;
    font-weight: 600;
}

#app .home .el-collapse-item span.common-label:before {
    top: 5px;
    bottom: 2px;
    left:-20px;
    margin: auto 0;
}

#app .home .el-collapse-item span.common-label:before {
    position: absolute;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    content: "";
    -webkit-transform: scale(.5);
    transform: scale(.5);
}


#app .home .el-collapse-item span.common-label:before{
    background-color: #ea1537;
}
#app .home .inline-dot{
    display: inline-block;
    padding: 0 5px;
    color: #8189a9;
    font-size: 18px;
    position: relative;
    top: -5px;
}

#app .label-content{
    text-decoration: line-through;
    color: #f23452;
    font-weight: 600;
}

#app .label-content .error-word{
    color: #0e101a;
    margin-right: 10px;
}
#app .label-content .icon{
    color: #0e101a;
    transform: scale(1.5);
}
#app .alternative-words{
    margin-left: 10px;
    display: inline;
}
#app .alternative-words button{
    
    margin-top: 10px;
    background-color: #11a683;
    padding: 8px;
    border: none;
}
#app .alternative-words button:hover{
    background-color: #15c39a;
}

#app .notify-content{
    margin-top: 10px;
}

#app .list-btn button{
    margin-top: 10px;
    border: none;
    padding: 10px;
}
#app .list-btn button i{
    color: #6d758d;
    transform: scale(1.5);
}
#app .list-btn .el-button + .el-button{
    margin-left:0px;
}
</style>