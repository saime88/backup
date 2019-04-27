<template>             
                    <div class="asideMenu">

                        

                            <el-menu
                            default-active="2"
                            class="el-menu-vertical-demo"
                        
                            background-color="#324057"
                            text-color="#fff"
                            active-text-color="orange">
                             
                               
                            <router-link to="/profile/home">
                                
                                 <el-menu-item index="0">
                                    <i class="el-icon-menu"></i>
                                    <span slot="title">首页</span>
                               </el-menu-item> 
                            </router-link>
                           <el-menu>
                            <template v-for="fundlist in fundManger" >
                                <el-submenu  v-if="fundlist.children" :index="fundlist.path" :key="fundlist.path">
                                    <template slot="title">
                                        <i class="el-icon-location"></i>
                                        <span slot="title">{{fundlist.name}}</span>
                                    </template>
                                    <router-link v-for="(item,index) in fundlist.children" :key="index" :to="item.path">
                                        <el-menu-item :index="item.path" ><span slot="title">{{item.name}}</span></el-menu-item>
                                    </router-link> 
                                </el-submenu> 
                            </template>       
                            </el-menu>
                        
                    </div>
                

  
</template>
<script>
export default {
    name:"app-asideMenu",
    data(){
        return {fundManger:[
            {icon:"el-icon-service",name:"资金管理",
            children:[
                 {path:"/profile/fundflow",name:"资金流水"},
                {path:"/profile/echart",name:"财务报表"}
             
            ]},
            {icon:"el-icon-service",name:"信息管理"},
            {icon:"el-icon-service",name:"运营商"},
            
        ]}
    },
    components:{
       
    },
    created(){
     
           
    },
    methods:{
        linkHome(){
            alert('ok')
            this.$router.push('/profile/home')
        }
    }
    
}
</script>
<style scoped>

.asideMenu{width:180px;position: fixed;top: 60px;left: 0px;height: 100%}
.aside_menu{height: 100%}
.el-menu{height: 100%}
.el-submenu,.el-menu-item{width: 180px;}

a{text-decoration: none;padding:0px}
</style>

