<template>
  <div id="app">

  
   <router-view></router-view>
  </div>
</template>





<script>
import "../public/css/reset.css"
// import Register from "./components/Register"
// import Index from "./components/Index"
// import Notfound from "./components/Notfound"
// import Profile from "./components/Profile"
export default {
  name: 'App',
  // components:{
  //   "app-register":Register,
  //   "app-index":Index,
  //   "app-notfound":Notfound,
  //   "app-profile":Profile
  // }
  created(){
    if(localStorage.eletoken){
      const decodeToken = decode(localStorage.eletoken)
       this.$store.dispatch("setAuthenticated",!this.isEmpty(decodeToken))
        this.$store.dispatch("setUser",decodeToken)
    }
  },
   methods: {
   
  isEmpty(value){
        return (
          value === undefined ||value=== null||(typeof value === "object"&&object.keys(value).length===0)
          ||(typeof value === "string"&&value.trim().length===0)
        )
  }
}

}
</script>

<style>
html,body,#app{width: 100%;height: 100%}


</style>
