<template>
    <div class="topbar">
        <span><b>Danh sách lỗi</b></span>

        <router-link :to="{ name: 'HomeSpell', query: { 'field': field, 'speed': speed }}">
            <span class="coordinate_button"><i class="el-icon-close"></i></span>
        </router-link>

        <span @click="reset_error_list" class="coordinate_button"><i class="el-icon-refresh"></i></span>
    </div>
</template>

<script>
export default {
    "name" : "TopBar",
    data(){
      return{
        field: "",
        speed: "",
        isCur: false
      }
    },
    mounted() {
      this.field = this.$route.query.field
      this.speed = this.$route.query.speed
      this.isCur = this.$route.name.includes("CurSpell")
    },
    methods: {
        reset_error_list(){
          if (this.isCur) {
            this.$store.dispatch("spell/load_error_items_cur", { "field" : this.field, "speed" : this.speed})
          }
          else {
            this.$store.dispatch("spell/update_reset_full_list", true)
          }
        }
    },
    computed:{
        reset_full_list(){
          return this.$store.state.spell.resetFullList
        }
    },
    watch:{
      reset_full_list: function (newValue, oldValue) {
          if (oldValue === true){
            this.$store.dispatch("spell/load_error_items_full", { "field" : this.field, "speed" : this.speed})
          }
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
</style>