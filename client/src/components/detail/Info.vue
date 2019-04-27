<template>
    <div id="info">
        <!-- 头像 -->
        <div class="info_pir">
             <img :src="user.avatar" alt="">
        </div>
        
        <!-- 个人信息 -->
        <div class="info_dec">
        <p><i class="glyphicon glyphicon-user"></i><span>{{user.name}}</span></p>
        <p><i class="glyphicon glyphicon-envelope"></i><span>{{user.id}}</span></p>
        </div>

    </div>
</template>
<script>
export default {
    name:"app-info",
    computed:{
        user(){
                const getuser = localStorage.getItem('eleToken')
                const  objuser = JSON.parse(getuser)

                return objuser
            
        }
    },


}
</script>
<style>
.info{width: 100%;height: 100%;display: flex;}
.info_pir{width: 300px;background:pink;float:left;}
.info_pir img{margin: 200px auto;width: 100px;height: 100px;position: relative;left: 50%;top: 50%;margin-left:-50px}
.info_dec{flex:1;background:green;color:black;overflow: hidden;height:100%}

</style>

