<template>

    <div id="profile">
        
            
      
       <app-nav></app-nav>
     
             
                <app-asideMenu></app-asideMenu>
              
            
            <div class="main">
                <router-view></router-view>
            </div>
           
    

       
      
    </div>
</template>
<script>
import AsideMenu from './page/AsideMenu.vue';
import Nav from './page/Nav.vue';
import Home from './detail/Home';
import Info from './detail/Info';

export default {
    name:"app-profile",
    components:{
       "app-asideMenu":AsideMenu,
       "app-nav":Nav,
       "app-home":Home,
       "app-info":Info
    },
    created(){
     
            var bodyHeight = document.body.clientHeight
             console.log(bodyHeight)
    }
}
</script>
<style scoped>
#profile{height: 100%;width:100%;overflow: hidden}
/* calc(100% -180px)中间要隔开 */
.main{position: absolute;top: 60px;left: 180px;overflow: auto;width: calc(100% - 180px);height: calc(100% - 60px);padding: 5px}

</style>

