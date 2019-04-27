<template>
    <div id="fundflow">
        <div class="fundflow-top">
         
            <!-- 日期 -->
            
              <el-form :model="selectTime" :inline="true">
                <el-form-item>
                <el-date-picker
                v-model="selectTime.startTime"
                type="date"
                placeholder="选择开始日期">
              </el-date-picker>
              </el-form-item>
             <el-form-item><span>--</span></el-form-item>
              <el-form-item>
               
              <el-date-picker
                v-model="selectTime.endTime"
                type="date"
                placeholder="选择结束日期">
              </el-date-picker>
              </el-form-item>
               <el-form-item>
                  <el-button type="primary" size="mini" @click="selectDate">筛选</el-button>
               </el-form-item>
            

             
           


            <!-- 添加按钮 -->
              
              
                  <el-form-item class="btnRight">
                      <el-button type="success" size="mini" @click="showDialog">添加</el-button>
                  </el-form-item>
             
             </el-form>
     
         
            
    </div>
       
<!-- 表格 -->
<el-row>
       <el-table
    :data="fundData"
     resizable="true"
    
    max-height="480"
    border
    style="width: 100%;">
     <el-table-column
      type="selection"
      width="55px">
    </el-table-column>
    <el-table-column
      label="序号"
      type="index"
      
       align="center"
      width="50px">
     
    </el-table-column>
    <el-table-column
      label="生成日期"
      sortable
       prop="date"
       align="center"
      width="150px">
      <template slot-scope="scope">
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px">{{ scope.row.date }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="收支类型"
       prop="extendType"
       align="center"
      width="150px">
     
     </el-table-column>
    <el-table-column
      label="收支描述"
      prop="extendDecr"
       align="center"
      width="150px">
      <template slot-scope="scope">
      
        <span style="color:red">{{ scope.row.extendDecr }}</span>
      </template>
    </el-table-column>
 
     <el-table-column
      label="开支"
      prop="expend"
      align="center"
      width="100px">
     <template slot-scope="scope">
      
        <span style="color:orange">{{ scope.row.expend}}</span>
      </template>
    </el-table-column>
     <el-table-column
      label="现金"
      prop="100px"
      align="center"
      width="100px">
      <template slot-scope="scope">
      
        <span style="color:green">{{ scope.row.cash }}</span>
      </template>
      
    </el-table-column>
     <el-table-column
      label="备注"
      prop="note"
      align="center"
      width="100px">
      <template slot-scope="scope">
         
        <span style="color:green">{{ scope.row.note}}</span>
      </template>
      
    </el-table-column>
     <el-table-column label="操作" align="center">
      <template slot-scope="scope">
        <el-button
          size="small"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="small"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
    
  
  </el-table>
  </el-row>

  <!-- 分页 -->
  <div class="pagepart">
    <el-row>
      <el-col :span="24">
        <div class="block">
          
          <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="paginations.page_index"
          :page-sizes="paginations.page_sizes"
          :page-size="paginations.page_size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="paginations.total">
          </el-pagination>
        </div>

      </el-col>
    </el-row>

  </div>

  <!-- 添加表单 -->
     <div>
        <app-add :dialog="dialog" @update="getfundData" :form="formData"></app-add>
    </div>
    </div>
</template>
<script>
import Add from './Add'
export default {
    name:"app-fundflow",
    components:{
        "app-add":Add
    },
    data(){
        return {
            fundData:[],
            handlefundDate:[],
            filterfunDate:[],
           dialog:{
             show:false,
           
           },
           formData: {
             
              date:Date.now(),
              extendType: '',
              extendDecr: '',
              expend: '',
              cash: '',
              note:""
            },
            paginations:{
              page_index:1,  //当前位于哪页
              total:0,  //总条数
              page_size:5,   //一页显示多少条
              page_sizes:[5,10,15,20], ///每页显示多少条
              layout:"total,sizes,prev,pager, next, jumper"
            },
           selectTime:{
              startTime:"",
              endTime:""
           }
        }
    },
  created(){
        this.getfundData()
  },
  computed:{
      user(){
        return this.$store.getters.user
      }
  },
  methods:{

      getfundData(){
            this.$axios.get('/Api/api/profile/total').then((res)=>{
           this.handlefundDate = res.data
           this.filterfunDate = res.data
           this.setpagination()
        
     }).catch(err=>{console.log(err)})
      },

      //编辑信息
      handleEdit(index,row){
        this.dialog={
          show:true,
          title:"修改资金信息",
          options:"edit"
        }
        this.formData={
               id:row._id,
              extendType: row.extendType,
              extendDecr: row.extendDecr,
              expend: row.expend,
              cash: row.cash,
              note:row.note
        }
         
      },

      //删除信息
      handleDelete(index,row){
         this.$axios.delete(`/Api/api/profile/delete/${row._id}`).then(()=>{
           this.$message.success("删除成功！")
           this.getfundData()
         }).catch(err=>{console.log("删除失败")})
      },

    //添加信息
      showDialog(){
       
       this.dialog={
          show:true,
          title:"添加资金信息",
          options:"add"
        }
        this.formData={
               id:"",
              extendType: "",
              extendDecr: "",
              expend: "",
              cash: "",
              note:""
        }

      },

     //切换当前页显示的条数（比如要指定当前页显示10条）
      handleSizeChange(page_size){
        //切换显示条数
        this.paginations.page_index = 1
        this.paginations.page_size = page_size
        this.fundData = this.handlefundDate.filter((item,index)=>{
          return index < page_size

        })
      },

      //获取指定页面的展示条数（比如要指定展示第2页）
      handleCurrentChange(current_page){
        //获取当前页面显示的第一条
        let index = this.paginations.page_size*(current_page-1)
         //获取总条数
         let num = this.paginations.page_size*current_page
         let tables =[]
         for(let i=index;i<num;i++){
           if(this.handlefundDate[i]){
           tables.push(this.handlefundDate[i])
           }
         }
         this.fundData = tables

      },

      //设置当前页面展示条数（每页显示5条），当前指定展示的页面（展示第一页）
      // 1，先获取每页展示的条数
     //2，过滤
      setpagination(){
        this.paginations.total = this.handlefundDate.length
        this.paginations.page_index = 1
        this.paginations.page_size = 5
        this.fundData = this.handlefundDate.filter((item,index)=>{
          return index < this.paginations.page_size

        })
       
      
      },

      // 日期筛选
      selectDate(){
        // 如果只选了一个日期区间，则重新刷新页面
            if(!this.selectTime.startTime||!this.selectTime.endTime){
              this.$message({
                type:warning,
                message:"请选择时间区间"
              })
              this.getfundData()
              return

            }
            //将
              this.handlefundDate = this.filterfunDate.filter(item=>{
                const time = (new Date(item.date)).getTime()

                return time>=this.selectTime.startTime.getTime()&&time<=this.selectTime.endTime.getTime()
              })
              
               this.setpagination()
      }

  }
    
}
</script>
<style>
.fundflow{
  width: 100%;
  height: 100%;
  padding: 16px;
  box-sizing: border-box;
  
}
.fundflow-top{width: 100%;height: 50px}
.btnRight{float: right}

.pagepart{margin-top:10px;float:right}

</style>