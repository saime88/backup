<template>
  <div class="index">
    <section class="login">
      <h2>资金后台管理系统</h2>
            <el-form :model="loginform" :rules="rules1" ref="loginform" label-width="60px" class="loginform">
        <el-form-item label="邮箱" prop="email">
          <el-input type="text" v-model="loginform.email" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="loginform.password" placeholder="请输入密码"></el-input>
        </el-form-item>
       
        <el-form-item>
          <el-button type="primary" class="btnlogin" @click="submitform('loginform')">登  入</el-button>
          <p class="tips">还没有账号？现在<router-link to="/register" class="linkregister">注册</router-link></p>
       
        </el-form-item>
      </el-form>
      </section>
  </div>
</template>

<script>
import Qs from 'qs'
import jwt_decode from "jwt-decode"

export default {
  name: 'app-index',
  data () {
    return {
      loginform:{
        email:"",
        password:""
      },
       rules1: {
           email:[
                  {required:true,message:"邮箱格式不正确",trigger:"blur",type:"email"}
           ],
          password: [
            {required:true,required:true,trigger:"blur",message:"密码不能为空"},
             { min: 6, max: 30, message: "长度在 6 到 30 个字符",trigger: "blur" }      
          ]}
    }
  },
  methods: {
    submitform (formName){
      // post 登入接口

      this.$refs[formName].validate(valid =>{
      if(valid){
        let params = Qs.stringify(this.loginform);
      this.$axios.post('/Api/api/users/login',params,
      {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then(res=>{
         //console.log(res.data)  获取后端放回来的数据
        const {token} = res.data
     

        //将token存储在localStorage中
         
         
         //解析token
         const decoded= jwt_decode(token)
          console.log(decoded)  //能获取到token解析后的对象
           

           //将对象存储到localstorage里面去，要先用JOSN.stringfy转换成字符串 **重点**
          localStorage.setItem("eleToken",token)
           //JSON.stringify(decoded)
         //将token存储到vuex中
         this.$store.dispatch("setAuthenticated",!this.isEmpty(decoded))
         this.$store.dispatch("setUser",decoded)

         this.$message.success("登入成功！")
         
        this.$router.push('/profile/home')
      }).catch(()=>{
        this.$message.error("邮箱或密码错误！")
      })
      }
     
      
       
    })
    
  },
  // 封装一个判断value是否为空的方法，返回值为空
  isEmpty(value){
        return (
          value === undefined ||value=== null||(typeof value === "object"&&Object.keys(value).length===0)
          ||(typeof value === "string"&&value.trim().length===0)
        )
  }
}
}

</script>

<style scoped>
.index{background: url(../assets/bg.jpg) no-repeat center center;background-size: 100% 100%;height: 100%;width: 100%;position: relative;overflow: hidden;}
h2{text-align: center;font-size: 24px;font-family: Courier, monospace;color: white}
.login{width:400px;height: 300px;margin:100px auto;}
.loginform{margin-top:20px;padding:20px 30px 30px 20px;background: white;border-radius:10px}
.btnlogin{width: 290px}
.tips{float:right}
.linkregister{color:blue}

</style>