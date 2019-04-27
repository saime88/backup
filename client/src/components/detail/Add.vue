<template>
    <div id="add">
        <el-dialog title="添加资金信息"  :append-to-body="false" :close-on-click-modal="false" :visible.sync="dialog.show" :close-on-press-escape="true" :modal-append-to-body="false">
  <el-form :model="form" ref="fundform" :rules="addrule">
      <el-form-item label="提交时间" :label-width="formLabelWidth" class="formDate">
           <el-input v-model="form.date"></el-input>
      </el-form-item>
    <el-form-item label="收支类型" :label-width="formLabelWidth">
      <el-select v-model="form.extendType" placeholder="请选择">
            <el-option label="员工工资" value="员工工资"></el-option>
            <el-option label="采购" value="采购"></el-option>
            <el-option label="补贴" value="补贴"></el-option>
      </el-select>
      
    </el-form-item>
    
    <el-form-item label="收支描述" :label-width="formLabelWidth">
           <el-input v-model="form.extendDecr"></el-input>
    </el-form-item>
    <el-form-item label="开支" :label-width="formLabelWidth">
           <el-input v-model="form.expend"></el-input>
    </el-form-item>
    <el-form-item label="现金" :label-width="formLabelWidth">
           <el-input v-model="form.cash"></el-input>
    </el-form-item>
     <el-form-item label="备注" :label-width="formLabelWidth">
           <el-input v-model="form.note" type="textarea"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialog = false">取 消</el-button>
    <el-button type="primary" @click="submitform('fundform')">提交</el-button>
  </div>
</el-dialog>
   

    </div>
</template>
<script>
import Qs from "qs"
export default {
    name:"app-add",
    props:{
        dialog:{
            type:Object
        },
        form:{
          type:Object
        }
    },
    data(){
       return {
         
        addrule:{
            extendType:[{required:true,message:"收支类型不能为空",trigger:"blur"}],
            extendDecr:[{required:true,message:"收支描述不能为空",trigger:"blur"}],
            expend:[{required:true,message:"开支不能为空",trigger:"blur",type:Number}],
            cash:[{required:true,message:"现金流不能为空",trigger:"blur",type:Number}],
       
            note:[{trigger:"blur"}]
        }

        ,
        formLabelWidth:120+"px"

       }
    },
    methods:{
        submitform(data){
             this.$refs[data].validate((valid) => {
             if (valid){
               const url = this.dialog.options=="edit"?`edit/${this.form.id}`:'add'
              let params = Qs.stringify(this.form);
            this.$axios.post(`/Api/api/profile/${url}`,params,{headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then(res=>{
               console.log("121212")
              
              this.$message.success("提交成功！")
               this.dialog.show= false
              this.$emit("update")
             
          }).catch(err=>{console.log(err)})
          }
            })
          
        }
    }

    
}
</script>
<style>
.formDate{display: none}
</style>