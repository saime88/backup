<template>
  <div class="register">
      <section class="register_container">
         <h2>米修资金后台管理系统</h2>
            <el-form :model="register_form" :rules="rules2" ref="register_form" label-width="100px" class="register_form">
              <el-form-item label="用户名" prop="name">
                <el-input type="text" v-model="register_form.name" placehouder="请输入用户名"></el-input>
              </el-form-item>
              <el-form-item label="邮箱" prop="email">
                <el-input type="text" v-model="register_form.email" placehouder="请输入邮箱"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="register_form.password" placeholder="请输入密码"></el-input>
              </el-form-item>
              <el-form-item label="确认密码" prop="checkpassword">
                <el-input  type="password" v-model.number="register_form.checkpassword" placeholder="请确认密码"></el-input>
              </el-form-item>
              <el-form-item label="选择身份">
                <el-select placeholder="请选择"  v-model="register_form.identity" >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              </el-form-item>
              <el-form-item>
                <!-- 这里在将refs=register_form作为click事件传值时，需要加上 引号-->
                <el-button type="primary" @click="submitform('register_form')">注册</el-button>  
              </el-form-item>
            </el-form>
      </section>
  </div>
</template>

<script>
import axios from "axios"
import Qs from 'qs';
export default {
  name: 'app-register',
  data () {
      var validatePass2 = (rule, value, callback) => {
      if (value !==  this.register_form.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
    return {
      register_form:{
         name:"",
         password:"",
         checkpassword:"",
         email:"",
         identify:""
      
         
      },
      
    options:[{value:"manger",label:"管理员"},{value:"employee",label:"普通员工"}],
      //这里value是和<el-option绑定的
      value:'',

         rules2: {
           name:[
                  {required:true,message:"用户名必填",trigger:"blur"},
                  {mix:6,max:20,message:"长度应该在6-20字符之间",trigger:"blur"}
           ],
          email: [
            {type:"email",required:true,message:"邮箱格式不正确",trigger:"blur"},
            
          ],
          password: [
             {required:true,message:"密码不能为空",trigger:"blur"},
                  {mix:6,max:20,message:"长度应该在6-20字符之间",trigger:"blur"}
          ],
          checkpassword: [
             {required:true,message:"确认密码不能为空",trigger:"blur"},
              {mix:6,max:20,message:"长度应该在6-20字符之间",trigger:"blur"},
              {validator: validatePass2,trigger: 'blur'}
          ],
          identity: [
             {required:true,message:"请选择身份",trigger:"blur"},
               
          ]
        
        }
      
    }
  },
  methods:{
     submitform(formName){
      
       //this.$refs[register_form]这里为什么要用[]
         this.$refs[formName].validate((valid) => {
          if (valid){
            let params = Qs.stringify(this.register_form);
            this.$axios.post('/Api/api/users/register',params,{headers: {'Content-Type':'application/x-www-form-urlencoded'}})
            .then(res=>{
              console.log(121)
                  this.$message.success("注册成功！")
                this.$router.push('/index')
            })
            .catch(err=>{
              this.$message.error("注册失败！")
              console.log(err)
            })
          }
        });
      
     }
  }
}
</script>

<style scoped>
.register{background: url(../assets/bg.jpg) no-repeat center center;background-size: 100% 100%;height: 100%;width: 100%;position: relative;overflow: hidden;}
h2{text-align: center;font-size: 24px;font-family: Courier, monospace;color: white;position: relative;left:30px}
.register_container{margin: 100px auto;width: 300px;height: 400px;}
.register_form{margin-top:20px;width: 300px;height: 400px;background: white;padding: 20px 30px;border-radius: 10px;box-shadow: 10px 10px black 0.5}
</style>
