const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require('body-parser');

// 引入passport
const passport = require("passport")

require('./config/passport')(passport)
var port = process.env.PORT||5002
var app = express()

//引入路由
const users = require('./router/api/users')
const profiles= require('./router/api/profile')

// 使用body-parser中间件


//连接mongodb
const db = require('./config/keys').mongoURI
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



//passport初始化
app.use(passport.initialize());

 mongoose.connect(db,{useNewUrlParser: true}).then(()=>{
     console.log("mongodb is connected success")}).catch(()=>{
         console.log("mongodb connected failed")
     })
app.get('/',(req,res)=>{
    
   
    res.send("hello wolrd")
})

//使用router
app.use('/api/users',users);
app.use('/api/profile',profiles);
app.listen(port,()=>{
   
    console.log("serve run port 5002")
})