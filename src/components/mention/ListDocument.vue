<template>
    <el-collapse v-model="activeNames" @change="handleChange">

        <el-collapse-item v-for="(item, id) in this.items" :name="id + 1" :key="id">
            <template slot="title">
                <span class="document_title" style="white-space:nowrap; text-overflow: ellipsis; overflow: hidden">
                    <i v-bind:class="[activeNames.includes(id + 1) ? 'el-icon-remove-outline' : 'el-icon-circle-plus-outline']">

                    </i> {{item.text}}
                </span>
            </template>
            <div v-for="(element, index) in item.detailed" :key="index">
                <ElementResult v-bind:item="element" v-bind:id="index+1" v-on:click-element="handleClickElement(element)" />
            </div>
        </el-collapse-item>
    </el-collapse>
</template>

<script>
import ElementResult from "../mention/ElementResult";
export default {
    name : 'ListDocument',
    components : {ElementResult},
    props : ["items"],
    methods: {
      handleChange(val) {
          this.$store.dispatch("mention/set_state_active_names", val);
      },
      handleClickElement( element){
          this.$store.dispatch("mention/set_state_active_element",element);
          this.$emit('click-element' )
      }

    },
    computed :{
        activeNames(){
            return this.$store.state.mention.active_names;
        }
    }
}
</script>

<style>
#app .mention .el-collapse{
    font-family: "Segoe UI", "Segoe UI Web (West European)", "Segoe UI", -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif;
    border-top: none;
    border-bottom: none;
    position: relative;
    top: 50px;
    padding: 5px 10px 10px 10px;
}

.mention .is-active .document_title{
    font-size: 16px;
    font-weight: 600;
}

.mention .el-collapse-item__header{
    line-height: normal!important;
    min-height: 48px;
}

</style>