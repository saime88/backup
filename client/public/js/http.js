import axios from "axios"
import Vue from "vue"
import { Loading } from 'element-ui';
import { Message } from 'element-ui';
import router from '../../src/router/index'

var loading  
//使用element loading-start方法
function startloading(){
    loading = Loading.service({text:"拼命加载中",lock:"true",background:"rgba(0,0,0,0.6)"})

}
function endLoading(){

    //当关闭加载动画时，一定要异步操作,重点！！！详细请参考element官网loading加载
     setTimeout(() => {
        loading.close()
     }, 2000);
}
//请求拦截
axios.interceptors.request.use(config =>{
   
    startloading()
    if(localStorage.eleToken){
        //设置请求头为token
        config.headers.Authorization = localStorage.eleToken
    }

   return config
},error=>{
    return Promise.reject(error)
})
//响应拦截
axios.interceptors.request.use(response =>{
    endLoading()
    return response

    //判断响应回来的状态码是不是401，如果是401，说明token已经失效，需要移除token,用户重新登录
    
},error=>{
    //错误提醒
    endLoading()
    const {status} = error.response
    if(status == 401){
    
        Message.error("token失效，请重新登入")
        //清除token
        localStorage.removeItem('eleToken')
        router.push('/index')
    }

   
   
    return Promise.reject(error)
})

export default axios