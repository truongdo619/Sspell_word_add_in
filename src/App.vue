<template>
  <div id="app">
    <div v-if="isOfficeInitialized">
      <router-view></router-view>
    </div>
    <div v-loading="!isOfficeInitialized" class="spinner">
    </div>
  </div>
</template>

<script>

export default {
  name: 'App',

  computed: {
    isOfficeInitialized(){
      // return true
      return this.$store.state.spell.isOfficeInitialized;
    }
  }
}
</script>

<style>
body{
  margin: 0px;
  background-color: #ffffff;
}
#app{
  font-family: RobotoRegular,sans-serif;
  min-width: 300px;
}
#app .spinner{
  position: inherit!important;
  display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
</style>
