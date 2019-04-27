<template>
    <div id="nav">
               <el-row class="nav_box">
                   <el-col :span="6" class="nav_left">
                        
                            
                            <img src="./logo.jpg" alt="">
                            <span class="">后台资金管理系统</span>
                        
               </el-col>
                
                <el-col :span="3" class="nav_right">
                             <el-row class="nav_right_box">
                                 <el-col :span="8">
                            <img :src="user.avatar" alt="">
                            </el-col>
                             <el-col :span="6">
                             <div class="welcome">
                                 <p style="margin-top:5px">欢迎</p>
                                 <p style="color:white">{{user.name}}</p>
                             </div>
                             </el-col>
                            
                            
                      <el-col :span="4">
                    <el-dropdown @command="handleCommand" trigger="click">
                        <span class="el-dropdown-link">
                            <i class="el-icon-caret-bottom el-icon--right"></i>
                        </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item command="info">个人信息</el-dropdown-item>
                                <el-dropdown-item command="out">退出</el-dropdown-item>
                            </el-dropdown-menu>
                    </el-dropdown>
                    </el-col>

                  </el-row>
               </el-col>
               </el-row>

    </div>
</template>
<script>
import jwt_decode from "jwt-decode"
export default {
    name:"app-nav",

    created(){
    //     const name = this.$store.getters.user
    //     alert(name)
    //     localStorage.setItem('eleuser',name)
    //    const objUser = localStorage.getItem("eleuser")
    //     this.user = JSON.parse(objUser)
      
    //      console.log(typeof this.user)
    },

   computed:{
       user(){
           const name = this.$store.getters.user
            // console.log(name)
            console.log(this.$store.getters.user)
        
        const getuser = localStorage.getItem('eleToken')
         const decoded= jwt_decode(getuser)
       
         
           return decoded
       }
   },
   methods:{
      handleCommand(value){
        switch(value){
            case "info":
            this.$router.push('/profile/info')
            break;
            case "out":
            localStorage.removeItem("eleToken")
             this.$store.dispatch('clearState');
            this.$router.push('/index')
            break;


        }
         
      },

   }
}
</script>
<style scoped>

.nav_box{width: 100%;height: 60px;background:#1e1e3f;padding:0 50px;line-height: 60px;color:white;box-sizing: border-box;font-family:'Times New Roman', Times, serif;}
.nav_left{float: left;line-height: 60px;font-size: 26px}
.nav_left img{width: 40px;height: 40px;position: relative;top:10px;right: 10px}
.nav_right{float:right;}
.welcome{height: 60px;}
.welcome p{margin:0;padding: 0;height: 30px;width: 40px;text-align: center;line-height: 30px}
.nav_right img{width:40px;height: 40px;margin-top: 10px}


</style>
